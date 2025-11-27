"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.98)" : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.08)" : "0 2px 10px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        padding: scrolled ? "15px 0" : "20px 0"
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer"
            }}
          >
            <div
              style={{
                width: "45px",
                height: "45px",
                background: "linear-gradient(135deg, #0C1B33 0%, #1a3a5c 100%)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#D4A373",
                boxShadow: "0 4px 12px rgba(12, 27, 51, 0.2)",
                transition: "transform 0.3s ease"
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "rotate(-5deg) scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "rotate(0deg) scale(1)")}
            >
              G
            </div>
            <div>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#0C1B33",
                  letterSpacing: "-0.5px",
                  lineHeight: "1"
                }}
              >
                Gülmetay
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#D4A373",
                  fontWeight: "600",
                  letterSpacing: "1px",
                  textTransform: "uppercase"
                }}
              >
                İNŞAAT
              </div>
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            alignItems: "center"
          }}
          className="desktop-menu"
        >
          {[
            { href: "/", label: "Anasayfa" },
            { href: "/projects", label: "Projeler" },
            { href: "/about", label: "Hakkımızda" },
            { href: "/contact", label: "İletişim" }
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
              <div
                style={{
                  position: "relative",
                  color: isActive(item.href) ? "#0C1B33" : "#666",
                  fontWeight: isActive(item.href) ? "600" : "500",
                  fontSize: "15px",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                  padding: "8px 0"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#0C1B33";
                }}
                onMouseOut={(e) => {
                  if (!isActive(item.href)) e.currentTarget.style.color = "#666";
                }}
              >
                {item.label}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: isActive(item.href) ? "100%" : "0%",
                    height: "3px",
                    background: "linear-gradient(90deg, #D4A373 0%, #0C1B33 100%)",
                    borderRadius: "2px",
                    transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                  className="nav-underline"
                />
              </div>
            </Link>
          ))}

          {/* CTA Button */}
          <Link href="/contact" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "linear-gradient(135deg, #D4A373 0%, #c49363 100%)",
                color: "white",
                padding: "12px 28px",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(212, 163, 115, 0.3)",
                letterSpacing: "0.3px"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(212, 163, 115, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(212, 163, 115, 0.3)";
              }}
            >
              Teklif Al
            </button>
          </Link>
        </div>
      </div>

      {/* Add responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none;
          }
        }
        .nav-underline {
          transition: width 0.3s ease;
        }
        .desktop-menu a:hover .nav-underline {
          width: 100% !important;
        }
      `}</style>
    </nav>
  );
}
