<script setup lang="ts">
interface Props {
  title?: string;
  heroImage: string;
  cards: {
    title: string;
    subtitle: string;
  }[]
}

defineProps<Props>();

const { openModal } = useModalStore();

const modalProps = {
  title: 'Заполните форму, мы свяжемся с&nbsp;вами и&nbsp;ответим на&nbsp;все вопросы',
  'form-name': true,
  'form-phone': true,
  btn: 'Отправить',
  'action-params': [{ param: 'form=konsultatsija_uslugi' }],
};
</script>

<template>
  <MSectionNewResponsive class="s-national-contour-services">
    <div class="s-national-contour-services__body">
      <div class="s-national-contour-services__hero">
        <h2 v-dompurify-html="title" />
        <picture>
          <AImg
            :src="heroImage"
            alt="credit"
          />
        </picture>
      </div>


      <div class="s-national-contour-services__list">
        <div
          v-for="(card, idx) in cards"
          :key="card.title"
          class="s-national-contour-services__card-wrapper"
        >
          <div
            class="s-national-contour-services__card"
          >
            <div class="s-national-contour-services__card-top">
              <ASvgMono name="simple-check3" />

              <h6 v-dompurify-html="card.title" />
            </div>

            <p
              v-dompurify-html="card.subtitle"
              class="a-font_l-m"
            />
          </div>

          <AButton
            v-if="(cards.length - 1) === idx"
            class="s-national-contour-services__btn-desktop"
            @click="openModal('MModalForm', modalProps)"
          >
            Консультация
          </AButton>
        </div>
      </div>

      <AButton
        class="s-national-contour-services__btn-mobile"
        @click="openModal('MModalForm', modalProps)"
      >
        Консультация
      </AButton>
    </div>
  </MSectionNewResponsive>
</template>

<style scoped lang="scss">
@import './SNationalContourServices.scss';
</style>
