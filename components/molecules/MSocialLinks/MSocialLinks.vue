<script setup lang="ts">
import { SOCIAL } from '~/constants';

interface SocialLink {
  name: string,
  href: string,
  icon: string,
}

const {
  showTitle = true,
  links = [],
} = defineProps<{
  showTitle?: boolean,
  links?: SocialLink[],
}>();

const socials: SocialLink[] = links.length
  ? links
  : [
      {
        name: 'vkontakte',
        href: SOCIAL.VK,
        icon: 'social-vk',
      },
      {
        name: 'rutube',
        href: SOCIAL.RUTUBE,
        icon: 'social-rutube',
    },
    ];
</script>

<template>
  <div class="m-social-links">
    <span
      v-if="showTitle"
      class="m-social-links__title a-font_s-m"
    >
      Мы в соцсетях
    </span>
    <span class="m-social-links__wrapper">
      <NuxtLink
        v-for="item in socials"
        :key="item.name"
        :href="item.href"
        :aria-label="item.name"
        :class="item.icon"
        class="m-social-links__item"
        target="_blank"
        rel="noreferrer"
      >
        <ASvgMono :name="item.icon" />
      </NuxtLink>
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import './MSocialLinks.scss';
</style>
