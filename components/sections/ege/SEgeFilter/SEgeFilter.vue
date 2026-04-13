<script lang="ts" setup>
interface Props {
  routeName?: string
}

const { routeName } = defineProps<Props>();

const isOge = routeName === 'podgotovka_oge_base';
const isEge = routeName === 'podgotovka_ege_base';

let i = 0;

type Slug = 'russkij' | 'matematika' | 'obshchestvoznanie' | 'anglijskij'
    | 'fizika' | 'khimiya' | 'istoriya' | 'informatika' | 'biologiya'
    | 'geografiya' | 'literatura';

const data: Array<{
  name: string
  slug: Slug
  type: string
  rank: number
  link: string
}> =
    [
      {
        name: 'Русский',
        slug: 'russkij',
        type: 'ege',
        rank: i++,
        link: '/school/podgotovka/ege/russkij',
      },
      {
        name: 'Математика',
        slug: 'matematika',
        type: 'ege',
        rank: i++,
        link: '/school/podgotovka/ege/matematika',
      },
      {
        name: 'Обществознание',
        slug: 'obshchestvoznanie',
        type: 'ege',
        rank: i++,
        link: '/school/podgotovka/ege/obshchestvoznanie',
      },
      {
        name: 'Иностранные языки',
        slug: 'anglijskij',
        type: 'ege',
        rank: i++,
        link: '/school/podgotovka/ege/anglijskij',
      },
      {
        name: 'Физика',
        slug: 'fizika',
        type: 'ege',
        rank: i++,
        link: '/school/podgotovka/ege/fizika',
      },
      {
        name: 'Химия',
        slug: 'khimiya',
        type: 'ege',
        rank: i++,
        link: '/school/podgotovka/ege/khimiya',
      },
      {
        name: 'История',
        slug: 'istoriya',
        type: 'ege',
        rank: i++,
        link: '/school/podgotovka/ege/istoriya',
      },
      {
        name: 'Информатика',
        slug: 'informatika',
        type: 'ege',
        rank: i++,
        link: '/school/podgotovka/ege/informatika',
      },
      {
        name: 'Биология',
        slug: 'biologiya',
        type: 'ege',
        rank: i++,
        link: '/school/podgotovka/ege/biologiya',
      },
      {
        name: 'География',
        slug: 'geografiya',
        type: 'ege',
        rank: i++,
        link: '/school/podgotovka/ege/geografiya',
      },
      {
        name: 'Литература',
        slug: 'literatura',
        type: 'ege',
        rank: i++,
        link: '/school/podgotovka/ege/literatura',
      },
      {
        name: 'Русский ОГЭ',
        slug: 'russkij',
        type: 'oge',
        rank: i++,
        link: '/school/podgotovka/oge/russkij',
      },
      {
        name: 'Математика',
        slug: 'matematika',
        type: 'oge',
        rank: i++,
        link: '/school/podgotovka/oge/matematika',
      },
      {
        name: 'Обществознание',
        slug: 'obshchestvoznanie',
        type: 'oge',
        rank: i++,
        link: '/school/podgotovka/oge/obshchestvoznanie',
      },
      {
        name: 'Иностранные языки',
        slug: 'anglijskij',
        type: 'oge',
        rank: i++,
        link: '/school/podgotovka/oge/anglijskij',
      },
      {
        name: 'Физика ОГЭ',
        slug: 'fizika',
        type: 'oge',
        rank: i++,
        link: '/school/podgotovka/oge/fizika',
      },
      {
        name: 'Химия ОГЭ',
        slug: 'khimiya',
        type: 'oge',
        rank: i++,
        link: '/school/podgotovka/oge/khimiya',
      },
      {
        name: 'История',
        slug: 'istoriya',
        type: 'oge',
        rank: i++,
        link: '/school/podgotovka/oge/istoriya',
      },
      {
        name: 'Информатика',
        slug: 'informatika',
        type: 'oge',
        rank: i++,
        link: '/school/podgotovka/oge/informatika',
      },
      {
        name: 'Биология',
        slug: 'biologiya',
        type: 'oge',
        rank: i++,
        link: '/school/podgotovka/oge/biologiya',
      },
      {
        name: 'География',
        slug: 'geografiya',
        type: 'oge',
        rank: i++,
        link: '/school/podgotovka/oge/geografiya',
      },
      {
        name: 'Литература',
        slug: 'literatura',
        type: 'oge',
        rank: i++,
        link: '/school/podgotovka/oge/literatura',
      },
    ];

const cardInfo: Record<Slug, {
  imageLG?: string
  imageSM?: string
  icon?: string
  class?: string
}> =
    {
      russkij: {
        imageLG: '/img/ege/horizontal_bg_lg.webp',
        imageSM: '/img/ege/horizontal_bg_sm.webp',
        icon: '/img/ege/icons/rus.svg',
        class: 'horizontal',
      },
      matematika: {
        imageLG: '/img/ege/horizontal_bg_lg.webp',
        imageSM: '/img/ege/horizontal_bg_sm.webp',
        icon: '/img/ege/icons/mat.svg',
        class: 'horizontal',
      },
      obshchestvoznanie: {
        imageLG: '/img/ege/vertical_bg_lg.webp',
        imageSM: '/img/ege/vertical_bg_sm.webp',
        icon: '',
        class: 'vertical',
      },
      anglijskij: {
        imageLG: '',
        imageSM: '',
        icon: '/img/ege/icons/lang.svg',
        class: '',
      },
      fizika: {
        imageLG: '',
        imageSM: '',
        icon: '/img/ege/icons/phis.svg',
        class: '',
      },
      khimiya: {
        imageLG: '',
        imageSM: '',
        icon: '/img/ege/icons/chem.svg',
        class: '',
      },
      istoriya: {
        imageLG: '',
        imageSM: '',
        icon: '/img/ege/icons/hist.svg',
        class: '',
      },
      informatika: {
        imageLG: '',
        imageSM: '',
        icon: '/img/ege/icons/info.svg',
        class: '',
      },
      biologiya: {
        imageLG: '',
        imageSM: '',
        icon: '/img/ege/icons/bio.svg',
        class: '',
      },
      geografiya: {
        imageLG: '',
        imageSM: '',
        icon: '/img/ege/icons/geo.svg',
        class: '',
      },
      literatura: {
        imageLG: '',
        imageSM: '',
        icon: '/img/ege/icons/lit.svg',
        class: '',
      },
    };

const chosenDirection = shallowRef('ege');

const filteredData = computed(() => {
  if (isOge) return data.filter((item) => item.type === 'oge');
  if (isEge) return data.filter((item) => item.type === 'ege');
  return data.filter((item) => item.type === chosenDirection.value);
});
</script>

<template>
  <MSectionNewResponsive
    class="s-ege-filter"
    title="Выберите предмет"
  >
    <div
      v-if="!isOge && !isEge"
      class="s-ege-filter__tabs"
    >
      <div
        class="s-ege-filter__tab"
        :class="chosenDirection == 'ege' ? 'active' : undefined"
        @click="chosenDirection = 'ege'"
      >
        ЕГЭ
      </div>
      <div
        class="s-ege-filter__tab"
        :class="chosenDirection == 'oge' ? 'active' : undefined"
        @click="chosenDirection = 'oge'"
      >
        ОГЭ
      </div>
    </div>
    <div
      v-if="filteredData.length"
      class="s-ege-filter__grid"
    >
      <NuxtLink
        v-for="(item, index) in filteredData"
        :key="item.name"
        class="s-ege-filter__item"
        :class="[
          cardInfo[item.slug].class,
          `grid-item-${index + 1}`
        ]"
        :to="item.link"
      >
        <picture
          v-if="cardInfo[item.slug].imageLG || cardInfo[item.slug].imageSM"
          class="s-ege-filter__bg"
        >
          <source
            media="(min-width: 1200px)"
            :srcset="cardInfo[item.slug].imageLG"
          >
          <AImg
            :src="cardInfo[item.slug].imageSM"
            :alt="item.name"
            decoding="async"
            loading="lazy"
          />
        </picture>
        <h3
          class="s-ege-filter__top a-font_h5"
          lang="ru"
        >
          {{ item.name }}
        </h3>
        <div class="s-ege-filter__bottom">
          <AButton
            class="s-ege-filter__btn"
            size="sm"
          >
            Выбрать
          </AButton>
          <AImg
            v-if="cardInfo[item.slug].icon"
            class="s-ege-filter__icon"
            :src="cardInfo[item.slug].icon"
            alt="icon"
          />
        </div>
      </NuxtLink>
    </div>
    <span
      v-else
      class="a-font_h3"
    >Ничего не найдено</span>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SEgeFilter';
</style>
