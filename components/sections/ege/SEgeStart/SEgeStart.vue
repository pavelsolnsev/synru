<script lang="ts" setup>
interface Props {
  title: string
  subtitle: string
  imageLg: string
  imageSm: string
  btnText: string
  formTitle: string
  formSubtitle: string
  formActions?: Array<{ param: string }>
}

const props = defineProps<Props>();

const { openModal } = useModalStore();

function handleClick() {
  openModal('MModalForm', {
    title: props.formTitle,
    btn: 'Отправить ',
    subtitle: props.formSubtitle,
    'form-phone': true,
    'subtitle-class': 'a-font_h6',
    'action-params': props.formActions,
  });
}
</script>

<template>
  <MSectionNewResponsive
    class="s-ege-start"
  >
    <div class="s-ege-start__body">
      <picture
        class="s-ege-start__bg"
      >
        <source
          media="(min-width: 1200px)"
          :srcset="imageLg"
        >
        <AImg
          :src="imageSm"
          alt="title"
          decoding="async"
          loading="lazy"
        />
      </picture>
      <h2
        class="s-ege-start__title a-font_h3"
        v-html="title"
      />
      <div
        class="s-ege-start__subtitle"
        v-html="subtitle"
      />
      <AButton
        class="s-ege-start__btn"
        bg-color="black"
        @click="handleClick"
      >
        {{ btnText }}
      </AButton>
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SEgeStart';
</style>
