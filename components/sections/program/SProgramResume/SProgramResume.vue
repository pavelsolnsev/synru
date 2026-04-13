<script setup lang="ts">
import type { ProgramEntity, ProgramCustomField } from '~/types';
import DefaultResumeImage from '~/assets/images/program/resume/resume-photo.webp';

interface Props {
  entity: ProgramEntity | null;
}

type Resume = ProgramCustomField['full_resume'][0];

const { entity = null } = defineProps<Props>();

const { full_resume = [] } = entity?.customFields ?? {};

const resume = full_resume[0] && full_resume[0].skills.length
  ? formatFullResume(full_resume[0])
  : null;

function formatFullResume(fullResume: Resume) {
  const resume = {
    title: fullResume.title ?? '',
    photo: DefaultResumeImage,
    name: fullResume.name || 'Артём Сергеевич',
    skills: fullResume.skills ?? [],
    education: {
      title: fullResume.education_university,
      description: fullResume.education_faculty,
      text: fullResume.education_text,
    },
    experience: fullResume.experience ?? [],
    achievements: fullResume.achievements ?? [],
  };

  return resume;
}

function isSmallTextExperience(experience: string | null, index: number) {
  if (!experience || !resume) return false;

  const CITY_ABBREVIATION = 'г.';
  const experienceListLength = resume.experience.length;

  return experience.includes(CITY_ABBREVIATION) && index === experienceListLength - 1;
}
</script>

<template>
  <MSection
    v-if="resume"
    class="s-resume"
    title="Пример вашего будущего резюме"
  >
    <div class="s-resume__wrap">
      <div class="s-resume__container">
        <div class="s-resume__item --name">
          <AImg
            :src="resume.photo"
            alt="resume"
            class="lazy"
            :data-src="DefaultResumeImage"
          />
          <div>
            <p
              class="s-resume__item-name a-font_h6"
              v-html="resume.name"
            />
            <p
              v-if="resume.title"
              class="s-resume__item-title a-font_l-m"
            >
              Должность
            </p>
            <p
              v-if="resume.title"
              class="s-resume__item-text a-font_xl-m"
              v-html="resume.title"
            />
          </div>
        </div>

        <div
          v-if="resume.skills.length"
          class="s-resume__item --skills"
        >
          <p class="s-resume__item-title a-font_l-m">
            Навыки
          </p>
          <ul class="s-resume__item-tags a-font_l-m">
            <li
              v-for="{ skill }, index in resume.skills"
              :key="index"
              v-html="skill"
            />
          </ul>
        </div>
      </div>

      <div class="s-resume__content">
        <div
          v-if="resume.education.title || resume.education.description"
          class="s-resume__item"
        >
          <p class="s-resume__item-title a-font_l-m">
            Образование
          </p>
          <p
            v-if="resume.education.title"
            class="s-resume__item-text a-font_xl-m"
            v-html="resume.education.title"
          />
          <p
            v-if="resume.education.description"
            class="s-resume__item-text a-font_s-m"
            v-html="resume.education.description"
          />
          <div
            v-if="resume.education.text"
            v-html="resume.education.text"
          />
        </div>

        <div
          v-if="resume.experience.length"
          class="s-resume__item"
        >
          <p class="s-resume__item-title a-font_l-m">
            Опыт работы
          </p>
          <div
            v-for="{ experience_item }, index in resume.experience"
            :key="index"
            class="s-resume__item-list"
          >
            <p
              class="s-resume__item-text"
              :class="isSmallTextExperience(experience_item, index) ? 'a-font_s-m' : 'a-font_xl-m'"
              v-html="experience_item"
            />
          </div>
        </div>

        <div
          v-if="resume.achievements.length"
          class="s-resume__item"
        >
          <p class="s-resume__item-title a-font_l-m">
            Награды и&nbsp;достижения
          </p>
          <div
            v-for="{ achievement_item }, index in resume.achievements"
            :key="index"
            class="s-resume__item-list"
          >
            <p
              class="s-resume__item-text a-font_xl-m"
              v-html="achievement_item"
            />
          </div>
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SProgramResume.scss';
</style>
