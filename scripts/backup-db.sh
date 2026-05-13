#!/bin/bash

# ==============================================================================
# GULMETAY SITE - DATABASE AUTOMATED BACKUP SCRIPT
# ==============================================================================
# Bu betik, Docker PostgreSQL konteynerindeki veritabanini yedekler,
# yedekleri sıkıştırır ve belirlenen gunden eski olanlari otomatik siler.
#
# Kurulum (Cron Job):
# 1. Betigi calistirilabilir yapin: chmod +x scripts/backup-db.sh
# 2. Crontab'i acin: crontab -e
# 3. Her gun gece 03:00'da calismasi icin ekleyin:
#    0 3 * * * /opt/gulmetay-site/scripts/backup-db.sh >> /var/log/gulmetay-db-backup.log 2>&1
# ==============================================================================

# --- AYARLAR ---
BACKUP_DIR="/opt/gulmetay-site/backups"
RETENTION_DAYS=30
CONTAINER_NAME="gulmetay-postgres"
DB_USER="postgres"
DB_NAME="gulmetay_db"
DATE_FORMAT=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/backup_${DB_NAME}_${DATE_FORMAT}.sql"

# Log baslangici
echo "[$(date +"%Y-%m-%d %H:%M:%S")] Veritabanı yedekleme işlemi başlatıldı..."

# Yedek dizini yoksa olustur
mkdir -p "${BACKUP_DIR}"

# PostgreSQL konteynerinin calisip calismadigini kontrol et
if [ ! "$(docker ps -q -f name=${CONTAINER_NAME})" ]; then
    echo "HATA: ${CONTAINER_NAME} konteyneri çalışmıyor! Yedekleme iptal edildi." >&2
    exit 1
fi

# pg_dump ile yedegi al
echo "Yedek alınıyor: ${BACKUP_FILE}..."
if docker exec "${CONTAINER_NAME}" pg_dump -U "${DB_USER}" "${DB_NAME}" > "${BACKUP_FILE}"; then
    # Gzip ile sıkıştır
    gzip -f "${BACKUP_FILE}"
    echo "Yedek başarıyla alındı ve sıkıştırıldı: ${BACKUP_FILE}.gz"
else
    echo "HATA: Veritabanı yedeği alınırken bir hata oluştu!" >&2
    exit 1
fi

# Eski yedekleri temizle (belirlenen gunden eski olanlar)
echo "Eski yedekler kontrol ediliyor (Retention: ${RETENTION_DAYS} gün)..."
find "${BACKUP_DIR}" -name "backup_${DB_NAME}_*.sql.gz" -type f -mtime +${RETENTION_DAYS} -exec rm -f {} \; -print | while read -r deleted; do
    echo "Eski yedek silindi: ${deleted}"
done

echo "[$(date +"%Y-%m-%d %H:%M:%S")] Yedekleme işlemi başarıyla tamamlandı."
echo "======================================================================"
