<script setup lang='ts'>
import AInput from '~/components/atoms/AInput/AInput.vue';
import ATextarea from '~/components/atoms/ATextarea/ATextarea.vue';
import { FORM_POLICY_TEXT } from '~/constants/common';
import {
  type FormReviewData,
  formReviewSchema,
} from '~/utils/validators';

interface Props {
  actionParams?: { param: string }[],
  routeName?: string;
  options?: string[];
}

const {
  actionParams = [],
  routeName = '',
  options = [],
} = defineProps<Props>();

const MAX_RATING = 5;

const currentRating = shallowRef(MAX_RATING);

const {
  formData,
  formErrors,
  onSubmit,
  isPending,
  onFormClick,
} = useLanderForm<FormReviewData>({
  initialFormData: {
    name: '',
    personalDataAgree: false,
    email: '',
    faculty: '',
    comments: '',
    rating: currentRating.value,
  },
  baseLanderData: { title: 'Отзыв', actionParams } satisfies BaseLanderData,
  formSchema: formReviewSchema,
  onSuccess: async () => {
    const path = getNavigationPath({ routeName });

    return await navigateTo(path, {
      external: true,
    });
  },
});

const nameInput = useTemplateRef<InstanceType<typeof AInput>>('nameInput');
const emailInput = useTemplateRef<InstanceType<typeof AInput>>('emailInput');
const commentInput = useTemplateRef<InstanceType<typeof ATextarea>>('commentInput');

watch(formErrors, () => {
  if (formErrors.value.name && nameInput.value) {
    nameInput.value.getFocus();
    return;
  }
  if (formErrors.value.email && emailInput.value) {
    emailInput.value.getFocus();
    return;
  }
  if (formErrors.value.comments && commentInput.value) {
    commentInput.value.getFocus();
    return;
  }
});

watch(currentRating, () => {
  formData.value.rating = currentRating.value;
});
</script>

<template>
  <div class="m-review-form">
    <form
      class="m-form nolander"
      @submit.prevent="onSubmit"
      @click="onFormClick"
    >
      <div class="m-form__content">
        <AInput
          ref="nameInput"
          v-model="formData.name"
          name="name"
          placeholder="Имя"
          :error="formErrors.name"
        />

        <AInput
          ref="emailInput"
          v-model="formData.email"
          type="email"
          name="email"
          inputmode="email"
          placeholder="Почта"
          :error="formErrors.email"
        />
      </div>

      <div class="m-review-form__inputs">
        <ASelect
          v-model="formData.faculty"
          placeholder="Факультет"
          :options
          :error="formErrors.faculty"
        />
        <ATextarea
          ref="commentInput"
          v-model="formData.comments"
          placeholder="Ваш отзыв"
          :error="formErrors.comments"
        />
      </div>

      <div class="m-review-form__stars">
        <ASvgMono
          v-for="rating in MAX_RATING"
          :key="rating"
          name="simple-star3"
          :class="rating <= currentRating && 'active'"
          @click="currentRating = rating"
        />
      </div>
      <div class="m-form__bottom">
        <AButton
          type="submit"
          :disabled="isPending"
        >
          <span>Оставить отзыв</span>
        </AButton>

        <ACheckbox
          v-model="formData.personalDataAgree"
          class="m-form__privacy a-font_xs"
          name="personalDataAgree"
          :initial="formData.personalDataAgree"
          :label="FORM_POLICY_TEXT"
        />
      </div>
    </form>
  </div>
</template>

<style scoped lang='scss'>
@import './MReviewForm.scss';
</style>
