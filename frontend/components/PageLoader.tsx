"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./PageLoader.css";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress counter increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(interval);
          return 99;
        }
        const increment = Math.max(1, Math.floor((100 - prev) / 7));
        return prev + increment;
      });
    }, 45);

    const minLoadTime = 1600;
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(() => {
            setIsVisible(false);
          }, 700); // CSS transition ile eşleşmeli
        }, 250);
      }, remainingTime);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`page-loader ${!isLoading ? "page-loader--hidden" : ""}`}>
      {/* Arka Plan Izgarası & Ortam Işıkları */}
      <div className="page-loader__bg-grid"></div>
      <div className="page-loader__glow-top"></div>
      <div className="page-loader__glow-bottom"></div>

      <div className="page-loader__content">
        {/* Logo Alanı (Doğrudan Şeffaf PNG Gösterimi) */}
        <div className="page-loader__logo-wrapper">
          <div className="page-loader__logo-container">
            <Image
              src="/logo-cropped.png"
              alt="Gülmetay İnşaat"
              width={380}
              height={100}
              priority
              className="page-loader__logo"
            />
          </div>
          <div className="page-loader__logo-halo"></div>
        </div>

        {/* İlerleme Çubuğu & Marka Başlığı */}
        <div className="page-loader__status-container">
          <div className="page-loader__progress-track">
            <div
              className="page-loader__progress-bar"
              style={{ width: `${progress}%` }}
            >
              <div className="page-loader__progress-glow"></div>
            </div>
          </div>

          <div className="page-loader__info">
            <span className="page-loader__brand-title">GÜLMETAY İNŞAAT</span>
            <span className="page-loader__percent">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

