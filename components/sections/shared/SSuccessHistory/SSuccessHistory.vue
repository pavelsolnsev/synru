<script setup lang="ts">
import { defaultHistoryItems } from './success-history-data';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import type { ProgramEntity } from '~/types';

interface Props {
  title?: string;
  items?: SuccessHistory[];
  defReviews?: boolean;
  entity?: ProgramEntity | null;
}

interface SuccessHistory {
  video: string;
  image: string;
  title: string;
  text: string;
  uploadDate: string;
}

const {
  title = '',
  defReviews = false,
  items = [],
  entity = null,
} = defineProps<Props>();

const publishedDate = entity?.published_at
  ? convertMskToUTC(entity.published_at)
  : entity?.created_at
    ? convertMskToUTC(entity.created_at)
    : '';

const fieldItems: SuccessHistory[] = entity ? entity?.customFields?.video_reviews?.map((item) => {
  return {
    video: formatRutubeLink(item.rutube_id) || formatYoutubeLink(item.youtube_id) || item.video,
    image: item.image_v,
    title: item.name,
    text: item.info,
    uploadDate: publishedDate,
  } as SuccessHistory;
}) : [];

const storyItems = fieldItems?.length
  ? fieldItems
  : defReviews
    ? defaultHistoryItems
    : items
  ;

const {
  swiperRef,
  swiperConfig,
  navRef,
  scrollbarRef,
}  = useSwiperWrapper({
  modules: [Navigation, Scrollbar],
  showSwiperNavigation: true,
  showSwiperScrollbar: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  speed: 500,
  resistance: true,
  resistanceRatio: 0,
  scrollbar: {
    draggable: true,
    horizontalClass: 'swiper-scrollbar',
  },
});

function formatYoutubeLink(youtubeVideoID: string | null) {
  if (!youtubeVideoID) return;

  const youtubeLink = 'https://www.youtube.com';

  if (youtubeVideoID.includes(youtubeLink)) return youtubeVideoID;

  return `${youtubeLink}/embed/${youtubeVideoID}/?autoplay=1`;
}

function convertMskToUTC(dateString: string) {
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('.');

  const date = new Date(`${year}-${month}-${day}T${timePart}Z`);

  date.setHours(date.getHours() + 3);

  return date.toISOString();
}
</script>

<template>
  <MSection
    v-if="storyItems.length"
    id="s-success-history"
    class="s-success-history"
    :title
  >
    <swiper
      ref="swiperRef"
      v-bind="swiperConfig"
      class="s-success-history__slider"
    >
      <swiper-slide
        v-for="{ image, text, title: videoTitle, video, uploadDate } in storyItems"
        :key="video"
        class="swiper-slide"
      >
        <MVideoCardVertical
          :video
          :image
          :text
          :title="videoTitle"
          :upload-date="uploadDate ? uploadDate : publishedDate"
        />
      </swiper-slide>
      <MSwiperNav ref="navRef" />
    </swiper>

    <div
      ref="scrollbarRef"
      class="swiper-scrollbar"
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SSuccessHistory.scss';
</style>
