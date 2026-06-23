"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  XCircle,
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

function getStatusLabel(status: string) {
  if (status === "Completed") return "Tamamlandı";
  if (status === "Ongoing") return "Devam Ediyor";
  return "Planlandı";
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
          `${STRAPI_URL}/api/projects?filters[slug][$eq]=${encodeURIComponent(slugStr)}&populate[mainImage]=true&populate[gallery]=true&populate[categories]=true`
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
    if (loading || !project) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-detail-hero__back, .project-detail-hero__label, .project-detail-hero__title, .project-detail-hero__meta",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.15,
        }
      );

      gsap.fromTo(
        ".project-detail-hero__image",
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
      );

      gsap.fromTo(
        ".project-detail-about, .project-detail-gallery, .project-detail-cta",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.35,
          clearProps: "opacity,transform",
        }
      );
    });

    return () => ctx.revert();
  }, [loading, project]);

  const handlePrevImage = useCallback(() => {
    if (!project) return;
    const images = getGalleryImages(project);
    const newIndex = selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    setSelectedImage(images[newIndex]);
  }, [project, selectedIndex]);

  const handleNextImage = useCallback(() => {
    if (!project) return;
    const images = getGalleryImages(project);
    const newIndex = selectedIndex === images.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    setSelectedImage(images[newIndex]);
  }, [project, selectedIndex]);

  useEffect(() => {
    if (!selectedImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedImage, handlePrevImage, handleNextImage]);

  if (loading) {
    return (
      <div className="project-detail-state">
        <div className="project-detail-state__inner">
          <div className="project-detail-state__spinner" aria-hidden="true" />
          <p className="project-detail-state__text">Proje yükleniyor…</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-detail-state">
        <div className="project-detail-state__inner">
          <div className="project-detail-state__icon">
            <XCircle size={56} strokeWidth={1.4} />
          </div>
          <h2 className="project-detail-state__title">Proje Bulunamadı</h2>
          <p className="project-detail-state__desc">
            Aradığınız proje mevcut değil veya kaldırılmış olabilir.
          </p>
          <Link href="/projects" className="project-detail-state__btn">
            <ArrowLeft size={14} />
            Projelere Dön
          </Link>
        </div>
      </div>
    );
  }

  const descriptionText =
    project.description?.[0]?.children?.[0]?.text ||
    "Proje açıklaması mevcut değil.";

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
            <span>Görsel Yok</span>
          )}
        </div>

        <div className="project-detail-hero__panel">
          <Link href="/projects" className="project-detail-hero__back">
            <ArrowLeft size={14} />
            Tüm Projeler
          </Link>

          {project.category?.name && (
            <p className="project-detail-hero__label">{project.category.name}</p>
          )}

          <h1 className="project-detail-hero__title">{project.title}</h1>

          {hasMeta && (
            <dl className="project-detail-hero__meta">
              {project.status_deneme && (
                <div className="project-detail-hero__meta-item">
                  <dt className="project-detail-hero__meta-key">Durum</dt>
                  <dd
                    className={`project-detail-hero__meta-val ${getStatusClass(project.status_deneme)}`}
                  >
                    <StatusIcon status={project.status_deneme} />
                    {getStatusLabel(project.status_deneme)}
                  </dd>
                </div>
              )}
              {project.startDate && (
                <div className="project-detail-hero__meta-item">
                  <dt className="project-detail-hero__meta-key">Başlangıç</dt>
                  <dd className="project-detail-hero__meta-val">
                    <Calendar size={14} strokeWidth={1.8} />
                    {project.startDate}
                  </dd>
                </div>
              )}
              {project.endDate && (
                <div className="project-detail-hero__meta-item">
                  <dt className="project-detail-hero__meta-key">Bitiş</dt>
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
          <section className="project-detail-about" aria-label="Proje Hakkında">
            <aside className="project-detail-about__sidebar">
              <p className="project-detail-about__sidebar-label">Detay</p>
              <h2 className="project-detail-about__sidebar-title">
                Proje Hakkında
              </h2>
              <span className="project-detail-about__sidebar-line" aria-hidden="true" />
            </aside>
            <div className="project-detail-about__content">
              <p className="project-detail-about__text">{descriptionText}</p>
            </div>
          </section>

          {galleryImages.length > 0 && (
            <section className="project-detail-gallery" aria-label="Proje Galerisi">
              <div className="project-detail-gallery__header">
                <div>
                  <p className="project-detail-gallery__label">Görsel Arşiv</p>
                  <h2 className="project-detail-gallery__title">Proje Galerisi</h2>
                </div>
                <span className="project-detail-gallery__count">
                  {galleryImages.length} görsel
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

      <section className="project-detail-cta" aria-label="İletişim">
        <div className="container project-detail-cta__inner">
          <div>
            <p className="project-detail-cta__label">Birlikte Çalışalım</p>
            <h2 className="project-detail-cta__title">
              Benzer Bir Proje mi Planlıyorsunuz?
            </h2>
            <p className="project-detail-cta__desc">
              Keşiften teslimata kadar tüm süreci şeffaf ve planlı yönetiyoruz.
              Ücretsiz ön görüşme için bizimle iletişime geçin.
            </p>
          </div>
          <Link href="/contact" className="project-detail-cta__btn">
            İletişime Geç
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
          aria-label="Galeri görseli"
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
                  aria-label="Önceki görsel"
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
                  aria-label="Sonraki görsel"
                >
                  <ArrowRight size={24} strokeWidth={1.8} />
                </button>
                
                <div className="project-detail-lightbox__counter">
                  {selectedIndex + 1} / {galleryImages.length}
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            className="project-detail-lightbox__close"
            onClick={() => setSelectedImage(null)}
            aria-label="Galeriyi kapat"
          >
            <X size={20} strokeWidth={1.8} />
          </button>
        </div>
      )}
    </article>
  );
}
