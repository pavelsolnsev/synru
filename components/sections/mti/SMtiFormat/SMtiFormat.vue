<script setup lang="ts">
interface Props {
  title: string
  cards: {
    title: string
    subtitle: string
    icon: string
  }[]
  routeName?: string
}

const props = defineProps<Props>();

const { openModal } = useModalStore();

const modalTitle = props.routeName === 'gymnasium' ? 'Попробуйте бесплатно 7 дней обучения в&nbsp;гимназии' : 'Попробуйте бесплатно 7 дней обучения в&nbsp;школе'

const modalProps = {
  title: modalTitle,
  subtitle: 'Заполните форму, мы свяжемся с&nbsp;вами и&nbsp;ответим на&nbsp;все вопросы',
  'form-name': true,
  'form-phone': true,
  btn: 'Отправить',
  'action-params': [{ param: 'form=vyberete_format' }],
};
</script>

<template>
  <MSectionNewResponsive
    class="s-mti-format"
    :title
  >
    <div class="s-mti-format__body">
      <div
        v-for="card in cards"
        :key="card.title"
        class="s-mti-format__card"
      >
        <div class="s-mti-format__top">
          <div class="s-mti-format__info">
            <div
              class="s-mti-format__title a-font_h5"
              v-html="card.title"
            />
            <div
              class="s-mti-format__description a-font_xs-m"
              v-html="card.subtitle"
            />
          </div>
          <div class="s-mti-format__img">
            <AImg :src="`/img/school_1/${card.icon}.webp`" />
          </div>
        </div>
        <AButton class="s-mti-format__btn" @click="openModal('MModalForm', modalProps)">Выбрать</AButton>
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SMtiFormat';
</style>
