<script setup lang="ts">
interface Person {
  image?: string,
  name?: string,
  title?: string,
}

interface Props {
  uri: string,
  tag?: string,
  title?: string,
  video?: string,
  thumb?: string,
  text?: string,
  person?: Person,
}

const {
  uri = '',
  tag = '',
  title = '',
  video = '',
  thumb = '',
  text = '',
  person = {},
} = defineProps<Props>();

const tagLabel = 'В каталог: ';

const { openModal } = useModalStore();

function onClickVideo(link: string) {
  if (!link) return;
  openModal('MModalIframe', {
    src: link,
  });
}
</script>

<template>
  <MSection
    class="m-article-preview"
    title-class="a-font_h3"
    :title="title"
  >
    <div
      class="m-article-preview__top a-font_xs"
      v-html="tag"
    />

    <NuxtLink
      :to="video"
      :external="true"
      target="_blank"
      class="m-article-preview__media"
      @click.prevent="onClickVideo(video)"
    >
      <picture>
        <AImg
          :src="thumb"
          decoding="async"
          loading="lazy"
          width="336"
          height="200"
        />
      </picture>
      <APlay />
    </NuxtLink>

    <div
      v-if="text"
      class="m-article-preview__txt a-font_l"
      v-html="text"
    />

    <MPerson
      :image="person.image"
      :name="person.name"
      :title="person.title"
    />

    <div class="m-article-preview__bottom">
      <span>
        <span
          class="a-font_m-m"
          v-html="tagLabel"
        />
        <ATag
          :text="tag"
          variant="grey"
          class="a-font_m"
        />
      </span>
      <AShare
        :link="uri"
        show-label
      />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './MArticlePreview.scss';
</style>
