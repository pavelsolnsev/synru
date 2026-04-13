<script setup lang="ts">
import generateBreadcrumbs from '~/utils/generateBreadcrumbs';

//- TODO:
const routeName = 'abiturientam';
const breadcrumbs = generateBreadcrumbs({ routeName, entity: {} });
</script>

<template>
  <MBreadcrumbs
    :breadcrumbs
  />
</template>

<style lang="scss" scoped>
@import './MArticleBreadcrumbs.scss';
</style>
