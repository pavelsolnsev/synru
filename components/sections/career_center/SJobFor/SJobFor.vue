import { synergyApi } from '~/utils/mediaCdn';
<script setup lang="ts">
const columns = {
  career: {
    title: 'Для карьеры',
    text: 'Помощь в&nbsp;трудоустройстве',
    imgSm: synergyApi('uploads/content/career_center/s-job-for/career_sm.webp'),
    imgLg: synergyApi('uploads/content/career_center/s-job-for/career_lg.webp'),
    items: [
      {
        url: 'https://example.com/about/job/work_for_schoolchildren',
        title: 'Работа и&nbsp;учёба для&nbsp;школьников',
        text: 'Профессии и&nbsp;заработок после уроков и&nbsp;на&nbsp;каникулах',
      },
      {
        url: 'https://example.com/abiturientam/garantiya_trudoustroystva',
        title: 'Гарантия трудоустройства',
        text: 'Индивидуальные треки, карьерный центр и&nbsp;практика для&nbsp;студентов',
      },
      {
        url: 'https://example.com/about/job/dlya_mam',
        title: 'Образование для&nbsp;мам в&nbsp;декрете',
        text: 'Получение новой профессии и&nbsp;работа из&nbsp;дома',
      },
    ],
  },
  business: {
    title: 'Для бизнеса',
    text: 'Помощь в&nbsp;найме',
    imgSm: synergyApi('uploads/content/career_center/s-job-for/business_sm.webp'),
    imgLg: synergyApi('uploads/content/career_center/s-job-for/business_lg.webp'),
    items: [
      {
        url: 'https://example.com/about/job/podbor_top_menedzherov',
        title: 'Национальный контур',
        text: 'AI-платформа для&nbsp;стратегического рекрутинга',
      },
      {
        url: 'https://example.com/about/job/podbor_iz_za_rubezha',
        title: 'Международный контур',
        text: 'Полный цикл подбора специалистов за&nbsp;рубежом',
      },
    ],
  },
};

const activeTab = shallowRef(0);

const tabs = Object.values(columns)
  .filter((columns) => columns.items && columns.items.length)
  .map((item) => ({
    label: item.title,
  }));
</script>

<template>
  <MSectionNewResponsive class="s-job-for">
    <MSwitcher
      v-if="tabs.length > 1"
      v-model="activeTab"
      :items="tabs"
    />

    <div class="s-job-for__grid">
      <template
        v-for="(column, key, index) in columns"
        :key="key"
      >
        <div
          v-if="column.items.length"
          v-show="activeTab === index"
          :id="`--column-${key}`"
          class="s-job-for__column"
          :class="{'--lonely-column': tabs.length === 1}"
        >
          <div class="s-job-for__first">
            <h2
              class="a-font_h2"
              v-html="column.title"
            />
            <p
              class="a-font_slider-text"
              v-html="column.text"
            />
            <picture>
              <source
                :srcset="column.imgLg"
                media="(min-width: 1200px)"
              >
              <AImg
                :src="column.imgSm"
                alt="credit"
              />
            </picture>
          </div>

          <NuxtLink
            v-for="item in column.items"
            :key="item.title"
            :to="item.url"
            class="s-job-for__item"
          >
            <h5
              class="a-font_h5"
              v-html="item.title"
            />
            <span class="a-font_m-m s-job-for__item-more">
              Подробнее
              <ASvgMono name="arrow_outward" />
            </span>
            <p
              class="a-font_l-m"
              v-html="item.text"
            />
          </NuxtLink>
        </div>
      </template>
    </div>
  </MSectionNewResponsive>
</template>

<style scoped lang="scss">
@import './SJobFor.scss';
</style>
