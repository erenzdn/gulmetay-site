"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Hammer,
  ClipboardList,
  Calendar,
  Flag,
  ZoomIn,
  X,
} from "lucide-react";
import { gsap } from "gsap";
import { useTranslation } from "@/context/LanguageContext";
import "./project-detail.css";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";

interface ProjectImage {
  id: number;
  url: string;
  alternativeText?: string;
}

interface Project {
  title: string;
  slug: string;
  description?: { children: { text: string }[] }[];
  mainImage?: ProjectImage;
  gallery?: ProjectImage[];
  category?: { name: string };
  status_deneme?: string;
  startDate?: string;
  endDate?: string;
}

function getStatusLabel(status: string, t: any) {
  if (status === "Completed") return t("projects.status.completed");
  if (status === "Ongoing") return t("projects.status.ongoing");
  return t("projects.status.planned");
}

function getStatusClass(status: string) {
  if (status === "Completed") return "project-detail-hero__meta-val--status-completed";
  if (status === "Ongoing") return "project-detail-hero__meta-val--status-ongoing";
  return "project-detail-hero__meta-val--status-planned";
}

function StatusIcon({ status }: { status: string }) {
  if (status === "Completed") return <Check size={15} strokeWidth={2} />;
  if (status === "Ongoing") return <Hammer size={15} strokeWidth={2} />;
  return <ClipboardList size={15} strokeWidth={2} />;
}

function normalizeGallery(project: Project): ProjectImage[] {
  const raw = project.gallery;
  if (!raw || !Array.isArray(raw)) return [];

  return raw.filter((img): img is ProjectImage => Boolean(img?.url));
}

function getGalleryImages(project: Project): ProjectImage[] {
  const images = normalizeGallery(project);
  if (!project.mainImage?.url) return images;

  return images.filter(
    (img) =>
      img.url !== project.mainImage?.url && img.id !== project.mainImage?.id
  );
}

export default function ProjectDetailClient() {
  const { t, locale } = useTranslation();
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    async function fetchProject() {
      if (!slug) return;
      const slugStr =
        typeof slug === "string" ? slug : Array.isArray(slug) ? slug[0] : "";
      if (!slugStr) return;
      try {
        const res = await fetch(
          `${STRAPI_URL}/api/projects?filters[slug][$eq]=${encodeURIComponent(slugStr)}&populate[mainImage]=true&populate[gallery]=true&populate[category]=true`
        );
        const json = await res.json();
        setProject(json.data?.length > 0 ? json.data[0] : null);
      } catch (error) {
        console.error("Hata:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [slug]);

  useEffect(() => {
    if (!loading && project) {
      const timer = setTimeout(() => {
        gsap.fromTo(
          ".project-detail-hero__back, .project-detail-hero__label, .project-detail-hero__title, .project-detail-hero__meta",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: "auto",
          }
        );

        gsap.fromTo(
          ".project-detail-about, .project-detail-gallery, .project-detail-cta",
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".project-detail-body",
              start: "top 80%",
            },
          }
        );
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [loading, project]);

  const handleNextImage = useCallback(() => {
    if (!project) return;
    const galleryImages = getGalleryImages(project);
    const nextIdx = (selectedIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIdx]);
    setSelectedIndex(nextIdx);
  }, [project, selectedIndex]);

  const handlePrevImage = useCallback(() => {
    if (!project) return;
    const galleryImages = getGalleryImages(project);
    const prevIdx = (selectedIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[prevIdx]);
    setSelectedIndex(prevIdx);
  }, [project, selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, handleNextImage, handlePrevImage]);

  if (loading) {
    return (
      <div className="project-detail-state">
        <div className="project-detail-state__inner">
          <div className="project-detail-state__spinner" />
          <p className="project-detail-state__text">{t("projects.loading")}</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-detail-state">
        <div className="project-detail-state__inner">
          <h2 className="project-detail-state__title">{t("projectDetail.empty.title")}</h2>
          <p className="project-detail-state__desc">
            {t("projectDetail.empty.desc")}
          </p>
          <Link href="/projects" className="project-detail-state__btn">
            <ArrowLeft size={14} />
            {t("projectDetail.empty.btnBack")}
          </Link>
        </div>
      </div>
    );
  }

  const descriptionText =
    project.description?.[0]?.children?.[0]?.text ||
    t("projectDetail.about.descFallback");

  const hasMeta =
    project.status_deneme || project.startDate || project.endDate;

  const galleryImages = getGalleryImages(project);

  const openLightbox = (img: ProjectImage, index: number) => {
    setSelectedImage(img);
    setSelectedIndex(index);
  };

  return (
    <article className="project-detail-page">
      <header className="project-detail-hero">
        <div
          className={`project-detail-hero__image${
            !project.mainImage ? " project-detail-hero__image--empty" : ""
          }`}
        >
          {project.mainImage ? (
            <Image
              src={`${STRAPI_URL}${project.mainImage.url}`}
              alt={project.title}
              fill
              sizes="(max-width: 992px) 100vw, 60vw"
              priority
              style={{ objectFit: "cover" }}
            />
          ) : (
            <span>{t("projectDetail.placeholder")}</span>
          )}
        </div>

        <div className="project-detail-hero__panel">
          <Link href="/projects" className="project-detail-hero__back">
            <ArrowLeft size={14} />
            {t("projectDetail.btnBack")}
          </Link>

          {project.category?.name && (
            <p className="project-detail-hero__label">{project.category.name}</p>
          )}

          <h1 className="project-detail-hero__title">{project.title}</h1>

          {hasMeta && (
            <dl className="project-detail-hero__meta">
              {project.status_deneme && (
                <div className="project-detail-hero__meta-item">
                  <dt className="project-detail-hero__meta-key">{t("projectDetail.meta.status")}</dt>
                  <dd
                    className={`project-detail-hero__meta-val ${getStatusClass(project.status_deneme)}`}
                  >
                    <StatusIcon status={project.status_deneme} />
                    {getStatusLabel(project.status_deneme, t)}
                  </dd>
                </div>
              )}
              {project.startDate && (
                <div className="project-detail-hero__meta-item">
                  <dt className="project-detail-hero__meta-key">{t("projectDetail.meta.start")}</dt>
                  <dd className="project-detail-hero__meta-val">
                    <Calendar size={14} strokeWidth={1.8} />
                    {project.startDate}
                  </dd>
                </div>
              )}
              {project.endDate && (
                <div className="project-detail-hero__meta-item">
                  <dt className="project-detail-hero__meta-key">{t("projectDetail.meta.end")}</dt>
                  <dd className="project-detail-hero__meta-val">
                    <Flag size={14} strokeWidth={1.8} />
                    {project.endDate}
                  </dd>
                </div>
              )}
            </dl>
          )}
        </div>
      </header>

      <div className="project-detail-body">
        <div className="container">
          <section className="project-detail-about" aria-label={t("projectDetail.about.title")}>
            <aside className="project-detail-about__sidebar">
              <p className="project-detail-about__sidebar-label">{t("projectDetail.about.label")}</p>
              <h2 className="project-detail-about__sidebar-title">
                {t("projectDetail.about.title")}
              </h2>
              <span className="project-detail-about__sidebar-line" aria-hidden="true" />
            </aside>
            <div className="project-detail-about__content">
              <p className="project-detail-about__text">{descriptionText}</p>
            </div>
          </section>

          {galleryImages.length > 0 && (
            <section className="project-detail-gallery" aria-label={t("projectDetail.gallery.title")}>
              <div className="project-detail-gallery__header">
                <div>
                  <p className="project-detail-gallery__label">{t("projectDetail.gallery.label")}</p>
                  <h2 className="project-detail-gallery__title">{t("projectDetail.gallery.title")}</h2>
                </div>
                <span className="project-detail-gallery__count">
                  {galleryImages.length} {t("projectDetail.gallery.countText")}
                </span>
              </div>

              <div className="project-detail-gallery__grid">
                {galleryImages.map((img, index) => (
                  <button
                    key={img.id}
                    type="button"
                    className="project-detail-gallery__item"
                    onClick={() => openLightbox(img, index)}
                    aria-label={`${project.title} — galeri görseli ${index + 1}`}
                  >
                    <Image
                      src={`${STRAPI_URL}${img.url}`}
                      alt={`${project.title} — ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      loading="lazy"
                    />
                    <span className="project-detail-gallery__item-overlay">
                      <ZoomIn
                        size={28}
                        strokeWidth={1.5}
                        className="project-detail-gallery__item-icon"
                      />
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <section className="project-detail-cta" aria-label={t("projectDetail.cta.eyebrow")}>
        <div className="container project-detail-cta__inner">
          <div>
            <p className="project-detail-cta__label">{t("projectDetail.cta.eyebrow")}</p>
            <h2 className="project-detail-cta__title">
              {t("projectDetail.cta.title")}
            </h2>
            <p className="project-detail-cta__desc">
              {t("projectDetail.cta.desc")}
            </p>
          </div>
          <Link href="/contact" className="project-detail-cta__btn">
            {t("projectDetail.cta.btnContact")}
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {selectedImage && (
        <div
          className="project-detail-lightbox"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={t("common.lightbox.close")}
        >
          <div className="project-detail-lightbox__content">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${STRAPI_URL}${selectedImage.url}`}
              alt={project.title}
              className="project-detail-lightbox__image"
              onClick={(e) => e.stopPropagation()}
            />
            
            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  className="project-detail-lightbox__nav project-detail-lightbox__nav--prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  aria-label={t("common.lightbox.prev")}
                >
                  <ArrowLeft size={24} strokeWidth={1.8} />
                </button>
                
                <button
                  type="button"
                  className="project-detail-lightbox__nav project-detail-lightbox__nav--next"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  aria-label={t("common.lightbox.next")}
                >
                  <ArrowRight size={24} strokeWidth={1.8} />
                </button>
                
                <div className="project-detail-lightbox__counter">
                  {t("common.lightbox.counter", { current: selectedIndex + 1, total: galleryImages.length })}
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            className="project-detail-lightbox__close"
            onClick={() => setSelectedImage(null)}
            aria-label={t("common.lightbox.close")}
          >
            <X size={20} strokeWidth={1.8} />
          </button>
        </div>
      )}
    </article>
  );
}
