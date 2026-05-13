# SEO Optimizasyonu Dokümantasyonu

Bu belge **Gülmetay-Site** projesinin frontend tarafında uygulanan kapsamlı SEO (Arama Motoru Optimizasyonu) çalışmalarını açıklar. Genel mimari için [MIMARI-VE-TEKNOLOJILER.md](MIMARI-VE-TEKNOLOJILER.md), Next.js detayları için [FRONTEND.md](FRONTEND.md), Strapi API için [BACKEND.md](BACKEND.md) dosyasına bakın.

---

## İçindekiler

1. [Genel Bakış](#genel-bakış)
2. [Mimari Değişiklik: Server/Client Ayırımı](#mimari-değişiklik-serverclient-ayırımı)
3. [Merkezi SEO Yapılandırması](#merkezi-seo-yapılandırması)
4. [Sayfa Bazlı Meta Etiketleri](#sayfa-bazlı-meta-etiketleri)
5. [JSON-LD Yapılandırılmış Veri](#json-ld-yapılandırılmış-veri)
6. [Semantik HTML Düzeltmeleri](#semantik-html-düzeltmeleri)
7. [Görsel Optimizasyonu](#görsel-optimizasyonu)
8. [Sitemap ve Robots](#sitemap-ve-robots)
9. [Font Performansı](#font-performansı)
10. [Dosya Yapısı Özeti](#dosya-yapısı-özeti)
11. [Anahtar Kelime Stratejisi](#anahtar-kelime-stratejisi)

---

## Genel Bakış

Proje, Google Core Web Vitals standartlarına tam uyumluluk hedefiyle aşağıdaki beş ana eksende optimize edilmiştir:

| Eksen | Önceki Durum | Sonraki Durum |
|-------|-------------|---------------|
| **Meta Etiketleri** | Yalnızca kök layout'ta sabit `title` ve `description` | Her sayfada özel title, description, OpenGraph, Twitter Card |
| **Yapılandırılmış Veri** | Yok | Organization JSON-LD (tüm sayfalar) + CreativeWork JSON-LD (proje detay) |
| **Semantik HTML** | `<section>` ağırlıklı, `<header>/<article>` yok, H2 atlamaları | Doğru H1-H3 hiyerarşisi, `<header>`, `<article>`, `aria-label` |
| **Görsel Performans** | Düz `<img>`, lazy loading yok | `next/image` ile otomatik optimizasyon, `fill`, `sizes`, `priority` |
| **Sitemap / Robots** | Yok | Dinamik `sitemap.xml` (Strapi entegreli) + `robots.txt` |

---

## Mimari Değişiklik: Server/Client Ayırımı

### Problem

Next.js App Router'da `metadata` export'u ve `generateMetadata` fonksiyonu yalnızca **Server Component** dosyalarında çalışır. Projedeki tüm sayfalar (`page.js`) `"use client"` olarak işaretlenmişti, bu yüzden sayfa bazlı metadata tanımlanamıyordu.

### Çözüm

Her sayfanın interaktif mantığı ayrı bir `*Client.tsx` dosyasına taşındı. `page.tsx` dosyaları Server Component olarak yeniden yazılarak `metadata` / `generateMetadata` export'u mümkün hale getirildi.

```
ÖNCE:
  app/about/page.js        ← "use client" + veri + UI + metadata yok

SONRA:
  app/about/page.tsx       ← Server Component + metadata export
  app/about/AboutClient.tsx ← "use client" + veri + UI
```

Etkilenen sayfa listesi:

| Sayfa | Server Component | Client Component |
|-------|-----------------|------------------|
| Ana Sayfa (`/`) | `app/page.tsx` | `app/HomeClient.tsx` |
| Hakkımızda (`/about`) | `app/about/page.tsx` | `app/about/AboutClient.tsx` |
| İletişim (`/contact`) | `app/contact/page.tsx` | `app/contact/ContactClient.tsx` |
| Projeler (`/projects`) | `app/projects/page.tsx` | `app/projects/ProjectsClient.tsx` |
| Proje Detay (`/projects/[slug]`) | `app/projects/[slug]/page.tsx` | `app/projects/[slug]/ProjectDetailClient.tsx` |

---

## Merkezi SEO Yapılandırması

Tüm SEO sabitlerini ve yardımcı fonksiyonları barındıran merkezi dosya: **`frontend/lib/seo.config.ts`**

### İçerdiği sabitler

| Sabit | Açıklama |
|-------|----------|
| `SITE_NAME` | "Gülmetay İnşaat" |
| `SITE_URL` | Üretim URL'si (`NEXT_PUBLIC_SITE_URL` env'den okunur) |
| `STRAPI_URL` | Backend API URL'si |
| `SITE_DESCRIPTION` | Varsayılan site açıklaması (anahtar kelimelerle zenginleştirilmiş) |
| `DEFAULT_KEYWORDS` | 10 adet hedef anahtar kelime dizisi |
| `DEFAULT_OG_IMAGE` | OpenGraph paylaşım görseli yolu |
| `ORGANIZATION_JSONLD` | Organization schema.org verisi |

### `createMetadata()` Yardımcı Fonksiyonu

Her sayfa için tutarlı metadata üretmeyi kolaylaştıran bir wrapper fonksiyon:

```typescript
import { createMetadata } from "@/lib/seo.config";

export const metadata = createMetadata({
  title: "Hakkımızda",
  description: "Özel açıklama...",
  openGraph: { url: "/about" },
  alternates: { canonical: "/about" },
});
```

Bu fonksiyon otomatik olarak:
- Title'a site adını template olarak ekler (`%s | Gülmetay İnşaat`)
- OpenGraph ve Twitter Card etiketlerini varsayılanlarla doldurur
- Keywords ve authors alanlarını ayarlar

---

## Sayfa Bazlı Meta Etiketleri

### Kök Layout (`app/layout.tsx`)

Tüm sayfalara miras kalan temel metadata:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gülmetay İnşaat | Endüstriyel Yapı & İskele Sistemleri",
    template: "%s | Gülmetay İnşaat",
  },
  description: SITE_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: "Gülmetay İnşaat" }],
  robots: { index: true, follow: true },
  openGraph: { type: "website", locale: "tr_TR", ... },
  twitter: { card: "summary_large_image", ... },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0C1B33",
};
```

### Statik Sayfalar

Her statik sayfa (`/`, `/about`, `/contact`, `/projects`) kendi `page.tsx` dosyasında `createMetadata()` ile özelleştirilmiş metadata export eder:

- **Ana Sayfa**: "Ana Sayfa | Gülmetay İnşaat" + endüstriyel yapı, iskele sistemleri odaklı description
- **Hakkımızda**: "Hakkımızda | Gülmetay İnşaat" + 30 yıllık tecrübe vurgusu
- **İletişim**: "İletişim | Gülmetay İnşaat" + Başakşehir konum bilgisi
- **Projeler**: "Projelerimiz | Gülmetay İnşaat" + tamamlanan/devam eden projeler

### Dinamik Sayfa: Proje Detay

`/projects/[slug]` sayfası `generateMetadata` async fonksiyonu ile Strapi'den proje verisini çekip dinamik metadata üretir:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const project = await fetchProject(slug);
  return {
    title: `${project.title} | Gülmetay İnşaat Projeleri`,
    description: project.description?.substring(0, 160),
    openGraph: {
      type: "article",
      images: project.mainImage ? [{ url: strapiUrl + project.mainImage.url }] : [],
    },
  };
}
```

Her proje sayfası kendine özgü:
- Proje başlığını title'da taşır
- Proje açıklamasını (ilk 160 karakter) description olarak kullanır
- Proje ana görselini OpenGraph image olarak sunar
- Proje kategorisini keywords'e ekler

---

## JSON-LD Yapılandırılmış Veri

Google'ın zengin sonuçlar (rich results) gösterebilmesi için schema.org uyumlu yapılandırılmış veriler eklendi.

### JsonLd Bileşeni (`components/JsonLd.tsx`)

Yeniden kullanılabilir bir bileşen:

```tsx
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

### Organization Schema (Tüm Sayfalar)

`layout.tsx` içinde render edilir, her sayfada görünür:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Gülmetay İnşaat",
  "url": "https://gulmetay.com.tr",
  "logo": "https://gulmetay.com.tr/logo.svg",
  "foundingDate": "1994",
  "description": "1994'ten beri endüstriyel yapı, iskele sistemleri...",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Bahçeşehir 2. Kısım Mah. 12. Cadde...",
    "addressLocality": "Başakşehir",
    "addressRegion": "İstanbul",
    "addressCountry": "TR"
  },
  "contactPoint": [
    { "@type": "ContactPoint", "telephone": "+90-212-418-09-09", "contactType": "customer service" },
    { "@type": "ContactPoint", "telephone": "+90-535-819-77-64", "contactType": "customer service" }
  ],
  "email": "bilgi@gulmetay.com.tr"
}
```

### CreativeWork Schema (Proje Detay)

Her proje detay sayfasında, sunucu tarafında Strapi'den çekilen veriyle dinamik olarak üretilir:

```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Proje Başlığı",
  "description": "Proje açıklaması...",
  "image": "https://strapi-url/uploads/gorsel.jpg",
  "url": "https://gulmetay.com.tr/projects/proje-slug",
  "provider": {
    "@type": "Organization",
    "name": "Gülmetay İnşaat"
  },
  "genre": "Kategori Adı"
}
```

---

## Semantik HTML Düzeltmeleri

### Yapılan Değişiklikler

| Element | Öncesi | Sonrası | Etkilenen Sayfalar |
|---------|--------|---------|-------------------|
| Hero bölümleri | `<section>` | `<header>` | Ana Sayfa, İletişim, Projeler, Proje Detay, Hakkımızda |
| Hizmet kartları | `<div>` | `<article>` | Ana Sayfa |
| Proje kartları | `<div>` | `<article>` | Ana Sayfa (öne çıkan projeler) |
| Hakkımızda içerik bloğu | `<div>` | `<article>` | Hakkımızda |
| Vizyon/Misyon kartları | `<div>` | `<article>` | Hakkımızda |
| Proje detay sayfası | `<div>` (kök) | `<article>` (kök) | Proje Detay |

### Başlık Hiyerarşisi Düzeltmeleri

| Sayfa | Önceki Sorun | Çözüm |
|-------|-------------|-------|
| Hakkımızda | H1 → H3 (H2 atlanmış) | "Vizyonumuz & Misyonumuz" H2 başlığı eklendi |
| Projeler Listesi | H1 → H3 (H2 atlanmış) | "Tüm Projelerimiz" screen-reader H2 (`sr-only`) eklendi |

### Eklenen Erişilebilirlik Özellikleri

- Section'lara `aria-label` eklendi ("İstatistikler", "Hizmetlerimiz", "Öne Çıkan Projeler", "İletişime Geçin", "Proje Listesi", "Vizyon ve Misyon")
- Lightbox kapatma butonuna `aria-label="Galeriyi kapat"` eklendi
- `.sr-only` CSS sınıfı `globals.css`'e eklendi (görsel olarak gizli ama ekran okuyucuya görünür içerik için)

---

## Görsel Optimizasyonu

### next.config.ts - Uzak Görsel Alanları

Strapi'den gelen görsellerin `next/image` tarafından optimize edilebilmesi için uzak alan tanımları eklendi:

```typescript
images: {
  remotePatterns: [
    { protocol: "https", hostname: "**.gulmetay.com" },
    { protocol: "https", hostname: "**.gulmetay.com.tr" },
    { protocol: "http", hostname: "localhost" },
    { protocol: "http", hostname: "127.0.0.1" },
  ],
},
```

### `<img>` → `next/image` Dönüşümü

| Konum | Öncesi | Sonrası |
|-------|--------|---------|
| Ana Sayfa proje kartları | `<img src={...} />` | `<Image fill sizes="..." loading="lazy" />` |
| Projeler listesi kartları | `<img src={...} />` | `<Image fill sizes="..." loading="lazy" />` |
| Proje detay hero görseli | `<img src={...} />` | `<Image fill sizes="100vw" priority />` |
| Proje detay galeri | `<img src={...} />` | `<Image fill sizes="..." loading="lazy" />` |
| Proje detay lightbox | `<img>` (korundu) | `<img>` — lightbox modal'da tam çözünürlük gerektiğinden `next/image` uygun değil |

**`fill` + `sizes` stratejisi:**
- Kart görselleri: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`
- Hero görseller: `sizes="100vw"` + `priority` (LCP optimizasyonu)

### Alt Etiket İyileştirmeleri

| Konum | Önceki `alt` | Yeni `alt` |
|-------|-------------|------------|
| Proje kartları | `project.title` (zaten doğru) | Korundu |
| Galeri görselleri | `"Galeri Görseli ${index + 1}"` | `"${project.title} - Galeri ${index + 1}"` |
| Lightbox | `"Büyük Görsel"` | `project.title` |

---

## Sitemap ve Robots

### Dinamik Sitemap (`app/sitemap.ts`)

Next.js App Router'ın yerleşik sitemap desteği kullanılarak oluşturuldu. Build çıktısında `/sitemap.xml` olarak sunulur.

**Statik sayfalar:**

| URL | Öncelik | Değişim Sıklığı |
|-----|---------|----------------|
| `/` | 1.0 | weekly |
| `/projects` | 0.9 | weekly |
| `/about` | 0.8 | monthly |
| `/contact` | 0.7 | monthly |

**Dinamik sayfalar:**

Strapi API'sinden tüm proje slug'ları ve `updatedAt` tarihleri çekilerek her proje sayfası 0.8 öncelikle sitemap'e eklenir. API erişilemezse yalnızca statik sayfalar döner.

Revalidation: 1 saat (`next: { revalidate: 3600 }`)

### Robots.txt (`app/robots.ts`)

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: https://gulmetay.com.tr/sitemap.xml
```

---

## Font Performansı

### Önceki Durum

Google Fonts `<link>` etiketleri ile yükleniyordu (render-blocking, CLS riski):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@..." rel="stylesheet" />
```

### Yeni Durum

`next/font/google` ile derleme zamanında font dosyaları indirilip self-host edilir:

```typescript
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});
```

Kazanımlar:
- Harici font isteği yok (FOUT/FOIT azalır)
- CLS (Cumulative Layout Shift) iyileşmesi
- `display: "swap"` ile metin hemen görünür, font yüklenince değişir

---

## Dosya Yapısı Özeti

```
frontend/
├── lib/
│   └── seo.config.ts              ← SEO sabitleri ve yardımcı fonksiyonlar
├── components/
│   ├── JsonLd.tsx                  ← JSON-LD yapılandırılmış veri bileşeni
│   ├── Navbar.js
│   └── Footer.js
├── app/
│   ├── layout.tsx                  ← Genişletilmiş metadata, next/font, Organization JSON-LD
│   ├── globals.css                 ← .sr-only sınıfı eklendi
│   ├── page.tsx                    ← Server Component + metadata (Ana Sayfa)
│   ├── HomeClient.tsx              ← Client Component (Ana Sayfa UI)
│   ├── sitemap.ts                  ← Dinamik sitemap.xml üretimi
│   ├── robots.ts                   ← robots.txt üretimi
│   ├── about/
│   │   ├── page.tsx                ← Server Component + metadata
│   │   └── AboutClient.tsx         ← Client Component + H2 düzeltmesi
│   ├── contact/
│   │   ├── page.tsx                ← Server Component + metadata
│   │   └── ContactClient.tsx       ← Client Component + header semantiği
│   └── projects/
│       ├── page.tsx                ← Server Component + metadata
│       ├── ProjectsClient.tsx      ← Client Component + H2 + next/image
│       └── [slug]/
│           ├── page.tsx            ← generateMetadata + CreativeWork JSON-LD
│           └── ProjectDetailClient.tsx ← Client Component + next/image + semantik HTML
└── next.config.ts                  ← images.remotePatterns eklendi
```

---

## Anahtar Kelime Stratejisi

Meta etiketleri, başlıklar ve açıklamalara stratejik olarak yerleştirilen anahtar kelimeler:

### Birincil Anahtar Kelimeler
- Gülmetay İnşaat
- Endüstriyel yapı
- İskele sistemleri
- Mühendislik çözümleri

### İkincil Anahtar Kelimeler
- İstanbul inşaat firması
- Konut projeleri
- Yapı mühendisliği
- 1994'ten beri

### Uzun Kuyruk Anahtar Kelimeler
- Endüstriyel yapı projeleri İstanbul
- İskele sistemleri kurulumu
- Profesyonel inşaat çözümleri
- Anahtar teslim inşaat
- Kentsel dönüşüm projeleri

### Anahtar Kelime Yerleşim Noktaları

| Nokta | Örnek Kullanım |
|-------|---------------|
| `<title>` | "Gülmetay İnşaat \| Endüstriyel Yapı & İskele Sistemleri" |
| `meta description` | "1994'ten beri endüstriyel yapı, iskele sistemleri ve mühendislik çözümleri sunan..." |
| `keywords` meta | `["Gülmetay İnşaat", "endüstriyel yapı", "iskele sistemleri", ...]` |
| Organization JSON-LD | `description` alanı |
| OpenGraph `title` | Her sayfada özel |
| `<h1>` başlıkları | Sayfa ana konusu |
| `alt` etiketleri | Proje adları ve açıklamaları |
