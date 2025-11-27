"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

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
        const res = await fetch("http://localhost:1337/api/projects?populate=*&pagination[limit]=3&sort=createdAt:desc");
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
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #0C1B33 0%, #1a3a5c 50%, #0C1B33 100%)",
          overflow: "hidden"
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A373' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.3
          }}
        />

        {/* Animated Circles */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "10%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212, 163, 115, 0.15) 0%, transparent 70%)",
            animation: "float 6s ease-in-out infinite",
            filter: "blur(40px)"
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212, 163, 115, 0.1) 0%, transparent 70%)",
            animation: "float 8s ease-in-out infinite reverse",
            filter: "blur(40px)"
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 40px",
            width: "100%"
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          >
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(212, 163, 115, 0.15)",
                border: "1px solid rgba(212, 163, 115, 0.3)",
                borderRadius: "50px",
                padding: "10px 20px",
                marginBottom: "30px",
                backdropFilter: "blur(10px)"
              }}
            >
              <span style={{ fontSize: "20px" }}>🏗️</span>
              <span style={{ color: "#D4A373", fontSize: "14px", fontWeight: "600" }}>
                Güvenilir İnşaat Çözümleri
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: "800",
                color: "white",
                marginBottom: "25px",
                lineHeight: "1.1",
                letterSpacing: "-1px"
              }}
            >
              Hayalinizdeki Yaşam Alanları{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #D4A373 0%, #f4d6b3 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                Gerçek Oluyor
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.3rem)",
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "40px",
                lineHeight: "1.7",
                maxWidth: "650px"
              }}
            >
              Modern mimari anlayışı, kaliteli işçilik ve yılların deneyimiyle projelerinizi
              hayata geçiriyoruz. Her detayda mükemmellik için çalışıyoruz.
            </p>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <Link href="/projects" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "linear-gradient(135deg, #D4A373 0%, #c49363 100%)",
                    color: "white",
                    padding: "18px 40px",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 8px 24px rgba(212, 163, 115, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(212, 163, 115, 0.5)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(212, 163, 115, 0.4)";
                  }}
                >
                  Projelerimizi İnceleyin
                  <span style={{ fontSize: "20px" }}>→</span>
                </button>
              </Link>

              <Link href="/contact" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "transparent",
                    color: "white",
                    padding: "18px 40px",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(10px)"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Bizimle İletişime Geçin
                </button>
              </Link>
            </div>

            {/* Scroll Indicator */}
            <div
              style={{
                marginTop: "60px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "14px",
                animation: "float 2s ease-in-out infinite"
              }}
            >
              <span>Aşağı kaydırın</span>
              <span style={{ fontSize: "20px" }}>↓</span>
            </div>
          </div>
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
                  fontWeight: "800",
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
                  fontSize: "16px",
                  fontWeight: "500"
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
                fontSize: "14px",
                color: "#D4A373",
                fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "15px"
              }}
            >
              HİZMETLERİMİZ
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "700",
                color: "#0C1B33",
                marginBottom: "20px"
              }}
            >
              Neler Yapıyoruz?
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#666", maxWidth: "600px", margin: "0 auto" }}>
              Kapsamlı inşaat çözümlerimizle projelerinizi baştan sona yönetiyoruz
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px"
            }}
          >
            {[
              {
                icon: "🏗️",
                title: "İnşaat & Taahhüt",
                description: "Anahtar teslim projeler ve profesyonel inşaat hizmetleri",
                color: "#0C1B33"
              },
              {
                icon: "📐",
                title: "Mimari Tasarım",
                description: "Modern ve estetik mimari çizimler, proje danışmanlığı",
                color: "#D4A373"
              },
              {
                icon: "🏠",
                title: "Kentsel Dönüşüm",
                description: "Eski yapıları yenileyerek değer katıyoruz",
                color: "#0C1B33"
              },
              {
                icon: "⚙️",
                title: "Proje Yönetimi",
                description: "Baştan sona profesyonel proje takibi ve yönetimi",
                color: "#D4A373"
              }
            ].map((service, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  padding: "40px",
                  borderRadius: "20px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.12)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.06)";
                }}
              >
                <div
                  style={{
                    fontSize: "50px",
                    marginBottom: "20px",
                    display: "inline-block",
                    transition: "transform 0.3s ease"
                  }}
                >
                  {service.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: service.color,
                    marginBottom: "15px"
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    color: "#666",
                    lineHeight: "1.7",
                    fontSize: "15px"
                  }}
                >
                  {service.description}
                </p>
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
                  fontSize: "14px",
                  color: "#D4A373",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "10px"
                }}
              >
                PORTFOLİO
              </div>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: "700",
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
                  fontSize: "15px",
                  fontWeight: "600",
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
                <span>→</span>
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
                            src={`http://localhost:1337${project.mainImage.url}`}
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
                          fontWeight: "700",
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
                          lineHeight: "1.7",
                          marginBottom: "20px",
                          fontSize: "15px"
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
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "15px"
                        }}
                      >
                        Detayları Gör
                        <span style={{ transition: "transform 0.3s ease" }}>→</span>
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
              fontWeight: "800",
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
              fontSize: "1.2rem",
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: "40px",
              maxWidth: "700px",
              margin: "0 auto 40px"
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
                fontSize: "18px",
                fontWeight: "700",
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
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
