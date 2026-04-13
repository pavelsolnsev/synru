<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';
import declensionOfNumber from '~/utils/declensionOfNumber';
import { quizSlidesDefault } from './newMQuizData';
import { FORM_POLICY_TEXT } from '~/constants/common';
import { ROUTES } from '~/constants';
import AInput from '~/components/atoms/AInput/AInput.vue';
import APhoneInput from '~/components/atoms/APhoneInput/APhoneInput.vue';
import type { QuizSlide } from '~/types';

interface Props {
  slides?: QuizSlide[];
}

const {
  slides = [ ...quizSlidesDefault],
} = defineProps<Props>();

const TRIGGER_ANSWER = 'Да';
const TRIGGER_CLASS = '--budget';
const SKIP_SLIDE_CLASS = '--reset';

const userAnswersStore: string[] = [];
const userAnswers = ref('');
const activeIndex = ref(0);

const emits = defineEmits(['submit', 'close']);

const paginationTextDeclension = declensionOfNumber(slides.length, ['вопрос', 'вопроса', 'вопросов']);

const swiperRef = computed(() => {
  if (quizSlider?.value) {
    //@ts-expect-error - ошибка в $el, удалить после перевода хука useSwiperWrapper в формат .ts
    return quizSlider?.value.$el?.swiper;
  }
  return null;
});

const onAnswerClick = (question: string, answer: string, index: number) => {
  userAnswersStore[index] = `${question}: ${answer}`;
  userAnswers.value = userAnswersStore.join('||');

  const activeSlide = swiperRef.value?.slides[index] as HTMLDivElement;
  const nextSlide = swiperRef.value?.slides[index + 1] as HTMLDivElement;

  setTimeout(() => {
    const SKIP_NEXT_SLIDE = activeSlide.classList.contains(TRIGGER_CLASS) && answer === TRIGGER_ANSWER;
    if (SKIP_NEXT_SLIDE) {
      activeIndex.value = index + 2;
      nextSlide.classList.add(SKIP_SLIDE_CLASS);
      swiperRef.value?.slideTo(index + 2);
      return ;
    }
    activeIndex.value = index + 1;
    nextSlide.classList.remove(SKIP_SLIDE_CLASS);
    swiperRef.value?.slideNext();
  }, 150);
};

const onPrevQuestionClick = (questionIndex: number) => {
  if (questionIndex === 0) {
    closeQuiz();
    return;
  };
  const prevSlide = swiperRef.value?.slides[activeIndex.value - 1] as HTMLDivElement;

  if (prevSlide.classList.contains(SKIP_SLIDE_CLASS)) {
    swiperRef.value?.slideTo(activeIndex.value - 2);
    activeIndex.value = questionIndex - 2;
    return;
  }

  swiperRef.value?.slidePrev();
  activeIndex.value = questionIndex - 1;
};

const route = useRoute();

const { params: baseParams } = useQuizParams();

// TODO: Проверка роута для А/Б теста приемной комиссии

const actionParams: ComputedRef<MaybeRef<{ param: string }[]>> = computed(() => {
  return getAbTestActionParams([...baseParams.value], route.path);
});

const {
  swiperRef: quizSlider,
  swiperConfig,
}  = useSwiperWrapper({
  slidesPerView: 'auto',
  spaceBetween: 0,
  noSwiping: false,
  allowTouchMove: false,
  speed: 0,
  initialSlide: 0,
  scale: false,
  longSwipes: false,
  observer: true,
  observeParents: true,
  pagination: false,
});

watch(() => route.path, () => {
  closeQuiz();
});

const {
  formData,
  formErrors,
  onSubmit,
  isPending,
  onFormClick,
} = useLanderForm({
  initialFormData: {
    name: '',
    phone: '',
    personalDataAgree: false,
    comments: '',
  },
  baseLanderData: { title: '', actionParams: toValue(actionParams.value) } satisfies BaseLanderData,
  formSchema,
  onSuccess: async () => {
    swiperRef.value?.slideNext();
    await nextTick();
    closeQuiz();
    return await navigateTo(`${ROUTES.THANKS}?partner=typ`);
  },
});

const nameInput = useTemplateRef<InstanceType<typeof AInput>>('name');
const phoneInput = useTemplateRef<InstanceType<typeof APhoneInput>>('phone');

watch(formErrors, () => {
  if (formErrors.value.name && nameInput.value) {
    nameInput.value.getFocus();
    return;
  }
  if (formErrors.value.phone && phoneInput.value) {
    phoneInput.value.getFocus();
    return;
  }
});

function closeQuiz() {
  emits('close');
  swiperRef.value?.slideTo(0);
  userAnswers.value = '';
  activeIndex.value = 0;

  const html = document.querySelector('html');

  html?.classList.remove('--js-quiz-visible');

  const inputs: HTMLInputElement[] = swiperRef.value?.el?.querySelectorAll('input[type="radio"]');
  if (inputs && inputs.length) {
    inputs.forEach((input) => input.checked = false);
  }
}

watchEffect(() => {
  formData.value.comments = userAnswers.value;
});
</script>

<template>
  <div class="m-quiz">
    <swiper
      ref="quizSlider"
      class="m-quiz__slider"
      v-bind="swiperConfig"
    >
      <template #wrapper-start>
        <MQuizSlide
          v-for="slide, index in slides"
          :key="slide.question"
          :slide-classname="`m-quiz__slide_${index} ${slide.class ?? ''}`"
          :pagination-text="`${index + 1} из ${slides.length + 1} ${paginationTextDeclension}`"
          :title="slide.question"
          :nav-classname="!index ? '--js-hide-quiz' : '' "
          show-image
          show-navigation
          @prev="onPrevQuestionClick(index)"
        >
          <div
            class="m-quiz__slide-answers"
          >
            <span
              v-if="slide.type === 'number'"
              class="m-quiz__slide-answer --number"
            >
              <button type="button">
                -
              </button>
              <input
                type="number"
                :name="`quiz-slide_${index}`"
                :min="slide.answers[0]"
                :max="slide.answers[1]"
                :placeholder="slide.answers[1]"
                :value="slide.answers[1]"
              >
              <button type="button">
                +
              </button>
            </span>
            <template v-else>
              <span
                v-for="answer in slide.answers"
                :key="answer"
                class="m-quiz__slide-answer"
                :class="`--${slide.type ?? 'radio'}`"
                @click="onAnswerClick(slide.question, answer, index)"
              >
                <input
                  :type="slide.type ?? 'radio'"
                  :name="`quiz-slide_${index}`"
                  :value="answer"
                >
                <span
                  class="m-quiz__slide-answer-label a-font_l-m"
                  v-html="answer"
                />
                <ins class="m-quiz__slide-answer-ico">
                  <ASvgMono name="checked" />
                </ins>
              </span>
            </template>
          </div>
        </MQuizSlide>

        <MQuizSlide
          slide-classname="m-quiz__slide_form"
          pagination-text="Осталось чуть-чуть"
          title="Мы подобрали вам программу обучения"
          show-navigation
          @prev="onPrevQuestionClick(slides.length)"
        >
          <form
            class="m-quiz__form nolander"
            @submit.prevent="onSubmit"
            @click="onFormClick"
          >
            <input
              v-model="formData.comments"
              type="hidden"
              name="comments"
            >
            <div class="m-quiz__form-title a-font_h6">
              Оставьте заявку, и&nbsp;мы откроем бесплатный доступ к&nbsp;вводной части обучения
            </div>
            <div class="m-quiz__form-content">
              <AInput
                ref="name"
                v-model="formData.name"
                name="name"
                placeholder="Имя"
                :error="formErrors.name"
              />
              <APhoneInput
                ref="phone"
                v-model="formData.phone"
                :error="formErrors.phone"
              />
              <AButton
                type="submit"
                :disabled="isPending"
              >
                Начать бесплатно
              </AButton>
            </div>
            <ACheckbox
              v-model="formData.personalDataAgree"
              :label="FORM_POLICY_TEXT"
              :initial="formData.personalDataAgree"
              :required="false"
              class="m-form__privacy a-font_xs"
              name="personalDataAgree"
            />
          </form>
        </MQuizSlide>

        <MQuizSlide
          slide-classname="m-quiz__slide_thanks"
          pagination-text="Осталось чуть-чуть"
        >
          <div class="m-quiz__slide-title a-font_h4">
            Мы подобрали вам программу обучения
          </div>
          <div class="m-quiz__form send-success">
            <p class="a-font_h3">Заявка успешно отправлена!</p>
          </div>
        </MQuizSlide>
      </template>
    </swiper>

    <button
      type="button"
      class="m-quiz__close --js-hide-quiz"
      @click="closeQuiz"
    >
      <ASvgMono name="close" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import './MQuiz.scss';
</style>

<style>
  [type="submit"][disabled] {
    cursor: not-allowed !important;
    opacity: 0.5;
  }
</style>
