<script lang="ts" setup>
interface Props {
  routeName?: string
  title: string
  monthPrice: string
  fullPrice: string
  cards: {
    title: string
    content: string
  }[]
  imageLG: string
  imageSM: string
  formTitle: string
  formSubtitle: string
}

defineProps<Props>();
</script>

<template>
  <MSectionNewResponsive
    class="s-ege-price"
  >
    <div class="s-ege-price__body">
      <div class="s-ege-price__info">
        <div class="s-ege-price__top">
          <h2
            class="s-ege-price__title a-font_h5"
            v-html="title"
          />
          <div class="s-ege-price__price">
            <div class="wrapper">
              <span class="a-font_h3"> от {{ monthPrice }} <span class="ruble-icon">Р</span>/мес.</span>
              <div class="s-ege-price__credit a-font_m-r">Рассрочка на&nbsp;12 месяцев, без&nbsp;переплат и&nbsp;первого взноса</div>
            </div>
            <span
              class="a-font_m-m s-ege-price s-ege-price__fullPrice"
            >Стоимость зависит от&nbsp;формата и&nbsp;начинается от&nbsp;{{ fullPrice }}&nbsp;<span class="ruble-icon">Р</span></span>
          </div>
        </div>

        <div class="s-ege-price__bottom">
          <div class="a-font_h5 s-ege-price__give">Вы получаете</div>
          <ul class="s-ege-price__list">
            <li
              v-for="item in cards"
              :key="item.title"
              class="s-ege-price__item"
            >
              <div
                class="s-ege-price__item-title"
                v-html="item.title"
              />
              <div
                class="s-ege-price__item-content"
                v-html="item.content"
              />
            </li>
          </ul>
        </div>
      </div>
      <div class="s-ege-price__form">
        <picture class="s-ege-price__image">
          <source
            media="(min-width: 1200px)"
            :srcset="imageLG"
          >
          <AImg
            :src="imageSM"
            :alt="title"
            decoding="async"
            loading="lazy"
          />
        </picture>
        <MForm
          :title="formTitle"
          :subtitle="formSubtitle"
          :form-phone="true"
          :form-name="false"
          btn="Отправить"
          :action-params="[{param: 'form=besplatnyj_urok'}]"
          subtitle-class="a-font_m-m"
        />
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SEgePrice';
</style>
