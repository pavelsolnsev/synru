<script setup lang="ts">
import BgImageLg from '~/assets/images/s_quiz/level/lg.webp';
import BgImageMd from '~/assets/images/s_quiz/level/md.webp';
import BgImageSm from '~/assets/images/s_quiz/level/sm.webp';
import DefaultImageLg from '~/assets/images/s_quiz/level/img/1209_lg.webp';
import DefaultImageMd from '~/assets/images/s_quiz/level/img/1209_md.webp';
import DefaultImageSm from '~/assets/images/s_quiz/level/img/1209_sm.webp';
import generateBreadcrumbs from '~/utils/generateBreadcrumbs';
import declensionOfNumber from '~/utils/declensionOfNumber';
import type { Fonts, LevelEntity, LevelCustomFields, QuizSlide, SectionConditionalGroup } from '~/types';

interface Props {
  title?: string;
  titleClass?: Fonts;
  description?: string;
  descriptionClass?: Fonts;
  bgImages?: Array<{ image: string }>;
  tagIcon?: string;
  showBreadcrumbs?: boolean;
  showQuizButton?: boolean;
  quizBtnText?: string;
  showFormButton?: boolean;
  quizFormBtnText?: string;
  formTitleText?: string;
  formBtnText?: string;
  formActions?: { param: string }[]
  showQuizForm?: boolean;
  conditionalGroup?: SectionConditionalGroup[];
  entity?: LevelEntity;
  hasEntity?: boolean;
  routeName?: string;
  programsQuantity?: string;
  slides?: QuizSlide[];
  counts?: Record<string, { programs_count: number }>;
  quizClass?: string;
}

const {
  showBreadcrumbs = false,
  bgImages = [],
  title = '',
  titleClass = '',
  description: propsDescription = '',
  descriptionClass = '',
  tagIcon = '',
  showQuizButton: propsShowQuizButton = false,
  quizBtnText = '',
  showFormButton: propsShowFormButton = false,
  quizFormBtnText = 'Подать заявку',
  formTitleText = '',
  formBtnText = 'Подать заявку',
  formActions = [],
  conditionalGroup = [],
  showQuizForm = false,
  hasEntity = false,
  entity = {},
  routeName = '',
  programsQuantity = '',
  slides,
  counts = {},
  quizClass,
} = defineProps<Props>();

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });

const breadcrumbs = generateBreadcrumbs(
  {
    routeName: hasEntity ? entity.slug! : routeName,
    entity,
  },
);

const levelProgramsCount = entity?.slug && counts[entity.slug] ? counts[entity.slug].programs_count : 0;

const programCount = levelProgramsCount
  ? declensionOfNumber(levelProgramsCount,
      ['программа', 'программы', 'программ'],
      true,
    )
  : programsQuantity;

const {
  'quiz_image': entityQuizImages = [],
  'quiz_icon': entityQuizIcon = 'simple-hat',
  'quiz_title_class': entityQuizTitleClass = 'a-font_h1',
} = entity?.customFields || {};

const quizImages = hasEntity
  ? formatEntityQuizImages(entityQuizImages)
  : bgImages;

const quizTitle = hasEntity ? entity.name : title;

const quizTitleClass = hasEntity ? entityQuizTitleClass : titleClass;

const quizTagIcon = hasEntity ? entityQuizIcon : tagIcon;

const description = entity?.customFields?.quiz_description
  ? entity?.customFields?.quiz_description
  : propsDescription;

const isShowQuizButton = entity?.customFields?.quiz_form
  ? false
  : propsShowQuizButton;

const isShowQuizFormButton = entity?.customFields?.quiz_form
  ? true
  : propsShowFormButton;

const formTitle = entity?.customFields?.quiz_form
  ? entity?.customFields?.quiz_form_title
  : formTitleText;

const { openModal } = useModalStore();

const modalProps = {
  title: "Записаться на мероприятие",
  formName: true,
  formPhone: true,
  btn: formBtnText,
  actionParams: formActions,
};

onBeforeRouteLeave(() => {
  closeQuiz();
});

function closeQuiz() {
  document.documentElement.classList.remove('--js-quiz-visible');
}

function showQuiz() {
  document.documentElement.classList.add('--js-quiz-visible');
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

function formatEntityQuizImages(quizImages: LevelCustomFields['quiz_image'] ) {
  if (!quizImages) return [];

  const entityImages = quizImages[0] ?? {};

  const images = [
    { image: entityImages.imageSm },
    { image: entityImages.imageMd },
    { image: entityImages.imageLg },
  ];

  return images;
}

useSeoMeta({
  ogImage: quizImages[2]?.image ?? DefaultImageLg,
});
</script>

<template>
  <MBreadcrumbs
    v-if="showSection && showBreadcrumbs && breadcrumbs.length"
    class="--before-quiz"
    :breadcrumbs
  />
  <MSection
    v-if="showSection"
    class="s-quiz"
    :class="quizClass"
  >
    <div class="s-quiz__inner">
      <div class="s-quiz__intro">
        <div class="s-quiz__intro-count">
          <ATag
            v-if="programCount"
            :text="programCount"
            variant="white"
          />
        </div>
        <h1
          v-if="quizTitle"
          class="s-quiz__intro-title"
          :class="quizTitleClass"
          v-html="quizTitle"
        />
        <div
          v-if="description"
          class="s-quiz__intro-description a-font_h6"
          :class="descriptionClass"
          v-html="description"
        />
        <template v-if="showQuizForm">
          <MQuizForm
            :action-params="formActions"
            :btn="quizFormBtnText"
          />
        </template>

        <template v-else>
          <AButton
            v-if="isShowQuizButton"
            class="s-quiz__intro-btn --js-show-quiz"
            @click="showQuiz"
          >
            <span v-html="quizBtnText" />
          </AButton>

          <AButton
            v-if="isShowQuizFormButton"
            class="s-quiz__intro-btn"
            @click="openModal('MModalForm', modalProps)"
          >
            <span v-html="quizFormBtnText" />
          </AButton>
        </template>
      </div>

      <span class="s-quiz__tags">
        <span class="s-quiz__ico">
          <ASvgMono :name="quizTagIcon || 'simple-hat'" />
        </span>
        <ATag
          v-if="programCount"
          :text="programCount"
          variant="white"
        />
      </span>

      <picture class="s-quiz__bg">
        <source
          :srcset="BgImageLg"
          media="(min-width: 1200px)"
        >

        <source
          :srcset="BgImageMd"
          media="(min-width: 768px)"
        >
        <AImg
          :src="BgImageSm"
          alt="quiz"
          decoding="async"
        />
      </picture>
      <picture class="s-quiz__img">
        <source
          :srcset="quizImages[2]?.image ?? DefaultImageLg"
          media="(min-width: 1200px)"
        >

        <source
          :srcset="quizImages[1]?.image ?? DefaultImageMd"
          media="(min-width: 768px)"
        >
        <AImg
          :src="quizImages[0]?.image ?? DefaultImageSm"
          alt="quiz"
          decoding="async"
        />
      </picture>
    </div>
    <MQuiz
      :slides
      @close="closeQuiz"
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import '../SQuiz/SQuiz.scss';
@import './SQuizLevel.scss';
</style>
