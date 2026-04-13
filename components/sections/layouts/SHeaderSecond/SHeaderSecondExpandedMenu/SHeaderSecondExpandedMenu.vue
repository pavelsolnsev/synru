<script setup lang="ts">
import { menuLinks } from '~/components/sections/layouts/SHeaderSecond/sHeaderSecondData';

const activeMenuLink = defineModel<null | number>({ default: null });

const activeMenuLinkData = computed(() => {
  if (activeMenuLink.value === null) return null;

  if (!menuLinks[activeMenuLink.value].items && !menuLinks[activeMenuLink.value].navMenu) return null;
  return menuLinks[activeMenuLink.value];
});
</script>

<template>
  <div>
    <div
      v-if="activeMenuLinkData"
      class="s-header-expanded-menu"
    >
      <div
        class="s-header-expanded-menu__header"
        v-html="activeMenuLinkData.title"
      />
      <div class="s-header-expanded-menu__wrapper">
        <SHeaderSecondExpandedMenuItems
          v-if="activeMenuLinkData.items?.length"
          :items="activeMenuLinkData.items"
        />

        <SHeaderSecondExpandedMenuNav
          v-else
          :nav-menu-data="activeMenuLinkData.navMenu"
          :default-index="0"
        />

        <SHeaderSecondExpandedMenuForm
          v-if="activeMenuLinkData.form"
          :form-data="activeMenuLinkData.form"
        />
      </div>
    </div>
    <MModalForm
      id="s-header-second-expanded-menu-fac-form"
      form-phone
      title="Узнайте минимальный проходной балл и&nbsp;получите <span class='--free-red'>бесплатный</span>  доступ к&nbsp;началу обучения"
      :action-params="[{param: 'form=open_day_top_ab_kruchu'}]"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './SHeaderSecondExpandedMenu.scss';
</style>
