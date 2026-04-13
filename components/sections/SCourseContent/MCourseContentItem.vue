<script setup lang='ts'>
interface Props {
  moduleNum?: string;
  title?: string;
  duration?: string;
  description?: string;
  result?: string;
}

const {
  moduleNum = '0',
  title = '',
  duration = '',
  description = '',
} = defineProps<Props>();

function formatProgramDuration(duration: string) {
  const isDurationWithWord = duration.split(' ').length > 1;
  if (isDurationWithWord) return duration;

  return declensionOfNumber(+duration, ['час', 'часа', 'часов'], true);
}

const isOpen = ref(false);
const resultRef = useTemplateRef('resultRef');
const resultHeight = ref<number | undefined>(undefined);

onMounted(() => {
  resultHeight.value = resultRef.value?.clientHeight;
});
</script>

<template>
  <li
    class="m-accordion"
    :class="{ '--open': isOpen }"
    :style="`--min-h: ${resultHeight}px`"
    @click="isOpen = !isOpen"
  >
    <div class="m-accordion__header">
      <div class="m-accordion__title">
        <div class="s-course-content__module a-font_m-m">
          <ANum
            classes="a-font_m-m a-num--md"
            :num="moduleNum"
          />
          <span>Модуль</span>
        </div>
        <p
          class="a-font_h5"
          v-html="title"
        />
        <p
          v-if="duration"
          class="a-font_m-m m-accordion__subtitle"
          v-html="formatProgramDuration(duration)"
        />
      </div>
      <div class="m-accordion__icon">
        <ASvgMono name="simple-plus" />
      </div>
    </div>

    <div
      v-if="description"
      class="m-accordion__content"
    >
      <div class="m-accordion__wrap">
        <p
          v-if="result"
          class="a-font_h6 m-accordion__content-title"
        >
          Список тем:
        </p>
        <div
          class="a-font_m-m content-list"
          v-html="description"
        />
      </div>
      <div
        v-if="result"
        ref="resultRef"
        class="s-course-content__result"
      >
        <AImg
          src="/img/courses/result_bg.svg"
          alt="Результат"
          decoding="async"
          loading="lazy"
        />
        <p class="a-font_l-m s-course-content__result-tag">Результат</p>
        <p
          class="a-font_xl-m"
          v-html="result"
        />
      </div>
    </div>
  </li>
</template>
<style scoped lang='scss'>
@import '../../molecules/MAccordion/MAccordionItem.scss';
@import './SCourseContent.scss';
</style>
