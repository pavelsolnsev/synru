<script setup lang="ts">
import type { LayoutKey } from '#build/types/layouts';

useHead({
  htmlAttrs: {
    lang: 'ru',
  },
  meta: [
    { charset: 'utf-8' },
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    { name: 'theme-color', content: '#fff' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'viewport', content: 'initial-scale=1.0, width=device-width, user-scalable=no' },
    { name: 'robots', content: 'noindex, nofollow' },
  ],
  link: [
    { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon' },
    { rel: 'icon', sizes: '32x32', href: '/favicon.ico', type: 'image/png' },
    { rel: 'apple-touch-icon', href: '/img/favicon/apple-touch-icon.png' },
    { rel: 'apple-touch-icon', sizes: '57x57', href: '/img/favicon/apple-touch-icon-57x57.png' },
    { rel: 'apple-touch-icon', sizes: '72x72', href: '/img/favicon/apple-touch-icon-72x72.png' },
    { rel: 'apple-touch-icon', sizes: '76x76', href: '/img/favicon/apple-touch-icon-76x76.png' },
    { rel: 'apple-touch-icon', sizes: '114x114', href: '/img/favicon/apple-touch-icon-114x114.png' },
    { rel: 'apple-touch-icon', sizes: '120x120', href: '/img/favicon/apple-touch-icon-120x120.png' },
    { rel: 'apple-touch-icon', sizes: '144x144', href: '/img/favicon/apple-touch-icon-144x144.png' },
    { rel: 'apple-touch-icon', sizes: '152x152', href: '/img/favicon/apple-touch-icon-152x152.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/favicon/apple-touch-icon-180x180.png' },
  ],
  bodyAttrs: {
    class: '',
  },
});

const route = useRoute();

// TODO: необходимо реализовать подстановку шаблона под все виды урл, чтоб не дублировать pathWithSlugDict, pathWithDoubleSlugDict и т.д.
const layout = computed(() => {
  const pathDict: Record<string, LayoutKey> = {
    '/thanks': 'thanks',
    '/abiturientam/newdesign': 'kruchu-verchu',
    '/abiturientam/ad/college': 'college-lp',
    '/static/video/main': 'articles',
    '/static/video/category': 'articles',
    '/static/video/article': 'articles',
    '/static/news/blog': 'articles',
    '/static/news/smi': 'articles',
    '/static/news/article': 'article',
    '/static/guides/article': 'article',
    '/static/articles/author': 'articles',
    '/about/education_articles': 'articles',
    '/akademiya': 'articles',
    '/media': 'articles',
    '/presscenter': 'mediacenter',
    '/about/blog': 'mediacenter',
    '/about/research': 'mediacenter',
    '/presscenter/media_about_us': 'mediacenter',
    '/about/gallery': 'mediacenter',
    '/about/video': 'mediacenter',
  };

  const pathWithSlugDict: Record<string, LayoutKey> = {
    '/abiturientam/ad/college': 'college-lp',
    '/about/education_articles': 'articles',
    '/edu/poleznaya_informacziya': 'article',
    '/akademiya': 'articles',
    '/media': 'articles',
    '/media/guides': 'articles',
    '/media/guides/entrance_guide': 'articles',
    '/edu/news': 'article',
    '/about/blog': 'article',
    '/media/career_guidance': 'articles',
    '/press/presscenter/avtoryi': 'article',
  };

  const pathWithDoubleSlugDict: Record<string, LayoutKey> = {
    '/about/education_articles': 'article',
    '/akademiya': 'article',
    '/about/education_articles/pomoshh': 'article',
    '/about/education_articles/raznoe': 'article',
    '/media/guides/entrance_guide': 'article',
    '/about/education_articles/speczialnosti': 'article',
    '/media/guides': 'article',
  };

  const path = route.path;
  const pathWithoutLastSegment = `/${route.path.split('/').slice(1, -1).join('/')}`;
  const pathWithoutLastTwoSegment = `/${route.path.split('/').slice(1, -2).join('/')}`;

  if (pathDict[path]) return pathDict[path];

  if (pathWithSlugDict[pathWithoutLastSegment]) return pathWithSlugDict[pathWithoutLastSegment];

  if (pathWithDoubleSlugDict[pathWithoutLastTwoSegment]) return pathWithDoubleSlugDict[pathWithoutLastTwoSegment];

  if (path.startsWith('/edu')) return 'edu';

  return 'default';
});

// TODO: необходимо реализовать подстановку стилей к body в зависимости от layout
useBodyStyle(layout);

const portfolioConfig = useRuntimeConfig();

if (!import.meta.dev && portfolioConfig.public.enableLegacyAnalytics) {
  useYandexCounter();
  useMotomo();
  useNeurotutorAB();
  useBrowserThemeGoal();
}
</script>

<template>
  <!-- <NuxtPwaManifest /> -->
  <NuxtLoadingIndicator
    color="repeating-linear-gradient(to right,rgba(255,10,71,.5) 0%,rgba(255,10,71,.75) 50%,rgba(255,10,71,1) 100%)"
  />
  <div class="container">
    <NuxtLayout :name="layout">
      <NuxtPage />
      <MModalController />
    </NuxtLayout>
  </div>
</template>
