import { synergyApi } from '~/utils/mediaCdn';
<script setup lang='ts'>
interface Card {
  icon: string;
  text: string;
}

interface IBanner {
  title?: string;
  introtext?: string;
  cards?: Card[],
  text?: string,
  actionParams?: { param: string }[],
  formTitle?: string,
  image: string,
}

const { type = 'programs' } = defineProps<{
  type?: 'custom' | 'programs',
}>();

const imgUrl = synergyApi('uploads/content/s-download-app/');

const banners: { [key: string]: IBanner } = {};

banners['custom'] = {
  title: 'Демо-вуз&nbsp;&mdash; пример блока про трудоустройство <span style="white-space:nowrap;">выпускников</span> (портфолио)',
  introtext: 'Мы гарантируем своим студентам работу по&nbsp;специальности, что закреплено в&nbsp;договоре. <br>У&nbsp;нас есть Центр карьеры, где вам помогут:',
  text: '70% студентов и&nbsp;выпускников получают офферы <strong>в первые месяцы поиска работы.</strong>',
  image: imgUrl + 'm-da-modal-2.webp',
  formTitle: 'Подобрать программу со&nbsp;100% гарантией трудоустройства',
  cards: [
    {
      icon: imgUrl + '2-1.svg',
      text: 'Выбрать востребованную профессию',
    },
    {
      icon: imgUrl + '2-2.svg',
      text: 'Составить резюме и&nbsp;портфолио',
    },
    {
      icon: imgUrl + '2-3.svg',
      text: 'Подготовиться к&nbsp;собеседованию',
    },
    {
      icon: imgUrl + '2-4.svg',
      text: 'Откликнуться на&nbsp;горя&shy;чие вакансии 300+ компаний-партнёров',
    },
  ],
  actionParams: [
    { param: 'form=bottom-da-employment' },
  ],
};

banners['programs'] = {
  title: 'У&nbsp;нас 1000+ образовательных программ',
  introtext: 'У&nbsp;нас есть решения для&nbsp;любого уровня, профессии и&nbsp;цели:',
  text: '<div><strong>Качество образования подтверждено</strong><strong>международными стандартами:</strong></div> мы&nbsp;состоим в&nbsp;Европейском фонде гарантии качества электронного обучения и&nbsp;Великой хартии европейских университетов, участвуем в&nbsp;Международной ассоциации университетов при&nbsp;ЮНЕСКО',
  image: imgUrl + 'm-da-modal-1.webp',
  formTitle: 'Подобрать программу обучения',
  cards: [
    {
      icon: imgUrl + '1-1.svg',
      text: 'Сформировать прочный фундамент знаний в&nbsp;школе',
    },
    {
      icon: imgUrl + '1-2.svg',
      text: 'Получить качест&shy;венное среднее профессио&shy;нальное или&nbsp;высшее образование',
    },
    {
      icon: imgUrl + '1-3.svg',
      text: 'Освоить новую специальность на&nbsp;<span style="white-space:nowrap;">онлайн-курсах</span>',
    },
    {
      icon: imgUrl + '1-4.svg',
      text: 'Пройти результативную переподготовку или&nbsp;повысить квалификацию',
    },
    {
      icon: imgUrl + '1-5.svg',
      text: 'Достичь экспертного управленческого уровня с&nbsp;<span style="white-space:nowrap;">программой</span> MBA',
    },
  ],
  actionParams: [
    { param: 'form=bottom-da-programms' },
  ],
};
</script>

<template>
  <div
    id="m-da-modal"
    :class="[
      'm-da-modal',
      '--' + type
    ]"
  >
    <h4
      v-if="banners[type].title"
      class="m-da-modal__title a-font_h4"
      v-html="banners[type].title"
    />
    <div
      v-if="banners[type].introtext"
      class="m-da-modal__introtext a-font_l-m"
      v-html="banners[type].introtext"
    />
    <div
      v-if="banners[type].cards"
      class="m-da-modal__cards"
    >
      <div
        v-for="(card, index) in banners[type].cards"
        :key="card.text"
        class="m-da-modal__card"
      >
        <div
          class="m-da-modal__card-icos a-font_xs-m"
        >
          <span
            class="m-da-modal__card-num"
            v-html="'0' + (index + 1)"
          />
          <AImg
            :src="card.icon"
            :alt="card.text"
            loading="lazy"
            decoding="async"
          />
        </div>
        <span
          class="a-font_xs-m"
          v-html="card.text"
        />
      </div>
    </div>

    <div
      v-if="banners[type].text"
      class="m-da-modal__text a-font_xl-m"
      v-html="banners[type].text"
    />

    <div class="m-da-modal__form">
      <MForm
        :form-name="false"
        :title="banners[type].formTitle"
        title-class="a-font_h6"
        btn="Подобрать программу"
        :action-params="banners[type].actionParams"
      />
      <picture>
        <img
          alt=""
          loading="lazy"
          decoding="async"
          :src="banners[type].image"
        >
      </picture>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import './MDAModal.scss';
</style>

