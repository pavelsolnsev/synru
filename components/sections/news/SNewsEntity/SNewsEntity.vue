<script setup lang="ts">
import type { NewsResponse } from '~/server/api/news/index.get';
import type { NewsEntity } from '~/types';
import getArticleDate from '~/utils/article/getArticleDate';
import transformLastNews from '~/utils/article/transformLastNews';

interface Props {
  entity?: NewsEntity | null;
  routeName?: string;
}

const {
  entity = null,
  routeName = '',
} = defineProps<Props>();

const FORM_TITLE = 'Подберите программу обучения и&nbsp;начните учиться бесплатно';
const FORM_DESCRIPTION = 'Оставьте заявку, и&nbsp;мы откроем бесплатный доступ к&nbsp;вводной части обучения';

const path = useRoute().path;

const date = getArticleDate(entity?.published_at ?? '');

const { data: lastNews } = await useFetch<NewsResponse>('/api/news/lastNews');

const news = transformLastNews(lastNews.value);

const breadcrumbs = generateBreadcrumbs({ routeName, entity: { name: entity?.title } }) ?? [];
</script>

<template>
  <SArticleMain
    :uri="path"
    :image="entity?.image"
    :date-modified="entity?.updated_at"
    :date-published="entity?.created_at"
    type="news"
  >
    <SArticleIntro
      :title="entity?.title"
      :image="entity?.image"
      :breadcrumbs
      :date
    />
    <div
      id="s-article"
      class="s-article"
    >
      <div class="s-article__content a-font_l">
        <div v-html="entity?.content" />
      </div>
    </div>
    <template #aside>
      <MNews :items="news" />
    </template>
    <template #bottom>
      <SFormMin
        :title="FORM_TITLE"
        :subtitle="FORM_DESCRIPTION"
        :action-params="[{param: 'form=article_form'}]"
        bg-color="red"
        btn="Подать заявку"
      />
      <SDownloadAppNew />
    </template>
  </SArticleMain>
</template>

<style lang="scss" scoped>
@import '../../articles/SArticleEntity/SArticleEntity.scss';
@import './SNewsEntity.scss';
</style>
