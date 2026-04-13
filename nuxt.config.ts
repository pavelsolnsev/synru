import { defineNuxtConfig } from 'nuxt/config';
import svgLoader from 'vite-svg-loader';
import getCachedRouteRules from './utils/getCachedRouteRules';
import pwaConfig from './pwa.config';
import { ONE_HOUR } from './constants/timeToCache';

const cdnOriginForScss = (process.env.NUXT_PUBLIC_CDN_ORIGIN || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    },
  },
  runtimeConfig: {
    BASE_LK_API: process.env.BASE_LK_API,
    public: {
      apiBase: process.env.BASE_URL,
      SITE_KEY: process.env.NUXT_PUBLIC_SMARTCAPTCHA_SITE_KEY || process.env.SITE_KEY || '',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
      portalOrigin: process.env.NUXT_PUBLIC_PORTAL_ORIGIN || '',
      lmsOrigin: process.env.NUXT_PUBLIC_LMS_ORIGIN || '',
      catalogPdfUrl: process.env.NUXT_PUBLIC_CATALOG_PDF_URL || '',
      chatWidgetOrigin: process.env.NUXT_PUBLIC_CHAT_WIDGET_ORIGIN || '',
      yaMetrikaId: process.env.NUXT_PUBLIC_YANDEX_METRIKA_ID || '',
      enableLegacyAnalytics: process.env.NUXT_PUBLIC_ENABLE_LEGACY_ANALYTICS === 'true',
      paymentLandLabel: process.env.NUXT_PUBLIC_PAYMENT_LAND_LABEL || '',
      expressPaymentUrl: process.env.NUXT_PUBLIC_EXPRESS_PAYMENT_URL || '',
      expressThankUrl: process.env.NUXT_PUBLIC_EXPRESS_THANK_URL || '',
      expressProductId: process.env.NUXT_PUBLIC_EXPRESS_PRODUCT_ID || '',
      landerBaseUri: process.env.NUXT_PUBLIC_LANDER_ENDPOINT || '',
      landerDemoSlug: process.env.NUXT_PUBLIC_LANDER_DEMO_SLUG || '',
      intellectMoneyPayUrl: process.env.NUXT_PUBLIC_INTELLECTMONEY_PAY_URL || '',
      cdnOrigin: process.env.NUXT_PUBLIC_CDN_ORIGIN || '',
      /** База legacy API регионов (без ?action=), например https://example.com/old/api.php */
      regionsLegacyApiBase: process.env.NUXT_PUBLIC_REGIONS_LEGACY_API_BASE || '',
      /** JSON со списком регионов для карты ($fetch в server/api/getRegions) */
      regionsJsonUrl: process.env.NUXT_PUBLIC_REGIONS_JSON_URL || '',
      neuroTutorScriptUrl: process.env.NUXT_PUBLIC_NEUROTUTOR_SCRIPT_URL || '',
    },
  },
  components: [
    {
      path: '~/components/',
      pathPrefix: false,
      global: true,
    },
  ],
  css: [
    '~/assets/styles/base/_index.scss',
    '~/assets/styles/sections/index.scss',
    '~/assets/styles/variables/_index.scss',
    '~/assets/styles/vendor/_libs.scss',
    '~/assets/styles/pages/_index.scss',
  ],
  modules: [
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    'nuxt-vitalizer',

    // '@vite-pwa/nuxt',
  ],
  vitalizer: {
    disableStylesheets: 'entry',
    disablePrefetchLinks: true,
    disablePreloadLinks: true,
  },
  vite: {
    plugins: [
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
            {
              name: 'removeAttrs',
              params: {
                attrs: [
                  '*:(stroke):((?!^none$).)*',
                  'path:fill:none',
                  'clip-path',
                ],
              },
            },
          ],
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          $BUILD_CDN_FLAG: ${process.env.NUXT_PUBLIC_CDN_ORIGIN ? 1 : 0};
          $BUILD_CDN_ORIGIN: "${cdnOriginForScss}";
          @function __cdnUrl($suffix) {
            @if $BUILD_CDN_FLAG == 0 {
              @return url('/img/header/brand-logo.svg');
            }
            @return url('#{$BUILD_CDN_ORIGIN}/#{$suffix}');
          }
          @use "~/assets/styles/helpers/_index.scss" as *;
          `,
        },
      },
    },
    build: {
      rollupOptions: {
        output:{
          manualChunks(id) {
            if (id.includes('@vite-pwa')) return;

            if (id.includes('2gis-maps')) return 'vendor-2gis';
            if (id.includes('commonjsHelpers') || id.includes('\0commonjsHelpers')) return 'vendor-cjs';
            if (id.includes('isomorphic-dompurify') || id.includes('/dompurify')) return 'vendor-dompurify';

            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
          chunkFileNames: '_nuxt/[name]-[hash].js',
          entryFileNames: '_nuxt/[name]-[hash].js',
        },
      },
      modulePreload: false,
    },
  },

  typescript: {
    typeCheck: true,
  },

  build: {
    transpile: ['@fancyapps/ui'],
  },

  nitro: {
    compressPublicAssets: {
      gzip: true,
    },
    storage: {
      cache : process.env.REDIS_URL
        ? {
            driver: 'redis',
            url: process.env.REDIS_URL,
            ttl: ONE_HOUR,
          }
        : {
            driver: 'memory',
          },
    },
  },

  experimental: {
    appManifest: false,
    emitRouteChunkError: false,
  },

  // pwa: pwaConfig,

  routeRules: getCachedRouteRules(),

  compatibilityDate: '2026-01-29',
});
