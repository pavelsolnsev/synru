import { synergyApi } from '~/utils/mediaCdn';
<script setup lang="ts">
interface Props {
  title?: string
  actionParams?: { param: string }[]
}

const { title = 'Заполните форму, свяжемся с&nbsp;вами в&nbsp;ближайшее время и&nbsp;ответим на&nbsp;все вопросы' } = defineProps<Props>();

const data = {
  bg_lg: synergyApi('uploads/content/podbor/modal_lg.webp'),
  bg_sm: synergyApi('uploads/content/podbor/modal_sm.webp'),
};
</script>

<template>
  <div class="m-modal-contour-form">
    <picture class="m-modal-contour-form__bg">
      <source
        media="(min-width: 1200px)"
        :srcset="data.bg_lg"
      >
      <AImg
        :src="data.bg_sm"
        :alt="title"
        decoding="async"
        loading="lazy"
      />
    </picture>
    <div
      class="m-modal-contour-form__title a-font_h5"
      v-html="title"
    />
    <MQuizForm
      class="m-modal-contour-form__form"
      btn="Отправить"
      :form-name="false"
      title=""
      :action-params
    />
  </div>
</template>

<style lang="scss" scoped>
@import './MModalContourForm';
</style>
