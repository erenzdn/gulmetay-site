"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  HardHat,
  PenTool,
  Building,
  BriefcaseBusiness,
  ShieldCheck,
  Zap,
  Award,
  type LucideIcon,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES, type ServiceIconName } from "@/lib/services";
import { useTranslation } from "@/context/LanguageContext";
import "./hizmetler.css";

const ICONS: Record<ServiceIconName, LucideIcon> = {
  HardHat,
  PenTool,
  Building,
  BriefcaseBusiness,
};

export default function HizmetlerClient() {
  const { t } = useTranslation();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        ".hizmetler-hero__content > *",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
        }
      );

      // Stats animations
      gsap.fromTo(
        ".hizmetler-stats-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".hizmetler-stats-section",
            start: "top 85%",
          },
        }
      );

      // Cards animations
      gsap.fromTo(
        ".hizmetler-card",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".hizmetler-grid",
            start: "top 82%",
          },
        }
      );

      // Commitments animation
      gsap.fromTo(
        ".hizmetler-commitment-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".hizmetler-commitments",
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="hizmetler-page">
      <header className="hizmetler-hero">
        <div className="hizmetler-hero__grid-overlay" aria-hidden="true" />
        <div className="container">
          <div className="hizmetler-hero__layout">
            <div className="hizmetler-hero__content">
              <div className="hizmetler-hero__eyebrow">
                <span className="hizmetler-hero__eyebrow-dot" />
                <span className="hizmetler-hero__eyebrow-text">{t("services.hero.eyebrow")}</span>
              </div>
              <h1 className="hizmetler-hero__title">
                {t("services.hero.title")}
                <em>{t("services.hero.titleAccent")}</em>
              </h1>
              <p className="hizmetler-hero__desc">
                {t("services.hero.desc")}
              </p>
            </div>
            <div className="hizmetler-hero__visual" aria-hidden="true">
              <div className="hizmetler-hero__blueprint-wrapper">
                <svg className="hizmetler-hero__blueprint-svg" viewBox="0 0 400 400" fill="none">
                  {/* Outer circle */}
                  <circle cx="200" cy="200" r="160" stroke="rgba(212, 163, 115, 0.2)" strokeWidth="1" strokeDasharray="5 5" />
                  <circle cx="200" cy="200" r="130" stroke="rgba(212, 163, 115, 0.3)" strokeWidth="1" />
                  {/* Rotating grid ring */}
                  <circle cx="200" cy="200" r="90" stroke="rgba(212, 163, 115, 0.4)" strokeWidth="1.5" strokeDasharray="10 15" className="rotate-clockwise" />
                  <circle cx="200" cy="200" r="60" stroke="rgba(212, 163, 115, 0.2)" strokeWidth="1" />
                  {/* CAD lines */}
                  <line x1="20" y1="200" x2="380" y2="200" stroke="rgba(212, 163, 115, 0.15)" strokeWidth="1" />
                  <line x1="200" y1="20" x2="200" y2="380" stroke="rgba(212, 163, 115, 0.15)" strokeWidth="1" />
                  <line x1="72" y1="72" x2="328" y2="328" stroke="rgba(212, 163, 115, 0.08)" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="72" y1="328" x2="328" y2="72" stroke="rgba(212, 163, 115, 0.08)" strokeWidth="1" strokeDasharray="2 2" />
                  {/* Corner marks */}
                  <path d="M 40 200 L 40 40 L 200 40" stroke="rgba(212, 163, 115, 0.1)" strokeWidth="1" />
                  <path d="M 360 200 L 360 360 L 200 360" stroke="rgba(212, 163, 115, 0.1)" strokeWidth="1" />
                  {/* Measurement labels */}
                  <text x="210" y="50" fill="rgba(212, 163, 115, 0.5)" fontSize="9" fontFamily="var(--font-geist-mono)">R = 160.00</text>
                  <text x="210" y="220" fill="rgba(212, 163, 115, 0.5)" fontSize="9" fontFamily="var(--font-geist-mono)">X: 200.0 / Y: 200.0</text>
                  <text x="320" y="190" fill="rgba(212, 163, 115, 0.5)" fontSize="9" fontFamily="var(--font-geist-mono)">90.0°</text>
                  {/* Pulse center */}
                  <circle cx="200" cy="200" r="4" fill="var(--primary-gold)" />
                  <circle cx="200" cy="200" r="12" stroke="var(--primary-gold)" strokeWidth="1" className="ping-slow" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Rakamlarla Hizmetlerimiz */}
      <section className="hizmetler-stats-section" aria-label="Rakamlarla Gülmetay">
        <div className="container">
          <div className="hizmetler-stats-grid">
            <div className="hizmetler-stats-item">
              <span className="hizmetler-stats-number">15+</span>
              <span className="hizmetler-stats-label">{t("services.stats.experience")}</span>
            </div>
            <div className="hizmetler-stats-item">
              <span className="hizmetler-stats-number">150+</span>
              <span className="hizmetler-stats-label">{t("services.stats.completed")}</span>
            </div>
            <div className="hizmetler-stats-item">
              <span className="hizmetler-stats-number">120K+</span>
              <span className="hizmetler-stats-label">{t("services.stats.area")}</span>
            </div>
            <div className="hizmetler-stats-item">
              <span className="hizmetler-stats-number">100%</span>
              <span className="hizmetler-stats-label">{t("services.stats.satisfaction")}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="hizmetler-body" aria-label="Hizmet listesi">
        <div className="container">
          <div className="hizmetler-grid">
            {SERVICES.map((service) => {
              const Icon = ICONS[service.iconName];
              return (
                <Link
                  key={service.slug}
                  href={`/hizmetlerimiz/${service.slug}`}
                  className="hizmetler-card"
                >
                  <span className="hizmetler-card__number">{service.number}</span>
                  <div className="hizmetler-card__icon">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h2 className="hizmetler-card__title">
                    {t(`services.items.${service.slug}.title`)}
                  </h2>
                  <p className="hizmetler-card__desc">
                    {t(`services.items.${service.slug}.shortDescription`)}
                  </p>
                  
                  {/* İstatistikler Bloğu */}
                  <div className="hizmetler-card__highlights">
                    {service.stats.slice(0, 2).map((_, idx) => (
                      <span key={idx} className="hizmetler-card__tag">
                        {t(`services.items.${service.slug}.stats.${idx}`)}
                      </span>
                    ))}
                  </div>

                  <span className="hizmetler-card__cta">
                    {t("services.card.viewDetails")}
                    <ArrowRight size={15} strokeWidth={2.2} />
                  </span>
                  <div className="hizmetler-card__line" aria-hidden="true" />
                </Link>
              );
            })}
          </div>

          {/* Gülmetay Taahhüdü ve Değerler */}
          <div className="hizmetler-commitments">
            <div className="hizmetler-commitments__header">
              <p className="hizmetler-commitments__eyebrow">{t("services.commitments.eyebrow")}</p>
              <h2 className="hizmetler-commitments__title">{t("services.commitments.title")}</h2>
            </div>
            <div className="hizmetler-commitments__grid">
              <div className="hizmetler-commitment-card">
                <div className="hizmetler-commitment-card__icon">
                  <ShieldCheck size={24} strokeWidth={1.8} />
                </div>
                <h3 className="hizmetler-commitment-card__title">{t("services.commitments.safety.title")}</h3>
                <p className="hizmetler-commitment-card__desc">
                  {t("services.commitments.safety.desc")}
                </p>
              </div>
              <div className="hizmetler-commitment-card">
                <div className="hizmetler-commitment-card__icon">
                  <Zap size={24} strokeWidth={1.8} />
                </div>
                <h3 className="hizmetler-commitment-card__title">{t("services.commitments.transparent.title")}</h3>
                <p className="hizmetler-commitment-card__desc">
                  {t("services.commitments.transparent.desc")}
                </p>
              </div>
              <div className="hizmetler-commitment-card">
                <div className="hizmetler-commitment-card__icon">
                  <Award size={24} strokeWidth={1.8} />
                </div>
                <h3 className="hizmetler-commitment-card__title">{t("services.commitments.materials.title")}</h3>
                <p className="hizmetler-commitment-card__desc">
                  {t("services.commitments.materials.desc")}
                </p>
              </div>
            </div>
          </div>

          <div className="hizmetler-cta">
            <div className="hizmetler-cta__content">
              <p className="hizmetler-cta__eyebrow">{t("services.cta.eyebrow")}</p>
              <h2 className="hizmetler-cta__title">{t("services.cta.title")}</h2>
              <p className="hizmetler-cta__desc">
                {t("services.cta.desc")}
              </p>
            </div>
            <div className="hizmetler-cta__actions">
              <Link href="/contact" className="hizmetler-cta__btn-primary">
                {t("services.cta.btnQuote")}
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <Link href="/projects" className="hizmetler-cta__btn-secondary">
                {t("services.cta.btnProjects")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
