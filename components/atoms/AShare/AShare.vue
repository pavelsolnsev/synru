<script setup lang="ts">
import type { Fonts } from '~/types';
import { useWindowSize } from '@vueuse/core';

interface Props {
  title?: string,
  link?: string;
  showLabel?: boolean;
  labelClass?: Fonts;
}

const {
  title,
  link,
  showLabel,
  labelClass = 'a-font_m',
} = defineProps<Props>();

const divRef = useTemplateRef('divRef');

const { width: windowWidth } = useWindowSize();

const isDesktop = computed(() => windowWidth.value >= 1200);
const isCopied = shallowRef(false);

const links = [
  {
    url: 'https://vk.com/share.php?url=',
    text: 'Вконтакте',
    icon: 'share_vk',
  },
  {
    url: 'https://connect.ok.ru/offer?url=',
    text: 'Одноклассники',
    icon: 'share_ok',
  },
  {
    url: 'https://t.me/share/url?url=',
    text: 'Telegram',
    icon: 'share_tg',
  },

  // {
  //   url: 'https://dzen.ru/share?url=',
  //   text: 'Дзен',
  //   icon: 'share_dz',
  // },
];

function onOutside() {
  divRef?.value?.classList?.remove('--active');
};

async function onShareClick() {
  if (isDesktop.value) {
    divRef?.value?.classList?.add('--active');
    return;
  }

  await navigator.share({
    title: title,
    text: '',
    url: link,
  });
}

function onCopyClick() {
  if (import.meta.server) return;
  navigator?.clipboard?.writeText(link ?? '');
  isCopied.value = true;
  setTimeout(() => isCopied.value = false, 3000);
}
</script>

<template>
  <div
    ref="divRef"
    v-click-outside="onOutside"
    class="a-share"
    @click="onShareClick"
  >
    <div
      v-if="showLabel"
      class="a-share__label"
      :class="labelClass"
    >
      Поделиться
    </div>

    <div class="a-share__toggler">
      <ASvgMono name="share" />
    </div>

    <div
      class="a-share__links"
      @mouseleave="onOutside"
    >
      <a
        class="a-font_m-m --copy-link"
        @click="onCopyClick"
      >
        <ASvgMono name="share_link" />
        <span v-if="!isCopied">Скопировать ссылку</span>
        <span
          v-else
          class="--is-copied"
        >
          Ссылка скопирована
        </span>
      </a>

      <NuxtLink
        v-for="item in links"
        :key="item.url"
        class="a-font_m-m"
        target="_blank"
        :to="`${item.url}${link}`"
      >
        <ASvgMono :name="item.icon" />
        <span v-html="item.text" />
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './AShare.scss';
</style>
