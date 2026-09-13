"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  HardHat,
  PenTool,
  Building,
  BriefcaseBusiness,
  ChevronDown,
  Phone,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ServiceItem, ServiceIconName } from "@/lib/services";
import { useTranslation } from "@/context/LanguageContext";
import "./hizmet-detail.css";

const ICONS: Record<ServiceIconName, LucideIcon> = {
  HardHat,
  PenTool,
  Building,
  BriefcaseBusiness,
};

interface Props {
  service: ServiceItem;
  allServices: ServiceItem[];
}

export default function HizmetDetailClient({ service, allServices }: Props) {
  const { t, locale } = useTranslation();
  const Icon = ICONS[service.iconName];
  const otherServices = allServices.filter((s) => s.slug !== service.slug);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getSpecs = () => {
    switch (service.slug) {
      case "insaat-taahhut":
        return {
          category: t("contact.items.hours") === "Working Hours" ? "Planning & Execution" : "Planlama & Uygulama",
          model: t("contact.items.hours") === "Working Hours" ? "Turnkey Construction" : "Anahtar Teslim İnşaat",
          standard: t("contact.items.hours") === "Working Hours" ? "Seismic Code Compliance" : "Deprem Yönetmeliği Uyumu"
        };
      case "statik-proje":
        return {
          category: t("contact.items.hours") === "Working Hours" ? "Structural Calculation & Analysis" : "Statik Hesap & Analiz",
          model: t("contact.items.hours") === "Working Hours" ? "Reinforced Concrete & Steel" : "Betonarme & Çelik Proje",
          standard: t("contact.items.hours") === "Working Hours" ? "TBDY 2018 & Eurocode Compliance" : "TBDY 2018 & Eurocode Uyumu"
        };
      case "kentsel-donusum":
        return {
          category: t("contact.items.hours") === "Working Hours" ? "Urban Redevelopment" : "Kentsel Yenileme",
          model: t("contact.items.hours") === "Working Hours" ? "Land Share & Consulting" : "Kat Karşılığı & Danışmanlık",
          standard: t("contact.items.hours") === "Working Hours" ? "Act No. 6306 Urban Renewal" : "6306 Sayılı Kentsel Dönüşüm"
        };
      case "proje-yonetimi":
      default:
        return {
          category: t("contact.items.hours") === "Working Hours" ? "Management & Inspection" : "Yönetim & Denetim",
          model: t("contact.items.hours") === "Working Hours" ? "Cost & Schedule Planning" : "Maliyet & Zaman Planlaması",
          standard: t("contact.items.hours") === "Working Hours" ? "Zero Error & Full Transparency" : "Sıfır Hata & Tam Şeffaflık"
        };
    }
  };
  const specs = getSpecs();

  const renderHeroIllustration = () => {
    switch (service.slug) {
      case "insaat-taahhut":
        return (
          <svg className="hizmet-detail-hero__svg" viewBox="0 0 400 400" fill="none">
            {/* Ground line */}
            <line x1="40" y1="340" x2="360" y2="340" stroke="rgba(212, 163, 115, 0.3)" strokeWidth="2" />
            {/* Grid structure background */}
            <rect x="80" y="100" width="240" height="240" stroke="rgba(212, 163, 115, 0.08)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="160" y1="100" x2="160" y2="340" stroke="rgba(212, 163, 115, 0.08)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="240" y1="100" x2="240" y2="340" stroke="rgba(212, 163, 115, 0.08)" strokeWidth="1" strokeDasharray="4 4" />
            
            {/* Concrete columns */}
            <rect x="95" y="140" width="20" height="200" fill="none" stroke="rgba(212, 163, 115, 0.4)" strokeWidth="1.5" />
            <line x1="95" y1="140" x2="115" y2="340" stroke="rgba(212, 163, 115, 0.15)" strokeWidth="1" />
            
            <rect x="190" y="80" width="20" height="260" fill="none" stroke="var(--primary-gold)" strokeWidth="2" />
            <line x1="190" y1="80" x2="210" y2="340" stroke="rgba(212, 163, 115, 0.25)" strokeWidth="1" />
            
            <rect x="285" y="140" width="20" height="200" fill="none" stroke="rgba(212, 163, 115, 0.4)" strokeWidth="1.5" />
            <line x1="285" y1="140" x2="305" y2="340" stroke="rgba(212, 163, 115, 0.15)" strokeWidth="1" />
            
            {/* Horizontal Beams */}
            <rect x="60" y="220" width="280" height="15" fill="none" stroke="rgba(212, 163, 115, 0.3)" strokeWidth="1.5" />
            <rect x="60" y="140" width="280" height="15" fill="none" stroke="rgba(212, 163, 115, 0.3)" strokeWidth="1.5" />
            
            {/* Scaffold details */}
            <line x1="80" y1="140" x2="95" y2="340" stroke="rgba(212, 163, 115, 0.08)" strokeWidth="1" />
            <line x1="320" y1="140" x2="305" y2="340" stroke="rgba(212, 163, 115, 0.08)" strokeWidth="1" />
            
            {/* Crane indicator */}
            <path d="M 120 70 L 280 70" stroke="rgba(212, 163, 115, 0.12)" strokeWidth="1" />
            <line x1="160" y1="70" x2="160" y2="85" stroke="rgba(212, 163, 115, 0.2)" strokeWidth="1" />
            <line x1="240" y1="70" x2="240" y2="85" stroke="rgba(212, 163, 115, 0.2)" strokeWidth="1" />

            <text x="50" y="360" fill="rgba(212, 163, 115, 0.4)" fontSize="9" fontFamily="var(--font-geist-mono)">S-01 KOLON DÜŞEY AKS</text>
            <text x="260" y="360" fill="rgba(212, 163, 115, 0.4)" fontSize="9" fontFamily="var(--font-geist-mono)">C25/30 ELEMANLAR</text>
          </svg>
        );
      case "statik-proje":
        return (
          <svg className="hizmet-detail-hero__svg" viewBox="0 0 400 400" fill="none">
            {/* Coordinate Grid */}
            <rect x="50" y="50" width="300" height="300" stroke="rgba(212, 163, 115, 0.08)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="200" y1="40" x2="200" y2="360" stroke="rgba(212, 163, 115, 0.12)" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(212, 163, 115, 0.12)" strokeWidth="1" strokeDasharray="2 2" />
            
            {/* Structural Frame Portal (Beam & Columns) */}
            <rect x="100" y="120" width="200" height="200" fill="rgba(212, 163, 115, 0.02)" stroke="rgba(212, 163, 115, 0.25)" strokeWidth="2" />
            
            {/* Columns (Reinforced) */}
            <rect x="90" y="120" width="20" height="200" fill="rgba(212, 163, 115, 0.06)" stroke="var(--primary-gold)" strokeWidth="1.5" />
            <line x1="100" y1="120" x2="100" y2="320" stroke="rgba(212, 163, 115, 0.3)" strokeWidth="1" strokeDasharray="6 3" />
            
            <rect x="290" y="120" width="20" height="200" fill="rgba(212, 163, 115, 0.06)" stroke="var(--primary-gold)" strokeWidth="1.5" />
            <line x1="300" y1="120" x2="300" y2="320" stroke="rgba(212, 163, 115, 0.3)" strokeWidth="1" strokeDasharray="6 3" />
            
            {/* Beam with Bending Moment Diagram (Parabola curve) */}
            <path d="M 100 120 Q 200 170 300 120" fill="rgba(212, 163, 115, 0.08)" stroke="var(--primary-gold)" strokeWidth="2" />
            <line x1="100" y1="120" x2="300" y2="120" stroke="rgba(212, 163, 115, 0.4)" strokeWidth="2" />
            
            {/* Moment load hatch lines */}
            <line x1="150" y1="120" x2="150" y2="148" stroke="rgba(212, 163, 115, 0.25)" strokeWidth="1" />
            <line x1="200" y1="120" x2="200" y2="168" stroke="rgba(212, 163, 115, 0.35)" strokeWidth="1.5" />
            <line x1="250" y1="120" x2="250" y2="148" stroke="rgba(212, 163, 115, 0.25)" strokeWidth="1" />
            
            {/* Foundation / Base Supports (Fixed Joint Symbols) */}
            <path d="M 75 320 L 125 320" stroke="rgba(212, 163, 115, 0.5)" strokeWidth="2" />
            <path d="M 80 320 L 70 335 M 95 320 L 85 335 M 110 320 L 100 335 M 125 320 L 115 335" stroke="rgba(212, 163, 115, 0.3)" strokeWidth="1.5" />
            
            <path d="M 275 320 L 325 320" stroke="rgba(212, 163, 115, 0.5)" strokeWidth="2" />
            <path d="M 280 320 L 270 335 M 295 320 L 285 335 M 310 320 L 300 335 M 325 320 L 315 335" stroke="rgba(212, 163, 115, 0.3)" strokeWidth="1.5" />
            
            {/* Seismic Vector Force Arrow */}
            <path d="M 30 120 L 80 120" stroke="var(--primary-gold)" strokeWidth="2" />
            <path d="M 72 114 L 82 120 L 72 126 Z" fill="var(--primary-gold)" />
            <text x="35" y="108" fill="var(--primary-gold)" fontSize="10" fontWeight="bold" fontFamily="var(--font-geist-mono)">Fx (TBDY)</text>

            <text x="145" y="195" fill="rgba(212, 163, 115, 0.6)" fontSize="9" fontFamily="var(--font-geist-mono)">Mmax = qL²/8</text>
            <text x="60" y="355" fill="rgba(212, 163, 115, 0.4)" fontSize="8" fontFamily="var(--font-geist-mono)">SİSMİK ÇERÇEVE MODELLERİ</text>
            <text x="250" y="355" fill="rgba(212, 163, 115, 0.4)" fontSize="8" fontFamily="var(--font-geist-mono)">C35/40 & B450C</text>
          </svg>
        );
      case "kentsel-donusum":
        return (
          <svg className="hizmet-detail-hero__svg" viewBox="0 0 400 400" fill="none">
            {/* Left structure - old/decayed */}
            <path d="M 70 290 L 70 220 L 110 190 L 150 220 L 150 290 Z" stroke="rgba(212, 163, 115, 0.2)" strokeWidth="1.5" />
            <line x1="70" y1="220" x2="150" y2="220" stroke="rgba(212, 163, 115, 0.15)" strokeWidth="1.5" />
            <path d="M 70 290 L 70 200 L 110 170 L 150 200 L 150 290 Z" stroke="rgba(212, 163, 115, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="50" y1="290" x2="350" y2="290" stroke="rgba(212, 163, 115, 0.35)" strokeWidth="2" />
            
            {/* Dynamic sweep arrow */}
            <path d="M 130 150 A 80 80 0 0 1 270 150" stroke="var(--primary-gold)" strokeWidth="1.5" strokeDasharray="6 4" className="rotate-clockwise" style={{ transformOrigin: "200px 200px" }} />
            <path d="M 270 146 L 277 153 L 268 158 Z" fill="var(--primary-gold)" />

            {/* New structure */}
            <rect x="220" y="90" width="80" height="200" stroke="var(--primary-gold)" strokeWidth="2" fill="none" />
            <line x1="260" y1="90" x2="260" y2="290" stroke="rgba(212, 163, 115, 0.25)" strokeWidth="1" />
            <line x1="220" y1="130" x2="300" y2="130" stroke="rgba(212, 163, 115, 0.3)" strokeWidth="1" />
            <line x1="220" y1="170" x2="300" y2="170" stroke="rgba(212, 163, 115, 0.3)" strokeWidth="1" />
            <line x1="220" y1="210" x2="300" y2="210" stroke="rgba(212, 163, 115, 0.3)" strokeWidth="1" />
            <line x1="220" y1="250" x2="300" y2="250" stroke="rgba(212, 163, 115, 0.3)" strokeWidth="1" />
            
            {/* Nodes */}
            <circle cx="240" cy="110" r="2.5" fill="var(--primary-gold)" />
            <circle cx="280" cy="110" r="2.5" fill="var(--primary-gold)" />
            <circle cx="240" cy="150" r="2.5" fill="var(--primary-gold)" />
            <circle cx="280" cy="150" r="2.5" fill="var(--primary-gold)" />
            <circle cx="240" cy="190" r="2.5" fill="var(--primary-gold)" />
            <circle cx="280" cy="190" r="2.5" fill="var(--primary-gold)" />

            <text x="60" y="310" fill="rgba(212, 163, 115, 0.35)" fontSize="8" fontFamily="var(--font-geist-mono)">{t("contact.items.hours") === "Working Hours" ? "Old Structure" : "Eski Yapı"}</text>
            <text x="215" y="310" fill="rgba(212, 163, 115, 0.45)" fontSize="8" fontFamily="var(--font-geist-mono)">{t("contact.items.hours") === "Working Hours" ? "Seismic Modern Project" : "Dayanıklı Modern Proje"}</text>
          </svg>
        );
      case "proje-yonetimi":
      default:
        return (
          <svg className="hizmet-detail-hero__svg" viewBox="0 0 400 400" fill="none">
            <line x1="50" y1="310" x2="350" y2="310" stroke="rgba(212, 163, 115, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
            
            <circle cx="90" cy="250" r="16" stroke="rgba(212, 163, 115, 0.4)" strokeWidth="1.5" fill="rgba(12, 27, 51, 0.6)" />
            <text x="86" y="254" fill="rgba(212, 163, 115, 0.75)" fontSize="11" fontWeight="bold">01</text>
            
            <line x1="106" y1="250" x2="164" y2="170" stroke="var(--primary-gold)" strokeWidth="1.5" />
            
            <circle cx="180" cy="150" r="16" stroke="var(--primary-gold)" strokeWidth="2" fill="rgba(12, 27, 51, 0.6)" />
            <text x="175" y="154" fill="var(--primary-gold)" fontSize="11" fontWeight="bold">02</text>
            
            <line x1="196" y1="150" x2="254" y2="210" stroke="rgba(212, 163, 115, 0.4)" strokeWidth="1.5" />
            
            <circle cx="270" cy="230" r="16" stroke="rgba(212, 163, 115, 0.4)" strokeWidth="1.5" fill="rgba(12, 27, 51, 0.6)" />
            <text x="265" y="234" fill="rgba(212, 163, 115, 0.75)" fontSize="11" fontWeight="bold">03</text>
            
            <line x1="286" y1="230" x2="334" y2="140" stroke="rgba(212, 163, 115, 0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
            
            <circle cx="340" cy="130" r="12" stroke="rgba(212, 163, 115, 0.25)" strokeWidth="1.5" fill="none" />
            <circle cx="340" cy="130" r="6" fill="rgba(212, 163, 115, 0.25)" />

            <circle cx="200" cy="260" r="50" stroke="rgba(212, 163, 115, 0.12)" strokeWidth="6" />
            <path d="M 200 210 A 50 50 0 1 1 150 260" stroke="var(--primary-gold)" strokeWidth="6" strokeLinecap="round" />
            <text x="180" y="266" fill="#ffffff" fontSize="14" fontWeight="600" fontFamily="var(--font-heading)">85%</text>
            
            <text x="80" y="285" fill="rgba(212, 163, 115, 0.4)" fontSize="8" fontFamily="var(--font-geist-mono)">{t("contact.items.hours") === "Working Hours" ? "SCOPE" : "KAPSAM"}</text>
            <text x="165" y="120" fill="rgba(212, 163, 115, 0.4)" fontSize="8" fontFamily="var(--font-geist-mono)">{t("contact.items.hours") === "Working Hours" ? "PLANNING" : "PLANLAMA"}</text>
            <text x="260" y="265" fill="rgba(212, 163, 115, 0.4)" fontSize="8" fontFamily="var(--font-geist-mono)">{t("contact.items.hours") === "Working Hours" ? "BUDGET" : "BÜTÇE"}</text>
            <text x="185" y="325" fill="rgba(212, 163, 115, 0.45)" fontSize="9" fontFamily="var(--font-geist-mono)">{t("contact.items.hours") === "Working Hours" ? "PROJECT EFFICIENCY" : "PROJE VERİMLİLİĞİ"}</text>
          </svg>
        );
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Hero animation
        gsap.fromTo(
          ".hizmet-detail-hero__content > *",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: "power3.out",
          }
        );

        // Sections animations
        const sections = [
          ".hizmet-detail-intro",
          ".hizmet-detail-features",
          ".hizmet-detail-process",
          ".hizmet-detail-faqs",
          ".hizmet-detail-others",
          ".hizmet-detail-cta",
        ];

        sections.forEach((sec) => {
          gsap.fromTo(
            sec,
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sec,
                start: "top 85%",
              },
            }
          );
        });
      });

      return () => ctx.revert();
    }, 40);

    return () => clearTimeout(timer);
  }, [service.slug]);

  return (
    <div className="hizmet-detail-page">
      <header className="hizmet-detail-hero">
        <div className="hizmet-detail-hero__grid-overlay" aria-hidden="true" />
        <div className="container">
          <div className="hizmet-detail-hero__layout">
            <div className="hizmet-detail-hero__content">
              <nav className="hizmet-detail-hero__breadcrumb" aria-label="Breadcrumb">
                <Link href="/hizmetlerimiz">{t("common.nav.services")}</Link>
                <span aria-hidden="true">/</span>
                <span>{t(`services.items.${service.slug}.title`)}</span>
              </nav>
              <div className="hizmet-detail-hero__eyebrow">
                <span className="hizmet-detail-hero__eyebrow-dot" />
                <span className="hizmet-detail-hero__eyebrow-text">
                  {locale === "tr" ? "Hizmet" : "Service"} {service.number}
                </span>
              </div>
              <h1 className="hizmet-detail-hero__title">
                {t(`services.items.${service.slug}.title`)}
                <span className="hizmet-detail-hero__title-accent">
                  {t(`services.items.${service.slug}.heroTagline`)}
                </span>
              </h1>
              <p className="hizmet-detail-hero__desc">
                {t(`services.items.${service.slug}.shortDescription`)}
              </p>
              
              <div className="hizmet-detail-hero__specs-row">
                <span className="hizmet-detail-hero__spec-badge">{specs.category}</span>
                <span className="hizmet-detail-hero__spec-badge">{specs.model}</span>
                <span className="hizmet-detail-hero__spec-badge">{specs.standard}</span>
              </div>
            </div>
            
            <div className="hizmet-detail-hero__visual">
              <div className="hizmet-detail-hero__illustration-wrapper">
                {renderHeroIllustration()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="hizmet-detail-body">
        <div className="container">
          <div className="hizmet-detail-intro">
            {/* Sol Sütun: Hizmet Künyesi / Stats Card */}
            <aside className="hizmet-detail-intro__sidebar">
              <div className="hizmet-detail-profile-card">
                <h3 className="hizmet-detail-profile-card__title">{t("serviceDetail.profile.title")}</h3>
                <span className="hizmet-detail-profile-card__divider" />
                
                <div className="hizmet-detail-profile-card__metrics">
                  {service.stats.map((_, i) => (
                    <div key={i} className="hizmet-detail-profile-card__metric">
                      <span className="hizmet-detail-profile-card__metric-dot" />
                      <span className="hizmet-detail-profile-card__metric-text">
                        {t(`services.items.${service.slug}.stats.${i}`)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="hizmet-detail-profile-card__cta">
                  <p>{t("serviceDetail.profile.ctaText")}</p>
                  <Link href="/contact" className="hizmet-detail-profile-card__btn">
                    <Phone size={14} />
                    {t("serviceDetail.profile.btnContact")}
                  </Link>
                </div>
              </div>
            </aside>

            {/* Sağ Sütun: Ana İçerik */}
            <div className="hizmet-detail-intro__main">
              <p className="hizmet-detail-intro__text">{t(`services.items.${service.slug}.intro`)}</p>
              
              <h3 className="hizmet-detail-intro__list-title">{t("serviceDetail.kapsamTitle")}</h3>
              <ul className="hizmet-detail-intro__list">
                {service.highlights.map((_, idx) => (
                  <li key={idx}>
                    <div className="hizmet-detail-intro__list-icon">
                      <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                    </div>
                    <span>{t(`services.items.${service.slug}.highlights.${idx}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Neden Biz? Özellikler Bölümü */}
          <div className="hizmet-detail-features">
            <div className="hizmet-detail-features__header">
              <p className="hizmet-detail-features__label">{t("serviceDetail.features.label")}</p>
              <h2 className="hizmet-detail-features__title">{t("serviceDetail.features.title")}</h2>
            </div>
            <div className="hizmet-detail-features__grid">
              {service.features.map((_, i) => (
                <article key={i} className="hizmet-detail-feature">
                  <span className="hizmet-detail-feature__badge">0{i + 1}</span>
                  <h3 className="hizmet-detail-feature__title">
                    {t(`services.items.${service.slug}.features.${i}.title`)}
                  </h3>
                  <p className="hizmet-detail-feature__desc">
                    {t(`services.items.${service.slug}.features.${i}.description`)}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Süreç Bölümü (Timeline) */}
          <div className="hizmet-detail-process">
            <div className="hizmet-detail-process__header">
              <p className="hizmet-detail-process__label">{t("serviceDetail.process.label")}</p>
              <h2 className="hizmet-detail-process__title">{t("serviceDetail.process.title")}</h2>
            </div>
            <div className="hizmet-detail-process__timeline">
              <div className="hizmet-detail-process__line-bg" />
              {service.process.map((step, idx) => (
                <div key={step.step} className="hizmet-detail-process__node">
                  <div className="hizmet-detail-process__number-box">
                    <span>{step.step}</span>
                  </div>
                  <div className="hizmet-detail-process__content-box">
                    <h3 className="hizmet-detail-process__item-title">
                      {t(`services.items.${service.slug}.process.${idx}.title`)}
                    </h3>
                    <p className="hizmet-detail-process__item-desc">
                      {t(`services.items.${service.slug}.process.${idx}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sıkça Sorulan Sorular (SSS) */}
          <div className="hizmet-detail-faqs">
            <div className="hizmet-detail-faqs__header">
              <p className="hizmet-detail-faqs__label">{t("serviceDetail.faqs.label")}</p>
              <h2 className="hizmet-detail-faqs__title">{t("serviceDetail.faqs.title")}</h2>
            </div>
            <div className="hizmet-detail-faqs__accordion">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                    <button
                      className="faq-item__header"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-item__question">
                        <HelpCircle size={16} className="faq-item__question-icon" />
                        {t(`services.items.${service.slug}.faqs.${idx}.question`)}
                      </span>
                      <ChevronDown size={16} className="faq-item__chevron" />
                    </button>
                    <div className={`faq-item__answer-wrapper ${isOpen ? "is-open" : ""}`}>
                      <div className="faq-item__answer">
                        <p>{t(`services.items.${service.slug}.faqs.${idx}.answer`)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Diğer Hizmetler */}
          <div className="hizmet-detail-others">
            <div className="hizmet-detail-others__header">
              <p className="hizmet-detail-others__label">{t("serviceDetail.others.label")}</p>
              <h2 className="hizmet-detail-others__title">{t("serviceDetail.others.title")}</h2>
            </div>
            <div className="hizmet-detail-others__grid">
              {otherServices.map((item) => {
                const OtherIcon = ICONS[item.iconName];
                return (
                  <Link
                    key={item.slug}
                    href={`/hizmetlerimiz/${item.slug}`}
                    className="hizmet-detail-other"
                  >
                    <span className="hizmet-detail-other__icon" aria-hidden="true">
                      <OtherIcon size={20} strokeWidth={1.6} />
                    </span>
                    <span className="hizmet-detail-other__title">
                      {t(`services.items.${item.slug}.title`)}
                    </span>
                    <ArrowRight size={16} strokeWidth={2} className="hizmet-detail-other__arrow" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Eylem Çağrısı (CTA) */}
          <div className="hizmet-detail-cta">
            <div className="hizmet-detail-cta__content">
              <p className="hizmet-detail-cta__eyebrow">{t("serviceDetail.cta.eyebrow")}</p>
              <h2 className="hizmet-detail-cta__title">
                {t("serviceDetail.cta.title", { title: t(`services.items.${service.slug}.title`) })}
              </h2>
              <p className="hizmet-detail-cta__desc">
                {t("serviceDetail.cta.desc")}
              </p>
            </div>
            <div className="hizmet-detail-cta__actions">
              <Link href="/contact" className="hizmet-detail-cta__btn-primary">
                {t("serviceDetail.cta.btnContact")}
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <Link href="/hizmetlerimiz" className="hizmet-detail-cta__btn-secondary">
                {t("serviceDetail.cta.btnServices")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
