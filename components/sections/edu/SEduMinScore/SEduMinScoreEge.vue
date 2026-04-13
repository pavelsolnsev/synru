<script setup lang="ts">
import { egeSubjects } from './SEduMinScoreData';
</script>

<template>
  <p>
    <span style="font-weight: bold;">
      Министерство науки и образования России утвердило пороговые минимальные баллы ЕГЭ для поступления в подведомственные вузы на учебный год 2026/27:
    </span>
  </p>
  <ul>
    <li
      v-for="subject in egeSubjects"
      :key="subject[0]"
      v-html="`${subject[0]} - ${subject[1]}`"
    />
  </ul>
</template>
