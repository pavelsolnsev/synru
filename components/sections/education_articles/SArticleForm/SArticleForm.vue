<script setup lang="ts">
import type { Fonts, FormBgColor } from '~/types';

interface Props {
  title?: string;
  titleClass?: Fonts;
  subtitle?: string;
  subtitleClass?: Fonts;
  bgColor?: FormBgColor;
  formMail?: boolean;
  btn?: string;
  actionParams?: { param: string }[];
  showLogo?: boolean;
  routeName?: string;
  entity?: unknown;
}

const {
  title,
  titleClass = 'a-font_h5',
  subtitle = '',
  subtitleClass = 'a-font_l',
  bgColor = 'grey_20',
  formMail,
  btn,
  actionParams = [],
  showLogo,
} = defineProps<Props>();
</script>

<template>
  <div class="s-article-form">
    <MFormMin
      :title
      :title-class
      :subtitle
      :subtitle-class
      :bg-color
      :form-mail
      :btn
      :action-params
      :show-logo
    />
  </div>
</template>

<style lang="scss" scoped>
@import './SArticleForm.scss';
</style>
