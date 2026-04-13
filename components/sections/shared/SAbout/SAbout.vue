<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Fonts } from '~/types';
import { ROUTES } from '~/constants';

interface Props {
  title?: string;
  text?: string;
  tags?: Array<Tag | TagQuantity>;
  icons?: Icon[];
  content?: string;
  items?: Item[];
  itemTitleClass?: Fonts;
  isInitSwiper?: boolean;
  routeName?: string;
  entity?: { customFields: { direction_info: DirectionInfo[] } };
}

interface DirectionInfo {
  title?: string;
  text?: string;
  icons?: Icon[];
  tags?: Array<Tag | TagQuantity>;
  items?: Item[];
}

interface Item {
  title?: string;
  text?: string;
  classname?: string;
  imageLg?: string;
  imageMd?: string;
  image?: string;
  popupTitle?: string;
  popupText?: string;
}

interface Icon {
  icon: string
}

interface Tag {
  tag: string;
}

interface TagQuantity {
  label: string;
  quantity: Array<{ count: number }>;
}

const {
  content = '',
  icons = [],
  tags = [],
  text = '',
  title = '',
  items = [],
  isInitSwiper = false,
  entity = { customFields: { direction_info: [{}] } },
} = defineProps<Props>();

const {
  title: cardTitle = title,
  text: cardText = text,
  icons: cardIcons = icons,
  tags: cardTags = tags,
  items: cardItems = items,
} = entity?.customFields?.direction_info?.[0] || {};

const mapTags = cardTags.reduce((acc, item) => {
  if (isTagQuantity(item)) {
    const quantity = item.quantity[0].count;

    const text = declensionOfNumber(
      quantity,
      item.label.split('|'),
    );

    acc.push(`${quantity} ${text}`);
    return acc;
  }

  acc.push(item.tag);
  return acc;
}, [] as string[]);

const mapIcons = cardIcons.map(({ icon }) => icon);

const swiperConfig = {
  grabCursor: true,
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
};

const route = useRoute();
const popupRoutes = [ROUTES.COLLEGE, ROUTES.BACCALAUREATE, ROUTES.SPECIALTY, ROUTES.MAGISTRACY, ROUTES.SECOND_HIGHEST, ROUTES.POSTGRADUATE_STUDY, ROUTES.ORDINATURA];
const isLevelPage = popupRoutes.indexOf(route.path as string) >= 0;

const { openModal } = useModalStore();
const popupIndex = shallowRef<number>(0);
const popupTitle = shallowRef('');
const popupText = shallowRef('');

function openForm(index: number, item: Item) {
  const programs = document.getElementsByClassName('s-level-programs-form-faculties')[0];
  
  if (!isLevelPage || !programs) return;

  const idx = index - 1;
  if( idx < 0 ) {
    programs?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    return;
  }

  popupIndex.value = idx;
  popupTitle.value = item.popupTitle ?? item.title ?? '';
  popupText.value = item.popupText ?? '';

  openModal('SLevelAboutPopup', {
    index: popupIndex,
    title: popupTitle,
    text: popupText,
  });
}

function isTagQuantity(tag: Tag | TagQuantity): tag is TagQuantity {
  return (tag as TagQuantity).quantity !== undefined;
}
</script>

<template>
  <MSection
    v-if="cardTitle && cardText"
    class="s-about"
  >
    <div class="s-about__grid">
      <MCardText
        title-class="a-font_h4"
        text-class="a-font_h6"
        tag-class="a-font_m-m"
        :title="cardTitle"
        :text="cardText"
        :tags="mapTags"
        :icons="mapIcons"
      >
        <template v-if="content">
          <div v-html="content" />
        </template>
        <slot />
      </MCardText>
      <component
        :is="isInitSwiper ? Swiper : 'div'"
        v-if="cardItems.length"
        class="s-about__slider"
        :class="{ '--grid': !isInitSwiper }"
        v-bind="swiperConfig"
        slides-per-view="auto"
      >
        <swiper-slide
          v-for="(item, index) in cardItems"
          :key="index"
          class="swiper-slide"
          :class="isLevelPage ? '--has-modal' : ''"
          @click="openForm(index, item)"
        >
          <div
            class="s-about__card"
            :class="item.classname"
          >
            <span
              class="s-about__card-title a-font_h3"
              :class="itemTitleClass"
              v-html="item.title"
            />
            <span
              class="s-about__card-text a-font_slider-text"
              v-html="item.text"
            />
            <picture class="s-about__card-img">
              <source
                v-if="item.imageLg"
                :srcset="item.imageLg"
                media="(min-width: 1200px)"
              >
              <source
                v-if="item.imageMd"
                :srcset="item.imageMd"
                media="(min-width: 768px)"
              >
              <AImg
                :src="item.image"
                :alt="item.title"
              />
            </picture>
          </div>
        </swiper-slide>
      </component>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SAbout.scss';
</style>
