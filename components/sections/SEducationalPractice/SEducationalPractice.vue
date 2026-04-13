<script setup lang='ts'></script>

<template>
  <MSection class="s-educational-practice">
    <picture class="s-educational-practice__image">
      <source
        srcset="/img/practices/s-educational-practice-lg.webp"
        media="(min-width: 1200px)"
      >
      <source
        srcset="/img/practices/s-educational-practice-md.webp"
        media="(min-width: 768px)"
      >
      <AImg
        src="/img/practices/s-educational-practice-sm.webp"
        alt=""
        decoding="async"
        loading="lazy"
      />
    </picture>
    <div class="s-educational-practice__content">
      <div class="s-educational-practice__title">
        <h2 class="a-font_h2">Учебная практика</h2>
        <p class="a-font_h6">С&nbsp;первого курса вы пробуете профессию в&nbsp;деле: работаете с&nbsp;актуальными инструментами и&nbsp;методами, знакомитесь с&nbsp;базовыми аспектами специальности.</p>
      </div>
      <div class="a-font_l-m s-educational-practice__list">
        <div class="s-educational-practice__item">
          <p>Практика в&nbsp;лабораториях, <br>мастерских и&nbsp;учебных кабинетах с&nbsp;профессиональным оборудованием</p>
          <ASvgMono name="simple-check" />
        </div>
        <div class="s-educational-practice__item">
          <p>Мастер-классы, экскурсии, игры и&nbsp;групповые дискуссии для&nbsp;прокачки навыков</p>
          <ASvgMono name="simple-check" />
        </div>
      </div>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SEducationalPractice.scss';
</style>
