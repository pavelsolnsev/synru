<script setup lang="ts">
import type { GalleriesResponse } from '~/types/entities';
import getArticleDate from '~/utils/article/getArticleDate';

interface Props {
  routeName?: string;
}

interface GalleryItem {
  title: string;
  image: string;
  video?: string;
  text?: string;
  preview_image?: string;
  date?: string;
}

const {
  routeName = '',
} = defineProps<Props>();

const dataByRouteName: Record<string, { title: string; perPage: number; categoriesSlug: 'video' | 'image' }> = {
  'photogallery': {
    title: 'Фотогалерея',
    perPage: 10,
    categoriesSlug: 'image',
  },
  'videogallery': {
    title: 'Видеогалерея',
    perPage: 12,
    categoriesSlug: 'video',
  },
};

const breadcrumbs = generateBreadcrumbs({ routeName, entity: {} });

const title = dataByRouteName[routeName]?.title ?? '';

const filterCategory = dataByRouteName[routeName]?.categoriesSlug ?? '';

const INITIAL_PAGE_NUMBER = 1;
const PER_PAGE = dataByRouteName[routeName]?.perPage ?? 0;
const currentPageNumber = shallowRef(INITIAL_PAGE_NUMBER);

const { data, status } = await useFetch<GalleriesResponse>('/api/galleries', {
  query: {
    'filter[categories.slug]': filterCategory,
    'page[size]': PER_PAGE,
    'page[number]': currentPageNumber,
    'sort': '-published_at',
    'filter[published]': true,
  },
  watch: [currentPageNumber],
});

const items = shallowRef(formatGalleriesResponse(data.value));

const remainingItemsText = computed(() => {
  const EMPTY_TEXT = '';
  const TEXT = 'Показать ещё';

  if (!data.value) return EMPTY_TEXT;

  const currentItemsCount = PER_PAGE * data.value.meta.current_page;

  const remainingItems = data.value.meta.total - currentItemsCount;

  return remainingItems > 0 ? `${TEXT} (${remainingItems})` : EMPTY_TEXT;
});

const { openModal } = useModalStore();

watch(data, () => {
  items.value = [
    ...items.value,
    ...formatGalleriesResponse(data.value),
  ];
});

function openImg(src: string) {
  openModal('MModalInline', {
    src: src
  });
}

function formatGalleriesResponse(res: GalleriesResponse | null) {
  if (!res) return [];

  const firstItem = res.data?.at(0);

  if (!firstItem) return [];

  return firstItem.attributes.type === 'video'
    ? formatVideo(res)
    : formatPhoto(res);
}

function formatVideo(rawVideo: GalleriesResponse | null) {
  if (!rawVideo) return [];

  return rawVideo.data.map(({ attributes }) => {
    const video = attributes.media_source === 'rutubeId'
      ? formatRutubeLink(attributes.media)
      : attributes.media;

    const text = attributes.published_at?.split(' ')?.at(0) ?? '';

    return {
      title: attributes.title,
      image: attributes.preview_image,
      video,
      text,
    } as GalleryItem;
  });
}

function formatPhoto(rawPhoto: GalleriesResponse | null) {
  if (!rawPhoto) return [];

  return rawPhoto.data.map(({ attributes }) => {
    return {
      title: attributes.title,
      preview_image: attributes.preview_image,
      date: getArticleDate(attributes.published_at),
      image: attributes.media,
    } as GalleryItem;
  });
}
</script>

<template>
  <SPresscenterMain
    :breadcrumbs
    :title
    :pending="status === 'pending'"
    :class="{ '--image': filterCategory === 'image' }"
  >
    <template
      v-for="item in items"
      :key="item.title"
    >
      <MPhotoGallery
        v-if="filterCategory === 'image'"
        :title="item.title"
        :image="item.preview_image"
        :date="item.date"
        @click="openImg(item.image)"
      />
      <MVideoCard
        v-else
        :title="item.title"
        :text="item.text"
        :video="item.video ?? ''"
        :image="item.image"
      />
    </template>

    <template #bottom>
      <AButtonThird
        v-if="remainingItemsText"
        class="--more-btn"
        @click="currentPageNumber += 1"
      >
        {{ remainingItemsText }}
      </AButtonThird>
    </template>
  </SPresscenterMain>
</template>

<style lang="scss" scoped>
@import './SPresscenterPhotoVideoGallery.scss';
</style>
