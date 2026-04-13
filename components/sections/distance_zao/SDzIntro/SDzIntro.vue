<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';
interface Props {
  tags: { text: string }[];
  formTitle?: string;
  entity: { name?: string };
  pageName: string;
  routeName?: string;
}

const {
  pageName = '',
  tags = [],
  formTitle = '',
  routeName = '',
  entity = {},
} = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity: {} });
const imgSm = synergyApi('uploads/content/distance_zao/intro-sm.webp');
const imgLg = synergyApi('uploads/content/distance_zao/intro-lg.webp');
</script>

<template>
  <MSectionNewResponsive class="s-level-intro">
    <div class="s-level-intro__inner">
      <MBreadcrumbs :breadcrumbs />

      <picture>
        <source
          :srcset="imgLg"
          media="(min-width: 1200px)"
        >
        <AImg
          :src="imgSm"
          :alt="pageName"
          decoding="async"
        />
      </picture>
      <div class="s-level-intro__content">
        <h1
          class="s-level-intro__title a-font_banner"
          v-html="pageName"
        />
        <ul
          v-if="tags.length"
          class="s-level-intro__tags a-font_xl-m"
        >
          <li
            v-for="tag in tags"
            :key="tag.text"
            v-html="tag.text"
          />
        </ul>
        <p
          v-if="formTitle"
          class="a-font_h6 s-level-intro__text"
          v-html="formTitle"
        />
        <MQuizForm
          btn="Отправить"
          :action-params="[{ param: `form=${routeName}` }]"
          :route-name
        />
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SDzIntro.scss';
</style>
