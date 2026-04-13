<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Grid } from 'swiper/modules';
import type { Nullable } from '~/types';

interface Props {
  title?: string;
  description?: string;
  partners?: Partner[];
  rows?: string;
  minCount?: Nullable<string>;
  hasEntity?: boolean;
  entity?: { customFields: { partners: Partner[] } }
}

interface Partner {
  image: string;
}

const {
  title = '',
  description = '',
  minCount = '',
  partners: propsPartners = [],
  hasEntity = false,
  entity,
  rows = '1',
} = defineProps<Props>();

const { width: windowWidth } = useWindowSize();

const {
  navRef,
  swiperRef,
  swiperConfig,
} = useSwiperWrapper({
  modules: [Navigation, Grid],
  showSwiperNavigation: true,
  spaceBetween: 0,
  slidesPerView: 'auto',
  grabCursor: true,
  grid: {
    rows: Number(rows),
    fill: 'row',
  },
});

const partners = hasEntity
  ? getPartnersFromEntity()
  : propsPartners;

function getPartnersFromEntity() {
  const minSlidesCount = Number(minCount);
  if (isNaN(minSlidesCount)) return [];

  const entityPartners = entity?.customFields?.partners?.length ? entity.customFields.partners : [];
  if (entityPartners.length < minSlidesCount) return [];

  return entityPartners;
}
</script>

<template>
  <MSection
    v-if="partners.length"
    class="s-partners"
    :title
  >
    <div
      v-if="description"
      class="s-partners__description a-font_m"
      v-html="description"
    />
    <div class="s-partners__sliders">
      <swiper
        ref="swiperRef"
        class="s-partners__slider"
        v-bind="swiperConfig"
        :space-between="windowWidth / 360 * 8"
        :breakpoints="{
          768: {
            spaceBetween: windowWidth / 768 * 8,
          },
          1200: {
            spaceBetween: windowWidth / 1920 * 20,
          }
        }"
      >
        <swiper-slide
          v-for="{ image } in partners"
          :key="image"
        >
          <div class="s-partners__item">
            <AImg
              loading="lazy"
              decoding="async"
              :src="image"
              :alt="image"
            />
          </div>
        </swiper-slide>
      </swiper>
      <MSwiperNav ref="navRef" />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SPartnersSimple.scss';
</style>
