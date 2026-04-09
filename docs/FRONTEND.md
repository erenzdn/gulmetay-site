# Frontend dokümantasyonu (Next.js)

Bu belge **Gülmetay-Site** projesinin `frontend/` dizinindeki **Next.js 16** uygulamasını açıklar. Genel mimari için [MIMARI-VE-TEKNOLOJILER.md](MIMARI-VE-TEKNOLOJILER.md), Strapi modelleri ve API için [BACKEND.md](BACKEND.md) dosyasına bakın.

---

## İçindekiler

1. [Next.js ve App Router](#nextjs-ve-app-router)
2. [Klasör yapısı](#klasör-yapısı)
3. [Kök düzen ve ortak bileşenler](#kök-düzen-ve-ortak-bileşenler)
4. [Sayfa rotaları ve davranış](#sayfa-rotaları-ve-davranış)
5. [Strapi ile veri alışverişi](#strapi-ile-veri-alışverişi)
6. [İletişim sayfası ve Turnstile](#i̇letişim-sayfası-ve-turnstile)
7. [Stil ve tasarım](#stil-ve-tasarım)
8. [Yapılandırma, build ve Docker](#yapılandırma-build-ve-docker)
9. [Bilinen uyum notu](#bilinen-uyum-notu)

---

## Next.js ve App Router

- **Framework**: Next.js **16** (`app/` dizini ile [App Router](https://nextjs.org/docs/app)).
- **React**: **19.2.x**
- **Dil**: Sayfalar çoğunlukla **JavaScript** (`.js`); kök düzen **TypeScript** (`layout.tsx`).
- **İstemci bileşenleri**: Veri çekimi, form ve etkileşim için sayfalarda `"use client"` kullanılır; bu sayede `useEffect`, `useState`, `fetch` tarayıcıda çalışır.

---

## Klasör yapısı

| Yol | Açıklama |
|-----|----------|
| `app/` | Rotalar, `layout.tsx`, `globals.css`, `page.tsx` / `page.js` |
| `app/projects/` | Proje listesi |
| `app/projects/[slug]/` | Proje detayı (dinamik segment) |
| `app/about/` | Hakkımızda |
| `app/contact/` | İletişim formu |
| `components/` | `Navbar.js`, `Footer.js` |
| `public/` | Statik varlıklar (logo, svg) |
| `next.config.ts` | `output: "standalone"` — Docker için uygun çıktı |
| `package.json` | Scriptler: `dev`, `build`, `start`, `lint` |

---

## Kök düzen ve ortak bileşenler

**Dosya**: `frontend/app/layout.tsx`

- **`metadata`**: `title` ve `description` (SEO temeli).
- **`lang="tr"`**: HTML dil özniteliği.
- **Google Fonts**: `Playfair Display`, `DM Sans`, `Cormorant Garamond` — `<head>` içinde link ile.
- **Yapı**: `<Navbar />`, `<main>{children}</main>`, `<Footer />`; gövde için minimal inline stil (`margin: 0`).

**Navbar / Footer**: `components/Navbar.js`, `components/Footer.js` — tüm sayfalarda ortak gezinme ve alt bilgi.

---

## Sayfa rotaları ve davranış

| Rota | Dosya | Özet |
|------|--------|------|
| `/` | `app/page.tsx` | Hero, hizmetler grid’i, Strapi’den son 3 proje, istatistik animasyonu, CTA; çoğunlukla inline CSS |
| `/projects` | `app/projects/page.js` | Tüm projeler + kategori filtresi; yükleme durumu |
| `/projects/[slug]` | `app/projects/[slug]/page.js` | Slug ile tek proje; galeri ve seçili görsel |
| `/about` | `app/about/page.js` | Hakkımızda içeriği (Strapi `about` single type ile uyumlu olacak şekilde tasarlanmış) |
| `/contact` | `app/contact/page.js` | Form + Cloudflare Turnstile |

---

## Strapi ile veri alışverişi

### Ortam değişkeni

Tüm tarayıcı `fetch` çağrıları **`process.env.NEXT_PUBLIC_STRAPI_URL`** ile başlar. Tanımsızsa boş string kullanılır; üretimde mutlaka doğru kök URL verilmelidir (protokol + alan, path gerekmez `/api` öneki fetch içinde eklenir).

### Örnek kalıplar (koddan)

- **Ana sayfa — son projeler**:  
  `GET ${NEXT_PUBLIC_STRAPI_URL}/api/projects?populate=*&pagination[limit]=3&sort=createdAt:desc`
- **Proje listesi**:  
  `GET .../api/projects?populate=*` ve `GET .../api/categories`
- **Proje detay**:  
  `GET .../api/projects?filters[slug][$eq]=${slug}&populate=*`

### Medya URL’leri

Örnek: ana görsel için  
`${NEXT_PUBLIC_STRAPI_URL}${project.mainImage.url}`  

Strapi’nin döndürdüğü `url` genelde `/uploads/...` ile başlar; taban URL ile birleştirme tam adresi verir.

### Kimlik doğrulama

Mevcut sayfalar **public** Strapi endpoint’lerini kullanır; istek başlığında JWT yoktur. Strapi **Users & Permissions** içinde Public rolü ilgili `find` / `create` izinleriyle açık olmalıdır.

---

## İletişim sayfası ve Turnstile

**Dosya**: `frontend/app/contact/page.js`

1. **`NEXT_PUBLIC_TURNSTILE_SITE_KEY`**: Cloudflare Turnstile widget’ı için. Üretimde yoksa kullanıcıya genel bir hata mesajı; geliştirmede eksik anahtar uyarısı.
2. Script ile `window.turnstile.render` — callback’lerde token state’e yazılır; süre dolunca veya hata durumunda token temizlenir.
3. **Gönderim**:  
   `POST ${NEXT_PUBLIC_STRAPI_URL}/api/iletisims`  
   Gövde (JSON):

   ```json
   {
     "turnstileToken": "<token>",
     "data": {
       "name": "...",
       "email": "...",
       "phone": "...",
       "subject": "...",
       "message": "..."
     }
   }
   ```

   Backend önce token’ı doğrular, token’ı silerek Strapi `create` çalıştırır; ayrıntı [BACKEND.md](BACKEND.md#i̇letişim-apisi-ve-turnstile).

4. Başarılı yanıtta form sıfırlanır ve Turnstile widget resetlenir.

---

## Stil ve tasarım

- **`app/globals.css`**: Tailwind CSS **v4** (`@import "tailwindcss"`), `:root` içinde marka renkleri ve font CSS değişkenleri (`--primary-dark`, `--primary-gold`, `--font-heading`, …), temel reset ve `html`/`body` kuralları.
- **Sayfa bileşenleri**: Çoğu yerde **inline `style` objeleri** ve yerel **`styled-jsx`** (`<style jsx>`) ile animasyonlar; Tailwind sınıfları sayfa JSX’inde sınırlı kullanılıyor olabilir.
- **Tipografi**: Başlıklarda Playfair Display, gövdede DM Sans (layout’taki font linkleri ile).

---

## Yapılandırma, build ve Docker

- **`next.config.ts`**: `output: "standalone"` — imaj içinde yalnızca gerekli dosyaları içeren Next çıktısı (Docker için uygun).
- **Docker**: `frontend/Dockerfile`; `docker-compose.yml` içinde build arg:  
  `NEXT_PUBLIC_STRAPI_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`  
  Bu değerler **build zamanında** gömülür; değişince imajın yeniden üretilmesi gerekir.

**Yerel**:

```bash
cd frontend
npm install
npm run dev
```

**Lint**: `npm run lint`

---

## Bilinen uyum notu

`app/projects/page.js` içinde kategori filtresi **`p.category?.name`** kullanıyor olabilir. Strapi şemasında proje–kategori ilişkisi projede **`categories`** (çoğul) olarak tanımlıdır. Filtrenin çalışması için API yanıtındaki alan adının (ör. `categories` dizisi ve ilk elemanın `name`’i) kodla eşleşmesi gerekir; aksi halde filtre beklenen şekilde işlemeyebilir. Bu dokümantasyon kapsamında kod değiştirilmedi; geliştirici olarak API yanıtını tarayıcı ağı sekmesinden doğrulamanız önerilir.

---

## İlgili belgeler

- [MIMARI-VE-TEKNOLOJILER.md](MIMARI-VE-TEKNOLOJILER.md)
- [BACKEND.md](BACKEND.md)
- [DEPLOYMENT.md](../DEPLOYMENT.md)
