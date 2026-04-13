<script setup lang="ts">
const page = shallowRef<number>(1);
const perPage = 8;
const isPaginatorVisible = computed(() => perPage <= (perPage / page.value));

const data = {
  href: '#',
  title: 'В&nbsp;оплате контента видят вклад в&nbsp;развитие медиа',
  date: '21.11.2025',
  source: 'Российская газета',
  text: 'Отношение россиян к&nbsp;платному цифровому контенту стало заметно более зрелым, говорит директор по&nbsp;развитию направления игровой индустрии демо-вуза Михаил Пименов.',
};
</script>

<template>
  <div class="s-smi-pages">
    <MArticleBreadcrumbs />

    <h1 class="a-font_h3 s-smi-pages__title">СМИ о&nbsp;нас</h1>
    <div class="a-font_h4 s-smi-pages__subtitle">Публикации</div>
    <div class="s-smi-pages__container">
      <template
        v-for="n in 12"
        :key="n"
      >
        <MSmiCard
          v-if="n <= page * perPage"
          :index="n"
          :href="data.href"
          :title="data.title"
          :date="data.date"
          :source="data.source"
          :text="data.text"
        />
      </template>
    </div>
    <MMore
      v-if="isPaginatorVisible"
      type="button"
      text="Показать ещё"
      @click.stop="page++"
    />

    <MSmiContacts />
  </div>
</template>
<style lang="scss" scoped>
@import './SSmiPages.scss';
</style>
