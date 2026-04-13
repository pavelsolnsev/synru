<script setup lang="ts">
import Image1Lg from '~/assets/images/s_success/1-lg.webp';
import Image1Sm from '~/assets/images/s_success/1-sm.webp';
import Image2Lg from '~/assets/images/s_success/2-lg.webp';
import Image2Sm from '~/assets/images/s_success/2-sm.webp';
import Image3Lg from '~/assets/images/s_success/3-lg.webp';
import Image3Sm from '~/assets/images/s_success/3-sm.webp';

const successList = [
  {
    num: '',
    img: [Image1Sm, Image1Lg],
    title: 'Осваиваете профессию',
    text: 'Учитываем последние изменения рынка труда и&nbsp;предлагаем самые востребованные профессии',
  },
  {
    num: '',
    img: [Image2Sm, Image2Lg],
    title: 'Получаете поддержку наставника',
    text: 'Помощь куратора на&nbsp;протяжении всего обучения',
  },
  {
    num: '',
    img: [Image3Sm,Image3Lg ],
    title: 'Собираете портфолио с&nbsp;первого дня учёбы',
    text: 'Поможем оформить выполненные практические задания и&nbsp;составить кейсы',
  },
];
</script>

<template>
  <MSection
    class="s-success"
    title="Ваш успех&nbsp;&mdash; наша&nbsp;цель"
  >
    <div class="s-success__description a-font_h6">
      Поможем составить резюме и&nbsp;портфолио; расскажем, как эффективно презентовать проекты.
    </div>
    <div class="s-success__list">
      <div
        v-for="{title, text, num, img} in successList"
        :key="num"
        class="s-success__item"
      >
        <div class="s-success__item-top">
          <span
            class="s-success__item-num a-font_h5"
            v-html="num"
          />
          <picture class="s-success__item-img">
            <source
              :srcset="img[1]"
              media="(min-width: 1200px)"
            >
            <AImg
              :src="img[0]"
              alt="success"
              decoding="async"
              loading="lazy"
            />
          </picture>
        </div>
        <h5
          class="s-success__item-title a-font_h5"
          v-html="title"
        />
        <p
          class="s-success__item-text a-font_h6"
          v-html="text"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SSuccess.scss';
</style>
