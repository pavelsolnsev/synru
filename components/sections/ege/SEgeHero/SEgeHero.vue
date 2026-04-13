<script lang="ts" setup>
import generateBreadcrumbs from '~/utils/generateBreadcrumbs';

interface Props {
  triggers?: Array<{
    trigger: string
  }>
  title: string
  subtitle: string
  routeName?: string
  entity?: { id?: number, name?: string; short_name?: string; }
  imageLG: string
  imageSM: string
}

const {
  routeName = '',
  entity = {},
} = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity });

const { openModal } = useModalStore();

function handleClick() {
  openModal('MModalForm', {
    title: 'Начните с бесплатного урока',
    btn: 'Отправить ',
    subtitle: 'Заполните форму, мы свяжемся и&nbsp;уточним удобное для&nbsp;вас время',
    'form-phone': true,
    'subtitle-class': 'a-font_h6',
    'action-params': [{ param: 'form=pervyi_ekran' }],
  });
}
</script>

<template>
  <MSectionNewResponsive class="s-ege-hero">
    <div class="s-ege-hero__body">
      <AImg
        :alt="title"
        :src="imageLG"
        class="s-ege-hero__bg s-ege-hero__bg_lg"
      />
      <div class="s-ege-hero__top">
        <AImg
          :alt="title"
          :src="imageSM"
          class="s-ege-hero__bg s-ege-hero__bg_sm"
        />
        <MBreadcrumbs
          :breadcrumbs
          class="s-ege-hero__breadcrumb"
        />
        <ul
          v-if="triggers && triggers.length"
          class="s-ege-hero__triggers"
        >
          <li
            v-for="item in triggers"
            :key="item.trigger"
            class="s-ege-hero__trigger a-font_xl-m"
            v-html="item.trigger"
          />
        </ul>
      </div>
      <div class="s-ege-hero__bottom">
        <h1
          class="s-ege-hero__title a-font_h3"
          v-html="title"
        />
        <div
          v-if="subtitle"
          class="s-ege-hero__subtitle a-font_h6"
          v-html="subtitle"
        />
        <AButton
          class="s-ege-hero__btn"
          @click="handleClick"
        >
          Бесплатный урок
        </AButton>
      </div>
      <div class="s-ege-hero__reviews">
        <span class="s-ege-hero__reviews_title a-font_m-r">Нам доверяют родители и&nbsp;ученики</span>
        <div class="wrapper">
          <div class="s-ege-hero__review">
            <span class="a-font_m-m">Яндекс</span>
            <div class="s-ege-hero__stars">
              <ASvgMono
                v-for="i in 5"
                :key="i"
                name="star-yellow"
              />
            </div>
            <span class="a-font_m-m">4,9</span>
          </div>
          <div class="s-ege-hero__review">
            <span class="a-font_m-m">Google</span>
            <div class="s-ege-hero__stars">
              <ASvgMono
                v-for="i in 5"
                :key="i"
                name="star-yellow"
              />
            </div>
            <span class="a-font_m-m">4,7</span>
          </div>
        </div>
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SEgeHero.scss';
</style>
