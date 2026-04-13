<script setup lang="ts">
interface Props {
  title?: string;
  text: string;
  titleClass?: string;
  textClass?: string;
  imageSrc: string;
}

const {
  title = 'Не&nbsp;знаете, что выбрать?',
  titleClass = 'a-font_h6',
  textClass = 'a-font_m-m',
  imageSrc,
} = defineProps<Props>();

const { openModal } = useModalStore();

function showModal() {
  openModal('MModalForm', {
    title: 'Оставьте контакты, мы вам поможем',
    'form-phone': true,
    'btn': 'Отправить',
    'action-params': [{ param: 'form=chto_vybrat' }],
  });
}
</script>

<template>
  <div class="s-programs-filter__banner">
    <p
      :class="titleClass"
      v-html="title"
    />
    <p
      class="s-programs-filter__banner-text"
      :class="textClass"
      v-html="text"
    />
    <AButton
      size="md"
      @click.prevent="showModal"
    >
      Получить консультацию
    </AButton>
    <AImg
      :src="imageSrc"
      loading="lazy"
      decoding="async"
    />
  </div>
</template>

<style scoped lang="scss">
.s-programs-filter__banner {
  z-index: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  border-radius: scale(16);
  padding: scale(16);
  background-color: var(--a-color_white);
  min-height: scale(185);

  @include desktop(min) {
    min-height: scale(175);
  }

  &-text {
    margin: scale(8) 0 auto;
  }

  img {
    z-index: -1;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 100%;
    width: auto;
  }
}
</style>
