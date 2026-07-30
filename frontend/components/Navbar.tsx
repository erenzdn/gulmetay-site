"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("common.nav.home") },
    { href: "/hizmetlerimiz", label: t("common.nav.services") },
    { href: "/projects", label: t("common.nav.projects") },
    { href: "/about", label: t("common.nav.about") },
    { href: "/contact", label: t("common.nav.contact") }
  ];

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav style={{ 
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled 
          ? "rgba(255, 255, 255, 0.95)" 
          : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: scrolled 
          ? "0 4px 30px rgba(0, 0, 0, 0.1)" 
          : "0 1px 0 rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        borderBottom: scrolled ? "none" : "1px solid rgba(0, 0, 0, 0.05)"
      }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          padding: scrolled ? "8px 24px" : "14px 24px",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        }}>
          {/* Logo Alanı */}
          <Link href="/" style={{ 
            textDecoration: "none", 
            display: "flex", 
            alignItems: "center",
            transition: "transform 0.3s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <Image 
              src="/logo.svg" 
              alt="Gülmetay İnşaat Logo" 
              width={190}
              height={40}
              style={{ 
                objectFit: "contain",
                transition: "all 0.3s ease"
              }}
              priority
            />
          </Link>

          {/* Desktop Menü */}
          <div className="desktop-menu" style={{ 
            display: "flex", 
            alignItems: "center",
            gap: "8px"
          }}>
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                style={{ 
                  textDecoration: "none", 
                  color: isActive(link.href) ? "#0C1B33" : "#555",
                  fontSize: "15px",
                  fontWeight: isActive(link.href) ? "600" : "500",
                  fontFamily: "'Roboto', system-ui, sans-serif",
                  letterSpacing: "0.3px",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  position: "relative",
                  transition: "all 0.3s ease",
                  background: isActive(link.href) 
                    ? "linear-gradient(135deg, rgba(12, 27, 51, 0.08) 0%, rgba(212, 163, 115, 0.08) 100%)"
                    : "transparent"
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.href)) {
                    e.currentTarget.style.color = "#0C1B33";
                    e.currentTarget.style.background = "rgba(0, 0, 0, 0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.href)) {
                    e.currentTarget.style.color = "#555";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {link.label}
                {isActive(link.href) && (
                  <span style={{
                    position: "absolute",
                    bottom: "6px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "20px",
                    height: "3px",
                    background: "linear-gradient(135deg, #D4A373 0%, #c49363 100%)",
                    borderRadius: "2px"
                  }} />
                )}
              </Link>
            ))}

            {/* Language Switcher */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginLeft: "15px",
              marginRight: "5px",
              background: "rgba(12, 27, 51, 0.03)",
              padding: "4px 8px",
              borderRadius: "20px",
              border: "1px solid rgba(12, 27, 51, 0.05)"
            }}>
              <button
                onClick={() => setLocale("tr")}
                style={{
                  background: "transparent",
                  border: "none",
                  color: locale === "tr" ? "#0C1B33" : "#888",
                  fontWeight: locale === "tr" ? "700" : "500",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontFamily: "'Roboto', system-ui, sans-serif",
                  padding: "4px 8px",
                  borderRadius: "15px",
                  transition: "all 0.3s ease",
                  backgroundColor: locale === "tr" ? "rgba(212, 163, 115, 0.15)" : "transparent"
                }}
              >
                TR
              </button>
              <span style={{ color: "rgba(12, 27, 51, 0.15)", fontSize: "11px", userSelect: "none" }}>|</span>
              <button
                onClick={() => setLocale("en")}
                style={{
                  background: "transparent",
                  border: "none",
                  color: locale === "en" ? "#0C1B33" : "#888",
                  fontWeight: locale === "en" ? "700" : "500",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontFamily: "'Roboto', system-ui, sans-serif",
                  padding: "4px 8px",
                  borderRadius: "15px",
                  transition: "all 0.3s ease",
                  backgroundColor: locale === "en" ? "rgba(212, 163, 115, 0.15)" : "transparent"
                }}
              >
                EN
              </button>
            </div>

            {/* CTA Button */}
            <Link href="/contact" style={{ textDecoration: "none", marginLeft: "10px" }}>
              <button
                style={{
                  background: "linear-gradient(135deg, #0C1B33 0%, #1a3a5c 100%)",
                  color: "white",
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "'Roboto', system-ui, sans-serif",
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(12, 27, 51, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(12, 27, 51, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(12, 27, 51, 0.3)";
                }}
              >
                {t("common.nav.getQuote")}
                <ArrowRight size={16} strokeWidth={2.2} />
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "10px",
              borderRadius: "8px",
              transition: "background 0.2s ease"
            }}
            aria-label={locale === "tr" ? "Menü" : "Menu"}
          >
            <div style={{
              width: "24px",
              height: "18px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <span style={{
                display: "block",
                width: "100%",
                height: "2px",
                background: "#0C1B33",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                transform: mobileMenuOpen ? "rotate(45deg) translateY(8px)" : "none"
              }} />
              <span style={{
                display: "block",
                width: "100%",
                height: "2px",
                background: "#0C1B33",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                opacity: mobileMenuOpen ? 0 : 1
              }} />
              <span style={{
                display: "block",
                width: "100%",
                height: "2px",
                background: "#0C1B33",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                transform: mobileMenuOpen ? "rotate(-45deg) translateY(-8px)" : "none"
              }} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            animation: "fadeIn 0.3s ease"
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                textDecoration: "none",
                color: isActive(link.href) ? "#0C1B33" : "#555",
                fontSize: "24px",
                fontWeight: isActive(link.href) ? "700" : "500",
                padding: "15px 30px",
                borderRadius: "12px",
                background: isActive(link.href) 
                  ? "linear-gradient(135deg, rgba(12, 27, 51, 0.08) 0%, rgba(212, 163, 115, 0.08) 100%)"
                  : "transparent",
                animation: `slideIn 0.3s ease ${index * 0.05}s both`
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          <Link href="/contact" style={{ textDecoration: "none", marginTop: "20px" }} onClick={(e) => e.stopPropagation()}>
            <button
              style={{
                background: "linear-gradient(135deg, #0C1B33 0%, #1a3a5c 100%)",
                color: "white",
                padding: "16px 40px",
                border: "none",
                borderRadius: "12px",
                fontSize: "18px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(12, 27, 51, 0.3)"
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("common.nav.getQuote")}
            </button>
          </Link>

          {/* Mobile Language Switcher */}
          <div 
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "30px",
              background: "rgba(12, 27, 51, 0.03)",
              padding: "6px 12px",
              borderRadius: "30px",
              border: "1px solid rgba(12, 27, 51, 0.05)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setLocale("tr");
                setMobileMenuOpen(false);
              }}
              style={{
                background: "transparent",
                border: "none",
                color: locale === "tr" ? "#0C1B33" : "#888",
                fontWeight: locale === "tr" ? "700" : "500",
                fontSize: "16px",
                cursor: "pointer",
                padding: "6px 12px",
                borderRadius: "20px",
                transition: "all 0.3s ease",
                backgroundColor: locale === "tr" ? "rgba(212, 163, 115, 0.15)" : "transparent"
              }}
            >
              TR
            </button>
            <span style={{ color: "rgba(12, 27, 51, 0.15)", fontSize: "14px", userSelect: "none" }}>|</span>
            <button
              onClick={() => {
                setLocale("en");
                setMobileMenuOpen(false);
              }}
              style={{
                background: "transparent",
                border: "none",
                color: locale === "en" ? "#0C1B33" : "#888",
                fontWeight: locale === "en" ? "700" : "500",
                fontSize: "16px",
                cursor: "pointer",
                padding: "6px 12px",
                borderRadius: "20px",
                transition: "all 0.3s ease",
                backgroundColor: locale === "en" ? "rgba(212, 163, 115, 0.15)" : "transparent"
              }}
            >
              EN
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 900px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
