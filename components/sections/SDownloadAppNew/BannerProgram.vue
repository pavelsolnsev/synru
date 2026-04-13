import { synergyApi } from '~/utils/mediaCdn';
<script setup lang="ts">

const programBanner = {
  levels: ['школа', 'колледж', 'университет', 'бизнес-образование', 'курсы'],
  programsCount: '1000+',
  programsLabel: 'программ',
  imgLg: synergyApi('uploads/content/s-download-app/programs-lg-2.webp'),
  imgMd: synergyApi('uploads/content/s-download-app/programs-md-2.webp'),
  imgSm: synergyApi('uploads/content/s-download-app/programs-sm-2.webp'),
};

const { openModal } = useModalStore();
</script>

<template>
  <div
    class="s-download-app-new__programs"
    @click="openModal('MDAModal', {type: 'programs'})"
  >
    <div class="s-download-app-new__programs-levels">
      <span
        v-for="value in programBanner.levels"
        :key="value"
        v-html="value"
      />
    </div>
    <picture class="s-download-app-new__programs-pic">
      <source
        media="(min-width: 1200px)"
        :srcset="programBanner.imgLg"
      >
      <source
        media="(min-width: 768px)"
        :srcset="programBanner.imgMd"
      >
      <AImg
        :srcset="programBanner.imgSm"
        loading="lazy"
        decoding="async"
      />
    </picture>
    <div class="s-download-app-new__programs-title">
      <span>{{ programBanner.programsCount }}</span>
      <span>{{ programBanner.programsLabel }}</span>
    </div>
    <div class="s-download-app-new__programs-bottom">
      <span>Образование</span>
      <span>
        <AImg
          src=synergyApi('uploads/content/s-download-app/programs-hat.webp')
          alt="hat"
          loading="lazy"
        />
      </span>
      <span>для</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="43"
        height="40"
        fill="none"
        viewBox="0 0 43 40"
      >
        <path
          fill="#DDDEE2"
          d="m36.034 14.254.004-.003 6.038 6.037-.004.003.003.004-6.037 6.037-.003-.003-13.53 13.53-6.037-6.038 9.262-9.262H.6v-8.538h25.128l-9.26-9.26L22.505.726l13.53 13.53Z"
        />
      </svg>
      <span>
        <AImg
          src=synergyApi('uploads/content/s-download-app/programs-bag.webp')
          alt="hat"
          loading="lazy"
          decoding="async"
        />
      </span>
      <span>карьеры</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.s-download-app-new__programs {
  overflow: hidden;
  gap: scale(4);
  display: grid;
  height: auto;
  padding: scale(12);
  border-radius: scale(8);
  background-color: var(--a-color_grey_40);
  cursor: pointer;
  transition: var(--transition);
  &:hover { opacity: .8 }
  @include desktop() {
    gap: scale(14) scale(10);
    grid-template-columns: 1fr scale(247);
    align-items: center;
    padding: scale(20);
    border-radius: scale(16);
  }

  &-levels {
    gap: scale(4);
    display: flex;
    flex-wrap: wrap;
    min-width: 0;
    padding: scale(8);
    border-radius: scale(12);
    background-color: var(--a-color_white);
    @include desktop() {
      gap: scale(4);
      grid-column: 1;
      justify-content: space-between;
      padding: scale(12) scale(15);
      border-radius: scale(16);
    }
    span {
      display: flex;
      align-items: center;
      padding: scale(4) scale(9);
      border: 1px solid var(--a-color_red);
      border-radius: scale(14);
      font-size: scale(14);
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: scale(12);
      text-transform: uppercase;

      @include desktop() {
        padding: scale(4) scale(10);
        font-size: scale(14);
        line-height: scale(19);
      }
    }
  }

  &-pic {
    position: static;
    display: block;
    width: 100%;
    min-width: 0;
    height: scale(139);
    margin-top: scale(-10);

    @include desktop(min) {
      grid-column: 2;
      grid-row: 1/4;
      width: auto;
      height: 100%;
      margin-top: initial;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;

      @include desktop(min) {
        object-position: left;
        overflow: visible;
      }
    }
  }

  &-title {
    gap: 0;
    display: flex;
    min-width: 0;
    @include desktop() {
      grid-column: 1;
      border-radius: scale(16);
    }
    span {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: scale(7);
      border-radius: scale(8);
      background-color: var(--a-color_red);
      box-shadow: inset 0 scale(-1) 0 0 #00000040;
      font-size: scale(34);
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: scale(24);
      text-transform: uppercase;
      text-shadow: 0 scale(1) rgba(0, 0, 0, 0.25);
      color: var(--a-color_white);

      @include desktop(min) {
        padding: scale(16) scale(12);
        border-radius: scale(16);
        box-shadow: inset 0 scale(-3) 0 0 #00000040;
        font-size: scale(66);
        line-height: scale(46);
        text-shadow: 0 scale(3) rgba(0, 0, 0, 0.25);
      }
    }
  }

  &-bottom {
    gap: scale(4);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    min-width: 0;
    padding: scale(8);
    border-radius: scale(12);
    background-color: var(--a-color_white);
    @include desktop() {
      gap: scale(10) scale(14);
      grid-column: 1;
      padding: scale(14);
      border-radius: scale(22);
    }
    span {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
      height: scale(34);
      padding: scale(8);
      border-radius: scale(8);
      box-shadow: inset 0 scale(-3) scale(7) 0 #00000030;
      font-size: scale(28);
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: scale(17);
      text-transform: uppercase;
      @include desktop() {
        height: scale(66);
        border-radius: scale(16);
        font-size: scale(52);
        line-height: scale(34);
      }
    }
    span:has(img) {
      width: scale(34);
      padding: 0;
      margin-left: auto;
      @include desktop() {
        width: scale(66);
      }
    }
    img {
      flex: none;
      display: block;
      width: 100%;
      height: auto;
    }
    svg {
      flex: none;
      align-self: center;
      width: scale(22);
      height: scale(20);
      margin: auto;
      @include desktop() {
        width: scale(42);
        height: scale(40);
      }
    }
  }
}
</style>
