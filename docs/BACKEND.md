# Backend dokümantasyonu (Strapi)

Bu belge **Gülmetay-Site** projesinin `backend/` dizinindeki **Strapi 5** uygulamasını açıklar. Genel mimari ve teknoloji listesi için [MIMARI-VE-TEKNOLOJILER.md](MIMARI-VE-TEKNOLOJILER.md), Next.js tarafı için [FRONTEND.md](FRONTEND.md) dosyasına bakın.

---

## İçindekiler

1. [Strapi nedir ve bu projede rolü](#strapi-nedir-ve-bu-projede-rolü)
2. [Klasör ve yapılandırma](#klasör-ve-yapılandırma)
3. [Eklentiler](#eklentiler)
4. [Veritabanı](#veritabanı)
5. [İçerik tipleri (Content-Types)](#i̇çerik-tipleri-content-types)
6. [REST API kullanımı](#rest-api-kullanımı)
7. [İletişim API’si ve Turnstile](#i̇letişim-apisi-ve-turnstile)
8. [Medya ve yüklemeler](#medya-ve-yüklemeler)
9. [Güvenlik ve izinler](#güvenlik-ve-i̇zinler)
10. [Çalıştırma ve Docker](#çalıştırma-ve-docker)

---

## Strapi nedir ve bu projede rolü

[Strapi](https://strapi.io/) açık kaynak bir **headless CMS**’tir. Bu projede:

- İçerik editörleri **Admin paneli** üzerinden proje, kategori, hakkımızda ve iletişim kayıtlarını yönetir.
- **REST API** ile frontend (Next.js) veri okur ve iletişim formu ile yeni kayıt oluşturur.
- **Medya kütüphanesi** ile görseller saklanır ve URL üzerinden sunulur.

Varsayılan API öneki: `/api`. Admin: `/admin`. Üretimde bu yollar genelde Nginx ile Strapi konteynerine yönlendirilir; bkz. [DEPLOYMENT.md](../DEPLOYMENT.md).

---

## Klasör ve yapılandırma

| Yol | Açıklama |
|-----|----------|
| `config/server.ts` | `HOST`, `PORT`, `app.keys` (Strapi `APP_KEYS`) |
| `config/database.ts` | `DATABASE_CLIENT`: `sqlite` \| `postgres` \| `mysql`; bağlantı havuzu ve SSL seçenekleri |
| `config/middlewares.ts` | Strapi varsayılan middleware zinciri (logger, cors, security, body, session, public, …) |
| `config/plugins.ts` | Şu an boş export; ek plugin yapılandırması ileride buraya eklenebilir |
| `config/api.ts` | Strapi API genel ayarları (REST prefix, limitler vb. — projede varsayılanlar) |
| `config/admin.ts` | Admin paneli ayarları |
| `src/index.ts` | `register` / `bootstrap` kancaları; şu an boş, genişletmeye uygun |
| `src/api/<isim>/` | Her içerik tipi: `content-types`, `controllers`, `routes`, `services` |

---

## Eklentiler

`package.json` bağımlılıkları:

- **`@strapi/plugin-users-permissions`**: Public ve authenticated roller; hangi içerik tipi için `find`, `findOne`, `create` açık olacağı **Admin → Settings → Users & Permissions → Roles → Public** üzerinden yönetilir.
- **`@strapi/plugin-cloud`**: Strapi Cloud ile ilgili özellikler (hosting senaryosuna bağlı).

`config/plugins.ts` özel override içermez; eklenti davranışı Strapi varsayılanlarıyladır.

---

## Veritabanı

`config/database.ts` mantığı:

- **`DATABASE_CLIENT`** ortam değişkeni ile seçilir; tanımsızsa varsayılan **`sqlite`**.
- **SQLite**: Dosya yolu `DATABASE_FILENAME` veya `.tmp/data.db` altında `better-sqlite3` ile.
- **PostgreSQL**: Docker Compose üretiminde `DATABASE_HOST=postgres`, `DATABASE_NAME`, kullanıcı, şifre vb. — bkz. [docker-compose.yml](../docker-compose.yml) ve [.env.production](../.env.production) yorumları.
- İsteğe bağlı **`DATABASE_URL`** (connection string) postgres bloğunda desteklenir.

---

## İçerik tipleri (Content-Types)

Aşağıdaki şemalar `backend/src/api/*/content-types/*/schema.json` dosyalarından özetlenmiştir.

### `project` (koleksiyon)

- **Dosya**: `backend/src/api/project/content-types/project/schema.json`
- **Yayın**: `draftAndPublish: true` (taslak / yayın akışı)
- **Alanlar**:

| Alan | Tip | Not |
|------|-----|-----|
| `title` | string | Zorunlu |
| `description` | blocks | Zengin metin (Strapi Blocks) |
| `mainImage` | media (tekil) | Zorunlu |
| `gallery` | media (çoklu) | Galeri |
| `status_deneme` | enumeration | `Completed`, `Ongoing`, `Planned` |
| `startDate`, `endDate` | date | |
| `categories` | relation | `oneToMany` → `category`; karşı tarafta `manyToOne` `project` |
| `slug` | uid | `title` alanından türetilir |

### `category` (koleksiyon)

- **Dosya**: `backend/src/api/category/content-types/category/schema.json`
- **Yayın**: `draftAndPublish: true`
- **Alanlar**: `name` (zorunlu), `slug` (zorunlu), `project` (`manyToOne` → project)

### `about` (single type)

- **Dosya**: `backend/src/api/about/content-types/about/schema.json`
- **Yayın**: `draftAndPublish: true`
- **Alanlar**: `title`, `content`, `vision_title`, `vision_text`, `mission_title`, `mission_text`

Tek kayıt mantığı: API’de genelde tekil uç (Strapi sürümüne göre `/api/about` benzeri).

### `iletisim` (koleksiyon)

- **Dosya**: `backend/src/api/iletisim/content-types/iletisim/schema.json`
- **Yayın**: `draftAndPublish: false` (doğrudan kayıt)
- **Alanlar**: `name`, `email`, `phone`, `subject`, `message` (zorunluluklar şemada işaretli)

**Özel denetleyici**: `create` işlemi Turnstile doğrulaması ile genişletilmiştir (aşağıda).

---

## REST API kullanımı

Strapi 5 REST kalıpları (önek `/api`):

| Kaynak | Tipik uç | Frontend kullanımı |
|--------|-----------|-------------------|
| Projeler | `GET /api/projects` | Liste, `populate=*` ile ilişkiler ve medya |
| Proje (slug) | `GET /api/projects?filters[slug][$eq]=<slug>&populate=*` | Detay sayfası |
| Kategoriler | `GET /api/categories` | Filtre etiketleri |
| Hakkımızda | `GET /api/about` (single type; sürüme göre yol doğrulanmalı) | About sayfası |
| İletişim kaydı | `POST /api/iletisims` | Form gönderimi (Turnstile + `data` gövdesi) |

**Populate**: İlişkili alanlar ve medya için sorgu parametresi `populate=*` veya derin populate sözdizimi kullanılır.

**Filtreleme**: Örnek slug filtresi frontend’de `filters[slug][$eq]` ile kullanılır.

> **Not (frontend ile uyum)**: `frontend/app/projects/page.js` içinde bazı kod yolları `p.category?.name` kullanır; şemada proje tarafındaki ilişki alanı **`categories`** (çoğul) olarak tanımlıdır. API yanıtındaki gerçek JSON yapısına göre filtreleme alan adının gözden geçirilmesi faydalı olabilir.

---

## İletişim API’si ve Turnstile

**Dosya**: `backend/src/api/iletisim/controllers/iletisim.ts`

Akış:

1. İstek gövdesinde **`turnstileToken`** beklenir; yoksa **400** ve mesaj `captcha_failed` benzeri.
2. **`TURNSTILE_SECRET_KEY`** tanımlı değilse **500** (`TURNSTILE_SECRET_KEY is not configured`).
3. Cloudflare **`siteverify`** uç noktasına (varsayılan URL veya `TURNSTILE_VERIFY_URL`) `POST` ile `secret`, `response`, isteğe bağlı `remoteip` gönderilir.
4. Ağ hatasında **502** (`captcha_verify_unreachable`).
5. Yanıtta `success` değilse **400** (`captcha_failed`).
6. Başarılı doğrulamadan sonra **`turnstileToken` gövdeden silinir** (veritabanına yazılmaz).
7. Strapi çekirdek **`create`** çağrılır; normal içerik oluşturma devam eder.

Frontend’in gönderdiği gövde yapısı Strapi’nin beklediği `data` sarmalayıcısı ile uyumludur; ayrıntı: [FRONTEND.md](FRONTEND.md).

---

## Medya ve yüklemeler

- Dosyalar Strapi’nin **`public/uploads`** altında saklanır.
- [docker-compose.yml](../docker-compose.yml) içinde **`strapi-uploads`** volume’u bu dizini kalıcı hale getirir.
- Tarayıcıda görsel URL’i genelde **`NEXT_PUBLIC_STRAPI_URL` + medya `url`** birleşimi ile oluşturulur (frontend dokümantasyonu).

---

## Güvenlik ve izinler

- **CORS ve güvenlik başlıkları**: `strapi::cors`, `strapi::security` middleware’leri açıktır; üretimde izin verilen origin’ler ortam ve proxy ile uyumlu ayarlanmalıdır.
- **Public API**: İçerik ve `iletisim` `create` için **Users & Permissions** ekranından **Public** rolüne ilgili izinler verilmelidir; aksi halde frontend 401/403 alır.
- **Gizli anahtarlar**: `APP_KEYS`, JWT ve şifreleme anahtarları asla repoya commit edilmemelidir; örnek isimler `backend/.env.example` içindedir.

---

## Çalıştırma ve Docker

**Yerel geliştirme** (özet):

```bash
cd backend
npm install
# .env dosyasını .env.example üzerinden oluşturun
npm run develop
```

**Üretim**: `npm run build` sonra `npm run start`; Docker için `backend/Dockerfile` ve kök `docker-compose.yml` kullanılır. Ortam değişkenleri: [MIMARI-VE-TEKNOLOJILER.md](MIMARI-VE-TEKNOLOJILER.md#ortam-değişkenleri-özeti).

Dağıtım adımları: [DEPLOYMENT.md](../DEPLOYMENT.md).
