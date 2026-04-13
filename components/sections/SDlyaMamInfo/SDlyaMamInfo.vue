<script setup lang='ts'>
const items = [{
  imgSm: '/img/s-dlya-mam/info-1-sm.webp',
  imgLg: '/img/s-dlya-mam/info-1.webp',
  title: 'Зарабатывайте онлайн',
  text: 'Освойте новую специальность благодаря онлайн-курсам и&nbsp;начните зарабатывать, не&nbsp;выходя из&nbsp;дома, уже через&nbsp;6 месяцев или&nbsp;раньше',
}, {
  imgSm: '/img/s-dlya-mam/info-2-sm.webp',
  imgLg: '/img/s-dlya-mam/info-2.webp',
  title: 'Измените свою карьеру',
  text: 'Получите высшее или&nbsp;среднее специальное образование дистанционно. К&nbsp;моменту выхода из&nbsp;декрета вы повысите свою должность или&nbsp;сможете сменить работу на&nbsp;более перспективную',
}, {
  imgSm: '/img/s-dlya-mam/info-icon-1.webp',
  imgLg: '',
  title: '1000+ программ',
  text: 'Все уровни образования и&nbsp;онлайн-курсы',
}, {
  imgSm: '/img/s-dlya-mam/info-icon-2.webp',
  imgLg: '',
  title: 'Персональная поддержка',
  text: 'Кураторы и&nbsp;психологи, которые помогут пройти обучение без&nbsp;стресса и&nbsp;перегрузок',
}, {
  imgSm: '/img/s-dlya-mam/info-icon-3.webp',
  imgLg: '',
  title: 'Академический отпуск',
  text: 'Можете оформить, если понадобится больше времени на&nbsp;семью',
}, {
  imgSm: '/img/s-dlya-mam/info-icon-4.webp',
  imgLg: '',
  title: 'Скидки и&nbsp;льготы',
  text: 'Скидки до&nbsp;30% и&nbsp;дополнительные льготы от&nbsp;государства',
}];
</script>

<template>
  <MSectionNewResponsive class="s-dlya-mam-info">
    <div
      v-for="item, idx in items"
      :key="item.title"
      class="s-dlya-mam-info__card"
    >
      <picture>
        <source
          v-if="item.imgLg"
          :srcset="item.imgLg"
          media="(min-width: 1200px)"
        >
        <AImg
          :src="item.imgSm"
          :alt="item.title"
        />
      </picture>
      <div class="s-dlya-mam-info__content">
        <p
          v-if="idx < 2"
          class="--num a-font_xl-m"
          v-html="formatNumberWithLeadingZero(idx+1)"
        />
        <p
          class="s-dlya-mam-info__title a-font_h5"
          v-html="item.title"
        />
        <p
          class="s-dlya-mam-info__text"
          :class="idx > 1 ? 'a-font_l-m' : 'a-font_h6'"
          v-html="item.text"
        />
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style scoped lang='scss'>
  @import './SDlyaMamInfo.scss';
</style>
