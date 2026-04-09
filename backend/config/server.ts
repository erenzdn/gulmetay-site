export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  /**
   * Strapi 5: Koa `app.proxy` için `proxy.koa` kullanılır (v4'teki tek `proxy: true` yerine).
   * Nginx/Cloudflare arkasında gerçek IP ve TLS bilgisi için üretimde açık tutun.
   */
  proxy: {
    koa: env.bool('STRAPI_SERVER_PROXY_KOA', env('NODE_ENV', 'development') === 'production'),
  },
  app: {
    keys: env.array('APP_KEYS'),
  },
});
