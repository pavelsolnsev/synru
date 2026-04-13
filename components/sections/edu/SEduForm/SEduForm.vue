<script setup lang="ts">
import { ARTICLE_DEFAULT_FORM_PARAM } from '~/constants/articles';

const route = useRoute();
const typeName = route.params.slug[1] === 'oge' ? 'ОГЭ' : 'ЕГЭ';
const title = `Узнайте минимальный проходной балл и&nbsp;начните готовиться к&nbsp;${typeName} <span class="--free-white">бесплатно</span>`;
</script>

<template>
  <MFormMin
    :title
    :action-params="[{ param: ARTICLE_DEFAULT_FORM_PARAM }]"
    title-class="a-font_h4"
    bg-color="red"
    form-name
    form-phone
  />
</template>
