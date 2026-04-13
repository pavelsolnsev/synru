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
  menuType: 'blogMenu',
});

//- test data
const data = {
  uri: '#',
  image: 'https://example.com/assets/components/phpthumbof/cache/karpunin.2fd1ac54e8e6b545ec4ffae5e477d8ca.webP',
  publishedon: '1698397200000',
  editedon: '1698397200000',
  parent: 191,
  parentTitle: 'Новостной блог',
  pagetitle: 'Преподаватели кафедры банковского дела приняли участие в конференции «Телеком и банки 2025»',
  introtext: '',
  content: '<p>Преподаватели кафедры банковского дела приняли участие во II ежегодной национальной конференции «Телеком и банки 2025: партнерство в эпоху цифровой трансформации». Демо-вуз представили заведующая кафедрой Татьяна Новашина, доцент Вячеслав Карпунин и старший преподаватель Алина Орлова.</p><p dir="ltr"><span>Программа конференции включала три тематические секции: стратегическое планирование и формирование суверенного цифрового ландшафта, развитие MVNO и телеком-экосистем, а также внедрение инновационных клиентских решений. В обсуждениях приняли участие более ста специалистов — руководители банков, телеком-операторов, технологических вендоров и эксперты по финтеху и кибербезопасности.</span></p><p><img src="https://example.com/assets/upload/news/pr/news/karpunin2.jpg" alt="" width="1280" height="853"></p><p dir="ltr"><span>На пленарной сессии «Суверенный цифровой ландшафт 2025: эволюция и вызовы» эксперты оценили результаты перехода на отечественные ИТ-решения и обозначили дальнейшие приоритеты: завершение процессов импортозамещения, влияние цифрового рубля на платежные системы и усиление требований к кибербезопасности. </span></p><p dir="ltr"><span>«Сохранение суверенного цифрового ландшафта указывает на стратегическую необходимость развития собственных, независимых технологий и инфраструктуры банковского сектора. Это критически важно для обеспечения стабильности и безопасности финансовых и коммуникационных систем страны, особенно в условиях глобальной неопределенности и санкционного давления», — отметила заведующая кафедрой банковского дела Татьяна Новашина.</span></p>',
  authors: [
    {
      href: '/press/presscenter/avtoryi/pavel_demidov',
      img: synergyRu('content/_upload/authors/p.demidov.webp'),
      name: 'Павел Демидов',
    },
  ],
};

const news = {
  href: '#',
  title: 'В&nbsp;оплате контента видят вклад в&nbsp;развитие медиа',
  date: '21.11.2025',
  source: 'Российская газета',
  text: 'Отношение россиян к&nbsp;платному цифровому контенту стало заметно более зрелым, говорит директор по&nbsp;развитию направления игровой индустрии демо-вуза Михаил Пименов.',
};

function simpleDate(date: string) {
  const t = Number(date);
  const d = new Date(t);
  return d.toLocaleDateString();
}
const items = Array.from({ length: 6 }, () => news);

//- /test data
</script>


<template>
  <SMain
    :uri="data.uri"
    :image="data.image"
    :published-on="data.publishedon"
    :date-published="simpleDate(data.publishedon)"
    :edited-on="data.editedon"
    :edited-date="simpleDate(data.editedon)"
    :parent="data.parent"
    :parent-title="data.parentTitle"
    :page-title="data.pagetitle"
  >
    <main class="s-main__inner">
      <SIntro
        :image="data.image"
        :publishedon="data.publishedon"
        :published-date="simpleDate(data.publishedon)"
        :editedon="data.editedon"
        :edited-date="simpleDate(data.editedon)"
        :page-title="data.pagetitle"
        :intro-text="data.introtext"
        :authors="data.authors"
      />
      <SArticle :content="data.content" />
    </main>

    <!-- TODO: исключить из списка текую статью -->
    <MNewsVertical :items />

    <div class="s-main__bottom">
      <MForm
        class="m-form--min"
        title-class="a-font_h3"
        title="Подберите программу обучения и&nbsp;начните учиться бесплатно"
        subtitle="Оставьте заявку, и&nbsp;мы откроем бесплатный доступ к&nbsp;вводной части обучения"
        subtitle-class="a-font_h6"
        bg-color="red"
        :action-params="[
          {param: 'form=article_form'},
        ]"
      />
      <SDownloadAppNew
        :show-alternative-banner="false"
        :show-custom-banner="false"
        :show-programms-banner="false"
      />
    </div>
  </SMain>
</template>

<style lang="scss" scoped>
  .s-main {
    @include desktop() {
      .m-news-vartical,
      .s-article-banners {
        grid-column: 2;
        grid-row: span 2;
      }
    }
  }

  .s-intro__img {
    max-height: max-content;

    @include desktop() {
      max-height: max-content;
    }
  }

  .s-main__bottom {
    padding: scale(20) var(--layout-h-padding) 0;

    @include desktop {
      padding: 0;
    }
  }

  .s-download-app-new {
    padding: 0;
  }
</style>
