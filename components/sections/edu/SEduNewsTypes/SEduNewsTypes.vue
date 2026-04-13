<script setup lang="ts">
import { ROUTES } from '~/constants';

interface Props {
  routeName?: string;
}

const {
  routeName = '',
} = defineProps<Props>();

const PER_PAGE = 4;
const TITLE_EGE = 'Новости ЕГЭ';
const TITLE_OGE = 'Новости OГЭ';

const FILTER_EGE = { 'filter[categories.all]': 'news,ege' };
const FILTER_OGE = { 'filter[categories.all]': 'news,oge' };
</script>

<template>
  <SEduWrapper :route-name>
    <template #top>
      <h1
        class="l-section__title a-font_h3"
        v-html="TITLE_EGE"
      />
      <SArticlesList
        :per-page="PER_PAGE"
        :filter="FILTER_EGE"
        :show-banner-card="false"
      >
        <template #button>
          <AButtonThird
            :to="ROUTES.EDU_NEWS_EGE"
            class="a-btn--more"
            bg-color="light-white"
          >
            Смотреть все
          </AButtonThird>
        </template>
      </SArticlesList>

      <h2
        class="l-section__title a-font_h3"
        v-html="TITLE_OGE"
      />
      <SArticlesList
        :per-page="PER_PAGE"
        :filter="FILTER_OGE"
        :show-banner-card="false"
      >
        <template #button>
          <AButtonThird
            :to="ROUTES.EDU_NEWS_OGE"
            class="a-btn--more"
            bg-color="light-white"
          >
            Смотреть все
          </AButtonThird>
        </template>
      </SArticlesList>
    </template>
  </SEduWrapper>
</template>
