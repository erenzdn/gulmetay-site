"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { useTranslation } from "@/context/LanguageContext";
import "./about.css";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";

interface AboutData {
  title: string;
  content: string;
}

function getExcerpt(content: string, maxLength = 220): string {
  const firstParagraph = content.split("\n").find((line) => line.trim()) ?? content;
  if (firstParagraph.length <= maxLength) return firstParagraph;
  return `${firstParagraph.substring(0, maxLength).trim()}…`;
}

export default function AboutClient() {
  const { t } = useTranslation();
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  const stats = [
    { value: "1994", label: t("about.stats.founded") },
    { value: "30+", label: t("about.stats.experience") },
    { value: t("about.stats.headquarters") === "Headquarters" ? "Istanbul" : "İstanbul", label: t("about.stats.headquarters") },
  ];

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch(`${STRAPI_URL}/api/about`);
        const json = await res.json();
        setData(json.data);
      } catch (error) {
        console.error("Hata:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAbout();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      const timer = setTimeout(() => {
        gsap.fromTo(
          ".about-intro__visual, .about-intro__text-block, .about-story, .about-stats, .about-cta",
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            overwrite: "auto",
          }
        );
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [loading, data]);

  if (loading) {
    return (
      <div className="about-loading">
        <div className="about-loading__inner">
          <div className="about-loading__spinner" />
          <p className="about-loading__text">{t("about.loading")}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="about-empty">
        <p className="about-empty__text">{t("about.empty")}</p>
      </div>
    );
  }

  const excerpt = getExcerpt(data.content);

  return (
    <div className="about-page">
      <header className="about-hero">
        <div className="container">
          <div className="about-hero__content">
            <div className="about-hero__eyebrow">
              <span className="about-hero__eyebrow-line" aria-hidden="true" />
              <span className="about-hero__eyebrow-text">{t("about.hero.eyebrow")}</span>
            </div>
            <h1 className="about-hero__title">
              {t("about.hero.title")}
              <em>{t("about.hero.titleAccent")}</em>
            </h1>
            <p className="about-hero__desc">
              {t("about.hero.desc")}
            </p>
          </div>
        </div>
      </header>

      <section className="about-body" aria-label="Şirket hikayesi">
        <div className="container">
          <div className="about-intro">
            <div className="about-intro__visual">
              <Image
                src="/hero-architecture.png"
                alt={`${t("about.hero.eyebrow")} — mimari ve mühendislik`}
                fill
                sizes="(max-width: 992px) 100vw, 55vw"
                className="about-intro__image"
              />
              <span className="about-intro__frame" aria-hidden="true" />
              <div className="about-intro__badge">
                <p className="about-intro__badge-text">{t("about.intro.badgeTitle")}</p>
                <p className="about-intro__badge-year">1994</p>
              </div>
            </div>

            <div className="about-intro__text-block">
              <p className="about-intro__label">{t("about.intro.label")}</p>
              <h2 className="about-intro__heading">{data.title}</h2>
              <span className="about-intro__line" aria-hidden="true" />
              <p className="about-intro__excerpt">{excerpt}</p>
            </div>
          </div>

          <article className="about-story">
            <aside className="about-story__sidebar">
              <p className="about-story__sidebar-label">{t("about.story.label")}</p>
              <h2 className="about-story__sidebar-title">
                {t("about.story.title")}
              </h2>
              <span className="about-story__sidebar-line" aria-hidden="true" />
            </aside>

            <div className="about-story__content">
              <p className="about-story__text">{data.content}</p>
            </div>
          </article>

          <div className="about-stats" aria-label="Öne çıkan bilgiler">
            {stats.map((stat) => (
              <div key={stat.label} className="about-stats__item">
                <p className="about-stats__value">{stat.value}</p>
                <p className="about-stats__label">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="about-cta">
            <div className="about-cta__content">
              <p className="about-cta__eyebrow">{t("about.cta.eyebrow")}</p>
              <h2 className="about-cta__title">{t("about.cta.title")}</h2>
              <p className="about-cta__desc">
                {t("about.cta.desc")}
              </p>
            </div>
            <div className="about-cta__actions">
              <Link href="/projects" className="about-cta__btn-primary">
                {t("about.cta.btnProjects")}
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <Link href="/contact" className="about-cta__btn-secondary">
                {t("about.cta.btnContact")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
