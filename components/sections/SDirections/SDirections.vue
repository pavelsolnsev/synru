<script lang="ts" setup>
import { synergyApi } from '~/utils/mediaCdn';
import { ROUTES } from '~/constants';
import type { EntityCount } from '~/types';

interface Props {
  title?: string;
  entities?: EntityCount;
}

const {
  title = 'Направления обучения',
  entities = {},
} = defineProps<Props>();

const extendedEntities = computed((): EntityCount & { ege_oge: { programs_count: number; directions_count: number } } => ({
  ...entities,
  ege_oge: {
    programs_count: 0,
    directions_count: 0,
  },
}));

let index = 1;

const entitiesAdditionalData: Record<string, { image: string; link: string; title: string; rank: number; type?: string }> = {
  'college': {
    image: synergyApi('uploads/content/s-directions/1209.webp'),
    link: ROUTES.COLLEGE,
    title: 'Колледж',
    rank: index++,
    type: 'extended-horizontal',
  },
  'pervoe_vysshee': {
    image: synergyApi('uploads/content/s-directions/1729.webp'),
    link: ROUTES.BACCALAUREATE,
    title: 'Бакалавриат',
    rank: index++,
    type: 'extended-horizontal',
  },
  'ege_oge': {
    image: synergyApi('uploads/content/s-directions/8914.webp'),
    link: ROUTES.OGE_EGE_PODGOTOVKA,
    title: 'Подготовка <br>к ЕГЭ/ОГЭ',
    rank: index++,
    type: 'extended-vertical',
  },
  'speczialitet': {
    image: synergyApi('uploads/content/s-directions/18259.webp'),
    link: ROUTES.SPECIALTY,
    title: 'Специалитет',
    rank: index++,
  },
  'magistracy': {
    image: synergyApi('uploads/content/s-directions/5533.webp'),
    link: ROUTES.MAGISTRACY,
    title: 'Магистратура',
    rank: index++,
  },
  'second_highest': {
    image: synergyApi('uploads/content/s-directions/5531.webp'),
    link: ROUTES.SECOND_HIGHEST,
    title: 'Второе высшее',
    rank: index++,
  },
  'postgraduate_study': {
    image: synergyApi('uploads/content/s-directions/9091.webp'),
    link: ROUTES.POSTGRADUATE_STUDY,
    title: 'Аспирантура',
    rank: index++,
  },
  'ordinatura': {
    image: synergyApi('uploads/content/s-directions/45575.webp'),
    link: ROUTES.ORDINATURA,
    title: 'Ординатура',
    rank: index++,
  },
  'courses': {
    image: synergyApi('uploads/content/s-directions/34138.webp'),
    link: ROUTES.COURSES,
    title: 'Курсы',
    rank: index++,
  },
  'business_school': {
    image: synergyApi('uploads/content/s-directions/8518.webp'),
    link: ROUTES.BUSINESS_EDUCATION,
    title: 'MBA',
    rank: index++,
  },
  'international': {
    image: synergyApi('uploads/content/s-directions/40578.webp'),
    link: ROUTES.ABROAD_EDUCATION,
    title: 'Образование <br>за рубежом',
    rank: index++,
  },
  'school': {
    image: synergyApi('uploads/content/s-directions/24205.webp'),
    link: ROUTES.SCHOOL,
    title: 'Школа,<br>5–11 классы',
    rank: index++,
  },
};

const items = computed(() =>
  Object.keys(extendedEntities.value)
    .filter((key) => Boolean(entitiesAdditionalData[key]))
    .map((key) => {
      const entity = extendedEntities.value[key];

      const programs_count = entity.programs_count
        ? declensionOfNumber(
            entity.programs_count,
            key === 'ege_oge' ? ['предмет', 'предмета', 'предметов'] : ['программа', 'программы', 'программ'],
            true)
        : '';

      const faculties_count = entity.faculties_count
        ? declensionOfNumber(entity.faculties_count, ['факультет', 'факультета', 'факультетов'], true)
        : '';

      const directions_count = entity.directions_count
        ? declensionOfNumber(entity.directions_count, ['направление', 'направления', 'направлений'], true)
        : '';

      const { image, link, title, rank, type } = entitiesAdditionalData[key] ?? {};

      return {
        programs_count,
        faculties_count,
        directions_count,
        image,
        link,
        title,
        rank,
        type,
      };
    })
    .sort((a,b) => a.rank - b.rank),
);
</script>

<template>
  <MSection
    v-if="items.length"
    class="s-directions"
    :title
  >
    <div class="s-directions__cards">
      <NuxtLink
        v-for="(item) in items"
        :key="item.title"
        :to="item.link"
        class="s-directions__card"
        :class="item.type ? `s-directions__card_${item.type}` : undefined"
      >
        <h5
          class="s-directions__card-title a-font_h5"
          v-html="item.title"
        />
        <span class="s-directions__card-statistic a-font_s-m">
          <span
            v-if="item.directions_count"
            v-html="item.directions_count"
          />
          <span
            v-if="item.faculties_count"
            v-html="item.faculties_count"
          />
          <span
            v-if="item.programs_count"
            v-html="item.programs_count"
          />
        </span>
        <span class="s-directions__card-img">
          <AImg
            :src="item.image"
            :alt="item.title"
            loading="lazy"
            decoding="async"
            width="48"
            height="48"
          />
        </span>
      </NuxtLink>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SDirections.scss';
</style>
