<script setup lang="ts">
import generateBreadcrumbs from '~/utils/generateBreadcrumbs';
import type { BgImage } from '~/types/BgImage';

interface Props {
  title: string
  subtitle: string
  routeName?: string;
  entity?: { id?: number, name?: string; short_name?: string; };
  bgImages: BgImage[]
}

const {
  routeName = '',
  entity = {},
} = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity });

const tags = ['1000+ программ', '40+ факультетов', 'Высшее образование', 'Онлайн-курсы', 'Бизнес-образование'];
</script>

<template>
  <MSection class="s-certificate-hero">
    <div class="s-certificate-hero__body">
      <MBreadcrumbs :breadcrumbs />
      <ABgImages v-bind="{...bgImages[0]}" />

      <div class="s-certificate-hero__content">
        <h1
          class="s-certificate-hero__title"
          v-html="title"
        />
        <div
          class="s-certificate-hero__subtitle"
          v-html="subtitle"
        />
        <ul class="s-certificate-hero__tags">
          <li
            v-for="tag in tags"
            :key="tag"
            class="s-certificate-hero__tag"
          >
            {{ tag }}
          </li>
        </ul>
      </div>
    </div>
  </MSection>
</template>

<style scoped lang="scss">
@import './SCertificateHero.scss';
</style>
