<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useWindowSize } from '@vueuse/core';
import declensionOfNumber from '~/utils/declensionOfNumber';
import type { Fonts } from '~/types';

interface Props {
  title?: string;
  titleClass?: Fonts;
  description?: string;
  descriptionClass?: Fonts;
  bgImages?: { image: string }[];
  showBreadcrumbs?: boolean;
  showQuizButton?: boolean;
  quizBtnText?: string;
  factoids?: Array<Factoid | FactoidQuantity>;
  showForm?: boolean;
  actionParams?: { param: string }[],
  formBtn?: string,
  routeName?: string;
}

interface Factoid {
  title?: string;
  description?: string;
}

interface FactoidQuantity {
  label: string;
  quantity: Array<{ count: number }>;
}

const props = defineProps<Props>();

const { width: windowWidth } = useWindowSize();

const factoids = props.factoids?.length
  ? mapFactoids(props.factoids)
  : [];

function mapFactoids(factoids: Array<Factoid | FactoidQuantity>) {
  return factoids.reduce((acc, item) => {
    if (isFactoidQuantity(item)) {
      const quantity = item.quantity[0]?.count;

      const description = declensionOfNumber(
        quantity,
        item.label.split('|'),
      );

      acc.push({ title: quantity?.toString(), description });
      return acc;
    }

    acc.push({ title: item.title ?? '', description: item.description ?? '' });
    return acc;
  }, [] as { title: string, description: string }[] );
}

function isFactoidQuantity(factoid: Factoid | FactoidQuantity): factoid is FactoidQuantity {
  return (factoid as FactoidQuantity).quantity !== undefined;
}
</script>

<template>
  <div
    class="s-faculties-quiz"
    :class="[props.showForm && '--form']"
  >
    <SQuiz
      v-bind="props"
    />

    <swiper
      v-if="factoids.length"
      :key="windowWidth"
      ref="swiperRef"
      class="s-faculties-quiz__factoids"
      slides-per-view="auto"
      :allow-touch-move="windowWidth < 1200 ? true : false"
      :grab-cursor="windowWidth < 1200 ? true : false"
      :space-between="0"
    >
      <swiper-slide
        v-for="factoid, index in factoids"
        :key="index"
      >
        <div class="s-faculties-quiz__factoid">
          <span
            class="s-faculties-quiz__factoid-title a-font_h5"
            v-html="factoid.title"
          />
          <span
            class="s-faculties-quiz__factoid-txt a-font_l-m"
            v-html="factoid.description"
          />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
@import './SFacultiesQuiz.scss';
</style>
