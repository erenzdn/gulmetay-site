"use client";
import { useState, useEffect } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    
    setTimeout(() => {
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
      setTimeout(() => setStatus(""), 5000);
    }, 1500);
  };

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
              İLETİŞİM
            </div>
            <h1 style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "white",
              marginBottom: "25px",
              fontWeight: "800",
              letterSpacing: "-1px"
            }}>
              Bizimle İletişime Geçin
            </h1>
            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.7"
            }}>
              Projeleriniz için bizimle iletişime geçin. Size en kısa sürede dönüş yapalım.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: "100px 40px", background: "#f8f9fa" }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "60px",
          alignItems: "start"
        }}>
          
          {/* Contact Info */}
          <div>
            <h2 style={{
              fontSize: "2.2rem",
              fontWeight: "700",
              color: "#0C1B33",
              marginBottom: "30px"
            }}>
              İletişim Bilgilerimiz
            </h2>
            
            {/* Contact Cards */}
            {[
              {
                icon: "📍",
                title: "Adres",
                content: "Bahçeşehir 2. Kısım Mah. 12. Cadde\nCihan Doğa Sitesi, Villa No: 8/A\nBaşakşehir / İstanbul / Türkiye",
                link: null
              },
              {
                icon: "📞",
                title: "Telefon",
                content: "+90 212 418 09 09",
                link: "tel:+902124180909"
              },
              {
                icon: "📱",
                title: "GSM",
                content: "+90 535 819 77 64",
                link: "tel:+905358197764"
              },
              {
                icon: "📧",
                title: "E-posta",
                content: "bilgi@gulmetay.com.tr",
                link: "mailto:bilgi@gulmetay.com.tr"
              },
              {
                icon: "🕒",
                title: "Çalışma Saatleri",
                content: "Pazartesi - Cuma: 09:00 - 18:00\nCumartesi: 09:00 - 14:00\nPazar: Kapalı",
                link: null
              }
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  padding: "30px",
                  borderRadius: "20px",
                  marginBottom: "20px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
                  transition: "all 0.3s ease",
                  border: "2px solid transparent",
                  opacity: 0,
                  animation: `fadeInLeft 0.6s ease forwards ${index * 0.1 + 0.3}s`
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateX(10px)";
                  e.currentTarget.style.borderColor = "#D4A373";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.06)";
                }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px"
                }}>
                  <div style={{
                    fontSize: "35px",
                    width: "60px",
                    height: "60px",
                    background: "linear-gradient(135deg, #0C1B33 0%, #1a3a5c 100%)",
                    borderRadius: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: "1.1rem",
                      fontWeight: "700",
                      color: "#0C1B33",
                      marginBottom: "10px"
                    }}>
                      {item.title}
                    </h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        style={{
                          color: "#D4A373",
                          textDecoration: "none",
                          fontSize: "15px",
                          lineHeight: "1.6",
                          fontWeight: "500",
                          transition: "color 0.3s ease"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = "#c49363"}
                        onMouseOut={(e) => e.currentTarget.style.color = "#D4A373"}
                      >
                        {item.content}
                      </a>
                    ) : (
                      <div style={{
                        color: "#666",
                        fontSize: "15px",
                        lineHeight: "1.7",
                        whiteSpace: "pre-line"
                      }}>
                        {item.content}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Social Media */}
            <div style={{
              background: "linear-gradient(135deg, #0C1B33 0%, #1a3a5c 100%)",
              padding: "35px",
              borderRadius: "20px",
              marginTop: "30px"
            }}>
              <h3 style={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: "white",
                marginBottom: "20px"
              }}>
                Bizi Takip Edin
              </h3>
              <div style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap"
              }}>
                {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "12px",
                      background: "rgba(212, 163, 115, 0.2)",
                      border: "2px solid rgba(212, 163, 115, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#D4A373",
                      textDecoration: "none",
                      fontSize: "20px",
                      fontWeight: "bold",
                      transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "#D4A373";
                      e.currentTarget.style.color = "#0C1B33";
                      e.currentTarget.style.transform = "translateY(-5px) rotate(5deg)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "rgba(212, 163, 115, 0.2)";
                      e.currentTarget.style.color = "#D4A373";
                      e.currentTarget.style.transform = "translateY(0) rotate(0deg)";
                    }}
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            background: "white",
            padding: "50px",
            borderRadius: "25px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(0, 0, 0, 0.05)"
          }}>
            <h2 style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#0C1B33",
              marginBottom: "15px"
            }}>
              Mesaj Gönderin
            </h2>
            <p style={{
              color: "#666",
              marginBottom: "35px",
              lineHeight: "1.6"
            }}>
              Formu doldurun, en kısa sürede size dönüş yapalım.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div style={{ marginBottom: "25px" }}>
                <label style={{
                  display: "block",
                  marginBottom: "10px",
                  color: "#333",
                  fontWeight: "600",
                  fontSize: "14px"
                }}>
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Adınız ve soyadınız"
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "12px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    fontFamily: "inherit"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#D4A373";
                    e.target.style.boxShadow = "0 0 0 4px rgba(212, 163, 115, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e0e0e0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "25px" }}>
                <label style={{
                  display: "block",
                  marginBottom: "10px",
                  color: "#333",
                  fontWeight: "600",
                  fontSize: "14px"
                }}>
                  E-posta *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="ornek@email.com"
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "12px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    fontFamily: "inherit"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#D4A373";
                    e.target.style.boxShadow = "0 0 0 4px rgba(212, 163, 115, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e0e0e0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Phone */}
              <div style={{ marginBottom: "25px" }}>
                <label style={{
                  display: "block",
                  marginBottom: "10px",
                  color: "#333",
                  fontWeight: "600",
                  fontSize: "14px"
                }}>
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+90 5XX XXX XX XX"
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "12px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    fontFamily: "inherit"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#D4A373";
                    e.target.style.boxShadow = "0 0 0 4px rgba(212, 163, 115, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e0e0e0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Subject */}
              <div style={{ marginBottom: "25px" }}>
                <label style={{
                  display: "block",
                  marginBottom: "10px",
                  color: "#333",
                  fontWeight: "600",
                  fontSize: "14px"
                }}>
                  Konu *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Mesajınızın konusu"
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "12px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    fontFamily: "inherit"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#D4A373";
                    e.target.style.boxShadow = "0 0 0 4px rgba(212, 163, 115, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e0e0e0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: "30px" }}>
                <label style={{
                  display: "block",
                  marginBottom: "10px",
                  color: "#333",
                  fontWeight: "600",
                  fontSize: "14px"
                }}>
                  Mesajınız *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Mesajınızı buraya yazın..."
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "12px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    resize: "vertical",
                    boxSizing: "border-box",
                    fontFamily: "inherit"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#D4A373";
                    e.target.style.boxShadow = "0 0 0 4px rgba(212, 163, 115, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e0e0e0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  width: "100%",
                  padding: "18px",
                  background: status === "sending" 
                    ? "#ccc" 
                    : "linear-gradient(135deg, #D4A373 0%, #c49363 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 6px 20px rgba(212, 163, 115, 0.3)"
                }}
                onMouseOver={(e) => {
                  if (status !== "sending") {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(212, 163, 115, 0.4)";
                  }
                }}
                onMouseOut={(e) => {
                  if (status !== "sending") {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(212, 163, 115, 0.3)";
                  }
                }}
              >
                {status === "sending" ? "Gönderiliyor..." : "Mesajı Gönder"}
              </button>

              {/* Status Message */}
              {status === "success" && (
                <div style={{
                  marginTop: "25px",
                  padding: "20px",
                  background: "linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)",
                  color: "#155724",
                  borderRadius: "12px",
                  textAlign: "center",
                  fontSize: "15px",
                  fontWeight: "600",
                  animation: "fadeIn 0.5s ease",
                  border: "2px solid #b1dfbb"
                }}>
                  ✓ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ padding: "0 40px 100px", background: "#f8f9fa" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{
              fontSize: "2rem",
              fontWeight: "600",
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#0C1B33",
              marginBottom: "15px"
            }}>
              Bizi Ziyaret Edin
            </h2>
            <p style={{
              color: "#666",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem"
            }}>
              Ofisimize gelip projelerinizi yüz yüze görüşebilirsiniz
            </p>
          </div>
          
          <div style={{
            borderRadius: "25px",
            height: "450px",
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            position: "relative",
            border: "4px solid white"
          }}>
            {/* OpenStreetMap - Başakşehir Bahçeşehir 2. Kısım konumu */}
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=28.66%2C41.06%2C28.69%2C41.075&layer=mapnik&marker=41.0675%2C28.675"
              style={{
                width: "100%",
                height: "100%",
                border: "none"
              }}
              loading="lazy"
              title="Gülmetay İnşaat Konum - Başakşehir"
            />
            
            {/* Konum Kartı Overlay */}
            <div style={{
              position: "absolute",
              bottom: "30px",
              left: "30px",
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(10px)",
              padding: "25px 30px",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
              maxWidth: "350px",
              border: "1px solid rgba(255, 255, 255, 0.5)"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, #D4A373 0%, #c49363 100%)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#0C1B33",
                  margin: 0
                }}>
                  Gülmetay İnşaat
                </h3>
              </div>
              <p style={{
                color: "#666",
                fontSize: "14px",
                lineHeight: "1.7",
                fontFamily: "'DM Sans', sans-serif",
                margin: "0 0 15px 0"
              }}>
                Bahçeşehir 2. Kısım Mah. 12. Cadde<br />
                Cihan Doğa Sitesi, Villa No: 8/A<br />
                Başakşehir / İstanbul
              </p>
              <a
                href="https://www.openstreetmap.org/?mlat=41.0675&mlon=28.675#map=17/41.0675/28.675"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#D4A373",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "color 0.3s ease"
                }}
                onMouseOver={(e) => e.currentTarget.style.color = "#c49363"}
                onMouseOut={(e) => e.currentTarget.style.color = "#D4A373"}
              >
                Yol Tarifi Al
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @media (max-width: 992px) {
          section > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
