<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';
import { Fancybox } from '@fancyapps/ui';
import { ROUTES } from '~/constants';
import type {
  TopLevelLinksObject,
  DocumentMetaObject,
} from '~/types';
import type { SchoolProgramResource, Entity, FormResource } from '~/types/entities';

const staticCard = {
  content: '<ul><li>Онлайн-занятия с ведущими экспертами ОГЭ и ЕГЭ</li><li>Домашние задания, теория, интерактивные тесты и тренажеры на одной платформе</li><li>Еженедельная проверка прогресса на симуляторе реального экзамена</li><li>Наставник-эксперт по каждому предмету и персональный куратор</li><li>Бесплатные вебинары с психологом и профориентологом</li></ul>',
  forms: ['Онлайн'],
  id: '3',
  preview: synergyApi('uploads/content/banners/level_school_program_3.webp'),
  title : 'Подготовка к ОГЭ и ЕГЭ',
  url : '/school/podgotovka',
};

const { data: schoolPrograms } = await useFetch('/api/schoolPrograms', {
  watch: false,
  deep: false,
  query: {
    include: 'forms,customFieldValues',
    'filter[published]': true,
    'page[size]': 0,
  },
  transform: ({ data, included }: {
    data: SchoolProgramResource[];
    included: Entity[];
    links: TopLevelLinksObject;
    meta: DocumentMetaObject;
  }) => {
    if (!data) return [];

    const forms = included.filter((item) => item.type === 'forms').map((form) => ({ id: form.id, name: form.attributes.short_name }));

    return data.map(({ id, attributes, relationships }) => {
      const { intro_image = '' } = mapCustomFields(attributes.custom_field_values);

      const relationshipsFormIds = relationships.forms.data.map((form: FormResource) => form.id);

      return {
        id,
        title: attributes.name,
        content: attributes.content,
        url: ROUTES.SCHOOL + '/' + attributes.slug,
        preview: intro_image,
        forms: forms.filter((form) => relationshipsFormIds.includes(+form.id)).map((form) => form.name),
      };
    });
  },
});

const allPrograms = computed(() => {
  const apiData = schoolPrograms.value || [];
  return [staticCard, ...apiData].sort((a, b) => parseInt(a.id) - parseInt(b.id));
});

const popupForm = ref('');
const popupTitle = ref('');
const popupContent = ref('');
const popupImage = ref('');

let popupFormElement: null | HTMLFormElement = null;

const actionParams = shallowRef<{ param: string }[]>([
  { param: 'grcampaign=e_mail_chain_vpo' },
  { param: 'form=school-program--' },
]);


onMounted(() => {
  const findPopupForm: HTMLFormElement | null = document.querySelector('.s-programs #s-programs__popup form');
  if (findPopupForm) popupFormElement = findPopupForm;
});

function open(id: string) {
  const selectedSchoolProgram = allPrograms.value?.find((item) => item.id === id);

  if (!selectedSchoolProgram) {
    console.error('School program not found');
    return;
  };

  popupForm.value = selectedSchoolProgram.forms.at(0) || '';
  popupTitle.value = selectedSchoolProgram.title;
  popupContent.value = selectedSchoolProgram.content;
  popupImage.value = selectedSchoolProgram.preview;

  Fancybox.show([
    {
      src: '#s-programs__popup',
    },
  ], {
    mainClass: 's-programs-list-fancy',
    hideScrollbar: true,
    dragToClose: false,
  },
  );

  changeFormActionParameter();
}

function changeFormActionParameter() {
  if (!popupFormElement) return;

  const url = new URL(popupFormElement.action);
  if (!url) return;

  const imageName = getPopupImageName(popupImage.value);

  if (!imageName) return;
  url.searchParams.set('form', `school-program--${imageName}`);

  popupFormElement.action = url.toString();

  actionParams.value = actionParams.value.filter((param) => !param.param.startsWith('form='));

  actionParams.value = [
    ...actionParams.value,
    { param: `form=school-program--${imageName}` },
  ];

}

function getPopupImageName(imageUrl: string) {
  if (!imageUrl) return null;

  const parts = imageUrl.split('/');

  const file = parts.pop();

  if (!file) return null;

  const nameParts = file.split('.');

  const imageName = nameParts[0];
  return imageName;
}
</script>

<template>
  <MSection
    title="Программы обучения"
    class="s-programs"
  >
    <div class="s-programs__grid">
      <div
        v-for="(item) in allPrograms"
        :key="item.id"
        class="specialty-card"
      >
        <NuxtLink :to="item.url">
          <div class="specialty-card__inner">
            <div class="specialty-card__top">
              <div class="specialty-card__breadcrumb a-font_m-m">
                <span class="specialty-card__note">Школа</span>
                <span
                  v-if="item.forms.length"
                  class="specialty-card__label"
                >{{ item.forms.at(0) }}</span>
              </div>
            </div>
            <div class="specialty-card__content">
              <span
                :to="item.url"
                class="specialty-card__title a-font_h5"
                v-html="item.title"
              />
            </div>
            <div class="specialty-card__bottom">
              <AButton
                size="md"
                class="specialty-card__apply"
                @click.prevent="open(item.id)"
              >
                <span>Поступить</span>
              </AButton>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>


    <div
      id="s-programs__popup"
      class="s-programs__popup"
      style="display: none"
    >
      <picture class="s-programs__popup-img">
        <AImg
          :src="popupImage"
          alt=""
        />
      </picture>
      <div class="s-programs__popup-inner">
        <div class="s-programs__popup-info a-font_m-m">Школа / {{ popupForm }}</div>
        <div class="s-programs__popup-name a-font_h5"> {{ popupTitle }}</div>
        <div
          class="s-programs__popup-text a-font_l"
          v-html="popupContent"
        />
      </div>
      <MForm
        title-class="a-font_h5"
        title="Начните учиться бесплатно"
        subtitle=""
        btn="Начните бесплатно"
        bg-color="grey_20"
        :action-params
      />
      <button
        class="s-programs__popup-close a-font_xs-m"
        @click="Fancybox.close();"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="9"
            fill="none"
            viewBox="0 0 6 9"
          >
            <path
              fill="#1C1C1C"
              d="M4.946.018 0 4.018l4.946 4L6 7.165 2.108 4.018 6 .87 4.946.018Z"
            />
          </svg>
        </span>
        <span>Вернуться</span>
      </button>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SPrograms.scss';
</style>

<style lang="scss">
.s-programs__popup {
  .m-form {

    height: auto;
    margin: scale(-32) 0 0;
    padding: scale(12);
    border-radius: scale(16) scale(16) 0 0;

    @include tablet(min) {
      margin: scale(-32) 0 scale(12);
      padding: scale(24) scale(10);
      border-radius: scale(16);
    }

    @include desktop(min) {
      margin: scale(8) scale(24) scale(24);
      padding: scale(24);
    }

    &__title {
      @include desktop(min) {
        margin: 0 0 scale(24);
      }
    }

    &__content {
      @include mobile(max) {
        margin: 0 0 scale(20);
      }

      @include tablet(min) {
        display: flex;
        margin: 0 0 scale(24);
      }
    }

    .a-input {
      @include mobile(max) {
        height: scale(40);
        padding: 0 scale(12);
        border-radius: scale(8);
      }
    }
  }
}
@media only screen and (min-width: 0) {
  .fancybox__container.s-programs-list-fancy {
    z-index: 8000 !important;
  }

  .s-programs-list-fancy .fancybox__slide {
    padding-top: calc(var(--scale) * 120) !important;
  }

  html:not(.--visible-nav) .s-programs-list-fancy .fancybox__slide {
    padding-top: calc(var(--scale) * 56) !important;
  }
}
</style>
