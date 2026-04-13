<script setup lang="ts">

interface Props {
  title: string,
  img?: string,
  imgLg?: string,
  imgMd?: string,
  titleClassName?: string,
  subtitle?: string,
  tags?: string[],
}

const {
  title,
  img = '',
  imgLg = '',
  imgMd = '',
  titleClassName = 'a-font_h5',
  subtitle = '',
  tags = [],
} = defineProps<Props>();

const popup: Ref<HTMLElement | null> = ref(null);

onMounted(() => {
  popup.value = document.getElementById('s-quiz-popup');

  if (!popup.value) {
    console.error('[MBannerCard]: Отсутствует элемент #s-quiz-popup');
  }
});

const { openModal } = useModalStore();

function openPopup() {
  if (!popup) return;
  openModal('SQuizPopup');
}
</script>

<template>
  <div class="m-banner-card">
    <picture
      v-if="img"
      class="m-banner-card__img"
    >
      <source
        v-if="imgLg"
        :srcset="imgLg"
        media="(min-width: 1200px)"
      >
      <source
        v-if="imgMd"
        :srcset="imgMd"
        media="(min-width: 768px)"
      >
      <AImg
        :src="img"
        :alt="title"
        decoding="async"
        loading="lazy"
      />
    </picture>

    <div class="m-banner-card__inner">
      <div
        :class="titleClassName"
        class="m-banner-card__title"
        v-html="title"
      />
      <div
        v-if="subtitle || tags.length"
        class="m-banner-card__content"
      >
        <div
          v-if="subtitle"
          class="m-banner-card__subtitle a-font_m-m"
          v-html="subtitle"
        />

        <div
          v-if="tags.length"
          class="m-banner-card__tags"
        >
          <ATag
            v-for="tag in tags"
            :key="tag"
            :text="tag"
            variant="white"
            class="a-tag--blur"
          />
        </div>
      </div>
      <AButton
        bg-color="white"
        class="--quiz-popup-opener"
        @click.prevent="openPopup()"
      >
        <span>Подобрать программу</span>
      </AButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MBannerCard.scss';
</style>
