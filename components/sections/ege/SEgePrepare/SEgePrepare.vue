<script setup lang='ts'>
interface Props {
  title: string,
  topList: { image: string, title: string, text: string }[];
  bottomList: { title: string, text: string, icon: string }[];
}

defineProps<Props>();
</script>

<template>
  <MSectionNewResponsive
    class="s-ege-prepare"
    :title
  >
    <div
      v-if="topList.length"
      class="s-ege-prepare__list"
    >
      <div
        v-for="(item, index) in topList"
        :key="item.title"
        class="s-ege-prepare__first-item"
        :class="index === topList.length - 1 ? 'last' : undefined"
      >
        <AImg
          :src="item.image"
          :alt="item.title"
          decoding="async"
          loading="lazy"
        />
        <div
          v-if="item.title || item.text"
          class="s-ege-prepare__first-item-content"
        >
          <p
            class="a-font_h5"
            v-html="item.title"
          />
          <p
            class="a-font_l-m"
            v-html="item.text"
          />
        </div>
      </div>
    </div>

    <div
      v-if="bottomList.length"
      class="s-ege-prepare__list --col4"
    >
      <div
        v-for="item in bottomList"
        :key="item.title"
        class="s-ege-prepare__second-item"
      >
        <div class="s-ege-prepare__top">
          <p
            class="a-font_h6 s-ege-prepare__second-item-title"
            v-html="item.title"
          />
          <ASvgMono :name="item.icon" />
        </div>
        <p
          class="a-font_m-m"
          v-html="item.text"
        />
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style scoped lang='scss'>
@import './SEgePrepare.scss';
</style>
