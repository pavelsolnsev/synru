<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
const { width: windowWidth } = useWindowSize();

const limit = shallowRef<6 | 16>(6);

onMounted(() => {
  limit.value = windowWidth.value < 1200 ? 6 : 16;
});

//- test data
const data = {
  href: '#',
  image: 'https://example.com/assets/components/phpthumbof/cache/lvgkorp.znaniezashhita2.2fd1ac54e8e6b545ec4ffae5e477d8ca.webP',
  title: 'Выпускники программы «Менеджмент спортивно-оздоровительного и&nbsp;фитнес-клуба» получили удостоверения о&nbsp;повышении квалификации',
  date: '27 ноября 2025',
};

const items = Array.from({ length: 40 }, () => data);
//- /test data
</script>


<template>
  <div class="s-cols__main">
    <SBlogSlider :items="items.slice(0,5)" />
    <SBlogPages
      :items="items"
      :offset="5"
      :paginator="true"
      :per-page="limit"
    />
  </div>
</template>
