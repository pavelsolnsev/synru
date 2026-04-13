import { synergyApi } from '~/utils/mediaCdn';
<script lang="ts" setup>
interface Props {
  title: string
  subtitle: string
  problems: Array<{
    problem: string
    solution: string
  }>
}
defineProps<Props>();
</script>

<template>
  <MSectionNewResponsive class="s-ege-problems">
    <div class="s-ege-problems__body">
      <h2
        v-if="title"
        class="a-font_h4"
        v-html="title"
      />
      <div
        v-if="subtitle"
        class="s-ege-problems__subtitle a-font_h6"
        v-html="subtitle"
      />
      <ul
        v-if="problems && problems.length"
        class="s-ege-problems__list"
      >
        <li
          v-for="item in problems"
          :key="item.problem"
          class="s-ege-problems__item"
        >
          <div
            class="s-ege-problems__top"
          >
            <ASvgMono
              class="s-ege-problems__icon"
              name="problem"
            />
            <span
              class="a-font_m"
              v-html="item.problem"
            />
          </div>
          <div
            class="s-ege-problems__bottom"
          >
            <ASvgMono
              class="s-ege-problems__icon"
              name="solution"
            />
            <span v-html="item.solution" />
          </div>
        </li>
      </ul>
      <div class="s-ege-problems__info">
        <picture
          class="s-ege-problems__bg"
        >
          <source
            media="(min-width: 1200px)"
            srcset=synergyApi('uploads/content/ege/documents_lg.webp')
          >
          <AImg
            src=synergyApi('uploads/content/ege/documents_sm.webp')
            alt=""
            decoding="async"
            loading="lazy"
          />
        </picture>
        <h5 class="a-font_h5">Мы образовательная организация</h5>
        <span>У нас есть государственная аккредитация<br>и&nbsp;лицензия на&nbsp;образовательную деятельность</span>
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SEgeProblems.scss';
</style>
