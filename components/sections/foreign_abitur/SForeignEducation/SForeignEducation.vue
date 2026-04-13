<script setup lang="ts">
import ImageLg from '~/assets/images/s-foreign-education/s-foreign-education-lg.webp';
import ImageMd from '~/assets/images/s-foreign-education/s-foreign-education-md.webp';
import ImageSm from '~/assets/images/s-foreign-education/s-foreign-education-sm.webp';
import LogoMin from '~/assets/images/logo/logo-min.svg?url';
import type { FacultiesResponse } from '~/server/api/faculties';

const { data } = await useFetch<FacultiesResponse>('/api/faculties', {
  query: {
    'include': 'levels',
    'fields[faculties]': 'id,name',
    'filter[published]': true,
    'page[size]': 0,
    nolinks: 1,
  },
  deep: false,
  watch: false,
});

const facultiesByLevelId: Data = {
  '1': {
    name: 'Колледж',
    icon: 'simple-university',
    faculties: [],
  },
  '2': {
    name: 'Бакалавриат',
    icon: 'simple-hat',
    faculties: [],
  },
  '4': {
    name: 'Магистратура',
    icon: 'simple-premium',
    faculties: [],
  },
};

const {
  data: faculties = [],
} = data.value ?? {};

faculties?.forEach((faculty) => {
  const facultyLevels = faculty.relationships?.levels?.data ?? [] as { id: number, type: 'levels' }[];

  if (!Array.isArray(facultyLevels)) return;

  facultyLevels?.forEach((level) => {
    const levelId = String(level.id);

    if (!Object.hasOwn(facultiesByLevelId, levelId)) return;

    facultiesByLevelId[levelId]?.faculties.push(faculty.attributes?.name);
  });
});

interface Data {
  [levelId: string]: {
    name: string;
    icon: string;
    faculties: string[]
  }
}
</script>

<template>
  <MSection
    v-if="data"
    class="s-foreign-education"
  >
    <div class="s-foreign-education__wrapper">
      <div class="s-foreign-education__info">
        <picture
          class="s-foreign-education__info__image"
        >
          <source
            :srcset="ImageLg"
            media="(min-width: 1200px)"
          >
          <source
            :srcset="ImageMd"
            media="(min-width: 768px)"
          >
          <AImg
            :src="ImageSm"
            alt="education"
            decoding="async"
            loading="lazy"
          />
        </picture>

        <div class="s-foreign-education__info__card">
          <div class="s-foreign-education__info__card__header">
            <div class="s-foreign-education__info__card__title a-font_h2">
              Обучение
            </div>

            <AImg
              :src="LogoMin"
              class="s-foreign-education__info__card__img"
              alt="Демо образовательный портал"
              decoding="async"
            />
          </div>

          <div class="s-foreign-education__info__card__subtitle a-font_h5">
            Иностранным абитуриентам доступны все программы демо-вуза.
          </div>

          <div class="s-foreign-education__info__card__desc a-font_h6">
            Так как обучение по&nbsp;большинству программ проводится на&nbsp;русском языке, мы предлагаем подготовительные курсы, которые помогут в&nbsp;освоении языка. Для&nbsp;иностранных абитуриентов действуют общие правила приема Университета.
          </div>

          <ASvgMono name="simple-bag" />
        </div>
      </div>

      <div class="s-foreign-education__slider">
        <div
          v-for="value in facultiesByLevelId"
          :key="value.name"
          class="s-foreign-education__slide"
        >
          <div class="s-foreign-education__slide__header">
            <div
              class="s-foreign-education__slide__title a-font_h4"
              v-html="value.name"
            />

            <ASvgMono :name="value.icon" />
          </div>

          <div class="s-foreign-education__slide__faculties">
            <span
              v-for="faculty in value.faculties"
              :key="faculty"
              class="s-foreign-education__slide__faculty a-font_l-m"
              v-html="faculty"
            />
          </div>
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SForeignEducation.scss';
</style>
