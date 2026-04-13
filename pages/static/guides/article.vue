import { synergyApi, synergyRu } from '~/utils/mediaCdn';
<script setup lang="ts">
/*
  Данный шаблон подготовлен для всех типов статей, например:
  Новость: https://example.com/about/blog/prepodavateli_kafedryi_bankovskogo_dela_prinyali_uchastie_v_konferenczii_telekom_i_banki_2025
  Статья образования: https://example.com/about/education_articles/kolledzh/biznes_fakultet_v_kolledge
  Synergy Media: https://example.com/akademiya/upravlenie/kto_takoj_product_owner
  Статья ЕГЭ\ОГЭ: https://example.com/edu/poleznaya_informacziya/slozhno_li_sdavat_ege_po_ximii
  Статья справочника: https://example.com/media/guides/spravochnik_po_professiyam/art_dizajner_xudozhnik_dizajner
*/

definePageMeta({
  menuType: 'guideMenu',
});

//- test data
const data = {
  uri: '#',
  image: 'https://example.com/assets/components/phpthumbof/cache/karpunin.2fd1ac54e8e6b545ec4ffae5e477d8ca.webP',
  publishedon: '1698397200000',
  editedon: '1698397200000',
  parent: 191,
  parentTitle: 'Дистанционка',
  pagetitle: 'Архитектор',
  introtext: 'Рассказываем о&nbsp;специалистах, которые отвечают за&nbsp;безопасность и&nbsp;внешний вид домов, стадионов, небоскрёбов и&nbsp;других сооружений.',
  content: '<p>Представьте, вы купили участок за&nbsp;городом и&nbsp;мечтаете о&nbsp;двухэтажном доме с&nbsp;панорамными окнами и&nbsp;уютной террасой. Но&nbsp;в&nbsp;строительстве вы не&nbsp;разбираетесь и&nbsp;даже не&nbsp;знаете с&nbsp;чего начинать. Кто&nbsp;же сможет помочь с&nbsp;этой масштабной задачей?</p><p><b>Конечно, архитектор&nbsp;&mdash; специалист, который создаёт проект здания, контролирует процессы строительства, оформляет документацию и&nbsp;следит за&nbsp;бюджетом заказчика. При&nbsp;этом он сочетает творческий подход со&nbsp;строгими техническими правилами.</b> По&nbsp;сути, это посредник между фантазиями клиента и&nbsp;строителями, дизайнерами, инженерами.</p><h3>Тестовый заголовок</h3><p>У&nbsp;архитектора ответственная работа. От&nbsp;него зависит не&nbsp;только, сколько простоит здание, но&nbsp;и&nbsp;безопасность людей. Поэтому на&nbsp;проектах нужны люди с&nbsp;глубокими знаниями и&nbsp;сильными навыками. Получить высшее образование в&nbsp;области архитектуры можно в&nbsp;<a href="#">Университете демо-вуз</a> за&nbsp;5&nbsp;лет.</p><p>Какие бывают архитекторы, сколько получают за&nbsp;свою кропотливую работу и&nbsp;насколько востребована эта профессия&nbsp;&mdash; рассказываем дальше.</p>',
  banners: [],
};

function simpleDate(date: string) {
  const t = Number(date);
  const d = new Date(t);
  return d.toLocaleDateString();
}

//- /test data
</script>


<template>
  <SMain
    :uri="data.uri"
    :image="data.image"
    :publishedOn="data.publishedon"
    :datePublished="simpleDate(data.publishedon)"
    :editedOn="data.editedon"
    :edited-date="simpleDate(data.editedon)"
    :parent="data.parent"
    :parent-title="data.parentTitle"
    :pageTitle="data.pagetitle"
  >
    <main class="s-main__inner">
      <SGuideIntro
        :image="data.image"
        :publishedon="data.publishedon"
        :published-date="simpleDate(data.publishedon)"
        :editedon="data.editedon"
        :edited-date="simpleDate(data.editedon)"
        :parent-title="data.parentTitle"
        :pagetitle="data.pagetitle"
        :introtext="data.introtext"
        :content="data.content"
      />
      <SMenu title="Оглавление" />
      <SGuideArticle />
    </main>

    <div class="s-main__bottom">
      <SDownloadAppNew
        :show-alternative-banner="false"
        :show-custom-banner="false"
        :show-programms-banner="false"
      />
    </div>
    <SArticleBanners
      href="https://example.com/abiturientam/priemnaya_komissiya?utm_source=DemoSite&utm_medium=site&utm_campaign=educatartikles&utm_term=banner_nosorog&marketer=ina&utm_content=45839"
      :image-lg="synergyRu('content/article_banners/articles_banner_4_lg.webp?v=040625')"
      :image-md="synergyRu('content/article_banners/articles_banner_4_md.webp?v=040625')"
      :image-sm="synergyRu('content/article_banners/articles_banner_4_sm.webp?v=040625')"
      btn-text="Подобрать программу"
    />
  </SMain>
</template>

<style lang="scss" scoped>
  .s-main {
    @include desktop() {
      .s-article-banners {
        grid-column: 2;
        grid-row: span 2;
      }
    }
  }

  .s-main__inner {
    gap: scale(32) 0;
    margin: 0;
    padding: scale(12) var(--layout-h-padding);
    border-radius: scale(16);
    background-color: var(--a-color_white);
    @include desktop() {
      gap: scale(24) 0;
      padding: scale(24);
    }
  }

  .s-main__bottom {
    padding: scale(20) var(--layout-h-padding) 0;

    @include desktop {
      padding: 0;
    }
  }

  .s-menu {
    padding: 0 scale(12);
    @include desktop() {
      padding: scale(24);
      background-color: transparent;
    }
  }

  .s-main .s-article-banners {
    grid-row: 1 / 3;
  }

  .s-download-app-new {
    padding: 0;
  }
</style>
