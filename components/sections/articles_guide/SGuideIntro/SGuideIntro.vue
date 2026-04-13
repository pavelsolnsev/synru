<script setup lang="ts">
const {
  image = '',
  publishedon = '',
  publishedDate = '',
  editedon = '',
  editedDate = '',
  parentTitle = '',
  pagetitle = '',
  introtext = '',
  content = '',
} = defineProps<{
  image: string,
  publishedon: string,
  publishedDate: string,
  editedon: string,
  editedDate: string,
  parentTitle?: string,
  pagetitle: string,
  introtext?: string,
  content?: string,
}>();

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    btn: 'Отправить',
    formPhone: true,
    formName: false,
    actionParams: [{param: 'form=artileModal'}],
  });
}
</script>

<template>
  <MSection
    class="s-intro"
  >
    <template v-if="editedon">
      <meta
        itemprop="datePublished"
        :content="editedon"
      >
    </template>
    <template v-else>
      <meta
        itemprop="dateModified"
        :content="publishedon"
      >
    </template>
    <div class="s-intro__inner --article-card-js">
      <MArticleBreadcrumbs />

      <div class="s-intro__tags">
        <ATag
          v-if="parentTitle"
          :text="parentTitle"
        />
        <ATag
          :text="editedDate || publishedDate"
        />
      </div>

      <div class="s-intro__about">
        <h1
          class="s-intro__title a-font_h3 --article-title-js"
          itemprop="headline"
          v-html="pagetitle"
        />
        <div
          v-if="introtext"
          class="s-intro__descr a-font_xl-m"
          v-html="introtext"
        />
        <AButton
          type="button"
          size="sm"
          bg-color="red"
          @click="openForm()"
        >
          <span>Подать заявку</span>
        </AButton>
      </div>

      <picture
        v-if="image"
        class="s-intro__img"
      >
        <AImg
          :src="image"
          :alt="pagetitle"
        />
      </picture>

      <div
        v-if="content"
        class="s-intro__content"
      >
        <SArticle :content="content" />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SGuideIntro.scss';
</style>
