"use client";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch("http://localhost:1337/api/about");
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

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
      }}>
        <div style={{
          width: "50px",
          height: "50px",
          border: "3px solid rgba(12, 27, 51, 0.1)",
          borderTop: "3px solid #0C1B33",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }} />
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
      }}>
        <p style={{ fontSize: "1.2rem", color: "#666" }}>İçerik bulunamadı.</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      padding: "80px 20px"
    }}>
      {/* Hero Section */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        marginBottom: "60px"
      }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "60px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.5)"
        }}>
          <h1 style={{
            fontSize: "3.2rem",
            fontWeight: "600",
            fontFamily: "'Playfair Display', Georgia, serif",
            background: "linear-gradient(135deg, #0C1B33 0%, #1a3a5c 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "30px",
            letterSpacing: "-1px",
            lineHeight: "1.2"
          }}>
            {data.title}
          </h1>
          
          <div style={{
            fontSize: "1.1rem",
            lineHeight: "2",
            color: "#4a5568",
            whiteSpace: "pre-line",
            borderLeft: "4px solid #D4A373",
            paddingLeft: "30px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: "400"
          }}>
            {data.content}
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
        gap: "30px"
      }}>
        
        {/* Vizyon Kartı */}
        <div style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "50px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 25px 70px rgba(0, 0, 0, 0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 20px 60px rgba(0, 0, 0, 0.08)";
        }}>
          <div style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "150px",
            height: "150px",
            background: "linear-gradient(135deg, rgba(12, 27, 51, 0.05) 0%, rgba(26, 58, 92, 0.05) 100%)",
            borderRadius: "50%",
            filter: "blur(40px)"
          }} />
          
          <div style={{
            display: "inline-block",
            padding: "10px 20px",
            background: "linear-gradient(135deg, #0C1B33 0%, #1a3a5c 100%)",
            borderRadius: "30px",
            marginBottom: "25px",
            fontSize: "0.75rem",
            fontWeight: "600",
            fontFamily: "'DM Sans', sans-serif",
            color: "#fff",
            letterSpacing: "1.5px",
            textTransform: "uppercase"
          }}>
            Vizyon
          </div>

          <h3 style={{
            fontSize: "1.9rem",
            fontWeight: "600",
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#0C1B33",
            marginBottom: "20px",
            lineHeight: "1.3"
          }}>
            {data.vision_title}
          </h3>
          
          <p style={{
            fontSize: "1.05rem",
            lineHeight: "1.9",
            fontFamily: "'DM Sans', sans-serif",
            color: "#4a5568",
            margin: 0
          }}>
            {data.vision_text}
          </p>
        </div>

        {/* Misyon Kartı */}
        <div style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "50px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 25px 70px rgba(0, 0, 0, 0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 20px 60px rgba(0, 0, 0, 0.08)";
        }}>
          <div style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "150px",
            height: "150px",
            background: "linear-gradient(135deg, rgba(12, 27, 51, 0.05) 0%, rgba(26, 58, 92, 0.05) 100%)",
            borderRadius: "50%",
            filter: "blur(40px)"
          }} />
          
          <div style={{
            display: "inline-block",
            padding: "10px 20px",
            background: "linear-gradient(135deg, #0C1B33 0%, #1a3a5c 100%)",
            borderRadius: "30px",
            marginBottom: "25px",
            fontSize: "0.75rem",
            fontWeight: "600",
            fontFamily: "'DM Sans', sans-serif",
            color: "#fff",
            letterSpacing: "1.5px",
            textTransform: "uppercase"
          }}>
            Misyon
          </div>

          <h3 style={{
            fontSize: "1.9rem",
            fontWeight: "600",
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#0C1B33",
            marginBottom: "20px",
            lineHeight: "1.3"
          }}>
            {data.mission_title}
          </h3>
          
          <p style={{
            fontSize: "1.05rem",
            lineHeight: "1.9",
            fontFamily: "'DM Sans', sans-serif",
            color: "#4a5568",
            margin: 0
          }}>
            {data.mission_text}
          </p>
        </div>

      </div>
    </div>
  );
}