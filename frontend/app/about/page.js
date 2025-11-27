"use client";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div style={{ marginTop: "80px" }}>
      {/* Hero Section */}
      <section style={{
        position: "relative",
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #0C1B33 0%, #1a3a5c 100%)",
        overflow: "hidden"
      }}>
        {/* Background Pattern */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A373' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.3
        }} />

        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "80px 40px",
          position: "relative",
          zIndex: 2,
          textAlign: "center"
        }}>
          <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease"
          }}>
            <div style={{
              fontSize: "14px",
              color: "#D4A373",
              fontWeight: "700",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "20px"
            }}>
              HAKKIMIZDA
            </div>
            <h1 style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "white",
              marginBottom: "25px",
              fontWeight: "800",
              letterSpacing: "-1px"
            }}>
              Biz Kimiz?
            </h1>
            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.7"
            }}>
              Gülmetay İnşaat olarak, yılların deneyimi ve modern yaklaşımımızla
              hayalinizdeki yaşam alanlarını gerçeğe dönüştürüyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        background: "white",
        padding: "80px 40px",
        boxShadow: "0 -10px 40px rgba(0, 0, 0, 0.05)"
      }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "50px",
          textAlign: "center"
        }}>
          {[
            { icon: "🏗️", value: "15+", label: "Yıl Tecrübe" },
            { icon: "📊", value: "150+", label: "Tamamlanan Proje" },
            { icon: "😊", value: "500+", label: "Mutlu Müşteri" },
            { icon: "⭐", value: "%100", label: "Müşteri Memnuniyeti" }
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${index * 0.1 + 0.3}s`
              }}
            >
              <div style={{ fontSize: "50px", marginBottom: "15px" }}>
                {stat.icon}
              </div>
              <div style={{
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                fontWeight: "800",
                background: "linear-gradient(135deg, #0C1B33 0%, #D4A373 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "10px"
              }}>
                {stat.value}
              </div>
              <div style={{
                color: "#666",
                fontSize: "16px",
                fontWeight: "600"
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section style={{
        background: "linear-gradient(180deg, white 0%, #f8f9fa 100%)",
        padding: "100px 40px"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center"
        }}>
          {/* Image Side */}
          <div style={{
            position: "relative",
            height: "500px",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)"
          }}>
            <div style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #0C1B33 0%, #D4A373 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "80px"
            }}>
              🏗️
            </div>
          </div>

          {/* Content Side */}
          <div>
            <div style={{
              fontSize: "14px",
              color: "#D4A373",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "15px"
            }}>
              HİKAYEMİZ
            </div>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "700",
              color: "#0C1B33",
              marginBottom: "25px",
              lineHeight: "1.2"
            }}>
              Kaliteli İnşaatın Adresi
            </h2>
            <p style={{
              color: "#666",
              lineHeight: "1.9",
              marginBottom: "20px",
              fontSize: "1.05rem"
            }}>
              Gülmetay İnşaat, inşaat sektöründeki derin bilgi birikimi ve
              tecrübesiyle, kaliteli ve güvenilir yapılar ortaya koymak amacıyla kurulmuştur.
            </p>
            <p style={{
              color: "#666",
              lineHeight: "1.9",
              marginBottom: "20px",
              fontSize: "1.05rem"
            }}>
              Modern mimari anlayışı, çevre dostu yapı teknikleri ve müşteri
              memnuniyetini ön planda tutan yaklaşımımızla sektörde fark yaratıyoruz.
            </p>
            <p style={{
              color: "#666",
              lineHeight: "1.9",
              fontSize: "1.05rem"
            }}>
              Her projede kalite, estetik ve fonksiyonelliği bir araya getirerek,
              uzun ömürlü ve değerli yaşam alanları inşa ediyoruz.
            </p>

            {/* Features */}
            <div style={{
              marginTop: "35px",
              display: "flex",
              flexDirection: "column",
              gap: "15px"
            }}>
              {[
                "ISO 9001 Kalite Belgeli",
                "Deneyimli Mühendis Kadrosu",
                "Modern Teknoloji ve Ekipman",
                "Çevre Dostu Yapı Malzemeleri"
              ].map((feature, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: "#0C1B33",
                    fontSize: "15px",
                    fontWeight: "500"
                  }}
                >
                  <div style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "#D4A373",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "bold"
                  }}>
                    ✓
                  </div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{
        background: "white",
        padding: "100px 40px"
      }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "70px" }}>
            <div style={{
              fontSize: "14px",
              color: "#D4A373",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "15px"
            }}>
              DEĞERLERİMİZ
            </div>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "700",
              color: "#0C1B33",
              marginBottom: "20px"
            }}>
              Nelere İnanıyoruz?
            </h2>
            <p style={{
              fontSize: "1.1rem",
              color: "#666",
              maxWidth: "700px",
              margin: "0 auto"
            }}>
              İşimizi şekillendiren ve bizi farklı kılan temel değerlerimiz
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "35px"
          }}>
            {[
              {
                icon: "🎯",
                title: "Kalite",
                description: "Her projede en yüksek kalite standartlarını uyguluyoruz. Detaylara verdiğimiz önem, işimizin ayrılmaz bir parçasıdır."
              },
              {
                icon: "🤝",
                title: "Güven",
                description: "Müşterilerimizle uzun vadeli, güvenilir ilişkiler kuruyoruz. Şeffaf iletişim ve dürüstlük prensibimizdir."
              },
              {
                icon: "💡",
                title: "Yenilikçilik",
                description: "Modern teknolojiler ve yenilikçi çözümlerle fark yaratıyoruz. Sektördeki gelişmeleri yakından takip ediyoruz."
              },
              {
                icon: "🌱",
                title: "Sürdürülebilirlik",
                description: "Çevre dostu malzemeler ve enerji verimli yapılar inşa ediyoruz. Geleceğe karşı sorumluluğumuzun bilincindeyiz."
              },
              {
                icon: "⚡",
                title: "Hız ve Etkinlik",
                description: "Zamanında ve bütçe dahilinde proje teslimi için çalışıyoruz. Verimlilik odaklı yaklaşımımızla fark yaratıyoruz."
              },
              {
                icon: "🏆",
                title: "Mükemmellik",
                description: "Her projede mükemmellik arayışımız devam ediyor. Sürekli gelişim ve iyileştirme felsefemizdir."
              }
            ].map((value, index) => (
              <div
                key={index}
                style={{
                  background: "#f8f9fa",
                  padding: "40px",
                  borderRadius: "20px",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  border: "2px solid transparent",
                  opacity: 0,
                  animation: `fadeInUp 0.6s ease forwards ${index * 0.1}s`
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.borderColor = "#D4A373";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.12)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "#f8f9fa";
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  fontSize: "50px",
                  marginBottom: "20px"
                }}>
                  {value.icon}
                </div>
                <h3 style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#0C1B33",
                  marginBottom: "15px"
                }}>
                  {value.title}
                </h3>
                <p style={{
                  color: "#666",
                  lineHeight: "1.7",
                  fontSize: "15px"
                }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{
        background: "linear-gradient(135deg, #0C1B33 0%, #1a3a5c 100%)",
        padding: "100px 40px",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Decorative Circle */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(212, 163, 115, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)"
        }} />

        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 2
        }}>
          <div style={{
            fontSize: "14px",
            color: "#D4A373",
            fontWeight: "700",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "15px"
          }}>
            EKİBİMİZ
          </div>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: "700",
            color: "white",
            marginBottom: "25px"
          }}>
            Uzman Kadromuz
          </h2>
          <p style={{
            fontSize: "1.1rem",
            color: "rgba(255, 255, 255, 0.8)",
            maxWidth: "700px",
            margin: "0 auto 60px",
            lineHeight: "1.7"
          }}>
            Deneyimli mühendisler, mimarlar ve teknik ekibimizle projelerinizi
            en iyi şekilde hayata geçiriyoruz.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            marginTop: "50px"
          }}>
            {[
              { icon: "👷", title: "Mühendisler", count: "15+" },
              { icon: "📐", title: "Mimarlar", count: "8+" },
              { icon: "⚙️", title: "Teknik Ekip", count: "30+" },
              { icon: "💼", title: "Yönetim", count: "5+" }
            ].map((team, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  padding: "40px 20px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(212, 163, 115, 0.2)";
                  e.currentTarget.style.transform = "translateY(-10px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: "60px", marginBottom: "15px" }}>
                  {team.icon}
                </div>
                <div style={{
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  color: "#D4A373",
                  marginBottom: "10px"
                }}>
                  {team.count}
                </div>
                <div style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "16px",
                  fontWeight: "600"
                }}>
                  {team.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: "white",
        padding: "100px 40px",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: "700",
            color: "#0C1B33",
            marginBottom: "25px"
          }}>
            Birlikte Çalışalım
          </h2>
          <p style={{
            fontSize: "1.1rem",
            color: "#666",
            marginBottom: "40px",
            lineHeight: "1.7"
          }}>
            Hayalinizdeki projeyi gerçeğe dönüştürmek için bizimle iletişime geçin.
            Ücretsiz keşif ve danışmanlık hizmeti sunuyoruz.
          </p>
          <a href="/contact" style={{ textDecoration: "none" }}>
            <button style={{
              background: "linear-gradient(135deg, #D4A373 0%, #c49363 100%)",
              color: "white",
              padding: "18px 45px",
              border: "none",
              borderRadius: "12px",
              fontSize: "17px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 24px rgba(212, 163, 115, 0.4)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(212, 163, 115, 0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(212, 163, 115, 0.4)";
            }}>
              İletişime Geçin
            </button>
          </a>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          section > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
