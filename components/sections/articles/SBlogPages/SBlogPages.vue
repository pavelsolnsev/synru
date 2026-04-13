<script setup lang="ts">
interface BlogItem {
  image?: string,
  title?: string,
  href: string,
  date: string,
}

const {
  items,
  paginator = false, // выводим ли пагинацию
  perPage = 3, // карточек на странице
  offset = 0, // Пропуск результатов от начала.
} = defineProps<{
  items: BlogItem[],
  paginator?: boolean,
  perPage?: number,
  offset?: number,
}>();

const page = shallowRef<number>(1);
const offsetItems = items.slice(offset);
const isPaginatorVisible = computed(() => perPage < (offsetItems.length / page.value));
function isBigCard(index: number) {
  return (index + 1) % 4 === 0;
}
</script>

<template>
  <div class="s-blog-pages">
    <div class="s-blog-pages__grid">
      <template
        v-for="(item, index) in offsetItems"
        :key="index"
      >
        <MArticleCardSecond
          v-if="index < page * perPage"
          :key="item.title"
          :class="{'--big': isBigCard(index)}"
          :to="item.href"
          :title="index + offset + ' ' + item.title"
          :date="item.date"
          :image="item.image"
          :share="true"
        />
      </template>
    </div>
    <MMore
      v-if="paginator && isPaginatorVisible"
      type="button"
      text="Показать ещё"
      @click.stop="page++"
    />
  </div>
</template>

<style lang="scss">
@import './SBlogPages.scss';
</style>
