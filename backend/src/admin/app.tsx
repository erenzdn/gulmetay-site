import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [],
  },
  bootstrap(app: StrapiApp) {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.add('notranslate');
      document.documentElement.setAttribute('translate', 'no');
      
      const meta = document.createElement('meta');
      meta.name = 'google';
      meta.content = 'notranslate';
      document.head.appendChild(meta);
    }
  },
};
