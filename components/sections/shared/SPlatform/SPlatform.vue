<script setup lang="ts">
import { ROUTES } from '~/constants';
import BgImageLg from '~/assets/images/s_platform/lg.webp';
import BgImageMd from '~/assets/images/s_platform/md.webp';
import BgImageSm from '~/assets/images/s_platform/sm.webp';

interface Props {
  docLink: string;
}

const {
  docLink = '',
} = defineProps<Props>();

const text = `В&nbsp;соответствии с&nbsp;<a href="${docLink}">Приказом Министерства науки и&nbsp;высшего образования РФ</a>&nbsp;демо-образовательному учреждению присвоен статус Федеральной Инновационной Площадки (пример текста для портфолио).`;
</script>

<template>
  <MSection
    v-if="docLink"
    class="s-platform"
  >
    <div class="s-platform__wrap">
      <MCardText
        is-big
        title-class="a-font_h4"
        title="Федеральная инновационная площадка"
        text-class="a-font_xl-m"
        :text
        :icons="['simple-university', 'simple-schedule']"
        :tags="['Инновации', 'Высшее образование']"
      >
        <AButton
          bg-color="white"
          :to="ROUTES.FIP"
        >
          <span>Узнать подробнее</span>
        </AButton>
      </MCardText>
      <div class="s-platform__banner">
        <AButton
          bg-color="white"
          :to="ROUTES.FIP"
          :external="true"
        >
          <span>Узнать подробнее</span>
        </AButton>
        <picture>
          <source
            media="(min-width: 1200px)"
            :srcset="BgImageLg"
          >
          <source
            media="(min-width: 768px)"
            :srcset="BgImageMd"
          >
          <AImg
            alt="FIP"
            decoding="async"
            loading="lazy"
            width="336"
            height="224"
            :src="BgImageSm"
          />
        </picture>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SPlatform.scss';
</style>
