<script setup lang="ts">

//- test data
const data = {
  href: '#',
  title: 'В&nbsp;оплате контента видят вклад в&nbsp;развитие медиа',
  date: '21.11.2025',
  source: 'Российская газета',
  text: 'Отношение россиян к&nbsp;платному цифровому контенту стало заметно более зрелым, говорит директор по&nbsp;развитию направления игровой индустрии демо-вуза Михаил Пименов.',
};

const items = Array.from({ length: 6 }, () => data);
//- /test data
</script>


<template>
  <div class="s-cols__main">
    <SSmiPages />
  </div>
  <div class="s-cols__aside">
    <MNewsVertical :items />
  </div>
</template>

<style lang="scss" scoped>
  body .m-articles-menu {
    @include desktop() {
      left: 0;
      bottom: 0;
      overflow: visible;
      height: 100vh;
      width: calc(#{scale(16)} + #{scale(42)});
    }
  }
</style>
