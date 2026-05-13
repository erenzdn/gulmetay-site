export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: env.array('CORS_ORIGINS', ['*']),
    },
  },
  {
    name: 'global::api-rate-limit',
    config: {
      enabled: env.bool('RATE_LIMIT_ENABLED', true),
      apiMax: env.int('RATE_LIMIT_API_MAX', 100),
      apiWindowSec: env.int('RATE_LIMIT_API_WINDOW_SEC', 60),
      iletisimPostMax: env.int('RATE_LIMIT_ILETISIM_POST_MAX', 5),
      iletisimPostWindowSec: env.int('RATE_LIMIT_ILETISIM_POST_WINDOW_SEC', 60),
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
