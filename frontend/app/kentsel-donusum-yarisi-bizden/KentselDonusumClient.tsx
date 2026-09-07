"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Coins,
  CheckCircle2,
  Truck,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Building2,
  HardHat,
  FileCheck,
  Send,
  Sparkles,
  Calculator,
  Sliders,
} from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import "./kentsel-donusum.css";

function formatCurrency(val: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(val);
}

export default function KentselDonusumClient() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [unitCount, setUnitCount] = useState<number>(10);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    location: "",
    buildingAge: "",
    flatCount: "10 Daire",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToFormWithUnits = (count: number) => {
    setFormData((prev) => ({ ...prev, flatCount: `${count} Daire / Bağımsız Bölüm` }));
    const formEl = document.getElementById("basvuru-formu");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const totalGrant = unitCount * 700000;
  const totalLoan = unitCount * 700000;
  const totalRelocation = unitCount * 100000;
  const totalSupport = unitCount * 1500000;

  return (
    <div className="kd-page">
      {/* HERO SECTION */}
      <section className="kd-hero">
        <div className="container">
          <div className="kd-hero__breadcrumb">
            <Link href="/">{t("common.nav.home")}</Link>
            <ChevronRight size={12} />
            <Link href="/hizmetlerimiz">{t("common.nav.services")}</Link>
            <ChevronRight size={12} />
            <span>Kentsel Dönüşüm (Yarısı Bizden)</span>
          </div>

          <div className="kd-hero__inner">
            <div className="kd-hero__content">
              <div className="kd-hero__badge">
                <span className="kd-hero__badge-dot" aria-hidden="true" />
                <ShieldCheck size={15} strokeWidth={2.2} />
                <span>{t("kentselDonusum.hero.badge")}</span>
              </div>

              <h1 className="kd-hero__title">
                {t("kentselDonusum.hero.title")}
              </h1>

              <p className="kd-hero__subtitle">
                {t("kentselDonusum.hero.subtitle")}
              </p>

              <div className="kd-hero__actions">
                <button onClick={() => scrollToFormWithUnits(unitCount)} className="kd-hero__btn-primary">
                  <span>{t("kentselDonusum.hero.btnApply")}</span>
                  <ArrowRight size={16} strokeWidth={2.4} />
                </button>
                <a href="#destek-hesaplama" className="kd-hero__btn-secondary">
                  <span>Destek Hesaplama Aracı</span>
                  <ChevronDown size={16} />
                </a>
              </div>
            </div>

            <div className="kd-hero__visual">
              <Image
                src="/urban-transformation-luxury.jpg"
                alt="Kentsel Dönüşüm Yarısı Bizden Projesi - Gülmetay İnşaat"
                fill
                priority
                sizes="(max-width: 992px) 100vw, 50vw"
                className="kd-hero__img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES / PACKAGES SECTION */}
      <section id="destek-paketi" className="kd-features">
        <div className="container">
          <div className="kd-section-header">
            <p className="kd-section-label">Finansal Destek Paketleri</p>
            <h2 className="kd-section-title">{t("kentselDonusum.features.title")}</h2>
            <p className="kd-section-subtitle">
              {t("kentselDonusum.features.subtitle")}
            </p>
          </div>

          <div className="kd-features__grid">
            <div className="kd-feature-card">
              <div className="kd-feature-card__icon">
                <Coins size={28} />
              </div>
              <h3 className="kd-feature-card__title">
                {t("kentselDonusum.features.grantTitle")}
              </h3>
              <p className="kd-feature-card__desc">
                {t("kentselDonusum.features.grantDesc")}
              </p>
            </div>

            <div className="kd-feature-card">
              <div className="kd-feature-card__icon">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="kd-feature-card__title">
                {t("kentselDonusum.features.loanTitle")}
              </h3>
              <p className="kd-feature-card__desc">
                {t("kentselDonusum.features.loanDesc")}
              </p>
            </div>

            <div className="kd-feature-card">
              <div className="kd-feature-card__icon">
                <Truck size={28} />
              </div>
              <h3 className="kd-feature-card__title">
                {t("kentselDonusum.features.relocationTitle")}
              </h3>
              <p className="kd-feature-card__desc">
                {t("kentselDonusum.features.relocationDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE ESTIMATOR WIDGET (UX BOOST) */}
      <section id="destek-hesaplama" className="kd-calc-section">
        <div className="container">
          <div className="kd-calc-card">
            <div className="kd-calc-header">
              <div className="kd-hero__badge" style={{ background: "rgba(212,163,115,0.15)", margin: "0 auto 16px" }}>
                <Calculator size={16} />
                <span>İnteraktif Hesaplama Aracı</span>
              </div>
              <h2 className="kd-section-title" style={{ color: "#ffffff", marginBottom: "8px" }}>
                Binanız İçin Devlet Desteğini Hesaplayın
              </h2>
              <p className="kd-section-subtitle" style={{ color: "rgba(255,255,255,0.72)" }}>
                Aşağıdaki kaydırıcıyı kullanarak binanızdaki bağımsız bölüm (daire/dükkan) sayısını seçin, toplam finansman katkısını anında görün.
              </p>
            </div>

            <div className="kd-calc-controls">
              <div className="kd-calc-slider-header">
                <span className="kd-calc-slider-label">
                  <Sliders size={18} /> Binadaki Toplam Daire / Dükkan Sayısı:
                </span>
                <span className="kd-calc-slider-value">{unitCount} Daire</span>
              </div>

              <input
                type="range"
                min={1}
                max={40}
                step={1}
                value={unitCount}
                onChange={(e) => setUnitCount(parseInt(e.target.value, 10))}
                className="kd-calc-range"
              />

              <div className="kd-calc-preset-buttons">
                {[4, 8, 10, 12, 16, 20, 30].map((num) => (
                  <button
                    key={num}
                    onClick={() => setUnitCount(num)}
                    className={`kd-calc-preset ${unitCount === num ? "kd-calc-preset--active" : ""}`}
                  >
                    {num} Daire
                  </button>
                ))}
              </div>
            </div>

            <div className="kd-calc-results">
              <div className="kd-calc-result-box">
                <span className="kd-calc-result-title">Geri Ödemesiz Hibe</span>
                <span className="kd-calc-result-amount">{formatCurrency(totalGrant)}</span>
                <span className="kd-calc-result-desc">Daire başı 700 Bin ₺</span>
              </div>

              <div className="kd-calc-result-box">
                <span className="kd-calc-result-title">Uygun Faizli Kredi</span>
                <span className="kd-calc-result-amount">{formatCurrency(totalLoan)}</span>
                <span className="kd-calc-result-desc">Daire başı 700 Bin ₺</span>
              </div>

              <div className="kd-calc-result-box">
                <span className="kd-calc-result-title">Taşınma Desteği</span>
                <span className="kd-calc-result-amount">{formatCurrency(totalRelocation)}</span>
                <span className="kd-calc-result-desc">Karşılıksız nakdi yardım</span>
              </div>
            </div>

            <div className="kd-calc-total-banner">
              <div>
                <span className="kd-calc-total-label">Binanıza Sağlanacak Toplam Devlet Katkısı:</span>
                <span className="kd-calc-total-value">{formatCurrency(totalSupport)}</span>
              </div>
              <button
                onClick={() => scrollToFormWithUnits(unitCount)}
                className="kd-hero__btn-primary"
                style={{ padding: "14px 28px" }}
              >
                <span>Bu Tutarlar İle Ücretsiz Keşif İste</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ENGINEERING & INTERIOR QUALITY SECTION */}
      <section className="kd-engineering">
        <div className="container">
          <div className="kd-engineering__inner">
            <div className="kd-engineering__visual">
              <Image
                src="/urban-transformation-interior.jpg"
                alt="Modern Lüks İç Mekan ve Depreme Dayanıklı Mimari Yapı"
                fill
                sizes="(max-width: 992px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="kd-engineering__content">
              <div className="kd-hero__badge" style={{ background: "rgba(212,163,115,0.1)", color: "var(--primary-gold)", border: "1px solid rgba(212,163,115,0.3)" }}>
                <Sparkles size={16} />
                <span>{t("kentselDonusum.engineering.badge")}</span>
              </div>

              <h2 className="kd-section-title">
                {t("kentselDonusum.engineering.title")}
              </h2>

              <p className="kd-section-subtitle" style={{ textAlign: "left", margin: "0 0 24px" }}>
                {t("kentselDonusum.engineering.desc")}
              </p>

              <div className="kd-engineering__points">
                <div className="kd-engineering__point">
                  <Building2 size={20} className="kd-engineering__point-icon" />
                  <span>{t("kentselDonusum.engineering.point1")}</span>
                </div>
                <div className="kd-engineering__point">
                  <HardHat size={20} className="kd-engineering__point-icon" />
                  <span>{t("kentselDonusum.engineering.point2")}</span>
                </div>
                <div className="kd-engineering__point">
                  <FileCheck size={20} className="kd-engineering__point-icon" />
                  <span>{t("kentselDonusum.engineering.point3")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STEP-BY-STEP PROCESS SECTION */}
      <section className="kd-process">
        <div className="container">
          <div className="kd-section-header">
            <p className="kd-section-label" style={{ color: "var(--primary-gold)" }}>Rehber</p>
            <h2 className="kd-section-title">{t("kentselDonusum.process.title")}</h2>
            <p className="kd-section-subtitle">
              {t("kentselDonusum.process.subtitle")}
            </p>
          </div>

          <div className="kd-process__grid">
            <div className="kd-process-card">
              <div className="kd-process-card__number">01</div>
              <h3 className="kd-process-card__title">
                {t("kentselDonusum.process.step1Title")}
              </h3>
              <p className="kd-process-card__desc">
                {t("kentselDonusum.process.step1Desc")}
              </p>
            </div>

            <div className="kd-process-card">
              <div className="kd-process-card__number">02</div>
              <h3 className="kd-process-card__title">
                {t("kentselDonusum.process.step2Title")}
              </h3>
              <p className="kd-process-card__desc">
                {t("kentselDonusum.process.step2Desc")}
              </p>
            </div>

            <div className="kd-process-card">
              <div className="kd-process-card__number">03</div>
              <h3 className="kd-process-card__title">
                {t("kentselDonusum.process.step3Title")}
              </h3>
              <p className="kd-process-card__desc">
                {t("kentselDonusum.process.step3Desc")}
              </p>
            </div>

            <div className="kd-process-card">
              <div className="kd-process-card__number">04</div>
              <h3 className="kd-process-card__title">
                {t("kentselDonusum.process.step4Title")}
              </h3>
              <p className="kd-process-card__desc">
                {t("kentselDonusum.process.step4Desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FREE CONSULTATION FORM SECTION */}
      <section id="basvuru-formu" className="kd-form-section">
        <div className="container">
          <div className="kd-section-header">
            <p className="kd-section-label">Ücretsiz Danışmanlık</p>
            <h2 className="kd-section-title">{t("kentselDonusum.form.title")}</h2>
            <p className="kd-section-subtitle">
              {t("kentselDonusum.form.subtitle")}
            </p>
          </div>

          <div className="kd-form-card">
            {formSubmitted ? (
              <div className="kd-form-success">
                <CheckCircle2 size={24} />
                <span>{t("kentselDonusum.form.successMsg")}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="kd-form-grid">
                  <div className="kd-form-group">
                    <label className="kd-form-label">{t("kentselDonusum.form.fullName")} *</label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Ahmet Yılmaz"
                      className="kd-form-input"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="kd-form-group">
                    <label className="kd-form-label">{t("kentselDonusum.form.phone")} *</label>
                    <input
                      type="tel"
                      required
                      placeholder="05XX XXX XX XX"
                      className="kd-form-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="kd-form-group">
                    <label className="kd-form-label">{t("kentselDonusum.form.location")} *</label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Kadıköy / Moda"
                      className="kd-form-input"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  <div className="kd-form-group">
                    <label className="kd-form-label">{t("kentselDonusum.form.buildingAge")}</label>
                    <input
                      type="text"
                      placeholder="Örn: 25 Yıl"
                      className="kd-form-input"
                      value={formData.buildingAge}
                      onChange={(e) => setFormData({ ...formData, buildingAge: e.target.value })}
                    />
                  </div>

                  <div className="kd-form-group kd-form-group--full">
                    <label className="kd-form-label">{t("kentselDonusum.form.flatCount")}</label>
                    <input
                      type="text"
                      placeholder="Örn: 10 Daire / 2 Dükkan"
                      className="kd-form-input"
                      value={formData.flatCount}
                      onChange={(e) => setFormData({ ...formData, flatCount: e.target.value })}
                    />
                  </div>

                  <div className="kd-form-group kd-form-group--full">
                    <label className="kd-form-label">{t("kentselDonusum.form.notes")}</label>
                    <textarea
                      rows={4}
                      placeholder="Binanızla ilgili eklemek istediğiniz detaylar..."
                      className="kd-form-textarea"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>
                </div>

                <button type="submit" className="kd-form-submit">
                  <span>{t("kentselDonusum.form.btnSubmit")}</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="kd-faq">
        <div className="container">
          <div className="kd-section-header">
            <p className="kd-section-label">SSS</p>
            <h2 className="kd-section-title">{t("kentselDonusum.faq.title")}</h2>
            <p className="kd-section-subtitle">
              {t("kentselDonusum.faq.subtitle")}
            </p>
          </div>

          <div className="kd-faq__list">
            <div className={`kd-faq-item ${openFaq === 0 ? "kd-faq-item--open" : ""}`}>
              <button onClick={() => toggleFaq(0)} className="kd-faq-question">
                <span>{t("kentselDonusum.faq.q1")}</span>
                <ChevronDown
                  size={20}
                  style={{
                    transform: openFaq === 0 ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.25s ease",
                  }}
                />
              </button>
              {openFaq === 0 && (
                <div className="kd-faq-answer">
                  <p>{t("kentselDonusum.faq.a1")}</p>
                </div>
              )}
            </div>

            <div className={`kd-faq-item ${openFaq === 1 ? "kd-faq-item--open" : ""}`}>
              <button onClick={() => toggleFaq(1)} className="kd-faq-question">
                <span>{t("kentselDonusum.faq.q2")}</span>
                <ChevronDown
                  size={20}
                  style={{
                    transform: openFaq === 1 ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.25s ease",
                  }}
                />
              </button>
              {openFaq === 1 && (
                <div className="kd-faq-answer">
                  <p>{t("kentselDonusum.faq.a2")}</p>
                </div>
              )}
            </div>

            <div className={`kd-faq-item ${openFaq === 2 ? "kd-faq-item--open" : ""}`}>
              <button onClick={() => toggleFaq(2)} className="kd-faq-question">
                <span>{t("kentselDonusum.faq.q3")}</span>
                <ChevronDown
                  size={20}
                  style={{
                    transform: openFaq === 2 ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.25s ease",
                  }}
                />
              </button>
              {openFaq === 2 && (
                <div className="kd-faq-answer">
                  <p>{t("kentselDonusum.faq.a3")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
