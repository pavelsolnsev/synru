<script setup lang="ts">
interface Props {
  routeName?: string;
}

const {
  routeName = '',
} = defineProps<Props>();

const OGE_ROUTE_NAME = 'edu_shkala_oge';

const currentYear = new Date().getFullYear();

const OGE_TITLE = `Шкала перевода баллов ОГЭ в ${currentYear} году`;
const EGE_TITLE = `Минимальные баллы ЕГЭ в&nbsp;${currentYear} году`;

const IS_OGE_PAGE = routeName === OGE_ROUTE_NAME;

const PAGE_TITLE = IS_OGE_PAGE ? OGE_TITLE : EGE_TITLE;
</script>

<template>
  <SEduWrapper
    :route-name
  >
    <template #top>
      <div class="s-edu-min-score">
        <h1
          class="l-section__title a-font_h3"
          v-html="PAGE_TITLE"
        />
        <div class="s-discipline-content a-font_l">
          <SEduMinScoreOge
            v-if="IS_OGE_PAGE"
          />
          <SEduMinScoreEge
            v-else
          />
        </div>
      </div>
    </template>
    <template #bottom>
      <SEduWrapperBottom />
    </template>
  </SEduWrapper>
</template>

<style lang="scss" scoped>
@import './SEduMinScore.scss';
</style>
