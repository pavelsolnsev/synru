import { synergyApi, synergyRu } from '~/utils/mediaCdn';
<script setup lang="ts">

//- test data
const data = {
  image: synergyRu('content/_upload/authors/z_sultanova.webp'),
  pagetitle: 'Зуля Султанова',
  description: 'Редактор демо-справочников',
  articlesCount: 31,
};

const article = {
  href: '#',
  image: 'https://example.com/assets/components/phpthumbof/cache/lvgkorp.znaniezashhita2.2fd1ac54e8e6b545ec4ffae5e477d8ca.webP',
  title: 'Выпускники программы «Менеджмент спортивно-оздоровительного и&nbsp;фитнес-клуба» получили удостоверения о&nbsp;повышении квалификации',
  date: '27 ноября 2025',
};

const items = Array.from({ length: 15 }, () => article);
const page = shallowRef<number>(1);
const perPage = 6;
const isPaginatorVisible = computed(() => perPage <= (perPage / page.value));

//- /test data
</script>


<template>
  <SMain
    :image="data.image"
    :pagetitle="data.pagetitle"
  >
    <SAuthor
      :image="data.image"
      :pagetitle="data.pagetitle"
      :description="data.description"
      :articles-count="data.articlesCount"
    />
    <div
      v-if="items"
      class="s-author-articles"
    >
      <h2
        class="a-font_h4"
        v-html="'Статьи'"
      />
      <div class="rows s-author-articles__inner">
        <template
          v-for="(item, index) in items"
          :key="index"
        >
          <MArticleCardSecond
            v-if="index < page * perPage"
            :key="item.title"
            :to="item.href"
            :title="index + ' ' + item.title"
            :date="item.date"
            :image="item.image"
            :share="true"
          />
        </template>
      </div>
      <MMore
        v-if="isPaginatorVisible"
        type="button"
        text="Показать ещё"
        @click.stop="page++"
      />
    </div>

    <SArticleBanners
      href="https://example.com/abiturientam/priemnaya_komissiya?utm_source=DemoSite&utm_medium=site&utm_campaign=educatartikles&utm_term=banner_nosorog&marketer=ina&utm_content=45839"
      image-lg=synergyRu('content/article_banners/articles_banner_4_lg.webp?v=040625')
      image-md=synergyRu('content/article_banners/articles_banner_4_md.webp?v=040625')
      image-sm=synergyRu('content/article_banners/articles_banner_4_sm.webp?v=040625')
      btn-text="Подобрать программу"
    />

    <SDownloadAppNew
      :show-alternative-banner="false"
      :show-custom-banner="false"
      :show-programms-banner="false"
    />
  </SMain>
</template>

<style lang="scss" scoped>
.s-author-articles {
  margin: scale(20) 0 0;
  padding: var(--padding_def);
  border-radius: scale(16);
  background-color: var(--a-color_white);


  &__inner {
    gap: scale(16);
    display: grid;
    margin: scale(24) 0 0;
    @include tablet(min) {
      grid-template-columns: repeat(2, 1fr);
      margin: scale(40) 0 0;
    }
  }

  :deep() {
    .m-article-card {
      &__wrap {
        background-color: var(--a-color_grey_10);
        min-height: scale(154);
        @include desktop(min) {
          min-height: scale(242);
          padding: scale(24);
        }
      }

      &__img {
        height: scale(172);

        @include tablet(min) {
          height: scale(140);
        }

        @include desktop(min) {
          height: scale(220);
        }
      }
    }
  }
}

.s-download-app-new {
  margin: var(--layout-v-padding) 0 0;
  padding: 0;
}
</style>
