<script setup lang="ts">
interface Props {
  image?: string;
  showTel?: boolean;
}

const {
  image = '',
  showTel = false,
} = defineProps<Props>();
</script>

<template>
  <div class="s-smi-contacts">
    <h4 class="s-smi-contacts__title a-font_h4">Контакты для&nbsp;СМИ</h4>
    <div class="s-smi-contacts__grid">
      <div class="s-smi-contacts__item">
        <div class="s-smi-contacts__item-top">
          <AImg
            v-if="image"
            :src="image"
          />
          <span class="a-font_h5">Пресс-служба демо-вуза</span>
        </div>
      </div>
      <div
        v-if="showTel"
        class="s-smi-contacts__item"
      >
        <div class="s-smi-contacts__item-top">
          <span class="a-font_h5">Телефон</span>
        </div>
        <div class="s-smi-contacts__item-bottom">
          <span class="a-font_s-m">Пн-Вс 7:00–23:00</span>
          <AButton
            to="tel:+79852310100"
            type="button"
            size="md"
            bg-color="black"
          >
            <span>+7 985 231-01-00</span>
          </AButton>
        </div>
      </div>
      <div class="s-smi-contacts__item">
        <div class="s-smi-contacts__item-top">
          <span class="a-font_h5">Электронная почта</span>
        </div>
        <div class="s-smi-contacts__item-bottom">
          <span class="a-font_s-m">Пишите нам</span>
          <AButton
            to="mailto:press@university.example"
            type="button"
            size="md"
            bg-color="black"
          >
            <span>press@university.example</span>
            <ASvgMono name="arrow_outward" />
          </AButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MSmiContacts.scss';
</style>
