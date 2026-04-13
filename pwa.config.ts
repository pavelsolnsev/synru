import type { ModuleOptions } from '@vite-pwa/nuxt';
import { PWA_DESCRIPTION } from './constants/common';

const pwaConfig: ModuleOptions = {
  registerType: 'autoUpdate',

  manifest: {
    name: 'Демо образовательного портала',
    short_name: 'EduDemo',
    description: PWA_DESCRIPTION,
    lang: 'ru',
    theme_color: '#fff',
    background_color: '#fff',
    display: 'standalone',
    start_url: '/',
    scope: '/',
    icons: [
      {
        src: '/img/app-icons/pwa-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/img/app-icons/pwa-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  },

  workbox: {
    navigateFallback: null,
    globPatterns: ['**/*.{js,css,png,svg,ico,html}'],
    disableDevLogs: true,
  },

  devOptions: {
    enabled: true,
  },
};

export default pwaConfig;
