import { synergyApi } from '~/utils/mediaCdn';
<script lang="ts" setup>
const data = {
  title: 'Поддержка на&nbsp;каждом этапе подготовки',
  imageLG: synergyApi('uploads/content/ege/support_bg_lg.webp'),
  imageSM: synergyApi('uploads/content/ege/support_bg_sm.webp'),
  list: [
    {
      title: 'Методисты',
      subtitle: 'Создают и&nbsp;постоянно совершенствуют образовательные программы, чтобы они были понятными и&nbsp;эффективными',
      image: synergyApi('uploads/content/ege/support_1.webp'),
    },
    {
      title: 'Психологи',
      subtitle: 'Помогут справиться с&nbsp;волнением и преодолеть страх перед экзаменом, укрепят уверенность в&nbsp;себе',
      image: synergyApi('uploads/content/ege/support_2.webp'),
    },
    {
      title: 'Кураторы',
      subtitle: 'Следят за&nbsp;успеваемостью, вовлечённостью и&nbsp;комфортом в&nbsp;обучении. Помогут адаптироваться, напомнят о заданиях и&nbsp;всегда на&nbsp;связи',
      image: synergyApi('uploads/content/ege/support_3.webp'),
    },
  ],
};
</script>

<template>
  <MSectionNewResponsive
    class="s-ege-support"
  >
    <div class="s-ege-support__body">
      <picture
        class="s-ege-support__bg"
      >
        <source
          media="(min-width: 1200px)"
          srcset=synergyApi('uploads/content/ege/support_bg_lg.webp')
        >
        <AImg
          src=synergyApi('uploads/content/ege/support_bg_sm.webp')
          alt=""
          decoding="async"
          loading="lazy"
        />
      </picture>
      <h2
        class="s-ege-support__title a-font_h2"
        v-html="data.title"
      />
      <ul class="s-ege-support__list">
        <li
          v-for="item in data.list"
          :key="item.title"
          class="s-ege-support__item"
        >
          <div class="s-ege-support__item-title a-font_h4">{{ item.title }}</div>
          <AImg
            :src="item.image"
            :alt="item.title"
            class="s-ege-support__img"
          />
          <div
            class="s-ege-support__subtitle a-font_m-m"
            v-html="item.subtitle"
          />
        </li>
      </ul>
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SEgeSupport';
</style>
