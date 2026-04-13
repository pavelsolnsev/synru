<script setup lang="ts">
const formatItems = [{
  title: '4 международных модуля 6 стран',
  text: 'Китай, Индия, ОАЭ + Саудовская Аравия, Бразилия + Аргентина',
}, {
  title: '2 года',
  text: 'Срок обучения',
}, {
  title: '16 учебных занятий',
  text: 'Встречи раз в 1–2 месяца',
}, {
  title: '4 дня',
  text: 'Длительность каждого модуля',
}];
</script>

<template>
  <MSection
    title="Формат обучения"
    class="s-emba-format"
  >
    <div class="s-emba-format__content">
      <MArticleCard
        v-for="item, idx in formatItems"
        :key="idx"
        :title="item.title"
        :text="item.text"
        :image="`/img/emba/emba_format_${idx+1}.webp`"
        title-class="a-font_slider-text"
        text-class="a-font_l"
      />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SEmbaFormat.scss';
</style>
