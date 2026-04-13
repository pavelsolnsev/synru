<script setup lang="ts">
import type { Fonts, TeacherCard } from '~/types';
import type { PersonResource } from '~/types/entities';

interface Props {
  title?: string;
  titleClass?: Fonts;
  description?: string;
  descriptionClass?: Fonts;
  tags?: { tagname: string }[];
  icons?: { iconname: string }[];
  sliderTitle?: string;
  teachers?: number[];
  routeName?: string;
}

const {
  title = '',
  titleClass = 'a-font_h4',
  description = '',
  descriptionClass = 'a-font_xl',
  tags = [],
  icons = [],
  sliderTitle = '',
  teachers: teacherIds = [],
  routeName = '',
} = defineProps<Props>();

const teacherCards: Ref<TeacherCard[] | undefined> = ref(undefined);

/**
 * Временное решение, пока нет возможности добавить учителей в админке
 */
const personsIdByRoute: Record<string, string[]> = {
  'school': ['903', '415', '854', '38', '799'],
  'business_education': ['1157', '1156', '1155', '1154', '536', '1159'],
  'yuridicheskaya_klinika': ['1184', '1206', '1187', '1207', '1185', '1208', '1186', '1209'],
};

const personsId = personsIdByRoute[routeName] ?? personsIdByRoute['school'];

const { data } = await useFetch('/api/persons', {
  query: {
    'filter[id]': personsId.join(),
    'filter[published]': true,
    'page[size]': 0,
  },
  watch: false,
  deep: false,
  transform(response): TeacherCard[] {
    return response.data.map(({ id, attributes }: PersonResource) => {
      return {
        name: [attributes.surname, attributes.name, attributes.patronymic]
          .filter((el) => !!el)
          .join(' '),
        position: attributes.regalia ?? attributes.position,
        text: attributes.regalia,
        image: attributes.photo,
        teacherId: id,
      };
    });
  },
});

teacherCards.value = data.value ?? [];

teacherCards.value = personsId
  .map((id) => {
    return teacherCards.value?.find((teacher) => teacher.teacherId === id);
  })
  .filter((teacher): teacher is TeacherCard => teacher !== undefined);

if (teacherIds.length) {
  const result = await useFetch('/api/persons', {
    query: {
      'filter[id]': teacherIds.join(),
      'filter[published]': true,
      'page[size]': 0,
    },
    watch: false,
    deep: false,
    transform(response): TeacherCard[] {
      return response.data.map(({ id, attributes }: PersonResource) => {
        return {
          name: [attributes.surname, attributes.name, attributes.patronymic]
            .filter((el) => !!el)
            .join(' '),
          position: attributes.regalia,
          text: attributes.regalia,
          image: attributes.photo,
          teacherId: id,
        };
      });
    },
  });

  teacherCards.value =
    result.data.value === null ? undefined : result.data.value;
}
</script>

<template>
  <MSection class="s-about">
    <div class="s-about__grid">
      <MCardText
        :class="routeName"
        :title
        :title-class
        :text="description"
        :text-class="descriptionClass"
        :icons="icons.map((icon) => icon.iconname)"
        :tags="tags.map((tag) => tag.tagname)"
      />
      <div
        v-if="teacherCards?.length"
        class="s-about__teachers"
      >
        <h4 class="s-about__teachers-title a-font_h4">
          {{ sliderTitle }}
        </h4>
        <MTeachersSlider
          :teachers="teacherCards"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import '../faculty/SFacultyAbout/SFacultyAbout.scss';
.s-about {
  :deep() {
    @include mobile() {
      .m-card-text__tags {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>

<style lang="scss">
.s-about__teachers {
  overflow: hidden;
  min-width: 0;

  @include desktop {
    padding: scale(24);
    border-radius: scale(16);
    background-color: var(--a-color_grey_40);
  }

  .swiper-navigation {
    top: scale(-96);
    margin-bottom: scale(48);

    .swiper-button-prev,
    .swiper-button-next {
      width: scale(48);
      height: scale(48);
      background-color: var(--a-color_white);

      &:disabled {
        background-color: var(--a-color_grey_20);
      }

      &:not(:disabled):hover {
        background-color: var(--a-color_dark);
        color: var(--a-color_white);
      }
    }
  }

  .swiper-scrollbar {
    margin-top: scale(20);
  }
}

.s-about .s-about__grid {
  .m-card-text__title.a-font_h4 + .m-card-text__text {
    margin-top: scale(16);

    @include desktop {
      margin-top: scale(16);
    }
  }

  .m-card-text.yuridicheskaya_klinika .m-card-text__icon:first-child {
    @include mobile(max) {
      display: none;
    }
  }
}
</style>
