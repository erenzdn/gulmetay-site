"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  FolderOpen,
  Eye,
  Check,
  Hammer,
  ClipboardList,
} from "lucide-react";
import { gsap } from "gsap";
import "./projects.css";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";

interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  description?: { children: { text: string }[] }[];
  mainImage?: { url: string };
  category?: { name: string };
  status_deneme?: string;
}

interface Category {
  id: number;
  name: string;
}

function getProjectDescription(project: ProjectItem, maxLength = 140): string {
  const text = project.description?.[0]?.children?.[0]?.text;
  if (!text) return "Proje detaylarını incelemek için tıklayın.";
  return text.length > maxLength ? `${text.substring(0, maxLength)}…` : text;
}

function getStatusInfo(status?: string) {
  if (status === "Completed") {
    return { label: "Tamamlandı", className: "completed", icon: Check };
  }
  if (status === "Ongoing") {
    return { label: "Devam Ediyor", className: "ongoing", icon: Hammer };
  }
  return { label: "Planlandı", className: "planned", icon: ClipboardList };
}

export default function ProjectsClient() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [loading, setLoading] = useState(true);

  const filteredProjects =
    selectedCategory === "Tümü"
      ? projects
      : projects.filter((p) => p.category?.name === selectedCategory);

  useEffect(() => {
    if (!loading && filteredProjects.length > 0) {
      const timer = setTimeout(() => {
        gsap.fromTo(
          ".projects-card",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.07,
            ease: "power3.out",
            overwrite: "auto",
          }
        );
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [selectedCategory, loading, filteredProjects.length]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resProjects, resCategories] = await Promise.all([
          fetch(`${STRAPI_URL}/api/projects?populate=*`),
          fetch(`${STRAPI_URL}/api/categories`),
        ]);

        const jsonProjects = await resProjects.json();
        const jsonCategories = await resCategories.json();

        setProjects(jsonProjects.data || []);
        setCategories(jsonCategories.data || []);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="projects-loading">
        <div className="projects-loading__inner">
          <div className="projects-loading__spinner" />
          <p className="projects-loading__text">Projeler yükleniyor…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <header className="projects-hero">
        <div className="container">
          <div className="projects-hero__content">
            <div className="projects-hero__eyebrow">
              <span className="projects-hero__eyebrow-line" />
              <span className="projects-hero__eyebrow-text">Portföy</span>
            </div>
            <h1 className="projects-hero__title">
              Projelerimiz
              <em>Mühendislik &amp; İnşaat</em>
            </h1>
            <p className="projects-hero__desc">
              1994&apos;ten bu yana tamamladığımız ve devam eden projelerimiz.
              Her yapı, kalite anlayışımızın ve mühendislik disiplinimizin
              somut bir yansımasıdır.
            </p>
          </div>
        </div>
      </header>

      <nav className="projects-filter" aria-label="Proje kategorileri">
        <div className="container projects-filter__inner">
          <span className="projects-filter__label">Filtrele</span>
          <div className="projects-filter__tabs">
            <button
              type="button"
              className={`projects-filter__tab${selectedCategory === "Tümü" ? " is-active" : ""}`}
              onClick={() => setSelectedCategory("Tümü")}
            >
              Tümü
              <span className="projects-filter__count">{projects.length}</span>
            </button>
            {categories.map((cat) => {
              const count = projects.filter(
                (p) => p.category?.name === cat.name
              ).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`projects-filter__tab${selectedCategory === cat.name ? " is-active" : ""}`}
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  {cat.name}
                  <span className="projects-filter__count">{count}</span>
                </button>
              );
            })}
          </div>
          <p className="projects-filter__result">
            <strong>{filteredProjects.length}</strong> proje gösteriliyor
          </p>
        </div>
      </nav>

      <section className="projects-grid-section" aria-label="Proje listesi">
        <div className="container">
          <h2 className="sr-only">Tüm Projelerimiz</h2>

          {filteredProjects.length === 0 ? (
            <div className="projects-empty">
              <div className="projects-empty__icon">
                <FolderOpen size={56} strokeWidth={1.25} />
              </div>
              <h3 className="projects-empty__title">
                Bu kategoride proje bulunamadı
              </h3>
              <p className="projects-empty__desc">
                Farklı bir kategori seçerek diğer projelerimize göz
                atabilirsiniz.
              </p>
              <button
                type="button"
                className="projects-empty__btn"
                onClick={() => setSelectedCategory("Tümü")}
              >
                Tüm Projeleri Gör
              </button>
            </div>
          ) : (
            <div className="projects-grid">
              {filteredProjects.map((project, index) => {
                const status = getStatusInfo(project.status_deneme);
                const StatusIcon = status.icon;
                const isFeatured = index === 0 && selectedCategory === "Tümü";

                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className={`projects-card${isFeatured ? " projects-card--featured" : ""}`}
                  >
                    <article className="projects-card__inner">
                      <div className="projects-card__media">
                        {project.mainImage ? (
                          <>
                            <Image
                              src={`${STRAPI_URL}${project.mainImage.url}`}
                              alt={project.title}
                              fill
                              sizes={
                                isFeatured
                                  ? "(max-width: 992px) 100vw, 60vw"
                                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              }
                              style={{ objectFit: "cover" }}
                              loading={index < 3 ? "eager" : "lazy"}
                            />
                            <div className="projects-card__media-overlay">
                              <span className="projects-card__view">
                                <Eye size={14} />
                                Detayları İncele
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="projects-card__placeholder">
                            Görsel mevcut değil
                          </div>
                        )}
                      </div>

                      <div className="projects-card__body">
                        <div className="projects-card__meta">
                          {project.category?.name && (
                            <span className="projects-card__category">
                              {project.category.name}
                            </span>
                          )}
                          {project.status_deneme && (
                            <span
                              className={`projects-card__status projects-card__status--${status.className}`}
                            >
                              <StatusIcon size={11} />
                              {status.label}
                            </span>
                          )}
                        </div>

                        <h3 className="projects-card__title">{project.title}</h3>
                        <p className="projects-card__desc">
                          {getProjectDescription(
                            project,
                            isFeatured ? 220 : 130
                          )}
                        </p>

                        <div className="projects-card__footer">
                          <span className="projects-card__link">
                            Projeyi İncele
                            <ArrowRight size={14} />
                          </span>
                          <span className="projects-card__index">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="projects-cta" aria-label="İletişime geçin">
        <div className="container">
          <div className="projects-cta__inner">
            <div className="projects-cta__content">
              <p className="projects-cta__eyebrow">Bir sonraki proje sizin mi?</p>
              <h2 className="projects-cta__title">
                Projeniz için uzman ekibimizle iletişime geçin.
              </h2>
              <p className="projects-cta__desc">
                Keşiften teslimata kadar tüm süreci şeffaf ve planlı yönetiyoruz.
              </p>
            </div>
            <Link href="/contact" className="projects-cta__btn">
              İletişime Geç
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <div className="projects-bridge" aria-hidden="true">
        <div className="projects-bridge__shape" />
      </div>
    </div>
  );
}
