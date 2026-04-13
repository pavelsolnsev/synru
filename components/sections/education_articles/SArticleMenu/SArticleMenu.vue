<script setup lang="ts">
interface Props {
  title?: string;
  items?: { text: string; id: string; children?: { text: string; id: string }[] }[]
}

const {
  title = 'Содержание статьи',
  items = [],
} = defineProps<Props>();
</script>

<template>
  <div
    v-if="items?.length"
    class="s-menu a-font_l-m"
  >
    <h4
      class="s-menu__title a-font_h4"
      v-html="title"
    />

    <ul class="s-menu__list">
      <li
        v-for="item in items"
        :key="item.text"
      >
        <a
          :href="`#${item.id}`"
          v-html="item.text"
        />
        <ul
          v-if="item?.children?.length"
          class="--subitem"
        >
          <li
            v-for="subitem in item.children"
            :key="subitem.text"
          >
            <a
              :href="`#${subitem.id}`"
              v-html="subitem.text"
            />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import './SArticleMenu.scss';
</style>
