"use client";
import Link from "next/link";

export default function Footer() {
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
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "80px 40px 40px"
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
                Modern yaşam alanları, güvenilir yapılar ve estetik mimari çözümlerle
                hayallerinizi gerçeğe dönüştürüyoruz.
              </p>
            </div>
            
            {/* Social Links */}
            <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
              {["facebook", "instagram", "twitter", "linkedin"].map((social) => (
                <a
                  key={social}
                  href="#"
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
                    fontSize: "18px"
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
                  {social === "facebook" && "f"}
                  {social === "instagram" && "📷"}
                  {social === "twitter" && "🐦"}
                  {social === "linkedin" && "in"}
                </a>
              ))}
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
              Hızlı Erişim
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { href: "/", label: "Anasayfa" },
                { href: "/projects", label: "Projeler" },
                { href: "/about", label: "Hakkımızda" },
                { href: "/contact", label: "İletişim" }
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
                  → {link.label}
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
              Hizmetlerimiz
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {["İnşaat & Taahhüt", "Mimari Tasarım", "Kentsel Dönüşüm", "Proje Yönetimi"].map(
                (service) => (
                  <div
                    key={service}
                    style={{
                      color: "#b0b0b0",
                      fontSize: "14px"
                    }}
                  >
                    • {service}
                  </div>
                )
              )}
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
              İletişim
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ color: "#D4A373", fontSize: "18px" }}>📍</span>
                <div style={{ color: "#b0b0b0", fontSize: "14px", lineHeight: "1.6" }}>
                  Örnek Mahallesi, İnşaat Cad. No:123<br />Ankara, Türkiye
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ color: "#D4A373", fontSize: "18px" }}>📞</span>
                <a
                  href="tel:+905551234567"
                  style={{
                    color: "#b0b0b0",
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "color 0.3s ease"
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#D4A373")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#b0b0b0")}
                >
                  +90 555 123 45 67
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ color: "#D4A373", fontSize: "18px" }}>📧</span>
                <a
                  href="mailto:info@gulmetay.com"
                  style={{
                    color: "#b0b0b0",
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "color 0.3s ease"
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#D4A373")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#b0b0b0")}
                >
                  info@gulmetay.com
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
            © {new Date().getFullYear()} Gülmetay İnşaat. Tüm hakları saklıdır.
          </p>
          <div style={{ display: "flex", gap: "25px" }}>
            <a
              href="#"
              style={{
                color: "#888",
                textDecoration: "none",
                fontSize: "13px",
                transition: "color 0.3s ease"
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#D4A373")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#888")}
            >
              Gizlilik Politikası
            </a>
            <a
              href="#"
              style={{
                color: "#888",
                textDecoration: "none",
                fontSize: "13px",
                transition: "color 0.3s ease"
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#D4A373")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#888")}
            >
              Kullanım Koşulları
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
