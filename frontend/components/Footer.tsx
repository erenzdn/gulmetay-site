"use client";
import Link from "next/link";
import {
  Globe,
  Camera,
  Send,
  BriefcaseBusiness,
  ArrowRight,
  CircleDot,
  MapPin,
  Phone,
  Smartphone,
  Mail,
} from "lucide-react";
import { SERVICES } from "@/lib/services";
import { useTranslation } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    { name: "facebook", icon: Globe, href: "https://www.facebook.com" },
    { name: "instagram", icon: Camera, href: "https://www.instagram.com" },
    { name: "twitter", icon: Send, href: "https://twitter.com" },
    { name: "linkedin", icon: BriefcaseBusiness, href: "https://www.linkedin.com" },
  ];

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0C1B33 0%, #060f1a 100%)",
        color: "white",
        marginTop: "100px"
      }}
    >
      {/* Main Footer Content */}
      <div
        className="container"
        style={{
          paddingTop: "80px",
          paddingBottom: "40px"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "50px",
            marginBottom: "50px"
          }}
        >
          {/* Company Info */}
          <div>
            <div style={{ marginBottom: "25px" }}>
              <div
                style={{
                  fontSize: "26px",
                  fontWeight: "700",
                  color: "#D4A373",
                  marginBottom: "8px",
                  letterSpacing: "-0.5px"
                }}
              >
                Gülmetay İnşaat
              </div>
              <p
                style={{
                  color: "#b0b0b0",
                  lineHeight: "1.7",
                  fontSize: "14px"
                }}
              >
                {t("common.footer.desc")}
              </p>
            </div>
            
            {/* Social Links */}
            <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
              {socialLinks.map((social) => {
                const SocialIcon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Gülmetay İnşaat ${social.name} hesabı`}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      background: "rgba(212, 163, 115, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#D4A373",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "#D4A373";
                      e.currentTarget.style.color = "#0C1B33";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "rgba(212, 163, 115, 0.1)";
                      e.currentTarget.style.color = "#D4A373";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <SocialIcon size={18} strokeWidth={2} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
                color: "white"
              }}
            >
              {t("common.footer.quickLinks")}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { href: "/", label: t("common.nav.home") },
                { href: "/hizmetlerimiz", label: t("common.nav.services") },
                { href: "/projects", label: t("common.nav.projects") },
                { href: "/about", label: t("common.nav.about") },
                { href: "/contact", label: t("common.nav.contact") }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: "#b0b0b0",
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "all 0.3s ease",
                    display: "inline-block",
                    width: "fit-content"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#D4A373";
                    e.currentTarget.style.paddingLeft = "5px";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "#b0b0b0";
                    e.currentTarget.style.paddingLeft = "0";
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <ArrowRight size={14} />
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
                color: "white"
              }}
            >
              {t("common.footer.services")}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/hizmetlerimiz/${service.slug}`}
                    style={{
                      color: "#b0b0b0",
                      fontSize: "14px",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      display: "inline-block",
                      width: "fit-content"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#D4A373";
                      e.currentTarget.style.paddingLeft = "5px";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "#b0b0b0";
                      e.currentTarget.style.paddingLeft = "0";
                    }}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                      <CircleDot size={12} />
                      {t(`services.items.${service.slug}.title`)}
                    </span>
                  </Link>
                ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
                color: "white"
              }}
            >
              {t("common.footer.contact")}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <MapPin color="#D4A373" size={18} />
                <div style={{ color: "#b0b0b0", fontSize: "14px", lineHeight: "1.6" }}>
                  {t("contact.items.hours") === "Working Hours" ? (
                    <>
                      Bahçeşehir 2nd Stage Dist. 12th St.<br />
                      Cihan Doga Sitesi, Villa No: 8/A<br />
                      Basaksehir / Istanbul / Turkey
                    </>
                  ) : (
                    <>
                      Bahçeşehir 2. Kısım Mah. 12. Cadde<br />
                      Cihan Doğa Sitesi, Villa No: 8/A<br />
                      Başakşehir / İstanbul / Türkiye
                    </>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Phone color="#D4A373" size={18} />
                <a
                  href="tel:+902124180909"
                  style={{
                    color: "#b0b0b0",
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "color 0.3s ease"
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#D4A373")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#b0b0b0")}
                >
                  +90 212 418 09 09
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Smartphone color="#D4A373" size={18} />
                <a
                  href="tel:+905358197764"
                  style={{
                    color: "#b0b0b0",
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "color 0.3s ease"
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#D4A373")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#b0b0b0")}
                >
                  +90 535 819 77 64
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Mail color="#D4A373" size={18} />
                <a
                  href="mailto:bilgi@gulmetay.com.tr"
                  style={{
                    color: "#b0b0b0",
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "color 0.3s ease"
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#D4A373")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#b0b0b0")}
                >
                  bilgi@gulmetay.com.tr
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(212, 163, 115, 0.2)",
            paddingTop: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px"
          }}
        >
          <p style={{ color: "#888", fontSize: "14px", margin: 0 }}>
            {t("common.footer.allRightsReserved", { year: new Date().getFullYear() })}
          </p>
          <div style={{ display: "flex", gap: "25px" }}>
            <Link
              href="/privacy-policy"
              style={{
                color: "#888",
                textDecoration: "none",
                fontSize: "13px",
                transition: "color 0.3s ease"
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#D4A373")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#888")}
            >
              {t("common.footer.privacyPolicy")}
            </Link>
            <Link
              href="/terms-of-use"
              style={{
                color: "#888",
                textDecoration: "none",
                fontSize: "13px",
                transition: "color 0.3s ease"
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#D4A373")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#888")}
            >
              {t("common.footer.termsOfUse")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
