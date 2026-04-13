<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Scrollbar, Navigation } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import CardLineLg from '~/assets/images/s_credit/card-line.svg?url';
import CardLineSm from '~/assets/images/s_credit/card-line_mob.svg?url';
import { CREDIT_PRICES } from '~/constants/creditPrices';

interface Props {
  isSwiperNav?: boolean;
  firstItem?: string;
}

interface Cost {
  tag: string;
  title: string;
  value: string;
  text: string;
}

const {
  isSwiperNav = true,
  firstItem,
} = defineProps<Props>();

const modalTitle = shallowRef('');
const modalText = shallowRef('');

const prices = firstItem?.trim()
  ? [...CREDIT_PRICES].sort((a) => (a.value === firstItem ? -1 : 1))
  : CREDIT_PRICES;

const {
  swiperRef,
  swiperConfig,
  scrollbarRef,
  navRef,
} = useSwiperWrapper({
  modules: [Navigation, Scrollbar],
  showSwiperScrollbar: true,
  showSwiperNavigation: isSwiperNav ? true : false,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
  scrollbar: {
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
});

const { openModal } = useModalStore();

function openPopup(item: Cost) {
  modalTitle.value = item.tag;
  modalText.value = item.text;

  openModal('MCreditModal', {
    title: modalTitle,
    text: modalText,
  });
}
</script>

<template>
  <div class="s-credit__prices">
    <swiper
      ref="swiperRef"
      v-bind="swiperConfig"
    >
      <template #wrapper-start>
        <MCardTagTitle
          v-for="item in prices"
          :key="item.title"
          class="swiper-slide"
          tag-font-size="a-font_xl"
          show-bg-image
          :tag="item.tag"
          :title="item.title"
          title-class="a-font_h5"
          :img-lg="CardLineLg"
          :img-sm="CardLineSm"
          @click="openPopup(item)"
        />
      </template>
    </swiper>
    <MSwiperNav
      v-if="isSwiperNav"
      ref="navRef"
    />

    <div
      ref="scrollbarRef"
      class="swiper-scrollbar"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './MCreditCost.scss';
@import '../MCardTagTitle/MCardTagTitle.scss';

.s-credit__prices {
  position: relative;
}

:global(.--modal-m-credit-modal .m-modal-close) {
  @media mobile {
    display: none;
  }
}
</style>
