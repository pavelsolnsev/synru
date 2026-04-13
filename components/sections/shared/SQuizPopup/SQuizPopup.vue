<script setup lang="ts">
const { closeTopModal } = useModalStore();

const route = useRoute();

const slides = computed(() => getPopupQuizSlides(route.path.slice(1)));

const { key } = useQuizParams();
</script>

<template>
  <div
    id="s-quiz-popup"
    class="s-quiz-popup"
  >
    <div class="s-quiz-popup-wrapper">
      <MQuiz
        :key
        :slides
        @close="closeTopModal"
        @click.stop
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SQuizPopup.scss';
</style>

<style lang="scss">
.s-quiz-popup { display: none }
.m-modal-content:has(.s-quiz-popup) {
  max-width: var(--layout-width);
  .m-modal-close { display: none }
  .s-quiz-popup { display: block }
}
</style>
