"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./PageLoader.css";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Minimum yükleme süresi
    const minLoadTime = 1500;
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      setTimeout(() => {
        setIsLoading(false);
        // Fade out animasyonu tamamlandıktan sonra component'i DOM'dan kaldır
        setTimeout(() => {
          setIsVisible(false);
        }, 600); // CSS transition süresi ile eşleşmeli
      }, remainingTime);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`page-loader ${!isLoading ? "page-loader--hidden" : ""}`}>
      <div className="page-loader__content">
        <div className="page-loader__logo-wrapper">
          <div className="page-loader__logo-container">
            <Image
              src="/gulmetay-logo.jpg"
              alt="Gülmetay İnşaat"
              width={400}
              height={80}
              priority
              className="page-loader__logo"
            />
          </div>
          <div className="page-loader__logo-glow"></div>
        </div>
        <div className="page-loader__spinner">
          <div className="page-loader__spinner-bar"></div>
        </div>
      </div>
    </div>
  );
}
