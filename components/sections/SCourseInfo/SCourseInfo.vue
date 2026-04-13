<script setup lang='ts'>
import type { CourseEntity, Nullable } from '~/types';
import { synergyApi } from '~/utils/mediaCdn';

interface Props {
  hasEntity?: boolean;
  entity?: Nullable<CourseEntity>;
}

const {
  entity = null,
} = defineProps<Props>();

const {
  course_triggers = [],
  course_earnings = [],
  course_intro = [],
  average_salary = [],
  what_learn: benefitsLearning = [],
} = entity?.customFields ?? {};

const {
  external_id: externalId = null,
  price = 0,
  currency = '',
  is_express,
} = entity?.properties || {};

const hasPriceInfo = (externalId && price && currency) || is_express;

const tools = (course_intro[0]?.tools?.split(', ') || [])
  .map((tool) => {
    return {
      name: tool,
      icon: tool.trim().toLowerCase().replace(/\s+/g, '_'),
    };
  });

const skillsTitle = computed(() => {
  return course_triggers[0]?.skills_title || 'Вы научитесь всем необходимым знаниям и навыкам';
});

const averageSalaryText = computed(() => {
  return average_salary[0]?.text || 'Средняя зарплата';
});

const title = computed(() => {
  return average_salary[0]?.title || entity?.name;
});
</script>

<template>
  <MSection class="s-course-info">
    <div
      v-if="!hasPriceInfo"
      class="s-course-info__block"
    >
      <h2
        v-if="title"
        class="a-font_h4"
        v-html="title"
      />
      <div class="s-course-info__desc">
        <div class="s-course-info__desc-item --logo a-font_xl-m">
          <div
            v-if="entity?.annotation"
            v-html="entity?.annotation"
          />
          <div
            v-if="course_triggers[0]?.course_icon"
            class="s-course-info__desc-item-img"
          >
            <AImg
              :src="course_triggers[0]?.course_icon"
              alt=""
              decoding="async"
            />
          </div>
        </div>
        <div
          v-if="average_salary[0]?.salary"
          class="s-course-info__desc-item --price"
        >
          <p
            class="a-font_h3 s-course-info__desc-item-price"
            v-html="average_salary[0]?.salary"
          />
          <p
            class="a-font_h6"
            v-html="averageSalaryText"
          />
        </div>
      </div>
    </div>

    <div class="s-course-info__block a-font_l-m">
      <h2
        class="a-font_h4"
        v-html="skillsTitle"
      />
      <div class="s-course-info__info">
        <picture
          v-if="entity?.image"
          class="s-course-info__info-item --image"
        >
          <AImg
            :src="entity?.image"
            alt="Изображение курса"
            decoding="async"
          />
        </picture>
        <div
          v-if="entity?.annotation && hasPriceInfo"
          class="s-course-info__info-item --annotation a-font_h6"
          v-html="entity?.annotation"
        />
        <div
          v-if="benefitsLearning?.length"
          class="s-course-info__info-item"
        >
          <p class="a-font_xl-m --title">Профессиональные навыки</p>
          <ul class="s-course-info__skills-list">
            <li
              v-for="value in benefitsLearning"
              :key="value.title!"
              v-html="value.title"
            />
          </ul>
        </div>
        <div
          v-if="tools?.length"
          class="s-course-info__info-item --tools"
        >
          <p class="a-font_xl-m --title">Инструменты</p>
          <ul class="s-course-info__list-tag a-font_s-m">
            <li
              v-for="item in tools"
              :key="item.name"
            >
              <AImg
                :src="synergyApi(`uploads/tools/${item.icon}.webp`)"
                :alt="item.name"
                decoding="async"
              />
              <p v-html="item.name" />
            </li>
          </ul>
        </div>
        <div
          v-if="course_triggers[0]?.soft_skills?.length"
          class="s-course-info__info-item --soft-skills"
        >
          <p class="a-font_xl-m --title">Гибкие навыки</p>
          <ul class="s-course-info__list-tag a-font_s-m">
            <li
              v-for="value in course_triggers[0]?.soft_skills"
              :key="value.title"
              v-html="value.title"
            />
          </ul>
        </div>
      </div>
    </div>

    <div
      v-if="course_earnings[0]?.careers?.length"
      class="s-course-info__block"
    >
      <h2
        class="a-font_h4"
        v-html="course_earnings[0]?.title"
      />
      <div class="s-course-info__prices">
        <div
          v-for="(value, idx) in course_earnings[0]?.careers"
          :key="value.price"
          class="s-course-info__prices-item"
        >
          <p
            v-if="value.tag"
            class="a-font_s-m s-course-info__prices-tag"
            v-html="value.tag"
          />
          <p
            class="a-font_h3 s-course-info__prices-item-title"
            v-html="value.price"
          />
          <div
            class="s-course-info__prices-info"
            :style="`--height: ${idx*40}px`"
          >
            <AImg
              v-if="idx"
              :src="`/img/courses/earnings_${idx}.webp`"
              :alt="value.level"
              decoding="async"
            />
            <div
              v-if="!idx"
              class="s-course-info__prices-item-flag a-font_m-m"
            >
              Оплачиваемая<br>стажировка
            </div>
            <p
              v-if="value.title"
              class="a-font_h6"
              v-html="value.title"
            />
            <div>
              <span
                v-if="value.level"
                class="a-font_l-m s-course-info__prices-level"
                v-html="value.level"
              />
              <span
                v-if="value.experience"
                class="a-font_l-m s-course-info__prices-exp"
                v-html="value.experience"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SCourseInfo.scss';
</style>
