<script setup lang="ts">
import { video } from './SVideoListData';

const {
  title,
  paginator = false, // выводим ли пагинацию
  perPage = 3, // карточек на странице
  offset = 0, // Пропуск результатов от начала.
} = defineProps<{
  title?: string,
  paginator?: boolean,
  perPage?: number,
  offset?: number,
}>();

const page = shallowRef<number>(1);
const isPaginatorVisible = computed(() => perPage < (video.slice(offset).length / page.value));
</script>

<template>
  <div
    v-if="video.slice(offset).length > 0"
    class="s-video-list"
  >
    <MSection
      class="s-video-list__wrapper"
      title-class="a-font_h3"
      :title="title"
    >
      <div class="s-video-list__inner">
        <template
          v-for="(item, index) in video.slice(offset)"
          :key="index"
        >
          <MArticleVideo
            v-if="index < page * perPage"
            :video="item.video"
            :image="item.image"
            :title="item.title"
            :text="item.text"
            :tag="item.tag"
          />
        </template>
      </div>
    </MSection>
    <MMore
      v-if="paginator && isPaginatorVisible"
      type="button"
      text="Показать ещё"
      @click.stop="page++"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './SVideoList.scss';
</style>
