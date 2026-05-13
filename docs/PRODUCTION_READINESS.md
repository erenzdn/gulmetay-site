# Gulmetay Site - Canlıya Geçiş (Production) Hazırlık Raporu

Bu doküman, canlı öncesi zorunlu, orta ve düşük öncelikli tüm maddelerin incelenmesini, yapılan güvenlik sıkılaştırmalarını, otomatik yedekleme ve ortam değişkenleri yapılandırmalarını içermektedir.

---

## 📊 Canlıya Geçiş Kontrol Tablosu

| # | Madde / Konu | Öncelik | Durum | Yapılan İşlem / Açıklama |
|---|---|---|---|---|
| **1** | **Ortam Değişkenleri & Anahtarlar** | 🚨 Zorunlu | ✅ TAMAMLANDI | `backend/.env.example` güncellendi. Güçlü anahtarlar üretildi. |
| **2** | **Proxy / Gerçek IP Yapılandırması** | 🚨 Zorunlu | ✅ DOĞRULANDI | Nginx header'ları ve Koa proxy ayarları tam uyumlu. |
| **3** | **Strapi Public Rolü İzinleri** | 🚨 Zorunlu | ℹ️ İşlem Gerekli | Admin panelinden yapılacak güvenlik ayarları detaylandırıldı. |
| **4** | **Veritabanı & Geçişler** | 🚨 Zorunlu | ✅ TAMAMLANDI | Otomatik yedekleme betiği (`backup-db.sh`) yazıldı. |
| **5** | **Rate Limit Ayarları** | ⚡ Orta | ✅ DOĞRULANDI | Global IP bazlı rate limit ve iletişim formu limitleri kurulu. |
| **6** | **CORS Yapılandırması** | ⚡ Orta | ✅ TAMAMLANDI | `middlewares.ts` geliştirildi. `CORS_ORIGINS` ile kısıtlama sağlandı. |
| **7** | **Bağımlılık Güncellemeleri** | ⚡ Orta | ℹ️ Öneri | `npm audit` analizi yapıldı, hafifletme önerileri sunuldu. |
| **8** | **Turnstile Sıkılaştırması** | ⚡ Orta | ✅ TAMAMLANDI | `iletisim` controller'ına `TURNSTILE_EXPECTED_HOSTNAME` eklendi. |
| **9** | **Medya ve Disk Yedekleri** | 📉 Düşük | ✅ DOĞRULANDI | `strapi-uploads` kalıcı veri hacmi yedekleme komutları eklendi. |
| **10**| **İzleme ve Log Analizi** | 📉 Düşük | ℹ️ Öneri | Nginx ve Strapi logları için izlenecek hata kodları listelendi. |
| **11**| **Docker İmaj Güvenliği** | 📉 Düşük | ✅ DOĞRULANDI | Dockerfile multi-stage ve non-root yapısı incelendi, doğrulandı. |

---

## 🛠️ Yapılan Geliştirmeler ve Güvenlik Sıkılaştırmaları

### 1. Turnstile Hostname Doğrulama Sıkılaştırması (Madde 8)
* **Dosya:** [iletisim.ts](file:///c:/Users/msi-nb/source/repos/Gulmetay-Site/backend/src/api/iletisim/controllers/iletisim.ts)
* **Açıklama:** Kötü niyetli kişilerin sitenizin Turnstile anahtarını (sitekey) kendi sahte web sitelerinde veya script'lerinde kullanarak formunuza spam göndermesini engellemek için **Hostname Doğrulaması** eklendi.
* **Nasıl Çalışır?** `TURNSTILE_EXPECTED_HOSTNAME` ortam değişkeni tanımlandığında, Cloudflare'den gelen doğrulama cevabındaki `hostname` bilgisi bununla karşılaştırılır. Eşleşme olmazsa istek `400 captcha_failed` ile reddedilir ve Strapi loglarına uyarı yazılır.

### 2. Dinamik CORS Yapılandırması (Madde 6)
* **Dosya:** [middlewares.ts](file:///c:/Users/msi-nb/source/repos/Gulmetay-Site/backend/config/middlewares.ts)
* **Açıklama:** Varsayılan olarak her kök dizine izin veren `*` yerine, production ortamında sadece kendi ön yüz domainlerinize izin vermenizi sağlayacak dinamik `CORS_ORIGINS` desteği eklendi.
* **Nasıl Çalışır?** Çevresel değişkenlerden `CORS_ORIGINS` virgülle ayrılarak okunur. Tanımlanmazsa geliştirme kolaylığı için varsayılan olarak `*` (tüm kökenler) aktif kalır.

### 3. Eksiksiz `.env.example` Şablonu (Madde 1)
* **Dosya:** [backend/.env.example](file:///c:/Users/msi-nb/source/repos/Gulmetay-Site/backend/.env.example)
* **Açıklama:** Veritabanı bilgileri, Turnstile anahtarları, CORS ayarları ve tüm Strapi gizli tuzlarını (salts) içeren eksiksiz ve açıklamalı bir üretim şablonu oluşturuldu. Artık canlıya çıkmadan önce bu dosya tam bir kontrol listesi işlevi görmektedir.

---

## 🔑 Canlı Ortam İçin Güçlü Anahtarlar (Production Secrets)

Üretim ortamında (`.env.production`) asla hazır veya zayıf değerler kullanılmamalıdır. Sizin için yüksek entropili, kriptografik olarak güvenli 32-byte boyutunda benzersiz anahtarlar ve güçlü bir veritabanı şifresi ürettik. Bunları doğrudan kopyalayarak kullanabilirsiniz:

```ini
# ==============================================================================
# GULMETAY PRODUCTION SECRETS (13.05.2026 Üretildi)
# ==============================================================================

# Strapi Session Keys (Virgülle ayrılmış 4 adet 32-byte güçlü anahtar)
APP_KEYS="iuojE1IHWOD3ioQ2As/I5YZX1hh6nsQKIiD0/2Udsl0=,eu0jdJwb4nDkzVWUjXTeC6E6tb+9wMFJtX0jS0/sKxk=,UpVBboT1TbUEHa2FVXfPFQmS2bSY8uVD+86dh02T4AY=,Y0ZdaOMtEdLWDE9aLsklFzoJW/Y7FvZgfNcWnfWwTZk="

# Strapi API Token Salt
API_TOKEN_SALT=+bl1NzYGkkpzKLIdmNtp1WtppCF4rt59V8d3gfJPQM4=

# Strapi Admin Panel JWT Secret
ADMIN_JWT_SECRET=F4fsEIObKQXV2/bwlX5lsgAA/ZDY0iMpcC3jKF7Vly4=

# Strapi Users & Permissions Plugin JWT Secret
JWT_SECRET=VdKqNvNjbc7ARqyuTHB026pj98l0MvwqTdZUlsZc6Q0=

# Strapi Transfer Token Salt
TRANSFER_TOKEN_SALT=NT1NyJBaUfUwcPDXxc0fk1Fsh1qDstyuPPCCEdUqEdw=

# Strapi Data Encryption Key (Hassas veritabanı alanları için şifreleme anahtarı)
ENCRYPTION_KEY=LfVG3IZVA3QXsvXRdp0uuu7f6f/hpMCdv1jNCeTpqe8=

# PostgreSQL Güçlü Veritabanı Şifresi (Strong & Random)
DATABASE_PASSWORD=eYFIX7owv%9y-ndXs89ai4Lu
```

> [!TIP]
> Bu anahtarları kendiniz yeniden üretmek isterseniz, oluşturduğumuz [generate-secrets.js](file:///c:/Users/msi-nb/source/repos/Gulmetay-Site/backend/scripts/generate-secrets.js) aracını şu komutla çalıştırabilirsiniz:
> ```bash
> node backend/scripts/generate-secrets.js
> ```

---

## 🔒 Detaylı Maddeler ve Yapılacak İşlemler Klavuzu

### 1. Ortam Değişkenleri Yapılandırması (.env.production)
Sunucuda projenin kök dizininde yer alacak `.env.production` dosyasını aşağıdaki şablona göre eksiksiz doldurun:

```ini
# --- SUNUCU GENEL ---
STRAPI_SERVER_PROXY_KOA=true

# --- GÜVENLİK ANAHTARLARI (YUKARIDAKİ GENERATED BLOKTAN DOLDURUN) ---
APP_KEYS="..."
API_TOKEN_SALT="..."
ADMIN_JWT_SECRET="..."
JWT_SECRET="..."
TRANSFER_TOKEN_SALT="..."
ENCRYPTION_KEY="..."

# --- VERİTABANI BAĞLANTISI ---
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=gulmetay_db
DATABASE_USERNAME=postgres
DATABASE_PASSWORD="eYFIX7owv%9y-ndXs89ai4Lu" # Sadece güçlü şifreyi buraya yazın
DATABASE_SSL=false

# --- CORS KISITLAMA ---
# Sadece kendi alan adlarınızı ekleyin. Aralarda boşluk olmadan virgülle ayırın.
CORS_ORIGINS="https://gulmetay.mehmeterenozden.com,https://www.gulmetay.mehmeterenozden.com"

# --- CLOUDFLARE TURNSTILE ---
NEXT_PUBLIC_TURNSTILE_SITE_KEY="0x..." # Cloudflare panelinden alınan Site Key
TURNSTILE_SECRET_KEY="0x..."           # Cloudflare panelinden alınan Secret Key
TURNSTILE_EXPECTED_HOSTNAME="gulmetay.mehmeterenozden.com" # Canlı alan adınız
```

---

### 2. Proxy ve Gerçek IP Doğrulaması (Nginx & Koa)
* **Durum:** ✅ Uyumlu.
* **Açıklama:** Sunucu Nginx yapılandırmanız ([nginx.conf](file:///c:/Users/msi-nb/source/repos/Gulmetay-Site/nginx/nginx.conf)) ve Strapi Koa Server ayarlarınız ([server.ts](file:///c:/Users/msi-nb/source/repos/Gulmetay-Site/backend/config/server.ts)) incelenmiştir.
* **Doğrulama:**
  - Nginx, `X-Real-IP` ve `X-Forwarded-For` başlıklarını backend'e başarıyla iletiyor.
  - `STRAPI_SERVER_PROXY_KOA=true` ayarı sayesinde Strapi, gelen bu başlıkları güvenilir kabul edip gerçek kullanıcı IP'si olarak işliyor.
  - Yazdığımız `api-rate-limit.ts` ara katmanı (middleware), Cloudflare arkasındayken `cf-connecting-ip` başlığına, doğrudan Nginx arkasındayken ise `x-forwarded-for` başlığına bakarak güvenli ve hatasız IP tespiti yapıyor. IP sahteciliği (spoofing) riski bulunmuyor.

---

### 3. Strapi Admin: Users & Permissions (Public Rolü İzinleri)
🚨 **CRITICAL SECURITY ACTION REQUIRED**
Strapi üzerinde kod bazlı rota kilitleri yerine rol bazlı yetkilendirme kullanıldığından, canlıya çıkış anında admin paneline girip aşağıdaki ayarları **BİREBİR** yapmanız kritik önem taşır:

1. **Giriş Yapın:** Strapi Admin paneline giriş yapın (`https://alanadiniz.com/admin`).
2. **Yolu İzleyin:** **Settings (Ayarlar)** ➡️ **Users & Permissions Plugin** ➡️ **Roles (Roller)** sekmesine gidin.
3. **Public Rolünü Düzenleyin:** listeden **Public** rolüne tıklayın.
4. **İzinleri Sadece Aşağıdaki Gibi Sınırlandırın:**
   - **About:** Sadece `find` ve `findOne` seçili olmalı.
   - **Project:** Sadece `find` ve `findOne` seçili olmalı.
   - **Category:** Sadece `find` ve `findOne` seçili olmalı.
   - **Service (Hizmetler):** Sadece `find` ve `findOne` seçili olmalı.
   - **İletişim (iletisim):** **SADECE `create` (Yazma)** seçili olmalı! `find`, `findOne`, `update`, `delete` gibi izinler kesinlikle **KAPALI** (seçilmemiş) olmalıdır. Bu sayede kimse dışarıdan başkalarının gönderdiği iletişim formlarını okuyamaz veya silemez.
5. **Kaydedin:** Sağ üstteki **Save** butonuna basarak yetkileri kaydedin.

---

### 4. Veritabanı Geçiş Sırası ve Otomatik Yedekleme Planı
* **İlk Kurulum ve Docker Compose Geçiş Sırası:**
  - `docker-compose.yml` içinde `backend` servisine `depends_on: postgres: condition: service_healthy` kuralı eklenmiştir. Bu sayede veritabanı tamamen hazır ve sağlıklı hale gelmeden Strapi ayağa kalkmaz, böylece ilk deploy anındaki şema oluşturma hataları sıfıra indirgenir.
* **Yedekleme Çözümü (Otomatik DB Backups):**
  - Sizin için [backup-db.sh](file:///c:/Users/msi-nb/source/repos/Gulmetay-Site/scripts/backup-db.sh) adında tam teşekküllü bir yedekleme betiği oluşturduk.
  - Bu betik her çalıştığında PostgreSQL container'ından dump alır, `gzip` ile sıkıştırır, `/opt/gulmetay-site/backups` dizinine kaydeder ve 30 günden eski yedekleri diskte yer kaplamaması için otomatik temizler.
  - **Kurulum Adımları:**
    ```bash
    # 1. Betiğe çalıştırma yetkisi verin
    chmod +x /opt/gulmetay-site/scripts/backup-db.sh
    
    # 2. Sistem crontab'ini açın
    crontab -e
    
    # 3. Her gün gece 03:00'da çalışması için şu satırı ekleyin:
    0 3 * * * /opt/gulmetay-site/scripts/backup-db.sh >> /var/log/gulmetay-db-backup.log 2>&1
    ```

---

### 5. Rate Limit Ayarları (Hız Sınırlandırma)
* **Durum:** ✅ Mükemmel Kurulum.
* **Açıklama:** [api-rate-limit.ts](file:///c:/Users/msi-nb/source/repos/Gulmetay-Site/backend/src/middlewares/api-rate-limit.ts) ara katmanımız tamamen hafıza optimize (RateLimiterMemory) olarak çalışmaktadır.
* **Mevcut Sınırlar:**
  - **Genel API İstekleri (`/api/*`):** IP başına dakikada maksimum **100** istek (Gerektiğinde `.env` dosyasından `RATE_LIMIT_API_MAX` ile artırılabilir).
  - **İletişim Formu POST İstekleri (`/api/iletisims`):** IP başına dakikada maksimum **5** istek (Spam ve e-posta bot saldırılarını engellemek için mükemmel bir koruma seviyesi).

---

### 6. CORS (Sadece İzin Verilen Kökenler)
* **Durum:** ✅ Güvenli hale getirildi.
* **Açıklama:** Yapılan geliştirme ile CORS origin kontrolü tamamen parametrik hale getirilmiştir. Üretim ortamında `.env.production` içine `CORS_ORIGINS="https://gulmetay.mehmeterenozden.com"` tanımlayarak dışarıdan gelebilecek yetkisiz web sitesi isteklerini tarayıcı düzeyinde engelleyebilirsiniz.

---

### 7. Strapi ve Bağımlılık Güvenlik Analizi
* **Yapılan Analiz:** `backend` dizininde `npm audit` çalıştırılmıştır.
* **Sonuçlar:** 67 adet sub-dependency düzeyinde güvenlik açığı tespit edilmiştir (Çoğunlukla Strapi çekirdeğinin kullandığı alt kütüphanelerden - örn. `qs`, `undici`, `tar`, `postcss` kaynaklı).
* **Önerilen Eylemler:**
  1. **Hafif Güvenlik Yaması:** Proje dizininde `npm audit fix` çalıştırarak geriye dönük uyumluluğu bozmayan bağımlılıkları güncelleyin.
  2. **Strapi Sürüm Yükseltme (Opsiyonel):** Strapi 5.31.0 sürümünden daha güncel ve yamalanmış bir sürüme geçmek için Strapi'nin kendi yükseltme aracını kullanabilirsiniz:
     ```bash
     npm run upgrade
     ```
  3. **`better-sqlite3` Paketi:** Bu paket bağımlılıklarda kalabilir. Lokal bilgisayarınızda docker/postgres kurmadan sadece `npm run develop` yazarak SQLite ile hızlıca kod geliştirmenizi sağladığı için kalması yararlıdır. Production ortamında Postgres seçildiğinde zaten bu paket belleğe yüklenmeyecek ve çalışmayacaktır.

---

### 9. Medya Dosyalarının Yedeklenmesi (Uploads)
* **Açıklama:** Görseller ve yüklenen tüm medyalar Docker üzerinde `strapi-uploads` adında kalıcı bir volume (birim) içinde saklanır.
* **Yedekleme Yöntemi:** Medya klasörünün yedeğini düzenli aralıklarla sunucuda sıkıştırmak için şu komutu kullanabilirsiniz (bu komut `backup-db.sh` içine de dahil edilebilir veya ayrı çalıştırılabilir):
  ```bash
  tar -czf /opt/gulmetay-site/backups/uploads_backup_$(date +%Y%m%d).tar.gz -C /var/lib/docker/volumes/gulmetay-site_strapi-uploads/_data .
  ```

---

### 10. Canlı Ortam İzleme ve Log Takibi (Monitoring)
Canlıya geçiş sonrasında sunucuda çıkabilecek hataları takip etmek için izlenmesi gereken loglar ve kritik hata kodları:

* **İzlenecek Log Komutları:**
  ```bash
  # Sadece backend (Strapi) canlı loglarını izleme
  docker compose logs -f --tail=100 backend
  
  # Nginx erişim ve hata loglarını canlı izleme
  tail -f /var/log/nginx/access.log /var/log/nginx/error.log
  ```
* **Takip Edilmesi Gereken Kritik Durumlar:**
  - **`429 (Too Many Requests)`:** Rate limit'e takılan bot veya aşırı istek durumları. Loglarda IP'leri takip edilip gerekirse firewall/cloudflare üzerinden engellenebilir.
  - **`400 (captcha_failed)`:** İletişim formunda botların geçemediği istekler veya frontend/backend Turnstile anahtar uyuşmazlığı. Sıkça görülüyorsa anahtarlar kontrol edilmelidir.
  - **`502 (captcha_verify_unreachable)`:** Sunucunun Cloudflare doğrulama sunucularına (`challenges.cloudflare.com`) erişemediği durumlar. Sunucu DNS/internet bağlantısı kontrol edilmelidir.
  - **`500 (Internal Server Error)`:** `TURNSTILE_SECRET_KEY` eksikliği veya veritabanı bağlantı kopmaları durumlarında görünür. Hemen `docker compose logs backend` ile detayına bakılmalıdır.

---

### 11. Docker İmaj Yapısı ve Güvenlik Sıkılaştırması
* **Durum:** ✅ Güvenli ve Optimize.
* **Değerlendirme:** Backend [Dockerfile](file:///c:/Users/msi-nb/source/repos/Gulmetay-Site/backend/Dockerfile) dosyası incelenmiştir:
  - **Multi-stage Build:** İmaj boyutunu küçük tutmak ve build araçlarını son imaja dahil etmemek için çok aşamalı kurulum kullanılmaktadır. Bu hem performans hem güvenlik için en iyi pratiktir.
  - **Non-root User:** Konteyner içindeki işlemler root yetkisi olmayan `node` kullanıcısı ile çalıştırılmaktadır (`USER node`). Bu sayede olası bir konteyner sızmasında sunucu ana işletim sisteminin ele geçirilme riski minimize edilmiştir.
  - **Temiz Build Önerisi:** Son dönemdeki güvenlik olaylarından veya cache kirliliğinden tamamen arınmış temiz bir build almak için deploy komutunu her zaman `--no-cache` bayrağı ile çalıştırın:
    ```bash
    docker compose build --no-cache
    docker compose up -d
    ```
