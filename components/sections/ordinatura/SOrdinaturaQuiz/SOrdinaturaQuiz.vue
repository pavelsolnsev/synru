<script setup lang="ts">
import type { LevelCustomFields } from '~/types';

const { data } = await useFetch(`/api/levels/ordinatura`, {
  watch: false,
  deep: false,
  transform(res) {
    if (!res) return null;
    return res.data[0];
  },
});

const {
  quiz_icon = '',
  quiz_image = [],
} = mapCustomFields(data.value?.attributes?.custom_field_values ?? {}) as LevelCustomFields;

const title = data.value?.attributes?.name ?? '';
const bgImages = formatEntityQuizImages(quiz_image);
const description = "Оставьте заявку <br>и&nbsp;начните учиться <span class='--free-red'>бесплатно</span>";
const formTitleText = 'Оставьте заявку, и&nbsp;мы откроем <span class="--free-red">бесплатный</span> доступ к&nbsp;вводной части обучения';
const formBtnText = 'Подать заявку';
const formActions = [{ param: 'form=pervyy_ekran' }];

const programs_count = data.value?.attributes?.programs_count ?? 0;
const programsQuantity = declensionOfNumber(programs_count,['программа', 'программы', 'программ'], true );

function formatEntityQuizImages(quizImages: LevelCustomFields['quiz_image'] ) {
  if (!quizImages) return [];

  const entityImages = quizImages[0] ?? {};

  const images = [
    { image: entityImages.imageSm ?? '' },
    { image: entityImages.imageMd ?? '' },
    { image: entityImages.imageLg ?? '' },
  ];

  return images;
}
</script>

<template>
  <SQuizLevel
    title-class="a-font_h1"
    description-class="a-font_h6"
    route-name="ordinatura"
    show-breadcrumbs
    show-form-button
    quiz-form-btn-text="Начать бесплатно"
    show-quiz-form
    :title
    :tag-icon="quiz_icon"
    :bg-images
    :programs-quantity
    :description
    :form-title-text
    :form-btn-text
    :form-actions
  />
</template>
