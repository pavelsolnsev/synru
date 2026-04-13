<script setup lang='ts'>
const cards = [{
  title: 'Только навыки и&nbsp;знания, <br>которые пригодятся в&nbsp;работе',
  text: 'Курсы разработаны так, чтобы вы сразу применяли знания на&nbsp;практике. <br>Без&nbsp;лишней теории и&nbsp;воды&nbsp;— только то, что востребовано в&nbsp;профессии.',
}, {
  title: 'Много практики и&nbsp;стажировки в&nbsp;<span class="nobr">компаниях-партнёрах</span>',
  text: 'Вы начнёте пробовать профессию в&nbsp;деле с&nbsp;первого месяца обучения, а&nbsp;практика в&nbsp;настоящих компаниях поможет понять, что вас ждёт после выпуска.',
}, {
  title: 'Обучение у&nbsp;профессионалов',
  text: 'Наши преподаватели работают с&nbsp;ведущими компаниями и&nbsp;знают, какие навыки востребованы на&nbsp;рынке труда.',
}, {
  title: 'Персональная обратная связь',
  text: 'Вы будете регулярно получать обратную связь с&nbsp;детальными комментариями и&nbsp;рекомендациями экспертов.',
}, {
  title: 'Гарантируем работу по&nbsp;специальности',
  text: 'Это закреплено в&nbsp;договоре.',
}];
</script>

<template>
  <MSection class="s-courses-results">
    <div class="s-courses-results__wrap">
      <div class="s-courses-results__title">
        <h2 class="a-font_h2">Приведём к&nbsp;реальному результату</h2>
        <p class="a-font_h6 s-courses-results__title-text">По&nbsp;окончании обучения у&nbsp;вас будет практический и&nbsp;разносторонний опыт решения реальных задач, а&nbsp;также именно те компетенции, которые нужны работодателям и&nbsp;бизнесу</p>
      </div>
      <div class="s-courses-results__cards">
        <div
          v-for="card, idx in cards"
          :key="card.title"
          class="s-courses-results__card"
        >
          <div class="--num a-font_l-m">{{ formatNumberWithLeadingZero(idx + 1) }}</div>
          <p
            class="a-font_h6 s-courses-results__card-title"
            v-html="card.title"
          />
          <p
            class="a-font_m s-courses-results__card-text"
            v-html="card.text"
          />
          <AImg
            src="/img/courses/line-bg.svg"
            decoding="async"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SCoursesResults.scss';
</style>
