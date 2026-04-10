"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Building2, ShieldCheck, Clock3, HardHat, PenTool, Building, BriefcaseBusiness, Mouse } from "lucide-react";

export default function HomePage() {
  const [latestProjects, setLatestProjects] = useState([]);
  const [stats, setStats] = useState([
    { value: 0, target: 15, suffix: "+", label: "Yıl Tecrübe" },
    { value: 0, target: 150, suffix: "+", label: "Tamamlanan Proje" },
    { value: 0, target: 500, suffix: "+", label: "Mutlu Müşteri" },
    { value: 0, target: 100, suffix: "%", label: "Müşteri Memnuniyeti" }
  ]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    async function fetchLatest() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || ""}/api/projects?populate=*&pagination[limit]=3&sort=createdAt:desc`);
        const json = await res.json();
        setLatestProjects(json.data || []);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    }
    fetchLatest();

    // Counter animation
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    
    const timers = stats.map((stat, index) => {
      const increment = stat.target / steps;
      let currentValue = 0;
      
      return setInterval(() => {
        currentValue += increment;
        if (currentValue >= stat.target) {
          currentValue = stat.target;
          clearInterval(timers[index]);
        }
        setStats(prev => {
          const newStats = [...prev];
          newStats[index] = { ...stat, value: Math.floor(currentValue) };
          return newStats;
        });
      }, stepTime);
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, []);

  return (
    <div style={{ marginTop: "80px" }}>
      {/* HERO SECTION */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: "#0a0a0b",
          overflow: "hidden"
        }}
      >
        {/* Animated mesh gradient background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.15), transparent),
              radial-gradient(ellipse 60% 50% at 80% 50%, rgba(212, 163, 115, 0.1), transparent),
              radial-gradient(ellipse 50% 80% at 20% 80%, rgba(59, 130, 246, 0.08), transparent)
            `
          }}
        />

        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px"
          }}
        />

        {/* Floating orbs */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "15%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212, 163, 115, 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "float 8s ease-in-out infinite"
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "10%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "float 10s ease-in-out infinite reverse"
          }}
        />

        {/* Ana içerik */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 60px",
            width: "100%"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "100px",
              alignItems: "center"
            }}
          >
            {/* Sol taraf - Metin içerik */}
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transition: "all 1.2s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
            >
              {/* Status indicator */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "40px"
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#22c55e",
                    boxShadow: "0 0 12px rgba(34, 197, 94, 0.6)",
                    animation: "pulse 2s ease-in-out infinite"
                  }}
                />
                <span
                  style={{
                    color: "rgba(255, 255, 255, 0.5)",
                    fontSize: "13px",
                    fontFamily: "'Roboto', system-ui, sans-serif",
                    letterSpacing: "0.5px"
                  }}
                >
                  2009'dan beri aktif
                </span>
              </div>

              {/* Ana başlık */}
              <h1
                style={{
                  fontSize: "clamp(3rem, 5vw, 4.5rem)",
                  fontWeight: "400",
                  fontFamily: "'Roboto', system-ui, sans-serif",
                  color: "#ffffff",
                  marginBottom: "30px",
                  lineHeight: "1.1",
                  letterSpacing: "-2px"
                }}
              >
                Geleceğin
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #D4A373 0%, #f0d4b8 50%, #D4A373 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    backgroundSize: "200% auto",
                    animation: "shimmer 3s linear infinite"
                  }}
                >
                  Yapılarını
                </span>
                <br />
                Bugün İnşa Ediyoruz
              </h1>

              {/* Açıklama */}
              <p
                style={{
                  fontSize: "1.1rem",
                  fontFamily: "'Roboto', system-ui, sans-serif",
                  color: "rgba(255, 255, 255, 0.6)",
                  marginBottom: "50px",
                  lineHeight: "1.9",
                  maxWidth: "480px"
                }}
              >
                Mühendislik hassasiyeti ve mimari vizyonla, 
                sürdürülebilir ve estetik yaşam alanları tasarlıyoruz.
              </p>

              {/* Butonlar */}
              <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
                <Link href="/projects" style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      background: "linear-gradient(135deg, #D4A373 0%, #c49363 100%)",
                      color: "#0a0a0b",
                      padding: "18px 40px",
                      border: "none",
                      borderRadius: "60px",
                      fontSize: "14px",
                      fontWeight: "600",
                      fontFamily: "'Roboto', system-ui, sans-serif",
                      letterSpacing: "0.5px",
                      cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 20px 40px rgba(212, 163, 115, 0.3)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    Projeleri Keşfet
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </button>
                </Link>

                <Link href="/contact" style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      background: "transparent",
                      color: "rgba(255, 255, 255, 0.8)",
                      padding: "18px 40px",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "60px",
                      fontSize: "14px",
                      fontWeight: "500",
                      fontFamily: "'Roboto', system-ui, sans-serif",
                      letterSpacing: "0.5px",
                      cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      backdropFilter: "blur(10px)"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = "rgba(212, 163, 115, 0.5)";
                      e.currentTarget.style.color = "#D4A373";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    Teklif Alın
                  </button>
                </Link>
              </div>

              {/* İstatistikler */}
              <div
                style={{
                  marginTop: "80px",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "30px"
                }}
              >
                {[
                  { number: "15+", label: "Yıl Tecrübe", suffix: "" },
                  { number: "150+", label: "Proje", suffix: "" },
                  { number: "100", label: "Memnuniyet", suffix: "%" }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    style={{
                      padding: "24px",
                      background: "rgba(255, 255, 255, 0.03)",
                      borderRadius: "16px",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      backdropFilter: "blur(10px)"
                    }}
                  >
                    <div
                      style={{
                        fontSize: "2.2rem",
                        fontWeight: "500",
                        fontFamily: "'Roboto', system-ui, sans-serif",
                        color: "#ffffff",
                        lineHeight: "1",
                        marginBottom: "8px"
                      }}
                    >
                      {stat.number}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "rgba(255, 255, 255, 0.4)",
                        fontFamily: "'Roboto', system-ui, sans-serif",
                        letterSpacing: "0.3px"
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sağ taraf - 3D Bento Grid */}
            <div
              style={{
                position: "relative",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transition: "all 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s"
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridTemplateRows: "auto auto auto",
                  gap: "16px"
                }}
              >
                {/* Büyük kart - Proje */}
                <div
                  style={{
                    gridColumn: "1 / 3",
                    background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                    borderRadius: "24px",
                    padding: "40px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(20px)",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  {/* Holografik shine efekti */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
                      animation: "shine 4s ease-in-out infinite"
                    }}
                  />
                  
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "30px"
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontFamily: "'Roboto', system-ui, sans-serif",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            color: "rgba(255, 255, 255, 0.4)",
                            marginBottom: "10px"
                          }}
                        >
                          Uzmanlık Alanları
                        </div>
                        <div
                          style={{
                            fontSize: "1.6rem",
                            fontFamily: "'Roboto', system-ui, sans-serif",
                            color: "#ffffff",
                            fontWeight: "400"
                          }}
                        >
                          Mühendislik & Mimarlık
                        </div>
                      </div>
                      
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(212, 163, 115, 0.2) 0%, rgba(212, 163, 115, 0.05) 100%)",
                          border: "1px solid rgba(212, 163, 115, 0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Building2 size={22} color="#D4A373" strokeWidth={1.8} />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      {["Proje", "Statik", "İnşaat", "Taahhüt"].map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            padding: "8px 16px",
                            background: "rgba(255, 255, 255, 0.05)",
                            borderRadius: "100px",
                            fontSize: "13px",
                            fontFamily: "'Roboto', system-ui, sans-serif",
                            color: "rgba(255, 255, 255, 0.6)",
                            border: "1px solid rgba(255, 255, 255, 0.08)"
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sol alt kart */}
                <div
                  style={{
                    background: "linear-gradient(145deg, rgba(212, 163, 115, 0.15) 0%, rgba(212, 163, 115, 0.05) 100%)",
                    borderRadius: "24px",
                    padding: "30px",
                    border: "1px solid rgba(212, 163, 115, 0.15)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "180px"
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      background: "rgba(212, 163, 115, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <ShieldCheck size={20} color="#D4A373" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "1.8rem",
                        fontFamily: "'Roboto', system-ui, sans-serif",
                        color: "#D4A373",
                        fontWeight: "500",
                        marginBottom: "4px"
                      }}
                    >
                      Güvenilir
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "rgba(255, 255, 255, 0.5)",
                        fontFamily: "'Roboto', system-ui, sans-serif"
                      }}
                    >
                      Kalite garantisi
                    </div>
                  </div>
                </div>

                {/* Sağ alt kart */}
                <div
                  style={{
                    background: "linear-gradient(145deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.03) 100%)",
                    borderRadius: "24px",
                    padding: "30px",
                    border: "1px solid rgba(99, 102, 241, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "180px"
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      background: "rgba(99, 102, 241, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Clock3 size={20} color="#818cf8" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "1.8rem",
                        fontFamily: "'Roboto', system-ui, sans-serif",
                        color: "#818cf8",
                        fontWeight: "500",
                        marginBottom: "4px"
                      }}
                    >
                      Zamanında
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "rgba(255, 255, 255, 0.5)",
                        fontFamily: "'Roboto', system-ui, sans-serif"
                      }}
                    >
                      Teslim garantisi
                    </div>
                  </div>
                </div>

                {/* En alt kart - CTA */}
                <div
                  style={{
                    gridColumn: "1 / 3",
                    background: "rgba(255, 255, 255, 0.03)",
                    borderRadius: "20px",
                    padding: "24px 30px",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div
                    style={{
                      fontSize: "15px",
                      color: "rgba(255, 255, 255, 0.6)",
                      fontFamily: "'Roboto', system-ui, sans-serif"
                    }}
                  >
                    Projeniz için ücretsiz danışmanlık alın
                  </div>
                  <Link 
                    href="/contact"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#D4A373",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontFamily: "'Roboto', system-ui, sans-serif",
                      fontWeight: "600",
                      transition: "gap 0.3s ease"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.gap = "12px";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.gap = "8px";
                    }}
                  >
                    Başlayın
                    <ArrowRight size={18} strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px"
          }}
        >
          <Mouse size={24} strokeWidth={1.8} color="rgba(255, 255, 255, 0.55)" />
        </div>

      </section>

      {/* STATS SECTION */}
      <section
        style={{
          background: "white",
          padding: "60px 40px",
          boxShadow: "0 -10px 40px rgba(0, 0, 0, 0.05)"
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            textAlign: "center"
          }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s ease ${index * 0.1}s`
              }}
            >
              <div
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  fontWeight: "600",
                  fontFamily: "'Roboto', system-ui, sans-serif",
                  background: "linear-gradient(135deg, #0C1B33 0%, #D4A373 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "10px"
                }}
              >
                {stat.value}{stat.suffix}
              </div>
              <div
                style={{
                  color: "#666",
                  fontSize: "15px",
                  fontWeight: "500",
                  fontFamily: "'Roboto', system-ui, sans-serif",
                  letterSpacing: "0.5px"
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section
        style={{
          padding: "100px 40px",
          background: "linear-gradient(180deg, white 0%, #f8f9fa 100%)"
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "70px" }}>
            <div
              style={{
                fontSize: "13px",
                color: "#D4A373",
                fontWeight: "600",
                fontFamily: "'Roboto', system-ui, sans-serif",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "15px"
              }}
            >
              HİZMETLERİMİZ
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "600",
                fontFamily: "'Roboto', system-ui, sans-serif",
                color: "#0C1B33",
                marginBottom: "20px"
              }}
            >
              Neler Yapıyoruz?
            </h2>
            <p style={{ 
              fontSize: "1.1rem", 
              color: "#666", 
              maxWidth: "600px", 
              margin: "0 auto",
              fontFamily: "'Roboto', system-ui, sans-serif",
              lineHeight: "1.7"
            }}>
              Kapsamlı inşaat çözümlerimizle projelerinizi baştan sona yönetiyoruz
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "0",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              borderRadius: "24px",
              overflow: "hidden",
              background: "white",
              boxShadow: "0 10px 60px rgba(0, 0, 0, 0.08)"
            }}
          >
            {[
              {
                title: "İnşaat & Taahhüt",
                description: "Anahtar teslim projeler ve profesyonel inşaat hizmetleri ile hayalinizdeki yapıları inşa ediyoruz.",
                icon: (
                  <HardHat size={32} strokeWidth={1.7} />
                ),
                number: "01"
              },
              {
                title: "Mimari Tasarım",
                description: "Modern ve estetik mimari çizimler, 3D modelleme ve profesyonel proje danışmanlığı hizmetleri.",
                icon: (
                  <PenTool size={32} strokeWidth={1.7} />
                ),
                number: "02"
              },
              {
                title: "Kentsel Dönüşüm",
                description: "Eski yapıları yenileyerek değer katıyor, güvenli ve modern yaşam alanları oluşturuyoruz.",
                icon: (
                  <Building size={32} strokeWidth={1.7} />
                ),
                number: "03"
              },
              {
                title: "Proje Yönetimi",
                description: "Baştan sona profesyonel proje takibi, maliyet kontrolü ve zamanında teslim garantisi.",
                icon: (
                  <BriefcaseBusiness size={32} strokeWidth={1.7} />
                ),
                number: "04"
              }
            ].map((service, index) => (
              <div
                key={index}
                style={{
                  padding: "50px 40px",
                  borderRight: index < 3 ? "1px solid rgba(0, 0, 0, 0.06)" : "none",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  background: "transparent"
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
                  e.currentTarget.style.background = "transparent";
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
                {/* Numara - Arka planda */}
                <div 
                  className="service-number"
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "25px",
                    fontSize: "5rem",
                    fontWeight: "800",
                    fontFamily: "'Roboto', system-ui, sans-serif",
                    color: "rgba(12, 27, 51, 0.08)",
                    lineHeight: "1",
                    transition: "color 0.4s ease"
                  }}
                >
                  {service.number}
                </div>

                {/* İkon */}
                <div
                  className="service-icon"
                  style={{
                    color: "#D4A373",
                    marginBottom: "25px",
                    transition: "all 0.3s ease"
                  }}
                >
                  {service.icon}
                </div>

                {/* Başlık */}
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "600",
                    fontFamily: "'Roboto', system-ui, sans-serif",
                    color: "#0C1B33",
                    marginBottom: "15px",
                    transition: "color 0.4s ease",
                    position: "relative",
                    zIndex: 1
                  }}
                >
                  {service.title}
                </h3>

                {/* Açıklama */}
                <p
                  style={{
                    color: "#666",
                    lineHeight: "1.8",
                    fontSize: "15px",
                    fontFamily: "'Roboto', system-ui, sans-serif",
                    transition: "color 0.4s ease",
                    position: "relative",
                    zIndex: 1,
                    marginBottom: "20px"
                  }}
                >
                  {service.description}
                </p>

                {/* Alt çizgi */}
                <div style={{
                  width: "40px",
                  height: "3px",
                  background: "linear-gradient(90deg, #D4A373 0%, transparent 100%)",
                  borderRadius: "2px"
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section style={{ padding: "100px 40px", background: "white" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "60px",
              flexWrap: "wrap",
              gap: "20px"
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#D4A373",
                  fontWeight: "600",
                  fontFamily: "'Roboto', system-ui, sans-serif",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  marginBottom: "10px"
                }}
              >
                PORTFOLİO
              </div>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: "600",
                  fontFamily: "'Roboto', system-ui, sans-serif",
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
                  padding: "14px 30px",
                  border: "2px solid #0C1B33",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "'Roboto', system-ui, sans-serif",
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
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
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>

          {latestProjects.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: "#f8f9fa",
                borderRadius: "20px"
              }}
            >
              <p style={{ fontSize: "1.1rem", color: "#666" }}>Henüz proje eklenmemiş.</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: "35px"
              }}
            >
              {latestProjects.map((project: any, index: number) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                      background: "white",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(30px)",
                      transitionDelay: `${index * 0.1}s`
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-12px)";
                      e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        height: "280px",
                        overflow: "hidden",
                        background: "#f0f0f0"
                      }}
                    >
                      {project.mainImage && (
                        <>
                          <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL || ""}${project.mainImage.url}`}
                            alt={project.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              transition: "transform 0.5s ease"
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.transform = "scale(1.1)")
                            }
                            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                          />
                          <div
                            style={{
                              position: "absolute",
                              top: "20px",
                              right: "20px",
                              background: "rgba(212, 163, 115, 0.95)",
                              color: "white",
                              padding: "8px 16px",
                              borderRadius: "50px",
                              fontSize: "12px",
                              fontWeight: "600",
                              backdropFilter: "blur(10px)"
                            }}
                          >
                            YENİ
                          </div>
                        </>
                      )}
                    </div>

                    <div style={{ padding: "30px" }}>
                      <h3
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "600",
                          fontFamily: "'Roboto', system-ui, sans-serif",
                          color: "#0C1B33",
                          marginBottom: "15px",
                          lineHeight: "1.3"
                        }}
                      >
                        {project.title}
                      </h3>
                      <p
                        style={{
                          color: "#666",
                          lineHeight: "1.8",
                          marginBottom: "20px",
                          fontSize: "15px",
                          fontFamily: "'Roboto', system-ui, sans-serif"
                        }}
                      >
                        {project.description?.[0]?.children?.[0]?.text?.substring(0, 100) ||
                          "Proje detaylarını görmek için tıklayın"}
                        ...
                      </p>
                      <div
                        style={{
                          color: "#D4A373",
                          fontWeight: "600",
                          fontFamily: "'Roboto', system-ui, sans-serif",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "14px",
                          letterSpacing: "0.5px"
                        }}
                      >
                        Detayları Gör
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        style={{
          background: "linear-gradient(135deg, #0C1B33 0%, #1a3a5c 100%)",
          padding: "100px 40px",
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
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(212, 163, 115, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)"
          }}
        />

        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 2
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: "600",
              fontFamily: "'Roboto', system-ui, sans-serif",
              color: "white",
              marginBottom: "25px",
              lineHeight: "1.2"
            }}
          >
            Projeniz İçin Hemen{" "}
            <span style={{ color: "#D4A373" }}>Teklif Alın</span>
          </h2>
          <p
            style={{
              fontSize: "1.15rem",
              fontFamily: "'Roboto', system-ui, sans-serif",
              color: "rgba(255, 255, 255, 0.85)",
              marginBottom: "40px",
              maxWidth: "700px",
              margin: "0 auto 40px",
              lineHeight: "1.8"
            }}
          >
            Uzman ekibimiz, hayalinizdeki projeyi gerçeğe dönüştürmek için sizinle
            çalışmaya hazır. Ücretsiz keşif ve danışmanlık hizmeti.
          </p>
          <Link href="/contact" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "linear-gradient(135deg, #D4A373 0%, #c49363 100%)",
                color: "white",
                padding: "20px 50px",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: "'Roboto', system-ui, sans-serif",
                letterSpacing: "0.5px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 30px rgba(212, 163, 115, 0.4)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px) scale(1.05)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(212, 163, 115, 0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(212, 163, 115, 0.4)";
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
      `}</style>
    </div>
  );
}
