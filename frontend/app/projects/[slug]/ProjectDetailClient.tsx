"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  XCircle,
  ArrowLeft,
  Check,
  Hammer,
  ClipboardList,
  Calendar,
  Flag,
  FileText,
  Images,
  Search,
} from "lucide-react";

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

export default function ProjectDetailClient() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    async function fetchProject() {
      if (!slug) return;
      const slugStr = typeof slug === "string" ? slug : Array.isArray(slug) ? slug[0] : "";
      if (!slugStr) return;
      try {
        const res = await fetch(`${STRAPI_URL}/api/projects?filters[slug][$eq]=${encodeURIComponent(slugStr)}&populate=*`);
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setProject(json.data[0]);
        } else {
          setProject(null);
        }
      } catch (error) {
        console.error("Hata:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div style={{
        padding: "200px 20px",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div>
          <div style={{
            width: "60px",
            height: "60px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #D4A373",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 20px"
          }} />
          <p style={{ fontSize: "1.1rem", color: "#666" }}>Yükleniyor...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{
        padding: "200px 40px",
        textAlign: "center",
        minHeight: "100vh"
      }}>
        <div style={{ marginBottom: "20px", opacity: 0.3, display: "flex", justifyContent: "center" }}>
          <XCircle size={72} strokeWidth={1.6} />
        </div>
        <h2 style={{ fontSize: "2rem", color: "#333", marginBottom: "15px" }}>Proje Bulunamadı</h2>
        <p style={{ color: "#666", marginBottom: "30px" }}>Aradığınız proje mevcut değil.</p>
        <Link href="/projects" style={{ textDecoration: "none" }}>
          <button style={{
            background: "#0C1B33",
            color: "white",
            padding: "14px 30px",
            border: "none",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer"
          }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <ArrowLeft size={16} />
              Projelere Dön
            </span>
          </button>
        </Link>
      </div>
    );
  }

  return (
    <article style={{ marginTop: "80px" }}>
      {/* Hero Section with Project Image */}
      <header style={{
        position: "relative",
        height: "70vh",
        minHeight: "500px",
        overflow: "hidden",
        background: "#000"
      }}>
        {project.mainImage && (
          <>
            <Image
              src={`${STRAPI_URL}${project.mainImage.url}`}
              alt={project.title}
              fill
              sizes="100vw"
              priority
              style={{
                objectFit: "cover",
                opacity: 0.7
              }}
            />
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(12, 27, 51, 0.3) 0%, rgba(12, 27, 51, 0.9) 100%)"
            }} />
          </>
        )}

        <Link href="/projects" style={{ textDecoration: "none" }}>
          <div style={{
            position: "absolute",
            top: "120px",
            left: "clamp(15px, 4vw, 40px)",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            padding: "12px 24px",
            borderRadius: "50px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#0C1B33",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            zIndex: 10
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.transform = "translateX(-5px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
            e.currentTarget.style.transform = "translateX(0)";
          }}>
            <ArrowLeft size={16} />
            <span>Tüm Projeler</span>
          </div>
        </Link>

        <div style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          padding: "60px 0 40px",
          zIndex: 2
        }}>
          <div className="container" style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease"
          }}>
            {project.category?.name && (
              <div style={{
                display: "inline-block",
                background: "rgba(212, 163, 115, 0.9)",
                color: "white",
                padding: "8px 20px",
                borderRadius: "50px",
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "20px"
              }}>
                {project.category.name}
              </div>
            )}
            <h1 style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: "800",
              color: "white",
              marginBottom: "20px",
              lineHeight: "1.1",
              letterSpacing: "-1px"
            }}>
              {project.title}
            </h1>

            <div style={{
              display: "flex",
              gap: "30px",
              flexWrap: "wrap"
            }}>
              {project.status_deneme && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "white",
                  fontSize: "15px"
                }}>
                  <span style={{ display: "inline-flex", alignItems: "center" }}>
                    {project.status_deneme === "Completed" ? <Check size={18} /> :
                     project.status_deneme === "Ongoing" ? <Hammer size={18} /> : <ClipboardList size={18} />}
                  </span>
                  <span style={{ fontWeight: "600" }}>
                    {project.status_deneme === "Completed" ? "Tamamlandı" :
                     project.status_deneme === "Ongoing" ? "Devam Ediyor" : "Planlandı"}
                  </span>
                </div>
              )}
              {project.startDate && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "15px"
                }}>
                  <Calendar size={16} />
                  <span>Başlangıç: {project.startDate}</span>
                </div>
              )}
              {project.endDate && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "15px"
                }}>
                  <Flag size={16} />
                  <span>Bitiş: {project.endDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Project Details */}
      <section style={{ background: "white", padding: "80px 0" }}>
        <div className="container">
          <div style={{
            background: "#f8f9fa",
            padding: "clamp(20px, 5vw, 50px)",
            borderRadius: "20px",
            marginBottom: "60px",
            borderLeft: "5px solid #D4A373"
          }}>
            <h2 style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#0C1B33",
              marginBottom: "25px",
              display: "flex",
              alignItems: "center",
              gap: "15px"
            }}>
              <FileText size={26} />
              Proje Hakkında
            </h2>
            <p style={{
              lineHeight: "1.9",
              fontSize: "1.1rem",
              color: "#444",
              whiteSpace: "pre-line"
            }}>
              {project.description?.[0]?.children?.[0]?.text || "Proje açıklaması mevcut değil."}
            </p>
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <div>
              <h2 style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#0C1B33",
                marginBottom: "40px",
                display: "flex",
                alignItems: "center",
                gap: "15px"
              }}>
                <Images size={26} />
                Proje Galerisi
              </h2>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(clamp(250px, 100%, 300px), 1fr))",
                gap: "25px"
              }}>
                {project.gallery.map((img, index) => (
                  <div
                    key={img.id}
                    onClick={() => setSelectedImage(img)}
                    style={{
                      position: "relative",
                      height: "250px",
                      borderRadius: "15px",
                      overflow: "hidden",
                      cursor: "pointer",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s ease",
                      opacity: 0,
                      animation: `fadeInUp 0.6s ease forwards ${index * 0.1}s`
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    <Image
                      src={`${STRAPI_URL}${img.url}`}
                      alt={`${project.title} - Galeri ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{
                        objectFit: "cover",
                        transition: "transform 0.3s ease"
                      }}
                      loading="lazy"
                    />
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "linear-gradient(180deg, transparent 0%, rgba(12, 27, 51, 0.6) 100%)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    className="gallery-overlay">
                      <span style={{
                        color: "white",
                        fontSize: "40px",
                        transform: "scale(0)",
                        transition: "transform 0.3s ease"
                      }}
                      className="zoom-icon">
                        <Search size={34} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: "linear-gradient(135deg, #0C1B33 0%, #1a3a5c 100%)",
        padding: "80px 0",
        textAlign: "center"
      }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            fontWeight: "700",
            color: "white",
            marginBottom: "20px"
          }}>
            Sizin İçin Neler Yapabiliriz?
          </h2>
          <p style={{
            fontSize: "1.1rem",
            color: "rgba(255, 255, 255, 0.8)",
            marginBottom: "35px",
            lineHeight: "1.7"
          }}>
            Hayalinizdeki projeyi birlikte gerçeğe dönüştürelim. Ücretsiz keşif ve
            danışmanlık için bizimle iletişime geçin.
          </p>
          <Link href="/contact" style={{ textDecoration: "none" }}>
            <button style={{
              background: "linear-gradient(135deg, #D4A373 0%, #c49363 100%)",
              color: "white",
              padding: "18px 45px",
              border: "none",
              borderRadius: "12px",
              fontSize: "17px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 24px rgba(212, 163, 115, 0.4)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(212, 163, 115, 0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(212, 163, 115, 0.4)";
            }}>
              Bizimle İletişime Geçin
            </button>
          </Link>
        </div>
      </section>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.95)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            cursor: "pointer",
            animation: "fadeIn 0.3s ease"
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${STRAPI_URL}${selectedImage.url}`}
            alt={project.title}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              borderRadius: "10px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)"
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setSelectedImage(null)}
            aria-label="Galeriyi kapat"
            style={{
              position: "absolute",
              top: "30px",
              right: "30px",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              color: "white",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
              e.currentTarget.style.transform = "rotate(90deg)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.transform = "rotate(0deg)";
            }}
          >
            ×
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .gallery-overlay:hover {
          opacity: 1 !important;
        }
        .gallery-overlay:hover .zoom-icon {
          transform: scale(1) !important;
        }
      `}</style>
    </article>
  );
}
