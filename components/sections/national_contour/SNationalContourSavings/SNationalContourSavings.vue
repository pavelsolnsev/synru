<script setup lang="ts">
interface Props {
  title?: string;
  subtitle?: string;
  descriptionBtn?: string;
  bgImages: { image: string }[];
  percentImage: string;
}

defineProps<Props>();

const { openModal } = useModalStore();

const modalProps = {
  title: 'Заполните форму, мы свяжемся с&nbsp;вами и&nbsp;начнём подбор уже сегодня',
  'form-name': true,
  'form-phone': true,
  btn: 'Отправить',
  'action-params': [{ param: 'form=nachat_podbor' }],
};
</script>

<template>
  <MSectionNewResponsive class="s-national-contour-savings">
    <div class="s-national-contour-savings__body">
      <div class="s-national-contour-savings__top">
        <div class="s-national-contour-savings__top-container">
          <AImg
            class="s-national-contour-savings__percent"
            :src="percentImage"
            alt="percent"
          />
          <h1
            v-dompurify-html="title"
            class="s-national-contour-savings__title"
          />
        </div>

        <h5 v-dompurify-html="subtitle" />
      </div>
      <div class="s-national-contour-savings__bottom">
        <p
          v-dompurify-html="descriptionBtn"
          class="a-font_xl-m"
        />
        <AButton  @click="openModal('MModalForm', modalProps)">
          Начать подбор
        </AButton>
      </div>
    </div>

    <picture>
      <source
        :srcset="bgImages[1].image"
        media="(min-width: 1200px)"
      >
      <AImg
        :src="bgImages[0].image"
        alt="credit"
      />
    </picture>
  </MSectionNewResponsive>
</template>

<style scoped lang="scss">
@import './SNationalContourSavings.scss';
</style>
