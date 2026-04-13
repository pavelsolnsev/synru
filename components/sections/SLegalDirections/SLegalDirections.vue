<script setup lang="ts">
import { directions } from './SLegalDirectionsData';

const { openModal } = useModalStore();
function onClickHelp(title: string) {
  openModal('MModalForm', {
    'form-name': true,
    'form-phone': true,
    'title': title,
    'btn': "Отправить",
    'action-params': [{param: 'form=yur_klinika'}],
  });
}

</script>

<template>
  <MSection
    class="s-directions"
    title="Направления бесплатной помощи"
  >
    <div class="s-directions__grid">
      <div
        v-for="(item, index) in directions"
        :key="item.title"
        class="s-directions__item"
      >
        <h5 class="s-directions__item-title a-font_h5" v-html="item.title" />
        <div class="s-directions__item-text a-font_l-m" v-html="item.text" />
        <AButton
          type="button"
          size="md"
          @click.prevent="onClickHelp(item.title)"
        >
          <span>Получить консультацию</span>
        </AButton>
        <ASvgMono name="faculty_3" />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SLegalDirections.scss';
</style>
