<script setup lang="ts">
import { ARTICLE_SHOW_FOOTER } from '~/constants/state';

const { showMenu } = useArticlesMenu();

const showFooter = useState(ARTICLE_SHOW_FOOTER, () => true);
</script>

<template>
  <SArticlesHeader @open-menu="showMenu = !showMenu" />
  <SCols
    :open="showMenu"
  >
    <slot />
  </SCols>
  <SFooter v-if="showFooter" />
  <SQuizPopup v-else />
  <SFixedBottom />
</template>
