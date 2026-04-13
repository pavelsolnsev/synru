<script setup lang='ts'>
interface Props {
  title?: string;
  titleClass?: string;
  subtitle?: string;
  subtitleClass?: string;
  tags: { name: string }[];
  btnText?: string;
  imageLg: string;
  imageSm: string;
  actionParams?: { param: string }[],
}

const {
  title = '',
  titleClass = 'a-font_h2',
  subtitle = '',
  subtitleClass = 'a-font_h6',
  tags = [],
  btnText = 'Отправить',
  imageLg,
  imageSm,
  actionParams = [],
} = defineProps<Props>();

useFitText('refTitle');
</script>

<template>
  <MSectionNewResponsive
    class="s-form-full-bg"
  >
    <picture class="s-form-full-bg__image">
      <source
        v-if="imageLg"
        media="(min-width: 1200px)"
        :srcset="imageLg"
      >
      <AImg
        :src="imageSm"
        decoding="async"
        loading="lazy"
      />
    </picture>
    <div class="s-form-full-bg__content">
      <h2
        v-if="title"
        ref="refTitle"
        class="s-form-full-bg__title"
        :class="titleClass"
        v-html="title"
      />
      <p
        v-if="subtitle"
        class="s-form-full-bg__subtitle"
        :class="subtitleClass"
        v-html="subtitle"
      />
      <ul
        v-if="tags.length"
        class="s-form-full-bg__tags a-font_m-m"
      >
        <li
          v-for="tag in tags"
          :key="tag.name"
          v-html="tag.name"
        />
      </ul>
      <MQuizForm
        :action-params="actionParams"
        :btn="btnText"
      />
    </div>
  </MSectionNewResponsive>
</template>

<style scoped lang='scss'>
@import "./SFormFullBg.scss";
</style>
