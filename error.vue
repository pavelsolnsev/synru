<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <NuxtLayout>
    <SError v-bind="errorCodeData[error?.statusCode] ?? errorCodeData['404']" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import Image401Lg from '~/assets/images/error/401_lg.webp';
import Image401Md from '~/assets/images/error/401_md.webp';
import Image401Sm from '~/assets/images/error/401_sm.webp';
import Image403Lg from '~/assets/images/error/403_lg.webp';
import Image403Md from '~/assets/images/error/403_md.webp';
import Image403Sm from '~/assets/images/error/403_sm.webp';
import Image404Lg from '~/assets/images/error/404_lg.webp';
import Image404Md from '~/assets/images/error/404_md.webp';
import Image404Sm from '~/assets/images/error/404_sm.webp';
import Image500Lg from '~/assets/images/error/500_lg.webp';
import Image500Md from '~/assets/images/error/500_md.webp';
import Image500Sm from '~/assets/images/error/500_sm.webp';
import Image503Lg from '~/assets/images/error/503_lg.webp';
import Image503Md from '~/assets/images/error/503_md.webp';
import Image503Sm from '~/assets/images/error/503_sm.webp';
import type { NuxtError } from '#app';
import type { ErrorCodeData } from './types';

const props = defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    default: () => ({}),
  },
});

onBeforeUnmount(() => {
  setTimeout(() => {
    reloadNuxtApp();
  },0);

  return abortNavigation();
});

const title = useTitle();

console.error(props.error);

if (!title.value) {
  useHead({
    title: `${props.error?.statusCode ?? '404'} | Демо образовательный портал`,
  });
}

const defaultButtonAttributes = {
  onClick: () => window.location.href = '/',
};

const errorCodeData: Record<string, ErrorCodeData> = {
  401: {
    title: 'Ошибка 401. <br>Вы не авторизованы',
    images: [Image401Sm, Image401Md, Image401Lg],
    btn: {
      text: 'Авторизоваться',
      attributes : defaultButtonAttributes,
    },
  },
  403: {
    title: 'Ошибка 403. <br>Отказано в доступе',
    images: [Image403Sm, Image403Md, Image403Lg],
    btn: {
      text: 'Авторизоваться',
      attributes : defaultButtonAttributes,
    },
  },
  404: {
    title: 'Ошибка 404. <br>Страница не&nbsp;найдена',
    description: 'Извините, запрашиваемая вами страница не&nbsp;существует. Проверьте правильность написания адреса.',
    images: [Image404Sm, Image404Md, Image404Lg],
    btn: {
      text: 'На главную',
      attributes : defaultButtonAttributes,
    },
  },
  500: {
    title: 'Ошибка 500. <br>Ошибка в настройках сайта',
    images: [Image500Sm, Image500Md, Image500Lg],
    btn: {
      text: 'На главную',
      attributes : defaultButtonAttributes,
    },
  },
  503: {
    title: 'Ошибка 503. <br>Услуга недоступна',
    images: [Image503Sm, Image503Md, Image503Lg],
    description: 'Ни один сервер не доступен <br>для обработки этого запроса',
    btn: {
      text: 'На главную',
      attributes : defaultButtonAttributes,
    },
  },
};
</script>
