<script setup lang="ts">
const route = useRoute();

const isSecondQuiz = computed(() => {
  const queryKey = 'v';
  const queryValue = 'new';
  const query = route.query;

  const isSecondQuiz = Object.hasOwn(query, queryKey) && query[queryKey] === queryValue;

  return isSecondQuiz;
});

const currentQuiz = isSecondQuiz.value
    ? 'SMainQuizSecond'
    : 'SMainQuizFirst'
  ;
</script>

<template>
  <component :is="currentQuiz" />
</template>
