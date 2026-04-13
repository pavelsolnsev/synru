<script setup lang="ts">
import { ROUTES } from '~/constants';
import { DEFAULT_DOMAIN } from '~/constants/common';
import type { MediaMentionResponse } from '~/server/api/media-mentions';
import type { NewsResponse } from '~/server/api/news/index.get';
import type { GalleriesResponse } from '~/types/entities';
import getArticleDate from '~/utils/article/getArticleDate';

const PER_PAGE = 6;

const DEFAULT_QUERY = {
  'page[size]': PER_PAGE,
  'sort': '-published_at',
  'filter[published]': true,
};

const { data: newsData, execute: fetchNewsData } = await useFetch<NewsResponse>('/api/news', {
  query: {
    ...DEFAULT_QUERY,
  },
  immediate: false,
});

const { data: pollsData, execute: fetchPollsData } = await useFetch<NewsResponse>('/api/news', {
  query: {
    ...DEFAULT_QUERY,
    'filter[categories.slug]': 'news_polls',
  },
  immediate: false,
});

const { data: photoData, execute: fetchPhotoGallery } = await useFetch<GalleriesResponse>('/api/galleries', {
  query: {
    ...DEFAULT_QUERY,
    'filter[categories.slug]': 'image',
  },
  immediate: false,
});

const { data: videoData, execute: fetchVideoGallery } = await useFetch<GalleriesResponse>('/api/galleries', {
  query: {
    ...DEFAULT_QUERY,
    'filter[categories.slug]': 'video',
  },
  immediate: false,
});

const { data: mediaMentions, execute: fetchMediaMentions } = await useFetch<MediaMentionResponse>('/api/media-mentions', {
  query: {
    ...DEFAULT_QUERY,
  },
  immediate: false,
});

await Promise.all([
  fetchNewsData(),
  fetchPollsData(),
  fetchPhotoGallery(),
  fetchVideoGallery(),
  fetchMediaMentions(),
]);

const news = formatNewsResponse(newsData.value);

const polls = formatNewsResponse(pollsData.value);

const photoGallery = formatGalleries(photoData.value);

const videoGallery = formatGalleries(videoData.value);

const smiAboutUs = formatMediaMentions(mediaMentions.value);

function formatNewsResponse(response: NewsResponse | null) {
  if (!response) return [];


  return response.data?.map(({ attributes }) => {
    const date = getArticleDate(attributes.published_at);

    return {
      image: attributes.image ?? '',
      title: attributes.title,
      date,
      to: `${DEFAULT_DOMAIN}${attributes.url}`,
    };
  }) ?? [];
}

function formatGalleries(response: GalleriesResponse | null) {
  if (!response) return [];

  return response.data?.map(({ attributes }) => {

    const videoType = attributes.media_source;
    const video = videoType === 'rutubeId' ? formatRutubeLink(attributes.media) : attributes.media;

    return {
      image: attributes.preview_image,
      title: attributes.title,
      date: getArticleDate(attributes.published_at),
      text: getArticleDate(attributes.published_at),
      video,
    };
  }) ?? [];
}

function formatMediaMentions(response: MediaMentionResponse | null) {
  if (!response) return [];

  return response.data?.map(({ attributes }) => {
    return {
      href: attributes.url,
      title: attributes.title,
      date: getArticleDate(attributes.published_at),
      source: attributes.source_name ?? '',
      text: attributes.annotation,
    };
  }) ?? [];
}
</script>

<template>
  <div class="mediacenter-content">
    <SMediaCenterNews
      :items="news"
      :bth-href="ROUTES.NEWS"
      btn-text="Перейти в раздел"
    />
    <SMediaCenterNews
      :items="polls"
      :bth-href="ROUTES.NEWS"
      title="Опросы аналитического центра демо-вуза"
      btn-text="Перейти в раздел"
    />
    <SMediaCenterPhotoGallery
      :items="photoGallery"
      :bth-href="ROUTES.GALLERY"
      btn-text="Перейти в раздел"
    />
    <SMediaCenterVideoGallery
      :items="videoGallery"
      :bth-href="ROUTES.VIDEOGALLERY"
      btn-text="Перейти в раздел"
    />
    <SMediaCenterSmi
      :items="smiAboutUs"
      :bth-href="ROUTES.SMI_ABOUT_US"
      btn-text="Перейти в раздел"
    />
    <SMediaCenterForMedia
      banner-image-lg="/img/mediacenter/banner_lg.webp"
      banner-image-md="/img/mediacenter/banner_md.webp"
      banner-image-sm="/img/mediacenter/banner_sm.webp"
    />
    <SMediaCenterMediaKit />
  </div>
</template>

<style lang="scss" scoped>
@import './SPresscenter.scss';
</style>
