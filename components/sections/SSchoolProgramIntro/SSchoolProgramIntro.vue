<script setup lang="ts">
import type { SchoolProgramEntity } from '~/types/SchoolProgramEntity';
import type { FormsTrainingResponse } from '~/types';
import { KEYS } from '~/constants';

interface Props {
  showForm?: boolean;
  formBtn?: string;
  actionParams?: { param: string }[]
  entity: SchoolProgramEntity;
  routeName: string;
}

const {
  showForm = false,
  actionParams = [],
  formBtn,
  entity,
  routeName,
} = defineProps<Props>();

const { data: formTrainings } = await useFetch(`/api/school-programs/getFormsBySchoolProgramId/${entity?.id}`, {
  key: `${KEYS.SCHOOL_PROGRAM_FORMS}-${entity?.id}`,
  query: {
    'filter[published]': true,
    'page[size]': 0,
  },
  watch: false,
  deep: false,
  transform({ data }: FormsTrainingResponse): string[] {
    if (!data) return [];
    return data.map(({ attributes }) => (attributes.short_name));
  },
});

const FULL_TIME_TRAINING_FORM_NAME = 'Очный';
const FULL_TIME_ADDITIONAL_TITLE_TEXT = '(очно)';

const introTitle = formTrainings.value?.includes(FULL_TIME_TRAINING_FORM_NAME)
  ? `${entity?.name} ${FULL_TIME_ADDITIONAL_TITLE_TEXT}`
  : entity?.name;

const breadcrumbs = generateBreadcrumbs({ routeName, entity: entity ?? {} });

const {
  's_school_about_description': description = '',
  'intro_image': image,
} = entity.customFields;

const formTitle = 'Оставьте заявку и&nbsp;мы откроем <span class="--free-red"> бесплатный</span> доступ к&nbsp;вводной части обучения';

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: formTitle,
    formName: true,
    formPhone: true,
    actionParams: [
      {param: 'quote_id=4633'},
      {param: 'grcampaign=e_mail_chain_vpo'},
      {param: 'form=school-program'},
    ],
  });
}

useSeoMeta({
  ogImage: image,
});
</script>

<template>
  <MSection class="s-intro">
    <div class="s-intro__desc">
      <div class="s-intro__desc-inner">
        <MBreadcrumbs :breadcrumbs />
        <h1
          class="a-font_h3 s-intro__title"
          v-html="introTitle"
        />
        <p class="a-font_h6 s-intro__subtitle">
          {{ description }}
          <br>Подберите программу обучения и&nbsp;начните учиться <span class="--free-red">бесплатно</span>
        </p>
        <template v-if="showForm">
          <MQuizForm
            :action-params
            :btn="formBtn"
          />
        </template>
        <template v-else>
          <AButton @click="openForm()">
            <span>Начните бесплатно</span>
          </AButton>
        </template>
      </div>
      <div class="s-intro__promo d-md-none">
        <template v-if="formTrainings?.length">
          <ATag
            v-for="form in formTrainings"
            :key="form"
            :text="form"
            variant="white"
            font="a-font_xs-m"
            class="a-tag--blur"
          />
        </template>

        <picture class="s-intro__image">
          <AImg
            decoding="async"
            :src="image"
            :alt="entity?.name"
          />
        </picture>
      </div>
    </div>
    <div class="s-intro__promo d-none d-md-block">
      <template v-if="formTrainings?.length">
        <ATag
          v-for="form in formTrainings"
          :key="form"
          :text="form"
          variant="white"
          font="a-font_xs-m"
          class="a-tag--blur"
        />
      </template>

      <picture class="s-intro__image">
        <AImg
          decoding="async"
          :src="image"
          :alt="entity?.name"
        />
      </picture>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SSchoolProgramIntro.scss';
</style>
