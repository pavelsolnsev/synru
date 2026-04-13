<script setup lang="ts">
import { chapters, navToggledFaculties } from './headerMenuData';
import { topMenu2 } from '../SHeader/headerData';

const path = computed(() => useRoute().path);

interface CustomAccordionContent {
  href: string;
  text: string;
  target?: string;
  external?: boolean;
  attr?: object;
}

const showMenu = defineModel('showMenu', {
  type: Boolean,
  default: false,
});

const activeChapterIndex = ref(0);

const navToggled = ref([...navToggledFaculties]);
</script>

<template>
  <div class="s-header-menu">
    <div
      class="s-header-menu__wrap m-tabs-js"
      itemscope
      itemtype="https://schema.org/SiteNavigationElement"
    >
      <div class="s-header-menu__chapter">
        <APriemnayaKomissiya class="s-header-menu__chapter-item" />
        <NuxtLink
          v-for="chapter, index in chapters"
          :key="chapter.text"
          :to="chapter.href"
          class="s-header-menu__chapter-item a-font_m-m m-tabs__btn-js hover-js"
          :class="{ '_is-active': activeChapterIndex === index }"
          itemprop="url"
          @mouseover="activeChapterIndex = index"
        >
          <span v-html="chapter.text" itemprop="name" />
        </NuxtLink>
      </div>
      <div class="s-header-menu__tabs">
        <MAccordionItem
          v-for="link, index in navToggled"
          :key="link.title.href"
          :class="{
            '_is-active': activeChapterIndex === index,
          }"
          :title="link.title"
          :is-open="link.isOpen"
          :item-key="link.title.text"
          :icon="link.icon"
          :external="link.external || undefined"
          schema="list"
          @click="link.isOpen = !link.isOpen"
        >
          <NuxtLink
            v-for="child in link.customContent as CustomAccordionContent[]"
            :key="child.href"
            :to="child.href"
            :external="child.external || undefined"
            class="a-font_m-m"
            itemprop="url"
            v-bind="child.attr"
            @click.stop
          >
            <span v-html="child.text" />
          </NuxtLink>
        </MAccordionItem>
      </div>

      <div class="s-header__levels">
        <AMenuLink
          v-for="{ title, to, attributes, bgColor, textColor } in topMenu2"
          :key="to"
          :bg-color
          :text-color
          :to
          :active="path === to || `${path}/` === to"
          itemprop="url"
          v-bind="attributes"
        >
          <span v-html="title" />
        </AMenuLink>
      </div>
    </div>
    <SHeaderMenuInfo @feedback="showMenu = false" />
  </div>
</template>

<style lang="scss" scoped>
@import './SHeaderMenu.scss';
@import '../SHeader/SHeader.scss';
</style>
