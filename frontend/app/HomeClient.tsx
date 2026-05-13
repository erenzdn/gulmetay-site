"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, ShieldCheck, Clock3, HardHat, PenTool, Building, BriefcaseBusiness, Mouse } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";

export default function HomeClient() {
  const [latestProjects, setLatestProjects] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero content stagger animation on mount
    gsap.fromTo(".hero-animate",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out" }
    );

    // Hero collage image scale/fade on mount
    gsap.fromTo(".hero-collage-container",
      { opacity: 0, scale: 0.96, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.4, delay: 0.3, ease: "power3.out" }
    );

    // Services Title Scroll Trigger
    gsap.fromTo(".services-header-animate",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-header-animate",
          start: "top 85%",
        }
      }
    );

    // Service Cards stagger on scroll
    gsap.fromTo(".service-card-animate",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
        }
      }
    );

    // Featured Projects header scroll animation
    gsap.fromTo(".featured-projects-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".featured-projects-header",
          start: "top 85%",
        }
      }
    );

    // Featured Projects Cards stagger scroll animation
    if (latestProjects.length > 0) {
      gsap.fromTo(".project-card-animate",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.18,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 80%",
          }
        }
      );
    }

    async function fetchLatest() {
      try {
        const res = await fetch(`${STRAPI_URL}/api/projects?populate=*&pagination[limit]=3&sort=createdAt:desc`);
        const json = await res.json();
        setLatestProjects(json.data || []);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    }
    fetchLatest();
  }, [latestProjects.length]);

  return (
    <div style={{ marginTop: "70px" }}>
      {/* HERO SECTION */}
      <header
        style={{
          position: "relative",
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
          background: "#08080a",
          overflow: "hidden",
          padding: "60px 0"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.12), transparent),
              radial-gradient(ellipse 60% 50% at 80% 50%, rgba(212, 163, 115, 0.08), transparent),
              radial-gradient(ellipse 50% 80% at 20% 80%, rgba(59, 130, 246, 0.06), transparent)
            `
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px"
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "15%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212, 163, 115, 0.12) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "float 8s ease-in-out infinite"
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "10%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "float 10s ease-in-out infinite reverse"
          }}
        />

        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%"
          }}
        >
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(clamp(280px, 100%, 540px), 1fr))",
              gap: "40px",
              alignItems: "center"
            }}
          >
            <div>
              <div
                className="hero-animate"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "24px",
                  padding: "6px 12px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  borderRadius: "50px"
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#22c55e",
                    boxShadow: "0 0 10px rgba(34, 197, 94, 0.6)",
                    animation: "pulse 2s ease-in-out infinite"
                  }}
                />
                <span
                  style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "12px",
                    fontWeight: "500",
                    letterSpacing: "0.5px"
                  }}
                >
                  2009&apos;dan Beri Mühendislik Güvencesi
                </span>
              </div>

              <h1
                className="hero-animate"
                style={{
                  fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
                  fontWeight: "300",
                  color: "#ffffff",
                  marginBottom: "20px",
                  lineHeight: "1.2",
                  letterSpacing: "-1px"
                }}
              >
                Geleceğin Yapılarını
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #D4A373 0%, #f5dbbf 50%, #D4A373 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    backgroundSize: "200% auto",
                    fontWeight: "600",
                    animation: "shimmer 3s linear infinite"
                  }}
                >
                  Bugün İnşa Ediyoruz
                </span>
              </h1>

              <p
                className="hero-text hero-animate"
                style={{
                  fontSize: "1.02rem",
                  color: "rgba(255, 255, 255, 0.55)",
                  marginBottom: "32px",
                  lineHeight: "1.7",
                  maxWidth: "480px"
                }}
              >
                Mühendislik hassasiyeti ve mimari vizyonla, modern, sürdürülebilir ve estetik yaşam alanlarını en yüksek kalite standartlarında hayata geçiriyoruz.
              </p>

              <div className="hero-buttons hero-animate" style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                <Link href="/projects" style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      background: "linear-gradient(135deg, #D4A373 0%, #c49363 100%)",
                      color: "#0a0a0b",
                      padding: "12px 28px",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: "600",
                      letterSpacing: "0.3px",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 12px 24px rgba(212, 163, 115, 0.25)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    Projeleri Keşfet
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </button>
                </Link>

                <Link href="/contact" style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      color: "rgba(255, 255, 255, 0.85)",
                      padding: "12px 28px",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: "500",
                      letterSpacing: "0.3px",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      backdropFilter: "blur(10px)"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = "rgba(212, 163, 115, 0.4)";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.color = "#D4A373";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    Teklif Alın
                  </button>
                </Link>
              </div>

              {/* Minimal Tag List under actions */}
              <div className="hero-tags hero-animate" style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "40px", borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: "24px" }}>
                {[
                  { icon: <Building2 size={16} color="#D4A373" />, text: "Mühendislik & Proje" },
                  { icon: <ShieldCheck size={16} color="#D4A373" />, text: "Kentsel Dönüşüm" },
                  { icon: <Clock3 size={16} color="#D4A373" />, text: "Zamanında Teslim" }
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {item.icon}
                    <span style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.45)" }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                position: "relative",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.15s",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {/* Stunning collage showing hero-architecture */}
              <div
                className="hero-collage-container"
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "500px",
                  height: "420px",
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                  background: "rgba(255, 255, 255, 0.02)"
                }}
              >
                <Image
                  src="/hero-architecture.png"
                  alt="Modern Mimari Proje"
                  fill
                  priority
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />

                {/* Floating Glass Overlay Card 1 (Bottom Left) */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    background: "rgba(8, 8, 10, 0.75)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "16px",
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    zIndex: 5,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    transition: "transform 0.3s ease"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(212, 163, 115, 0.15)",
                      border: "1px solid rgba(212, 163, 115, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Building2 size={18} color="#D4A373" />
                  </div>
                  <div>
                    <div style={{ color: "#ffffff", fontSize: "14px", fontWeight: "600", letterSpacing: "0.2px" }}>
                      Gülmetay İnşaat
                    </div>
                    <div style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "11px" }}>
                      Mimarlık & Mühendislik
                    </div>
                  </div>
                </div>

                {/* Floating Glass Overlay Card 2 (Top Right) */}
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    background: "rgba(212, 163, 115, 0.15)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(212, 163, 115, 0.25)",
                    borderRadius: "30px",
                    padding: "8px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    zIndex: 5,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                    transition: "transform 0.3s ease"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <ShieldCheck size={14} color="#D4A373" />
                  <span style={{ color: "#ffffff", fontSize: "11px", fontWeight: "600", letterSpacing: "0.5px" }}>
                    Güvenilir Hizmet
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <Mouse size={20} strokeWidth={1.8} color="rgba(255, 255, 255, 0.45)" />
        </div>
      </header>



      {/* SERVICES SECTION */}
      <section
        aria-label="Hizmetlerimiz"
        style={{
          padding: "60px 0",
          background: "linear-gradient(180deg, white 0%, #f8f9fa 100%)"
        }}
      >
        <div className="container">
          <div className="services-header-animate" style={{ textAlign: "center", marginBottom: "50px" }}>
            <div
              style={{
                fontSize: "12px",
                color: "#D4A373",
                fontWeight: "600",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "10px"
              }}
            >
              HİZMETLERİMİZ
            </div>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3.2vw, 2.25rem)",
                fontWeight: "600",
                color: "#0C1B33",
                marginBottom: "15px"
              }}
            >
              Neler Yapıyoruz?
            </h2>
            <p style={{ 
              fontSize: "1rem", 
              color: "#666", 
              maxWidth: "600px", 
              margin: "0 auto",
              lineHeight: "1.6"
            }}>
              Kapsamlı inşaat çözümlerimizle projelerinizi baştan sona yönetiyoruz
            </p>
          </div>

          <div
            className="services-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(clamp(250px, 100%, 320px), 1fr))",
              gap: "24px"
            }}
          >
            {[
              {
                title: "İnşaat & Taahhüt",
                description: "Anahtar teslim projeler ve profesyonel inşaat hizmetleri ile hayalinizdeki yapıları inşa ediyoruz.",
                icon: <HardHat size={32} strokeWidth={1.7} />,
                number: "01"
              },
              {
                title: "Mimari Tasarım",
                description: "Modern ve estetik mimari çizimler, 3D modelleme ve profesyonel proje danışmanlığı hizmetleri.",
                icon: <PenTool size={32} strokeWidth={1.7} />,
                number: "02"
              },
              {
                title: "Kentsel Dönüşüm",
                description: "Eski yapıları yenileyerek değer katıyor, güvenli ve modern yaşam alanları oluşturuyoruz.",
                icon: <Building size={32} strokeWidth={1.7} />,
                number: "03"
              },
              {
                title: "Proje Yönetimi",
                description: "Baştan sona profesyonel proje takibi, maliyet kontrolü ve zamanında teslim garantisi.",
                icon: <BriefcaseBusiness size={32} strokeWidth={1.7} />,
                number: "04"
              }
            ].map((service, index) => (
              <article
                key={index}
                className="service-card-animate"
                style={{
                  padding: "30px 24px",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  borderRadius: "20px",
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  background: "white",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #0C1B33 0%, #1a3a5c 100%)";
                  const title = e.currentTarget.querySelector('h3') as HTMLElement;
                  const desc = e.currentTarget.querySelector('p') as HTMLElement;
                  const icon = e.currentTarget.querySelector('.service-icon') as HTMLElement;
                  const number = e.currentTarget.querySelector('.service-number') as HTMLElement;
                  if (title) title.style.color = "white";
                  if (desc) desc.style.color = "rgba(255,255,255,0.8)";
                  if (icon) icon.style.color = "#D4A373";
                  if (number) number.style.color = "rgba(212, 163, 115, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "white";
                  const title = e.currentTarget.querySelector('h3') as HTMLElement;
                  const desc = e.currentTarget.querySelector('p') as HTMLElement;
                  const icon = e.currentTarget.querySelector('.service-icon') as HTMLElement;
                  const number = e.currentTarget.querySelector('.service-number') as HTMLElement;
                  if (title) title.style.color = "#0C1B33";
                  if (desc) desc.style.color = "#666";
                  if (icon) icon.style.color = "#D4A373";
                  if (number) number.style.color = "rgba(12, 27, 51, 0.08)";
                }}
              >
                <div 
                  className="service-number"
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "24px",
                    fontSize: "4rem",
                    fontWeight: "800",
                    color: "rgba(12, 27, 51, 0.08)",
                    lineHeight: "1",
                    transition: "color 0.4s ease"
                  }}
                >
                  {service.number}
                </div>

                <div
                  className="service-icon"
                  style={{
                    color: "#D4A373",
                    marginBottom: "20px",
                    transition: "all 0.3s ease"
                  }}
                >
                  {service.icon}
                </div>

                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#0C1B33",
                    marginBottom: "12px",
                    transition: "color 0.4s ease",
                    position: "relative",
                    zIndex: 1
                  }}
                >
                  {service.title}
                </h3>

                <p
                  style={{
                    color: "#666",
                    lineHeight: "1.7",
                    fontSize: "14px",
                    transition: "color 0.4s ease",
                    position: "relative",
                    zIndex: 1,
                    marginBottom: "20px"
                  }}
                >
                  {service.description}
                </p>

                <div style={{
                  width: "40px",
                  height: "3px",
                  background: "linear-gradient(90deg, #D4A373 0%, transparent 100%)",
                  borderRadius: "2px"
                }} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section aria-label="Öne Çıkan Projeler" style={{ padding: "60px 0", background: "white" }}>
        <div className="container">
          <div
            className="featured-projects-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "40px",
              flexWrap: "wrap",
              gap: "20px"
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#D4A373",
                  fontWeight: "600",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px"
                }}
              >
                PORTFOLİO
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 3.2vw, 2.25rem)",
                  fontWeight: "600",
                  color: "#0C1B33"
                }}
              >
                Öne Çıkan Projeler
              </h2>
            </div>
            <Link href="/projects" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "transparent",
                  color: "#0C1B33",
                  padding: "10px 22px",
                  border: "2px solid #0C1B33",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: "600",
                  letterSpacing: "0.3px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#0C1B33";
                  e.currentTarget.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#0C1B33";
                }}
              >
                Tüm Projeler
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>

          {latestProjects.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px 20px",
                background: "#f8f9fa",
                borderRadius: "20px"
              }}
            >
              <p style={{ fontSize: "1rem", color: "#666" }}>Henüz proje eklenmemiş.</p>
            </div>
          ) : (
            <div
              className="projects-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(clamp(280px, 100%, 380px), 1fr))",
                gap: "24px"
              }}
            >
              {latestProjects.map((project: any, index: number) => (
                <Link
                   key={project.id}
                  href={`/projects/${project.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <article
                    className="project-card-animate"
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                      background: "white"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.1)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.05)";
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        height: "240px",
                        overflow: "hidden",
                        background: "#f0f0f0"
                      }}
                    >
                      {project.mainImage && (
                        <>
                          <Image
                            src={`${STRAPI_URL}${project.mainImage.url}`}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{
                              objectFit: "cover",
                              transition: "transform 0.5s ease"
                            }}
                            loading="lazy"
                          />
                          <div
                            style={{
                              position: "absolute",
                              top: "16px",
                              right: "16px",
                              background: "rgba(212, 163, 115, 0.95)",
                              color: "white",
                              padding: "6px 14px",
                              borderRadius: "50px",
                              fontSize: "11px",
                              fontWeight: "600",
                              backdropFilter: "blur(10px)",
                              zIndex: 1,
                            }}
                          >
                            YENİ
                          </div>
                        </>
                      )}
                    </div>

                    <div style={{ padding: "24px" }}>
                      <h3
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "600",
                          color: "#0C1B33",
                          marginBottom: "12px",
                          lineHeight: "1.3"
                        }}
                      >
                        {project.title}
                      </h3>
                      <p
                        style={{
                          color: "#666",
                          lineHeight: "1.6",
                          marginBottom: "16px",
                          fontSize: "14px"
                        }}
                      >
                        {project.description?.[0]?.children?.[0]?.text?.substring(0, 90) ||
                          "Proje detaylarını görmek için tıklayın"}
                        ...
                      </p>
                      <div
                        style={{
                          color: "#D4A373",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "13px",
                          letterSpacing: "0.3px"
                        }}
                      >
                        Detayları Gör
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        aria-label="İletişime Geçin"
        style={{
          background: "linear-gradient(135deg, #0C1B33 0%, #1a3a5c 100%)",
          padding: "65px 0",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(212, 163, 115, 0.08) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(50px)"
          }}
        />

        <div
          className="container"
          style={{
            maxWidth: "900px",
            textAlign: "center",
            position: "relative",
            zIndex: 2
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: "600",
              color: "white",
              marginBottom: "20px",
              lineHeight: "1.2"
            }}
          >
            Projeniz İçin Hemen{" "}
            <span style={{ color: "#D4A373" }}>Teklif Alın</span>
          </h2>
          <p
            style={{
              fontSize: "1.02rem",
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: "30px",
              maxWidth: "650px",
              margin: "0 auto 30px",
              lineHeight: "1.7"
            }}
          >
            Uzman ekibimiz, hayalinizdeki projeyi gerçeğe dönüştürmek için sizinle
            çalışmaya hazır. Ücretsiz keşif ve danışmanlık hizmeti.
          </p>
          <Link href="/contact" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "linear-gradient(135deg, #D4A373 0%, #c49363 100%)",
                color: "#0a0a0b",
                padding: "13px 32px",
                border: "none",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "600",
                letterSpacing: "0.3px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 24px rgba(212, 163, 115, 0.25)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(212, 163, 115, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(212, 163, 115, 0.25)";
              }}
            >
              Ücretsiz Teklif Al
            </button>
          </Link>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes shine {
          0% { left: -100%; }
          50%, 100% { left: 100%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: 768px) {
          :global(.hero-grid) {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
            text-align: center !important;
          }
          :global(.hero-text) {
            max-width: 100% !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          :global(.hero-buttons) {
            justify-content: center !important;
          }
          :global(.hero-tags) {
            justify-content: center !important;
          }
          :global(.hero-collage-container) {
            height: 280px !important;
          }
          :global(.featured-projects-header) {
            flex-direction: column !important;
            text-align: center !important;
            align-items: center !important;
            gap: 15px !important;
          }
        }
      `}</style>
    </div>
  );
}
