<script setup lang="ts">
import type { TeacherCard } from '~/types';
import type { LocationQueryValue } from 'vue-router';

interface Entity {
  id: string,
  description: string,
  custom_field_values?: unknown[];
}

interface Props {
  hasEntity?: boolean;
  entity: Entity;
}

const {
  entity,
} = defineProps<Props>();

const teachers: Ref<TeacherCard[]> = ref([]);

const route = useRoute();

type FacultyAbout<T> = (T extends LocationQueryValue[] ? T[0] : LocationQueryValue) extends null ? never : string;

const title: FacultyAbout<typeof route.query.about_title> = route.query.about_title
  ? (Array.isArray(route.query.about_title) ? route.query.about_title[0] : route.query.about_title) || 'Об Университете'
  : 'О факультете';

const text: FacultyAbout<typeof route.query.about_text> = route.query.about_text
  ? (Array.isArray(route.query.about_text) ? route.query.about_text[0] : route.query.about_text) || entity.description
  : entity.description;

const result = await useFetch(`/api/faculties/${entity.id}/persons?page[size]=0`, {
  watch: false,
  deep: false,
  transform(response): TeacherCard[] {
    if (!response) return [];

    return response.data.map(({ id, attributes }) => {
      return {
        name: [attributes.surname, attributes.name, attributes.patronymic].filter((el) => !!el).join(' '),
        position: attributes.regalia,
        text: attributes.regalia,
        image: attributes.photo,
        teacherId: id,
      };
    });
  },
});

teachers.value = result.data.value === null ? [] : result.data.value;
</script>

<template>
  <MSection class="s-about">
    <div class="s-about__grid">
      <MCardText
        :title
        title-class="a-font_h4"
        :text
        text-class="a-font_xl"
        :icons="['simple-university', 'simple-hat']"
      />
      <div
        v-if="teachers?.length"
        class="s-about__teachers"
      >
        <h4 class="s-about__teachers-title a-font_h4">
          Ведущие преподаватели
        </h4>
        <MTeachersSlider
          :teachers
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SFacultyAbout.scss';
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
  .m-card-text__title.a-font_h4+.m-card-text__text {
    margin-top: scale(16);

    @include desktop {
      margin-top: scale(16);
    }
  }
}
</style>
