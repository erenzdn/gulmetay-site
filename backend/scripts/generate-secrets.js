const crypto = require('crypto');

/**
 * Generates a random base64 string of specified byte length.
 */
function generateKey(bytes = 32) {
  return crypto.randomBytes(bytes).toString('base64');
}

/**
 * Generates a strong random database password.
 */
function generateDbPassword(length = 24) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01233456789_-+=!@#%';
  let pwd = '';
  for (let i = 0; i < length; i++) {
    const rIdx = crypto.randomInt(0, chars.length);
    pwd += chars[rIdx];
  }
  return pwd;
}

console.log('============================================================');
console.log('GULMETAY SITE - PRODUCTION SECRETS GENERATOR');
console.log('============================================================');
console.log('Asagida uretilen degerler canli ortam (production) icin');
console.log('yuksek entropili (guclu) rastgele anahtarlardir.');
console.log('Bunlari .env.production dosyaniza kopyalayarak kullanabilirsiniz.');
console.log('------------------------------------------------------------\n');

const appKey1 = generateKey(32);
const appKey2 = generateKey(32);
const appKey3 = generateKey(32);
const appKey4 = generateKey(32);
const appKeys = `"${appKey1},${appKey2},${appKey3},${appKey4}"`;

const apiTokenSalt = generateKey(32);
const adminJwtSecret = generateKey(32);
const transferTokenSalt = generateKey(32);
const jwtSecret = generateKey(32);
const encryptionKey = generateKey(32);
const dbPassword = generateDbPassword(24);

const output = `# --- CANLI ORTAM ZORUNLU ANAHTARLARI (GULMETAY PRODUCTION SECRETS) ---
# Uretim tarihi: ${new Date().toISOString()}

# Strapi Session Keys (Virgulle ayrilmis 4 adet 32-byte guclu key)
APP_KEYS=${appKeys}

# Strapi API Token Salt
API_TOKEN_SALT=${apiTokenSalt}

# Strapi Admin Panel JWT Secret
ADMIN_JWT_SECRET=${adminJwtSecret}

# Strapi Users & Permissions Plugin JWT Secret
JWT_SECRET=${jwtSecret}

# Strapi Transfer Token Salt
TRANSFER_TOKEN_SALT=${transferTokenSalt}

# Strapi Data Encryption Key (For sensitive database fields)
ENCRYPTION_KEY=${encryptionKey}

# PostgreSQL Database Password (Strong, random)
DATABASE_PASSWORD=${dbPassword}
`;

console.log(output);
console.log('------------------------------------------------------------');
console.log('DIKKAT: Bu anahtarlari asla git\'e gondermeyin (commits).');
console.log('Sadece sunucudaki .env.production icinde muhafaza edin.');
console.log('============================================================');
