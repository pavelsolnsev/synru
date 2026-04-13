<script setup lang="ts">
interface Props {
  image?: string;
  name?: string;
  description?: string;
  text?: string;
}

const {
  image,
  name,
  description,
  text = '',
} = defineProps<Props>();

const { tags = [] } = transformCKEditorContent({ entity: null, payload: { specialties: [] }, rawContent: text ? text : '' });
</script>

<template>
  <div class="s-article-quote">
    <div class="s-article-quote__top">
      <picture
        v-if="image"
        class="s-article-quote__thumb"
      >
        <AImg
          alt="quote"
          :src="image"
        />
      </picture>

      <span class="s-article-quote__info">
        <span
          class="s-article-quote__name a-font_xl-m"
          v-html="name"
        />

        <span
          class="s-article-quote__position a-font_m-m"
          v-html="description"
        />
      </span>

      <ASvgMono name="quote" />
    </div>

    <div class="s-article-quote__text a-font_l-m">
      <template
        v-for="tag, index in tags"
        :key="index"
      >
        <component
          :is="tag.component"
          v-if="typeof (tag) === 'object'"
          v-bind="tag.props"
        />
        <template v-else>
          <div v-dompurify-html="tag" />
        </template>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SArticleQuote.scss';
</style>
