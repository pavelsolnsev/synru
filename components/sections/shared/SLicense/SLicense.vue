<script setup lang="ts">
import { DOCUMENTS } from '~/constants';
import type { Fonts } from '~/types';

interface Props {
  title?: string,
  titleClass?: Fonts
}

const {
  title = 'Лицензии и аккредитации',
  titleClass = 'a-font_h4',
} = defineProps<Props>();

const documents = [
  {
    title: 'Лицензия',
    text: 'на&nbsp;осуществление образовательной деятельности',
    link: DOCUMENTS.REESTROVAYA_VYPISKA,
    isDocs: true,
  },
  {
    title: 'Свидетельство ',
    text: 'о государственной <br>аккредитации',
    link: DOCUMENTS.AKKRED_REESTR,
    isDocs: true,
  },
  {
    title: 'Аккредитация',
    text: 'Международной ассоциации MBA',
    link: DOCUMENTS.AKKRED_MBA,
    isDocs: false,
  },
];
</script>

<template>
  <MSection
    class="s-license"
    :title
    :title-class
  >
    <MDocumentsSlider
      :documents
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SLicense.scss';
</style>
