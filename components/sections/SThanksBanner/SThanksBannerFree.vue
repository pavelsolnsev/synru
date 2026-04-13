import { synergyApi } from '~/utils/mediaCdn';
<script setup lang="ts">
interface Props {
  courseVideoLink?: string;
  tgLink?: string;
}

const {
  courseVideoLink = '',
  tgLink = '',
} = defineProps<Props>();


const infoCards = [{
  icon: 'simple-hat',
  text: 'Правила поступления',
}, {
  icon: 'simple-catalog',
  text: 'Бюджетные места',
}, {
  icon: 'simple-star2',
  text: 'Акции, скидки, конкурсы',
}, {
  icon: 'simple-door',
  text: 'Дни открытых дверей',
}];


const video = 'https://rutube.ru/play/embed/fa6162e01c7c5017abd9415c0b4248b5/';
const { openModal } = useModalStore();

function onClickVideo(link: string) {
  if (!link) return;
  openModal('MModalIframe', {
    src: link,
  });
}
</script>


<template>
  <MSection class="s-thanks-banner">
    <div class="s-thanks-banner__wrap">
      <div class="s-thanks-banner__block-text">
        <picture>
          <source
            media="(min-width: 1200px)"
            srcset=synergyApi('uploads/content/s-thanks-banner/s-thanks-banner-lg.webp')
          >
          <source
            media="(min-width: 768px)"
            srcset=synergyApi('uploads/content/s-thanks-banner/s-thanks-banner-md.webp')
          >
          <AImg
            src=synergyApi('uploads/content/s-thanks-banner/s-thanks-banner-sm.webp')
            decoding="async"
            alt=""
          />
        </picture>
        <h1 class="s-thanks-banner__block-text-title a-font_h1">Спасибо!</h1>
        <p
          class="s-thanks-banner__block-text-desc a-font_h6"
        >
          Ваш курс доступен по
          <NuxtLink
            :to="courseVideoLink"
            target="_blank"
            :external="true"
          >
            ссылке
          </NuxtLink>
        </p>
      </div>

      <div
        class="s-thanks-banner__block-video"
        @click.prevent="onClickVideo(video)"
      >
        <div class="s-thanks-banner__block-video-play">
          <p class="s-thanks-banner__block-video-play-text a-font_m-m">Смотрите видео об Университете
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 13 12"
              width="13"
              height="12"
            >
              <path
                fill="#ED131C"
                d="m7 0 6 11H0L7 0Z"
              />
            </svg>
          </p>
          <APlay />
        </div>
        <picture>
          <source
            media="(min-width: 1200px)"
            srcset=synergyApi('uploads/content/banner/thanks-banner-video-lg.webp')
          >
          <source
            media="(min-width: 768px)"
            srcset=synergyApi('uploads/content/banner/thanks-banner-video-md.webp')
          >
          <AImg
            src=synergyApi('uploads/content/banner/thanks-banner-video-sm.webp')
            decoding="async"
            alt=""
          />
        </picture>
      </div>

      <div class="s-thanks-banner__block-info">
        <picture>
          <source
            media="(min-width: 1200px)"
            srcset=synergyApi('uploads/content/banner/s-thanks-banner-block-info-lg.svg')
          >
          <source
            media="(min-width: 768px)"
            srcset=synergyApi('uploads/content/banner/s-thanks-banner-block-info-md.svg')
          >
          <AImg
            src=synergyApi('uploads/content/banner/s-thanks-banner-block-info-sm.svg')
            decoding="async"
            alt=""
          />
        </picture>
        <p
          class="s-thanks-banner__block-info-title a-font_h4"
        >
          Вся важная информация —&nbsp;в&nbsp;
          <NuxtLink
            :to="tgLink"
            target="_blank"
          >
            официальном <br>канале
          </NuxtLink>
          демо-вуза в&nbsp;Telegram:
        </p>
        <div class="s-thanks-banner__info-cards">
          <div
            v-for="item in infoCards"
            :key="item.text"
            class="s-thanks-banner__info-card"
          >
            <ASvgMono :name="item.icon" />
            <p
              class="a-font_slider-text"
              v-html="item.text"
            />
          </div>
          <NuxtLink
            v-if="tgLink"
            class="a-btn a-btn--primary a-btn--lg a-btn--red a-font_h6"
            :to="tgLink"
            target="_blank"
            external
          >
            <ASvgMono name="click" />
            <span>Подписаться <br>и следить!</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SThanksBannerFree.scss';
</style>
