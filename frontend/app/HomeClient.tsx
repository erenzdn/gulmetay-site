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
  type LucideIcon,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES, type ServiceIconName } from "@/lib/services";
import { useTranslation } from "@/context/LanguageContext";
import "./home.css";

const STRAPI_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

const SERVICE_ICONS: Record<ServiceIconName, LucideIcon> = {
  HardHat,
  PenTool,
  Building,
  BriefcaseBusiness,
};

interface StrapiProject {
  id: number;
  slug: string;
  title: string;
  mainImage?: { url: string };
  description?: Array<{
    children?: Array<{ text?: string }>;
  }>;
}

function getProjectDescription(project: StrapiProject, fallbackText: string): string {
  const text = project.description?.[0]?.children?.[0]?.text;
  if (!text) return fallbackText;
  return text.length > 140 ? `${text.substring(0, 140)}…` : text;
}

export default function HomeClient() {
  const { t } = useTranslation();
  const [latestProjects, setLatestProjects] = useState<StrapiProject[]>([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const projectsPinRef = useRef<HTMLElement>(null);
  const projectsTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL || ""}/api/projects?populate=*&pagination[limit]=5&sort=createdAt:desc`
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

    const mm = gsap.matchMedia();

    // Desktop Layout (min-width: 992px) - Stack and Pin
    mm.add("(min-width: 992px)", () => {
      // Başlangıç pozisyonları: Tüm kartlar gerçekten üst üste
      slides.forEach((slide, i) => {
        gsap.set(slide, {
          zIndex: slideCount - i,
          y: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
        });

        const imageInner = slide.querySelector("img");
        if (imageInner) {
          gsap.set(imageInner, { scale: 1 });
        }
      });

      // Timeline yaklaşımı: Her kart için animasyon oluştur
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${slideCount * window.innerHeight}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Active index hesaplama
            const progress = self.progress;
            const totalSteps = slideCount;
            const currentStep = Math.floor(progress * totalSteps);
            const activeIndex = Math.min(currentStep, slideCount - 1);
            setActiveProjectIndex(activeIndex);
          },
        },
      });

      // Her kart için stack animasyonu
      slides.forEach((slide, i) => {
        if (i === slideCount - 1) return; // Son kart animasyonsuz kalır

        const image = slide.querySelector<HTMLElement>(".home-projects-pin__slide-image");
        const imageInner = image?.querySelector<HTMLElement>("img");
        const content = slide.querySelector<HTMLElement>(".home-projects-pin__slide-content");

        // Her kart için yukarı kayma animasyonu
        timeline.to(
          slide,
          {
            y: -window.innerHeight * 1.2,
            scale: 0.85,
            opacity: 0,
            filter: "blur(20px)",
            ease: "power2.inOut",
            duration: 1,
          },
          i // Her animasyon art arda başlar
        );

        // Görsel için paralaks efekti
        if (imageInner) {
          timeline.to(
            imageInner,
            {
              scale: 1.3,
              y: -100,
              ease: "power2.inOut",
              duration: 1,
            },
            i
          );
        }

        // İçerik için fade efekti
        if (content) {
          timeline.to(
            content,
            {
              opacity: 0,
              y: -80,
              ease: "power2.in",
              duration: 0.8,
            },
            i
          );
        }
      });

      // Son karta hafif bir giriş animasyonu ekle
      if (slides.length > 0) {
        const lastSlide = slides[slideCount - 1];
        timeline.fromTo(
          lastSlide,
          { scale: 0.95, opacity: 0.8 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          slideCount - 1.5
        );
      }
    });

    // Mobile/Tablet Layout (max-width: 991px) - No pinning, vertical block layout
    mm.add("(max-width: 991px)", () => {
      // Clear desktop properties
      slides.forEach((slide) => {
        gsap.set(slide, { clearProps: "all" });
        const imageInner = slide.querySelector("img");
        if (imageInner) gsap.set(imageInner, { clearProps: "all" });
        const content = slide.querySelector(".home-projects-pin__slide-content");
        if (content) gsap.set(content, { clearProps: "all" });
      });

      // Simple slide-in animation on scroll for mobile
      slides.forEach((slide) => {
        gsap.fromTo(
          slide,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: slide,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mm.revert();
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
              {t("home.hero.eyebrow")}
            </span>
          </div>

          <h1 className="home-hero__title">
            {t("home.hero.titleMain")}
            <span className="home-hero__title-accent">
              {t("home.hero.titleAccent")}
            </span>
          </h1>

          <p className="home-hero__desc">
            {t("home.hero.desc")}
          </p>

          <div className="home-hero__actions">
            <Link href="/projects" className="home-hero__btn-primary">
              {t("home.hero.btnProjects")}
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
            <Link href="/contact" className="home-hero__btn-secondary">
              {t("home.hero.btnQuote")}
            </Link>
          </div>
        </div>

        <div className="home-hero__visual">
          <div className="home-hero__image-wrap">
            <Image
              src="/hero-architecture.png"
              alt={`${t("home.hero.frameTitle")} — ${t("home.hero.frameSub")}`}
              fill
              priority
              sizes="(max-width: 992px) 100vw, 55vw"
            />
          </div>
          <div className="home-hero__image-overlay" aria-hidden="true" />
          <div className="home-hero__frame">
            <p className="home-hero__frame-title">{t("home.hero.frameTitle")}</p>
            <p className="home-hero__frame-sub">{t("home.hero.frameSub")}</p>
          </div>
        </div>

        <div className="home-hero__scroll-hint" aria-hidden="true">
          <span className="home-hero__scroll-line" />
          <span className="home-hero__scroll-text">{t("home.hero.scrollHint")}</span>
        </div>
      </header>

      {/* SERVICES */}
      <section className="home-services" aria-label={t("home.services.label")}>
        <div className="container">
          <div className="home-services__header">
            <p className="home-services__label">{t("home.services.label")}</p>
            <h2 className="home-services__title">{t("home.services.title")}</h2>
            <p className="home-services__subtitle">
              {t("home.services.subtitle")}
            </p>
          </div>

          <div className="home-services__grid">
            {SERVICES.map((service) => {
              const Icon = SERVICE_ICONS[service.iconName];
              return (
                <Link
                  key={service.slug}
                  href={`/hizmetlerimiz/${service.slug}`}
                  className="home-service-card"
                >
                  <span className="home-service-card__number">
                    {service.number}
                  </span>
                  <div className="home-service-card__icon">
                    <Icon size={30} strokeWidth={1.6} />
                  </div>
                  <h3 className="home-service-card__title">
                    {t(`services.items.${service.slug}.title`)}
                  </h3>
                  <p className="home-service-card__desc">
                    {t(`services.items.${service.slug}.shortDescription`)}
                  </p>
                  <div className="home-service-card__line" />
                </Link>
              );
            })}
          </div>

          <div className="home-services__footer">
            <Link href="/hizmetlerimiz" className="home-services__all-link">
              {t("home.services.seeAll")}
              <ArrowRight size={15} strokeWidth={2.4} />
            </Link>
          </div>
        </div>
      </section>

      {/* PINNED PROJECTS */}
      {latestProjects.length === 0 ? (
        <div className="home-projects-empty">
          <p>{t("home.projects.empty")}</p>
        </div>
      ) : latestProjects.length === 1 ? (
        <section className="home-projects-pin home-projects-pin--single" aria-label={t("home.projects.title")}>
          <div className="home-projects-pin__inner">
            <div className="home-projects-pin__sidebar">
              <div className="home-projects-pin__sidebar-top">
                <p className="home-projects-pin__label">{t("home.projects.label")}</p>
                <h2 className="home-projects-pin__title">{t("home.projects.title")}</h2>
                <Link href="/projects" className="home-projects-pin__link">
                  {t("home.projects.seeAll")} <ArrowRight size={14} />
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
          aria-label={t("home.projects.title")}
        >
          <div className="home-projects-pin__inner">
            <aside className="home-projects-pin__sidebar">
              <div className="home-projects-pin__sidebar-top">
                <p className="home-projects-pin__label">{t("home.projects.label")}</p>
                <h2 className="home-projects-pin__title">{t("home.projects.title")}</h2>
                <Link href="/projects" className="home-projects-pin__link">
                  {t("home.projects.seeAll")} <ArrowRight size={14} />
                </Link>
              </div>

              <div className="home-projects-pin__progress">
                <div className="home-projects-pin__counter">
                  <span>{String(activeProjectIndex + 1).padStart(2, "0")}</span>
                  {" / "}
                  {String(latestProjects.length).padStart(2, "0")}
                </div>
                <p className="home-projects-pin__progress-text">
                  {t("home.projects.scrollHint")}
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
      <section className="home-cta" aria-label={t("home.cta.eyebrow")}>
        <div className="container">
          <div className="home-cta__inner">
            <div className="home-cta__content">
              <div className="home-cta__eyebrow">
                <span className="home-cta__eyebrow-line" aria-hidden="true" />
                <span>{t("home.cta.eyebrow")}</span>
              </div>

              <h2 className="home-cta__title">
                {t("home.cta.title")}
                <span className="home-cta__title-accent">{t("home.cta.titleAccent")}</span>
              </h2>

              <p className="home-cta__desc">
                {t("home.cta.desc")}
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
              {t("home.cta.btnRequest")}
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
  const { t } = useTranslation();
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "";

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
            src={`${strapiUrl}${project.mainImage.url}`}
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
          {t("home.projects.slidePrefix")} {String(index + 1).padStart(2, "0")} — {String(total).padStart(2, "0")}
        </p>
        <h3 className="home-projects-pin__slide-title">{project.title}</h3>
        <p className="home-projects-pin__slide-desc">
          {getProjectDescription(project, t("home.projects.descriptionFallback"))}
        </p>
        <span className="home-projects-pin__slide-cta">
          {t("home.projects.viewDetails")} <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
