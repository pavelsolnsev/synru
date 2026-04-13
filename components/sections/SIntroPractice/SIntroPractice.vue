<script setup lang='ts'>
import generateBreadcrumbs from '~/utils/generateBreadcrumbs';

interface Props {
  routeName?: string;
}

const {
  routeName = '',
} = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity: {} });
</script>

<template>
  <MSection
    class="intro-practice"
    title="Практика и&nbsp;погружение <br>в&nbsp;профессию"
  >
    <MBreadcrumbs :breadcrumbs />

    <picture class="intro-practice__img">
      <source
        srcset="/img/practices/intro_practice_lg.webp"
        media="(min-width: 1200px)"
      >
      <source
        srcset="/img/practices/intro_practice_md.webp"
        media="(min-width: 768px)"
      >
      <AImg
        src="/img/practices/intro_practice_sm.webp"
        alt=""
        decoding="async"
      />
    </picture>
    <div class="intro-practice__form">
      <AImg
        src="/img/practices/intro_form.webp"
        alt=""
        decoding="async"
      />
      <p class="a-font_h4 intro-practice__title-form">Узнайте минимальный проходной балл в&nbsp;2026 году, оставив заявку</p>
      <MQuizForm
        :form-name="false"
        :action-params="[{
          param: 'form=practice',
        }]"
      />
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SIntroPractice.scss';
</style>
