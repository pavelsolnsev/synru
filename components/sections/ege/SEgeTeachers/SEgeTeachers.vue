import { synergyApi } from '~/utils/mediaCdn';
<script lang="ts" setup>
const data = {
  title: 'Занятия проводят педагоги из&nbsp;<span class="nobr">топ-вузов</span> МГУ, МГТУ им.&nbsp;Баумана, МПГУ и&nbsp;др.',
  subtitle: 'Все преподаватели&nbsp;— эксперты ЕГЭ и&nbsp;ОГЭ с&nbsp;опытом работы более 5&nbsp;лет',
  tags: [
    'Каждый год подтверждают квалификацию, сдавая ЕГЭ на&nbsp;95+ баллов',
    'Проходят строгий отбор и&nbsp;систематическое внутреннее тестирование',
    'Регулярно проходят курсы повышения квалификации',
  ],
  imageLG: synergyApi('uploads/content/ege/teachers_lg.webp'),
  imageSM: synergyApi('uploads/content/ege/teachers_sm.webp'),
};
</script>

<template>
  <MSectionNewResponsive class="s-ege-teachers">
    <div class="s-ege-teachers__body">
      <div class="s-ege-teachers__left">
        <h2
          class="a-font_h5 s-ege-teachers__title"
          v-html="data.title"
        />
        <div class="s-ege-teachers__bottom">
          <div class="s-ege-teachers__wrap">
            <div
              class="s-ege-teachers__subtitle a-font_h6"
              v-html="data.subtitle"
            />
            <ul>
              <li
                v-for="item in data.tags"
                :key="item"
                class="a-font_l-m"
                v-html="item"
              />
            </ul>
          </div>
          <div class="s-ege-teachers__icon">
            <ASvgMono name="simple-hat" />
          </div>
        </div>
      </div>
      <div class="s-ege-teachers__right">
        <picture>
          <source
            media="(min-width: 1200px)"
            :srcset="data.imageLG"
          >
          <AImg
            :src="data.imageSM"
            :alt="data.title"
            decoding="async"
            loading="lazy"
          />
        </picture>
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SEgeTeachers.scss';
</style>
