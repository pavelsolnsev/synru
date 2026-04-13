<script setup lang="ts">
interface Props {
  to: string;
  size?: string;
  bgColor?: string;
}

const { to = '', size = 'small', bgColor = 'accent' } = defineProps<Props>();

const name = getSvgName();

function getSvgName() {
  try {
    const errorPropToMessage = 'Не валидный пропс "to"';

    if (!to) throw new Error(errorPropToMessage);

    const svgNameMap = {
      'vk.com': 'social-vk',
      'youtube.com': 'social-youtube',
      't.me': 'social-telegram',
    };

    for (const [key, value] of Object.entries(svgNameMap)) {
      if (to.includes(key)) return value;
    }

    throw new Error(errorPropToMessage);
  } catch (err) {
    console.error(err);
  }
}
</script>

<template>
  <AButton
    v-if="name"
    :to
    :class="['a-button', `a-button--${size}`, `a-button--${bgColor}`]"
  >
    <span class="a-button__ico">
      <ASvgMono :name />
    </span>
    <slot />
  </AButton>
</template>

<style lang='scss' scoped>
@import './ALinkSocial.scss';
</style>
