<script setup lang="ts">
import type { SchoolProgramEntity } from '~/types';

interface Props {
  title?: string;
  description?: string;
  tag?: string;
  buttonText?: string;
  imageLg?: string;
  imageMd?: string;
  imageSm: string;
  actionParams: { param: string }[];
  hasEntity?: boolean;
  entity: SchoolProgramEntity | null;
}

const {
  title = 'Каждый год&nbsp;мы <br>выпускаем больше 1000&nbsp;довольных учеников',
  description = 'Наши выпускники поступают на&nbsp;бюджет <br>в&nbsp;ведущие вузы страны',
  tag = '',
  buttonText = 'Узнать больше',
  imageLg = '',
  imageMd = '',
  imageSm = '',
  actionParams = [],
} = defineProps<Props>();

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Поступить в&nbsp;школу',
    formName: true,
    formPhone: true,
    actionParams: actionParams,
  });
}
</script>

<template>
  <MSection class="s-school-graduates">
    <div class="s-school-graduates__grid">
      <MCardText
        :title
        :text="description"
        title-class="a-font_h3"
        text-class="a-font_h6"
      >
        <AButton
          bg-color="black"
          @click="openForm()"
        >
          <span>
            {{ buttonText }}
          </span>
        </AButton>
      </MCardText>

      <div class="s-school-graduates__banner">
        <ATag
          v-if="tag"
          :text="tag"
          variant="white"
          class="a-tag--blur"
        />
        <picture class="s-intro__bg">
          <source
            v-if="imageLg"
            :srcset="imageLg"
            media="(min-width: 1200px)"
          >
          <source
            v-if="imageMd"
            :srcset="imageMd"
            media="(min-width: 768px)"
          >
          <AImg
            :src="imageSm"
            alt="faculty"
          />
        </picture>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SSchoolGraduates.scss';
</style>
