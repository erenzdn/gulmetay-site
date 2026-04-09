# Gulmetay Site - Docker Deployment Rehberi

Bu dokuman, projenin Docker container'lari ile sunucuya deploy edilmesi icin yapilan degisiklikleri ve adimlari anlatmaktadir.

---

## Mimari

```
Internet
   |
   v
[ Sunucudaki Nginx ] ---- SSL Termination + Reverse Proxy
   |          |                (nginx-proxy-network)
   v          v
[Frontend]  [Backend]
 Next.js     Strapi           (gulmetay-internal)
 :3000       :1337
                |
                v
          [PostgreSQL]
           :5432
```

- **Sunucudaki Nginx**: Dis dunyaya acik tek noktadir. SSL termination yapar. Gelen istekleri URL'e gore frontend veya backend'e dagitir. Projeden bagimsiz olarak sunucuda calisir.
- **Frontend**: Next.js uygulamasi. Standalone modda calisir.
- **Backend**: Strapi CMS. API ve admin paneli saglar.
- **PostgreSQL**: Container olarak calisan veritabani. `gulmetay-internal` network uzerinden backend'e erisim saglar.

### Network Yapisi

| Network | Tip | Amaci |
|---|---|---|
| `gulmetay-internal` | Bridge (internal) | Backend ↔ PostgreSQL iletisimi |
| `nginx-proxy-network` | External | Sunucudaki Nginx ↔ Frontend/Backend iletisimi |

---

## Nginx Yonlendirme Kurallari

| URL Yolu | Yonlendirme | Aciklama |
|---|---|---|
| `/api/*` | `gulmetay-backend:1337` | Strapi REST API |
| `/admin/*` | `gulmetay-backend:1337` | Strapi Admin Paneli |
| `/uploads/*` | `gulmetay-backend:1337` | Yuklenen gorseller |
| `/i18n/*` | `gulmetay-backend:1337` | Strapi dil dosyalari |
| `/content-manager/*` | `gulmetay-backend:1337` | Strapi icerik yonetimi |
| `/content-type-builder/*` | `gulmetay-backend:1337` | Strapi icerik tipi olusturucu |
| `/users-permissions/*` | `gulmetay-backend:1337` | Strapi kullanici izinleri |
| `/*` (diger her sey) | `gulmetay-frontend:3000` | Next.js sayfalari |

---

## Dosya Yapisi

### Docker & Deployment Dosyalari

| Dosya | Aciklama |
|---|---|
| `docker-compose.yml` | PostgreSQL, Backend ve Frontend servislerinin tanimlandigi orkestrasyon dosyasi |
| `backend/Dockerfile` | Strapi icin multi-stage Docker build |
| `frontend/Dockerfile` | Next.js icin multi-stage Docker build (standalone) |
| `nginx/nginx.conf` | Sunucudaki nginx'e eklenecek site konfigurasyonu |
| `.env.production` | Production ortami icin environment variable sablonu |

---

## Sunucuda Deployment Adimlari

### 1. On Kosullar

- Sunucuda Docker ve Docker Compose kurulu olmali
- Sunucuda bir Nginx container'i calisiyor olmali
- Nginx container'inin bagli oldugu Docker network'u bilinmeli (varsayilan: `nginx-proxy-network`)
- Bir domain adiniz olmali ve DNS kayitlari sunucu IP'sine yonlendirilmis olmali

### 2. Repoyu Klonlayin

```bash
git clone <repo-url> /opt/gulmetay-site
cd /opt/gulmetay-site
```

### 3. Nginx Proxy Network'unu Kontrol Edin

Sunucunuzdaki nginx container'inin hangi network'te oldugunu kontrol edin:

```bash
docker inspect <NGINX_CONTAINER_ADI> --format '{{json .NetworkSettings.Networks}}' | jq
```

Eger `nginx-proxy-network` adinda bir network yoksa olusturun:

```bash
docker network create nginx-proxy-network
```

Ve nginx container'inizi bu network'e baglayin:

```bash
docker network connect nginx-proxy-network <NGINX_CONTAINER_ADI>
```

> **Not:** Eger sunucunuzdaki nginx farkli bir network adi kullaniyorsa, `docker-compose.yml` dosyasindaki `nginx-proxy-network` referanslarini o isme degistirin.

### 4. Environment Dosyasini Doldurun

`.env.production` dosyasini acin ve degerleri kendi ortaminiza gore doldurun:

```bash
nano .env.production
```

Onemli alanlar:
- `DATABASE_PASSWORD`: Guclu bir PostgreSQL sifresi
- `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`, `TRANSFER_TOKEN_SALT`: Guclu rastgele degerler

Rastgele deger uretmek icin:
```bash
openssl rand -base64 32
```

### 5. Nginx Konfigurasyonunu Ekleyin

`nginx/nginx.conf` dosyasindaki `YOUR_DOMAIN` ifadelerini kendi domain adinizla degistirin:

```bash
sed -i 's/YOUR_DOMAIN/ornek.com/g' nginx/nginx.conf
```

Sonra bu dosyayi sunucunuzdaki nginx'in config klasorune kopyalayin:

```bash
# Ornek: nginx /etc/nginx/conf.d/ klasorunden config yukluyorsa
cp nginx/nginx.conf /path/to/nginx/conf.d/gulmetay.conf

# Nginx'i yeniden yukleyin
docker exec <NGINX_CONTAINER_ADI> nginx -s reload
```

### 6. Tum Servisleri Baslatin

```bash
docker compose up -d --build
```

Build islemi ilk seferde 5-15 dakika surebilir.

### 7. Durumu Kontrol Edin

```bash
# Tum container'larin durumunu goruntule
docker compose ps

# Loglari izle
docker compose logs -f

# Belirli bir servisin loglarini izle
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f postgres
```

---

## Faydali Komutlar

### Servisleri Yeniden Baslatma

```bash
docker compose restart
```

### Tek Bir Servisi Yeniden Build Etme

```bash
docker compose up -d --build backend   # Sadece backend
docker compose up -d --build frontend  # Sadece frontend
```

### Loglari Goruntuleme

```bash
docker compose logs -f --tail=100
```

### Container'a Baglanma

```bash
docker compose exec backend sh
docker compose exec frontend sh
docker compose exec postgres psql -U postgres -d gulmetay_db
```

### Veritabani Yedekleme

```bash
docker compose exec postgres pg_dump -U postgres gulmetay_db > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Veritabani Geri Yukleme

```bash
cat backup.sql | docker compose exec -T postgres psql -U postgres -d gulmetay_db
```

### Tamamen Durdurma ve Temizleme

```bash
docker compose down           # Durdur
docker compose down -v        # Durdur + volume'lari sil (DIKKAT: veritabani ve upload dosyalari silinir!)
```

---

## Lokal Gelistirme

Docker kurulumu production icin optimize edilmistir. Lokal gelistirme icin:

1. Frontend klasorunde `.env.local` dosyasi olusturun:
   ```
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=<turnstile_site_key>
   ```

2. Backend ve frontend'i ayri ayri baslatin:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run develop

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

## Turnstile (Robot Degilim) Ayarlari

Cloudflare Turnstile icin Cloudflare panelinden bir site olusturun ve anahtarlarinizi alin.

### Gerekli Environment Variable'lar

- Frontend (Next.js):
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- Backend (Strapi):
  - `TURNSTILE_SECRET_KEY`
  - (opsiyonel) `TURNSTILE_VERIFY_URL` (varsayilan: `https://challenges.cloudflare.com/turnstile/v0/siteverify`)

### Strapi Public Izin

Iletisim formu Strapi’ye `POST /api/iletisims` ile kayit atiyor. Bu endpoint public olacaksa Strapi Admin panelinde ilgili content type icin `create` izninin acik oldugunu kontrol edin.

---

## Sorun Giderme

### "Bad Gateway" hatasi

Backend container'inin basariyla basladigini kontrol edin:
```bash
docker compose logs backend
```

### Frontend gorunmuyor

Frontend build loglarini kontrol edin:
```bash
docker compose logs frontend
```

### Veritabani baglanti hatasi

- PostgreSQL container'inin calistigini kontrol edin:
  ```bash
  docker compose ps postgres
  docker compose logs postgres
  ```
- `.env.production` dosyasindaki `DATABASE_HOST` degerinin `postgres` oldugunu kontrol edin (container adi)

### Nginx upstream bulunamiyor

- Frontend ve backend container'larinin `nginx-proxy-network`'e bagli oldugunu kontrol edin:
  ```bash
  docker network inspect nginx-proxy-network
  ```
- Container adlarinin (`gulmetay-frontend`, `gulmetay-backend`) nginx.conf'taki upstream tanimlariyla esledigini kontrol edin
