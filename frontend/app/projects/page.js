"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    async function fetchData() {
      try {
        const resProjects = await fetch("http://localhost:1337/api/projects?populate=*");
        const jsonProjects = await resProjects.json();
        
        const resCategories = await fetch("http://localhost:1337/api/categories");
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

  const filteredProjects = selectedCategory === "Tümü"
    ? projects
    : projects.filter(p => p.category?.name === selectedCategory);

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

  return (
    <div style={{ marginTop: "80px" }}>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #0C1B33 0%, #1a3a5c 100%)",
          padding: "120px 40px 80px",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A373' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.3
          }}
        />

        <div style={{ 
          maxWidth: "1400px", 
          margin: "0 auto", 
          textAlign: "center",
          position: "relative",
          zIndex: 2
        }}>
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease"
            }}
          >
            <div style={{
              fontSize: "14px",
              color: "#D4A373",
              fontWeight: "700",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "20px"
            }}>
              PORTFOLİO
            </div>
            <h1 style={{ 
              fontSize: "clamp(2.5rem, 5vw, 4rem)", 
              color: "white", 
              marginBottom: "25px",
              fontWeight: "800",
              letterSpacing: "-1px"
            }}>
              Projelerimiz
            </h1>
            <p style={{ 
              fontSize: "clamp(1rem, 2vw, 1.2rem)", 
              color: "rgba(255, 255, 255, 0.8)", 
              maxWidth: "700px", 
              margin: "0 auto",
              lineHeight: "1.7"
            }}>
              Tamamladığımız ve devam eden projelerimize göz atın. Her proje,
              kalite ve mükemmeliyetin bir yansımasıdır.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section style={{ 
        background: "white",
        padding: "50px 40px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        position: "sticky",
        top: "80px",
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: "1400px", 
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          flexWrap: "wrap"
        }}>
          <button
            onClick={() => setSelectedCategory("Tümü")}
            style={{
              padding: "14px 30px",
              borderRadius: "50px",
              border: selectedCategory === "Tümü" ? "2px solid #0C1B33" : "2px solid #e0e0e0",
              backgroundColor: selectedCategory === "Tümü" ? "#0C1B33" : "white",
              color: selectedCategory === "Tümü" ? "white" : "#666",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: selectedCategory === "Tümü" 
                ? "0 8px 20px rgba(12, 27, 51, 0.3)" 
                : "0 2px 8px rgba(0, 0, 0, 0.05)",
              transform: selectedCategory === "Tümü" ? "translateY(-2px)" : "translateY(0)"
            }}
            onMouseOver={(e) => {
              if (selectedCategory !== "Tümü") {
                e.target.style.borderColor = "#0C1B33";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.1)";
              }
            }}
            onMouseOut={(e) => {
              if (selectedCategory !== "Tümü") {
                e.target.style.borderColor = "#e0e0e0";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
              }
            }}
          >
            Tümü <span style={{ 
              marginLeft: "8px",
              background: selectedCategory === "Tümü" ? "rgba(255,255,255,0.2)" : "#f0f0f0",
              padding: "2px 8px",
              borderRadius: "12px",
              fontSize: "13px"
            }}>
              {projects.length}
            </span>
          </button>

          {categories.map((cat) => {
            const projectCount = projects.filter(p => p.category?.name === cat.name).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                style={{
                  padding: "14px 30px",
                  borderRadius: "50px",
                  border: selectedCategory === cat.name ? "2px solid #0C1B33" : "2px solid #e0e0e0",
                  backgroundColor: selectedCategory === cat.name ? "#0C1B33" : "white",
                  color: selectedCategory === cat.name ? "white" : "#666",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "15px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: selectedCategory === cat.name
                    ? "0 8px 20px rgba(12, 27, 51, 0.3)"
                    : "0 2px 8px rgba(0, 0, 0, 0.05)",
                  transform: selectedCategory === cat.name ? "translateY(-2px)" : "translateY(0)"
                }}
                onMouseOver={(e) => {
                  if (selectedCategory !== cat.name) {
                    e.target.style.borderColor = "#0C1B33";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.1)";
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedCategory !== cat.name) {
                    e.target.style.borderColor = "#e0e0e0";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
                  }
                }}
              >
                {cat.name} <span style={{
                  marginLeft: "8px",
                  background: selectedCategory === cat.name ? "rgba(255,255,255,0.2)" : "#f0f0f0",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "13px"
                }}>
                  {projectCount}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: "80px 40px 120px", background: "#f8f9fa" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {filteredProjects.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "100px 20px",
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)"
            }}>
              <div style={{ fontSize: "80px", marginBottom: "20px", opacity: 0.3 }}>📁</div>
              <p style={{ fontSize: "1.2rem", color: "#666", fontWeight: "500" }}>
                Bu kategoride henüz proje bulunmuyor.
              </p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
              gap: "35px"
            }}>
              {filteredProjects.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    style={{
                      background: "white",
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      opacity: 0,
                      animation: `fadeInUp 0.6s ease forwards ${index * 0.1}s`
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-12px)";
                      e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
                    }}
                  >
                    {/* Image Container */}
                    <div style={{
                      height: "280px",
                      backgroundColor: "#f0f0f0",
                      overflow: "hidden",
                      position: "relative"
                    }}>
                      {project.mainImage ? (
                        <>
                          <img
                            src={`http://localhost:1337${project.mainImage.url}`}
                            alt={project.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              transition: "transform 0.5s ease"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                          />
                          {/* Overlay on hover */}
                          <div style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "linear-gradient(180deg, transparent 0%, rgba(12, 27, 51, 0.7) 100%)",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                            display: "flex",
                            alignItems: "flex-end",
                            padding: "20px"
                          }}
                          className="project-overlay">
                            <div style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>
                              Detayları Görüntüle →
                            </div>
                          </div>
                        </>
                      ) : (
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          color: "#999",
                          fontSize: "1.2rem"
                        }}>
                          📷 Görsel Yok
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ padding: "30px", flex: 1, display: "flex", flexDirection: "column" }}>
                      {/* Category Badge */}
                      {project.category?.name && (
                        <div style={{
                          fontSize: "12px",
                          color: "#D4A373",
                          fontWeight: "700",
                          marginBottom: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "1px"
                        }}>
                          {project.category.name}
                        </div>
                      )}

                      {/* Title */}
                      <h3 style={{
                        margin: "0 0 15px 0",
                        fontSize: "1.5rem",
                        color: "#0C1B33",
                        fontWeight: "700",
                        lineHeight: "1.3"
                      }}>
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p style={{
                        fontSize: "15px",
                        color: "#666",
                        lineHeight: "1.7",
                        marginBottom: "20px",
                        flex: 1
                      }}>
                        {project.description?.[0]?.children?.[0]?.text?.substring(0, 120) ||
                          "Detayları görmek için tıklayın"}
                        ...
                      </p>

                      {/* Status Badge */}
                      {project.status_deneme && (
                        <div style={{ marginTop: "auto" }}>
                          <span style={{
                            display: "inline-block",
                            backgroundColor:
                              project.status_deneme === "Completed" ? "#d4edda" :
                              project.status_deneme === "Ongoing" ? "#fff3cd" : "#d1ecf1",
                            color:
                              project.status_deneme === "Completed" ? "#155724" :
                              project.status_deneme === "Ongoing" ? "#856404" : "#0c5460",
                            padding: "6px 14px",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: "600"
                          }}>
                            {project.status_deneme === "Completed" ? "✓ Tamamlandı" :
                             project.status_deneme === "Ongoing" ? "🔨 Devam Ediyor" : "📋 Planlandı"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

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
        
        .project-card:hover .project-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
