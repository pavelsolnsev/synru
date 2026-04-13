<script setup lang="ts">
import { Fancybox } from '@fancyapps/ui';
import { synergyApi } from '~/utils/mediaCdn';

interface Props {
  index: number;
  title: string;
  text: string;
}

const {
  index = 0,
  title,
  text,
} = defineProps<Props>();

const { closeTopModal } = useModalStore();

const imgSm = computed(() => {
  return synergyApi(`uploads/content/s-level-about/${index}-sm.webp`);
});

const imgLg = computed(() => {
  return synergyApi(`uploads/content/s-level-about/${index}-lg.webp`);
});
</script>

<template>
  <div
    id="level-about-popup"
    class="s-level-about-popup"
  >
    <div class="s-level-about-popup__inner">
      <h4
        class="a-font_h4"
        v-html="title"
      />
      <div
        class="a-font_xl-m"
        v-html="text"
      />
      <picture>
        <source
          media="(min-width: 1200px)"
          :srcset="imgLg"
        >
        <AImg
          alt="credit"
          decoding="async"
          loading="lazy"
          :src="imgSm"
        />
      </picture>
    </div>
    <AButtonThird
      bg-color="bordered"
      size="sm"
      @click="closeTopModal"
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="6"
          height="8"
          fill="none"
          viewBox="0 0 6 8"
        >
          <path
            fill="#1C1C1C"
            d="M4.495 0 0 4l4.495 4 .958-.852L1.916 4 5.453.852 4.495 0Z"
          />
        </svg>
        <span>Вернуться</span>
      </span>
    </AButtonThird>
  </div>
</template>

<style lang="scss" scoped>
@import '../SLevelAboutPopup/SLevelAboutPopup.scss';
</style>
