<script setup lang="ts">
import Image1 from '~/assets/images/s-discipline-article/1.webp';
import Image2 from '~/assets/images/s-discipline-article/2.webp';
import Image3 from '~/assets/images/s-discipline-article/3.webp';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'Подготовка к&nbsp;ЕГЭ/ОГЭ от&nbsp;демо-вуза',
  description,
} = defineProps<Props>();

const demoArticleItems = [
  {
    title: 'Информцентр образования',
    text: 'Собрал необходимые материалы по&nbsp;всем предметам и&nbsp;уже разделили их по&nbsp;блокам, вопросам, вариантам и&nbsp;типам заданий на&nbsp;экзамене. В&nbsp;разделах есть официальная информация к&nbsp;изучению&nbsp;— кодификатор, спецификация ФИПИ, демоверсии, КИМ (пробные варианты) и&nbsp;многое другое.',
    image: Image1,
  },
  {
    title: 'Теория',
    text: 'Для&nbsp;удобства информация распределена по&nbsp;номерам заданий демоверсий текущего года. Материал изложен полно, но&nbsp;кратко. Простым языком. Есть наглядные примеры для&nbsp;понимания, схемы, таблицы для&nbsp;запоминания.',
    image: Image2,
  },
  {
    title: 'Практика',
    text: 'Это удобное пособие для&nbsp;быстрой подготовки к&nbsp;экзаменам: просто выбирайте задание, которое вызвало больше всего затруднений или&nbsp;вопросов, и&nbsp;тренируйтесь. В&nbsp;каждом листе есть список заданий, которые вы можете пройти самостоятельно, также правильные ответы с&nbsp;пояснениями (обоснованиями).',
    image: Image3,
  },
];
</script>

<template>
  <div class="s-discipline-article">
    <h4
      v-if="title"
      class="s-discipline-article__title a-font_h4"
      v-html="title"
    />
    <div
      class="s-discipline-article__description a-font_xl-m"
      v-html="description"
    />

    <div class="s-discipline-article__cards">
      <div
        v-for="item in demoArticleItems"
        :key="item.title"
        class="s-discipline-article__card"
      >
        <span class="s-discipline-article__card-img">
          <AImg
            :src="item.image"
            alt="card"
          />
        </span>

        <div class="s-discipline-article__card-info">
          <div
            class="s-discipline-article__card-title a-font_h5"
            v-html="item.title"
          />
          <div
            class="s-discipline-article__card-text a-font_m"
            v-html="item.text"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SDisciplineArticle.scss';
</style>
