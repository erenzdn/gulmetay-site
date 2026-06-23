"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  HardHat,
  PenTool,
  Building,
  BriefcaseBusiness,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./home.css";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";

interface StrapiProject {
  id: number;
  slug: string;
  title: string;
  mainImage?: { url: string };
  description?: Array<{
    children?: Array<{ text?: string }>;
  }>;
}

function getProjectDescription(project: StrapiProject): string {
  const text = project.description?.[0]?.children?.[0]?.text;
  if (!text) return "Proje detaylarını görmek için tıklayın.";
  return text.length > 140 ? `${text.substring(0, 140)}…` : text;
}

const SERVICES = [
  {
    title: "İnşaat & Taahhüt",
    description:
      "Anahtar teslim projeler ve profesyonel inşaat hizmetleri ile hayalinizdeki yapıları inşa ediyoruz.",
    icon: HardHat,
    number: "01",
  },
  {
    title: "Mimari Tasarım",
    description:
      "Modern ve estetik mimari çizimler, 3D modelleme ve profesyonel proje danışmanlığı hizmetleri.",
    icon: PenTool,
    number: "02",
  },
  {
    title: "Kentsel Dönüşüm",
    description:
      "Eski yapıları yenileyerek değer katıyor, güvenli ve modern yaşam alanları oluşturuyoruz.",
    icon: Building,
    number: "03",
  },
  {
    title: "Proje Yönetimi",
    description:
      "Baştan sona profesyonel proje takibi, maliyet kontrolü ve zamanında teslim garantisi.",
    icon: BriefcaseBusiness,
    number: "04",
  },
];

export default function HomeClient() {
  const [latestProjects, setLatestProjects] = useState<StrapiProject[]>([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const projectsPinRef = useRef<HTMLElement>(null);
  const projectsTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch(
          `${STRAPI_URL}/api/projects?populate=*&pagination[limit]=5&sort=createdAt:desc`
        );
        const json = await res.json();
        setLatestProjects(json.data || []);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    }
    fetchLatest();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".home-hero__eyebrow, .home-hero__title, .home-hero__desc, .home-hero__actions",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".home-hero__visual",
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out", delay: 0.2 }
      );

      gsap.fromTo(
        ".home-services__header",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".home-services__header",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".home-service-card",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".home-services__grid",
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (latestProjects.length <= 1) return;

    const section = projectsPinRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const slides = gsap.utils.toArray<HTMLElement>(".home-projects-pin__slide");
    const slideCount = slides.length;

    const ctx = gsap.context(() => {
      // Modern stack: kartlar hafif scale ve y offset ile başlıyor
      slides.forEach((slide, i) => {
        const offsetScale = 1 - i * 0.03;
        const offsetY = i * 20;
        
        gsap.set(slide, {
          scale: offsetScale,
          y: offsetY,
          opacity: 1,
          filter: i > 0 ? `blur(${i * 2}px)` : "blur(0px)",
        });

        const image = slide.querySelector(".home-projects-pin__slide-image");
        const imageInner = image?.querySelector("img");
        
        if (imageInner) {
          gsap.set(imageInner, { scale: 1.2 });
        }
      });

      // Her kart için modern, smooth animasyon
      slides.forEach((slide, i) => {
        if (i === slideCount - 1) return;

        const nextIndex = i + 1;
        const image = slide.querySelector<HTMLElement>(".home-projects-pin__slide-image");
        const imageInner = image?.querySelector<HTMLElement>("img");
        const content = slide.querySelector<HTMLElement>(".home-projects-pin__slide-content");
        const nextSlide = slides[nextIndex];

        const scrollHeight = window.innerHeight * 1.6;

        ScrollTrigger.create({
          trigger: section,
          start: () => `top+=${i * scrollHeight} top`,
          end: () => `top+=${(i + 1) * scrollHeight} top`,
          scrub: 2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Smooth easing curves
            const easeOut = gsap.parseEase("power3.out")(progress);
            const easeInOut = gsap.parseEase("power2.inOut")(progress);
            
            // Mevcut kart: yukarı kayarak küçülüyor ve fade
            gsap.set(slide, {
              y: i * 20 - easeOut * 120,
              scale: (1 - i * 0.03) - easeInOut * 0.15,
              opacity: 1 - easeOut * 0.9,
              filter: `blur(${easeOut * 8}px) brightness(${1 - easeOut * 0.3})`,
            });

            // Görsel: Ken Burns effect (zoom out & pan)
            if (imageInner) {
              gsap.set(imageInner, {
                scale: 1.2 - easeInOut * 0.15,
                y: -easeOut * 60,
                filter: `brightness(${1 - easeOut * 0.2})`,
              });
            }

            // İçerik: fade up
            if (content) {
              gsap.set(content, {
                opacity: 1 - easeOut * 0.8,
                y: -easeOut * 50,
                filter: `blur(${easeOut * 4}px)`,
              });
            }

            // Bir sonraki kart: scale up ve blur remove
            if (nextSlide) {
              const nextScale = 1 - nextIndex * 0.03;
              const nextY = nextIndex * 20;
              
              gsap.set(nextSlide, {
                scale: nextScale + easeInOut * 0.03,
                y: nextY - easeInOut * 20,
                filter: `blur(${Math.max(0, (nextIndex * 2) - easeInOut * (nextIndex * 2))}px)`,
              });
            }

            // Active index
            if (progress < 0.4) {
              setActiveProjectIndex(i);
            } else {
              setActiveProjectIndex(nextIndex);
            }
          },
        });
      });

      // Section pin
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${(slideCount - 1) * window.innerHeight * 1.6}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    }, section);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
      setActiveProjectIndex(0);
    };
  }, [latestProjects]);

  return (
    <div className="home-page" style={{ marginTop: "70px" }}>
      {/* HERO */}
      <header className="home-hero">
        <div className="home-hero__content">
          <div className="home-hero__eyebrow">
            <span className="home-hero__eyebrow-line" aria-hidden="true" />
            <span className="home-hero__eyebrow-text">
              2009&apos;dan Beri Güvenilir İnşaat
            </span>
          </div>

          <h1 className="home-hero__title">
            Sağlam Temeller,
            <span className="home-hero__title-accent">
              Kalıcı Değer İnşa Ediyoruz
            </span>
          </h1>

          <p className="home-hero__desc">
            Mühendislik hassasiyeti ve mimari vizyonla; modern, sürdürülebilir
            ve estetik yaşam alanlarını en yüksek kalite standartlarında hayata
            geçiriyoruz.
          </p>

          <div className="home-hero__actions">
            <Link href="/projects" className="home-hero__btn-primary">
              Projeleri İncele
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
            <Link href="/contact" className="home-hero__btn-secondary">
              Teklif Alın
            </Link>
          </div>
        </div>

        <div className="home-hero__visual">
          <div className="home-hero__image-wrap">
            <Image
              src="/hero-architecture.png"
              alt="Gülmetay İnşaat — Modern mimari proje"
              fill
              priority
              sizes="(max-width: 992px) 100vw, 55vw"
            />
          </div>
          <div className="home-hero__image-overlay" aria-hidden="true" />
          <div className="home-hero__frame">
            <p className="home-hero__frame-title">Gülmetay İnşaat</p>
            <p className="home-hero__frame-sub">Mimarlık & Mühendislik</p>
          </div>
        </div>

        <div className="home-hero__scroll-hint" aria-hidden="true">
          <span className="home-hero__scroll-line" />
          <span className="home-hero__scroll-text">Kaydır</span>
        </div>
      </header>

      {/* SERVICES */}
      <section className="home-services" aria-label="Hizmetlerimiz">
        <div className="container">
          <div className="home-services__header">
            <p className="home-services__label">Hizmetlerimiz</p>
            <h2 className="home-services__title">Neler Yapıyoruz?</h2>
            <p className="home-services__subtitle">
              Kapsamlı inşaat çözümlerimizle projelerinizi baştan sona yönetiyoruz
            </p>
          </div>

          <div className="home-services__grid">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.number} className="home-service-card">
                  <span className="home-service-card__number">
                    {service.number}
                  </span>
                  <div className="home-service-card__icon">
                    <Icon size={30} strokeWidth={1.6} />
                  </div>
                  <h3 className="home-service-card__title">{service.title}</h3>
                  <p className="home-service-card__desc">
                    {service.description}
                  </p>
                  <div className="home-service-card__line" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PINNED PROJECTS */}
      {latestProjects.length === 0 ? (
        <div className="home-projects-empty">
          <p>Henüz proje eklenmemiş.</p>
        </div>
      ) : latestProjects.length === 1 ? (
        <section className="home-projects-pin home-projects-pin--single" aria-label="Öne Çıkan Projeler">
          <div className="home-projects-pin__inner">
            <div className="home-projects-pin__sidebar">
              <div className="home-projects-pin__sidebar-top">
                <p className="home-projects-pin__label">Portföy</p>
                <h2 className="home-projects-pin__title">Öne Çıkan Projeler</h2>
                <Link href="/projects" className="home-projects-pin__link">
                  Tüm Projeler <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div className="home-projects-pin__viewport">
              <div className="home-projects-pin__track">
                <div style={{ position: "relative", height: "100%", width: "100%" }}>
                  <ProjectSlide project={latestProjects[0]} index={0} total={1} zIndex={1} />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section
          ref={projectsPinRef}
          className="home-projects-pin"
          aria-label="Öne Çıkan Projeler"
        >
          <div className="home-projects-pin__inner">
            <aside className="home-projects-pin__sidebar">
              <div className="home-projects-pin__sidebar-top">
                <p className="home-projects-pin__label">Portföy</p>
                <h2 className="home-projects-pin__title">Öne Çıkan Projeler</h2>
                <Link href="/projects" className="home-projects-pin__link">
                  Tüm Projeler <ArrowRight size={14} />
                </Link>
              </div>

              <div className="home-projects-pin__progress">
                <div className="home-projects-pin__counter">
                  <span>{String(activeProjectIndex + 1).padStart(2, "0")}</span>
                  {" / "}
                  {String(latestProjects.length).padStart(2, "0")}
                </div>
                <p className="home-projects-pin__progress-text">
                  Projeler arasında gezinmek için kaydırın
                </p>
                <div className="home-projects-pin__dots" aria-hidden="true">
                  {latestProjects.map((_, i) => (
                    <span
                      key={i}
                      className={`home-projects-pin__dot${
                        i === activeProjectIndex ? " is-active" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
            </aside>

            <div className="home-projects-pin__viewport">
              <div ref={projectsTrackRef} className="home-projects-pin__track">
                {latestProjects.map((project, index) => (
                  <ProjectSlide
                    key={project.id}
                    project={project}
                    index={index}
                    total={latestProjects.length}
                    zIndex={latestProjects.length - index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="home-cta" aria-label="İletişime Geçin">
        <div className="container">
          <div className="home-cta__inner">
            <div className="home-cta__content">
              <div className="home-cta__eyebrow">
                <span className="home-cta__eyebrow-line" aria-hidden="true" />
                <span>Birlikte Çalışalım</span>
              </div>

              <h2 className="home-cta__title">
                Bir sonraki proje
                <span className="home-cta__title-accent"> sizinle başlasın.</span>
              </h2>

              <p className="home-cta__desc">
                Keşiften teslimata kadar tüm süreci şeffaf ve planlı yönetiyoruz.
                İlk görüşme ücretsiz.
              </p>

              <div className="home-cta__contact">
                <Link href="tel:+902124180909" className="home-cta__contact-link">
                  +90 212 418 09 09
                </Link>
                <span className="home-cta__contact-sep" aria-hidden="true" />
                <Link
                  href="mailto:bilgi@gulmetay.com.tr"
                  className="home-cta__contact-link"
                >
                  bilgi@gulmetay.com.tr
                </Link>
              </div>
            </div>

            <Link href="/contact" className="home-cta__btn">
              Görüşme Talep Et
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectSlide({
  project,
  index,
  total,
  zIndex,
}: {
  project: StrapiProject;
  index: number;
  total: number;
  zIndex?: number;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="home-projects-pin__slide"
      style={{ 
        textDecoration: "none",
        zIndex: zIndex || 1
      }}
    >
      <div className="home-projects-pin__slide-image">
        {project.mainImage ? (
          <Image
            src={`${STRAPI_URL}${project.mainImage.url}`}
            alt={project.title}
            fill
            sizes="(max-width: 992px) 100vw, 60vw"
            style={{ objectFit: "cover" }}
            priority={index === 0}
          />
        ) : null}
        <div className="home-projects-pin__slide-image-overlay" />
      </div>
      <div className="home-projects-pin__slide-content">
        <p className="home-projects-pin__slide-index">
          Proje {String(index + 1).padStart(2, "0")} — {String(total).padStart(2, "0")}
        </p>
        <h3 className="home-projects-pin__slide-title">{project.title}</h3>
        <p className="home-projects-pin__slide-desc">
          {getProjectDescription(project)}
        </p>
        <span className="home-projects-pin__slide-cta">
          Detayları Gör <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
