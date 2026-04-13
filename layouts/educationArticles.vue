<script setup lang="ts">
import { ROUTES } from '~/constants';
import type { MArticlesMenu } from '~/types';

const menu: MArticlesMenu[] = [{
  title: 'Главная',
  icon: 'menu_home',
  to: ROUTES.ARTICLES,
},
{
  title: 'Справочник абитуриента',
  icon: 'menu_media',
  to: ROUTES.MEDIA,
},
{
  title: 'Школа',
  icon: 'menu_school',
  to: ROUTES.ARTICLES_SCHOOL,
},
{
  title: 'ОГЭ/ЕГЭ',
  icon: 'menu_exam',
  to: ROUTES.ARTICLES_EGE,
  child: [
    {
      title: 'Материалы для подготовки к&nbsp;ЕГЭ/ОГЭ',
      to: ROUTES.EGE_OGE,
    },
    {
      title: 'ЕГЭ',
      to: ROUTES.EGE,
    },
    {
      title: 'ОГЭ',
      to: ROUTES.OGE,
    },
    {
      title: 'Калькулятор ЕГЭ 2026',
      to: ROUTES.EGE_CALC,
    },
    {
      title: 'Новости образования',
      to: ROUTES.EDU_NEWS,
    },
    {
      title: 'Блог абитуриента',
      to: ROUTES.EDU_USEFUL_INFORMATION,
    },
  ],
},
{
  title: 'Колледж',
  icon: 'menu_college',
  to: ROUTES.ARTICLES_COLLEGE,
},
{
  title: 'Высшее образование',
  icon: 'menu_higher_education',
  to: ROUTES.ARTICLES_HIGHEST_EDUCATION,
  child: [
    {
      title: 'Бакалавриат',
      to: ROUTES.ARTICLES_BACCALAUREATE,
    },
    {
      title: 'Специалитет',
      to: ROUTES.ARTICLES_SPECIALTY,
    },
    {
      title: 'Магистратура',
      to: ROUTES.ARTICLES_MAGISTRACY,
    },
    {
      title: 'Второе высшее',
      to: ROUTES.ARTICLES_SECOND_HIGHEST,
    },
    {
      title: 'Аспирантура',
      to: ROUTES.ARTICLES_POSTGRADUATE_STUDY,
    },
  ],
},
{
  title: 'Заочка',
  icon: 'menu_absentia',
  to: ROUTES.ARTICLES_ZAO,
},
{
  title: 'Дистанционка',
  icon: 'menu_distance',
  to: ROUTES.ARTICLES_DISTANCE,
},
{
  title: 'Курсы',
  icon: 'menu_courses',
  to: ROUTES.ARTICLES_COURSES,
},
{
  title: 'Профессии',
  icon: 'menu_specialties',
  to: ROUTES.ARTICLES_PROFESSIONS,
},
{
  title: 'Медицина',
  icon: 'menu_medicine',
  to: ROUTES.ARTICLES_MEDICINE,
},
{
  title: 'Карьера',
  icon: 'menu_academy',
  to: ROUTES.ACADEMY,
  child: [
    { title: 'Геймдев', to: ROUTES.ACADEMY_GAME },
    { title: 'Карьера', to: ROUTES.ACADEMY_CAREER },
    { title: 'Управление', to: ROUTES.ACADEMY_UPRAVLENIE },
    { title: 'Программирование', to: ROUTES.ACADEMY_PROGRAMMING },
    { title: 'Дизайн', to: ROUTES.ACADEMY_DESIGN },
    { title: 'Маркетинг', to: ROUTES.ACADEMY_MANAGEMENT },
  ],
},
{
  title: 'Помощь абитуриентам',
  icon: 'menu_help',
  to: ROUTES.ARTICLES_HELP,
},
{
  title: 'Полезное',
  icon: 'menu_different',
  to: ROUTES.ARTICLES_USEFUL,
}];

const showMenu = shallowRef(false);
</script>

<template>
  <SArticlesHeader @open-menu="showMenu = !showMenu" />
  <MSection class="s-cols">
    <div class="s-cols__wrapper">
      <MArticlesMenu
        :menu
        :open="showMenu"
      />
      <div class="s-cols__main">
        <SArticleSpecialitiesNew />
      </div>
    </div>
  </MSection>
  <SFooter />
</template>

<style lang="scss" scoped>
.s-cols {
  overflow: visible;
  padding-top: 0;
  padding-bottom: 0;

  &__wrapper {
    @include desktop(min) {
      position: relative;
      gap: scale(36) scale(20);
      display: grid;
      //grid-auto-columns: auto;
      grid-template-columns: auto 1fr;
    }
  }


  &__main {
    min-width: 0;
  }


  &__aside {
    @include desktop(min) {
      position: sticky;
      top: 0;
      grid-column: 2;
      display: grid;
      grid-gap: scale(20) 0;
      width: scale(363);
    }
  }
}
</style>

<style>
body {
  background-color: var(--a-color_grey_20);
}
</style>
