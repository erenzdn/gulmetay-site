"use client";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: Record<string, unknown>
      ) => string;
      reset: (widgetId: string) => void;
    };
  }
}

import { useState } from "react";
import Script from "next/script";
import {
  MapPin,
  Phone,
  Smartphone,
  Mail,
  Clock3,
  Globe,
  Camera,
  Send,
  BriefcaseBusiness,
  ExternalLink,
  CheckCircle,
  CircleX,
} from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function ContactClient() {
  const { t, locale } = useTranslation();

  const contactItems = [
    {
      icon: MapPin,
      title: t("contact.items.address"),
      content: t("contact.items.hours") === "Working Hours"
        ? "Bahçeşehir 2nd Stage District 12th Street\nCihan Doga Sitesi, Villa No: 8/A\nBasaksehir / Istanbul / Turkey"
        : "Bahçeşehir 2. Kısım Mah. 12. Cadde\nCihan Doğa Sitesi, Villa No: 8/A\nBaşakşehir / İstanbul / Türkiye",
      link: null
    },
    {
      icon: Phone,
      title: t("contact.items.phone"),
      content: "+90 212 418 09 09",
      link: "tel:+902124180909"
    },
    {
      icon: Smartphone,
      title: t("contact.items.gsm"),
      content: "+90 535 819 77 64",
      link: "tel:+905358197764"
    },
    {
      icon: Mail,
      title: t("contact.items.email"),
      content: "bilgi@gulmetay.com.tr",
      link: "mailto:bilgi@gulmetay.com.tr"
    },
    {
      icon: Clock3,
      title: t("contact.items.hours"),
      content: t("contact.items.hoursContent"),
      link: null
    }
  ];

  const socialItems = [
    { name: "Facebook", Icon: Globe },
    { name: "Instagram", Icon: Camera },
    { name: "Twitter", Icon: Send },
    { name: "LinkedIn", Icon: BriefcaseBusiness },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("");
  const [isVisible] = useState(true);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState("");
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string | null>(null);

  const renderTurnstile = () => {
    try {
      const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
      if (!siteKey) {
        // Prod'da teknik detayı kullanıcıya göstermeyelim.
        if (process.env.NODE_ENV !== "production") {
          setTurnstileError(t("contact.turnstile.errorMissingKey"));
        } else {
          setTurnstileError(t("contact.turnstile.errorUnavailable"));
        }
        return;
      }

      if (typeof window === "undefined") return;
      if (!window.turnstile) return;

      const container = document.getElementById("cf-turnstile");
      if (!container) return;

      // If already rendered, do nothing.
      if (turnstileWidgetId !== null) return;

      const widgetId = window.turnstile.render(container, {
        sitekey: siteKey,
        callback: (token: string) => {
          setTurnstileError("");
          setTurnstileToken(token || "");
        },
        "error-callback": () => {
          setTurnstileToken("");
          setTurnstileError(t("contact.turnstile.errorGeneral"));
        },
        "expired-callback": () => {
          setTurnstileToken("");
          setTurnstileError(t("contact.turnstile.errorExpired"));
        },
      });

      setTurnstileWidgetId(widgetId);
    } catch {
      setTurnstileToken("");
      setTurnstileError("Doğrulama yüklenemedi. Lütfen sayfayı yenileyin.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setTurnstileError("");

    if (!turnstileToken) {
      setStatus("error");
      setTurnstileError("Lütfen robot olmadığınızı doğrulayın.");
      setTimeout(() => setStatus(""), 5000);
      return;
    }
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || ""}/api/iletisims`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          turnstileToken,
          data: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message
          }
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
        setTurnstileToken("");
        if (typeof window !== "undefined" && window.turnstile && turnstileWidgetId !== null) {
          try {
            window.turnstile.reset(turnstileWidgetId);
          } catch {}
        }
        setTimeout(() => setStatus(""), 5000);
      } else {
        const errorData = await response.json();
        console.error("API Hatası:", errorData);
        setStatus("error");
        setTimeout(() => setStatus(""), 5000);
      }
    } catch (error) {
      console.error("Bağlantı hatası:", error);
      setStatus("error");
      setTimeout(() => setStatus(""), 5000);
    }
  };

  return (
    <div style={{ marginTop: "70px" }}>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={renderTurnstile}
      />
      {/* Hero Section */}
      <header style={{
        position: "relative",
        minHeight: "38vh",
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
          opacity: 0.25
        }} />

        <div className="container" style={{
          padding: "50px 0",
          position: "relative",
          zIndex: 2,
          textAlign: "center"
        }}>
          <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(25px)",
            transition: "all 0.8s ease"
          }}>
            <div style={{
              fontSize: "11px",
              color: "#D4A373",
              fontWeight: "700",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: "15px"
            }}>
              {t("contact.hero.eyebrow")}
            </div>
            <h1 style={{
              fontSize: "clamp(1.75rem, 4.5vw, 2.5rem)",
              color: "white",
              marginBottom: "15px",
              fontWeight: "600",
              letterSpacing: "-1px"
            }}>
              {t("contact.hero.title")}
            </h1>
            <p style={{
              fontSize: "1rem",
              color: "rgba(255, 255, 255, 0.75)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6"
            }}>
              {t("contact.hero.desc")}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section style={{ padding: "60px 0", background: "#f8f9fa" }}>
        <div className="container" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(clamp(280px, 100%, 500px), 1fr))",
          gap: "40px",
          alignItems: "start"
        }}>
          
          {/* Contact Info */}
          <div>
            <h2 style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#0C1B33",
              marginBottom: "20px"
            }}>
              {t("common.footer.contact")}
            </h2>
            
            {/* Contact Cards */}
            {contactItems.map((item, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  padding: "24px",
                  borderRadius: "16px",
                  marginBottom: "16px",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.04)",
                  transition: "all 0.3s ease",
                  border: "2px solid transparent",
                  opacity: 0,
                  animation: `fadeInLeft 0.6s ease forwards ${index * 0.1 + 0.3}s`
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateX(6px)";
                  e.currentTarget.style.borderColor = "#D4A373";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.08)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.04)";
                }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px"
                }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    background: "linear-gradient(135deg, #0C1B33 0%, #1a3a5c 100%)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <item.icon size={20} color="#D4A373" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "#0C1B33",
                      marginBottom: "6px"
                    }}>
                      {item.title}
                    </h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        style={{
                          color: "#D4A373",
                          textDecoration: "none",
                          fontSize: "14px",
                          lineHeight: "1.5",
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
                        fontSize: "14px",
                        lineHeight: "1.6",
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
              padding: "24px",
              borderRadius: "16px",
              marginTop: "24px"
            }}>
              <h3 style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "white",
                marginBottom: "16px"
              }}>
                {t("contact.social.title")}
              </h3>
              <div style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap"
              }}>
                {socialItems.map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "rgba(212, 163, 115, 0.15)",
                      border: "2px solid rgba(212, 163, 115, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#D4A373",
                      textDecoration: "none",
                      transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "#D4A373";
                      e.currentTarget.style.color = "#0C1B33";
                      e.currentTarget.style.transform = "translateY(-3px) rotate(5deg)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "rgba(212, 163, 115, 0.15)";
                      e.currentTarget.style.color = "#D4A373";
                      e.currentTarget.style.transform = "translateY(0) rotate(0deg)";
                    }}
                  >
                    <social.Icon size={16} strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            background: "white",
            padding: "32px 24px",
            borderRadius: "20px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.05)",
            border: "1px solid rgba(0, 0, 0, 0.05)"
          }}>
            <h2 style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#0C1B33",
              marginBottom: "10px"
            }}>
              {t("contact.form.title")}
            </h2>
            <p style={{
              color: "#666",
              marginBottom: "24px",
              fontSize: "14px",
              lineHeight: "1.5"
            }}>
              {locale === "tr" ? "Formu doldurun, en kısa sürede size dönüş yapalım." : "Fill out the form, and we will get back to you shortly."}
            </p>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div style={{ marginBottom: "18px" }}>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#333",
                  fontWeight: "600",
                  fontSize: "13px"
                }}>
                  {t("contact.form.name")} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t("contact.form.name")}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "10px",
                    fontSize: "14px",
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
              <div style={{ marginBottom: "18px" }}>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#333",
                  fontWeight: "600",
                  fontSize: "13px"
                }}>
                  {t("contact.form.email")} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t("contact.form.email") === "E-posta Adresiniz" ? "ornek@email.com" : "example@email.com"}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "10px",
                    fontSize: "14px",
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
              <div style={{ marginBottom: "18px" }}>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#333",
                  fontWeight: "600",
                  fontSize: "13px"
                }}>
                  {t("contact.form.phone")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+90 5XX XXX XX XX"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "10px",
                    fontSize: "14px",
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
              <div style={{ marginBottom: "18px" }}>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#333",
                  fontWeight: "600",
                  fontSize: "13px"
                }}>
                  {t("contact.form.subject")} *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder={t("contact.form.subject")}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "10px",
                    fontSize: "14px",
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
              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#333",
                  fontWeight: "600",
                  fontSize: "13px"
                }}>
                  {t("contact.form.message")} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder={t("contact.form.message") + "..."}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "10px",
                    fontSize: "14px",
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
                  padding: "13px 24px",
                  background: status === "sending" 
                    ? "#ccc" 
                    : "linear-gradient(135deg, #D4A373 0%, #c49363 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(212, 163, 115, 0.2)"
                }}
                onMouseOver={(e) => {
                  if (status !== "sending") {
                     e.currentTarget.style.transform = "translateY(-2px)";
                     e.currentTarget.style.boxShadow = "0 6px 18px rgba(212, 163, 115, 0.3)";
                  }
                }}
                onMouseOut={(e) => {
                  if (status !== "sending") {
                     e.currentTarget.style.transform = "translateY(0)";
                     e.currentTarget.style.boxShadow = "0 4px 12px rgba(212, 163, 115, 0.2)";
                  }
                }}
              >
                {status === "sending" ? t("contact.form.btnSending") : t("contact.form.btnSubmit")}
              </button>

              {/* Turnstile (managed: çoğu kullanıcıda ek tıklama gerekmez) */}
              <div
                id="turnstile-card"
                style={{
                  marginTop: "16px",
                  marginBottom: "8px",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  border: turnstileError ? "1px solid #f5c6cb" : "1px solid #ececec",
                  background: turnstileError ? "#fff8f8" : "#f9fafb",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "#64748b",
                    marginBottom: "6px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {locale === "tr" ? "Güvenlik (Cloudflare)" : "Security (Cloudflare)"}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#94a3b8",
                    lineHeight: "1.4",
                    marginBottom: "8px",
                  }}
                >
                  {locale === "tr" ? "Çoğu ziyaretçide ek bir işlem gerekmez." : "No additional action is required for most visitors."}
                </div>
                <div
                  id="cf-turnstile"
                  style={{
                    minHeight: "55px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: turnstileError ? "1px solid #f1aeb5" : "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "6px",
                    background: "white",
                  }}
                />
                {turnstileError && (
                  <div style={{ marginTop: "6px", color: "#b91c1c", fontSize: "11px", fontWeight: "600" }}>
                    {turnstileError}
                  </div>
                )}
              </div>

              {/* Status Message */}
              {status === "success" && (
                <div style={{
                  marginTop: "20px",
                  padding: "16px",
                  background: "linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)",
                  color: "#155724",
                  borderRadius: "10px",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                  animation: "fadeIn 0.5s ease",
                  border: "2px solid #b1dfbb"
                }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <CheckCircle size={16} />
                    {t("contact.status.successText")}
                  </span>
                </div>
              )}
              
              {status === "error" && (
                <div style={{
                  marginTop: "20px",
                  padding: "16px",
                  background: "linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)",
                  color: "#721c24",
                  borderRadius: "10px",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                  animation: "fadeIn 0.5s ease",
                  border: "2px solid #f5c6cb"
                }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <CircleX size={16} />
                    {locale === "tr" ? "Mesaj gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın." : "Failed to send message. Please try again or call us by phone."}
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ padding: "0 0 60px", background: "#f8f9fa" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h2 style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              fontFamily: "'Roboto', system-ui, sans-serif",
              color: "#0C1B33",
              marginBottom: "10px"
            }}>
              {locale === "tr" ? "Bizi Ziyaret Edin" : "Visit Us"}
            </h2>
            <p style={{
              color: "#666",
              fontFamily: "'Roboto', system-ui, sans-serif",
              fontSize: "14px"
            }}>
              {locale === "tr" ? "Ofisimize gelip projelerinizi yüz yüze görüşebilirsiniz" : "You are welcome to visit our office to discuss your projects in person."}
            </p>
          </div>
          
          <div style={{
            borderRadius: "16px",
            height: "420px",
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(12, 27, 51, 0.08)",
            border: "1px solid rgba(12, 27, 51, 0.08)",
          }}>
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=28.66%2C41.06%2C28.69%2C41.075&layer=mapnik&marker=41.0675%2C28.675"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
              }}
              loading="lazy"
              title={`${t("common.title")} — Başakşehir`}
            />
          </div>
          <p
            style={{
              textAlign: "center",
              marginTop: "18px",
              marginBottom: 0,
              fontSize: "14px",
              color: "#666",
              fontFamily: "'Roboto', system-ui, sans-serif",
            }}
          >
            <a
              href="https://www.openstreetmap.org/?mlat=41.0675&mlon=28.675#map=17/41.0675/28.675"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#0C1B33",
                textDecoration: "none",
                fontWeight: "600",
                borderBottom: "1px solid rgba(212, 163, 115, 0.5)",
                paddingBottom: "2px",
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#D4A373";
                e.currentTarget.style.borderBottomColor = "#D4A373";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "#0C1B33";
                e.currentTarget.style.borderBottomColor = "rgba(212, 163, 115, 0.5)";
              }}
            >
              {locale === "tr" ? "Haritada aç ve yol tarifi al" : "Open in map and get directions"}
              <ExternalLink size={15} aria-hidden />
            </a>
          </p>
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

        @media (max-width: 576px) {
          #turnstile-card {
            padding: 12px !important;
            margin-bottom: 18px !important;
          }

          #turnstile-card > div:first-child {
            font-size: 12px !important;
            margin-bottom: 8px !important;
          }

          #turnstile-card > div:nth-child(2) {
            font-size: 12px !important;
            margin-bottom: 10px !important;
          }

          #cf-turnstile {
            min-height: 64px !important;
            padding: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
