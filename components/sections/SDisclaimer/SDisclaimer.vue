<script setup lang="ts">
const infoLinks = [{
  title: 'Официальный сайт',
  text: 'example.com',
  link: 'https://example.com',
},{
  title: 'Контакт для демо',
  text: 'info@university.example',
  link: 'mailto:info@university.example',
},{
  title: 'Адрес',
  text: 'Демо, портфолио',
  link: '',
}];
</script>

<template>
  <MSection
    title="Демо-версия сайта для портфолио"
    title-class="a-font_h4"
    class="disclaimer"
  >
    <div class="disclaimer__content a-font_xl-m">
      <p>Контент и&nbsp;данные приведены как пример вёрстки и&nbsp;UI; не&nbsp;являются публичной офертой и&nbsp;не&nbsp;привязаны к&nbsp;реальному заказчику.</p>
      <p>Для продакшена замените тексты, ссылки и&nbsp;реквизиты на&nbsp;актуальные для вашей организации.</p>
      <p>Официальную информацию уточняйте на&nbsp;сайте вашего учебного заведения.</p>
    </div>
    <h2 class="a-font_h4">Для получения официальной информации обращайтесь:</h2>
    <div class="disclaimer__contacts">
      <div
        v-for="item in infoLinks"
        :key="item.title"
        class="disclaimer__item"
      >
        <p class="a-font_h6">{{ item.title }}</p>
        <ATag
          :text="item.text"
          :to="item.link"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SDisclaimer.scss';
</style>
