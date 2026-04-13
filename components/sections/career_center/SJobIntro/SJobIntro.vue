import { synergyApi } from '~/utils/mediaCdn';
<script setup lang="ts">
interface Props {
  routeName?: string;
  title: string;
  formTitle: string;
  actionParams?: { param: string }[];
}

const {
  routeName = '',
  title = '',
  formTitle = '',
  actionParams = [],
} = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity: {} });

const img_sm = synergyApi('uploads/content/career_center/s-job-intro/bg_sm.webp');
const img_lg = synergyApi('uploads/content/career_center/s-job-intro/bg_lg.webp');
</script>

<template>
  <MSectionNewResponsive class="s-job-intro">
    <div class="s-job-intro__inner">
      <MBreadcrumbs :breadcrumbs />
      <h1
        v-if="title"
        class="s-job-intro__title"
        v-html="title"
      />
      <div class="s-job-intro__form">
        <div
          class="a-font_h6 s-job-intro__form-title"
          v-html="formTitle"
        />
        <MQuizForm
          :title="formTitle"
          :action-params="actionParams"
        />
      </div>
    </div>
    <picture>
      <source
        :srcset="img_lg"
        media="(min-width: 1200px)"
      >
      <AImg
        :src="img_sm"
        alt="credit"
      />
    </picture>
  </MSectionNewResponsive>
</template>

<style scoped lang="scss">
@import './SJobIntro.scss';
</style>
