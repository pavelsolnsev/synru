<script setup lang="ts">
import DefaultVideoBgLg from '~/assets/images/program/s-presentation/video_lg.webp';
import DefaultVideoBgMd from '~/assets/images/program/s-presentation/video_md.webp';
import DefaultVideoBgSm from '~/assets/images/program/s-presentation/video_sm.webp';
import DefaultFacultyIcon from '~/assets/images/program/intro/default-intro-icon.svg?url';
import type { ProgramEntity } from '~/types';

interface Props {
  entity?: ProgramEntity | null;
}

const { entity = null } = defineProps<Props>();

const { data:facultyInfo } = useFetch(`/api/programs/getFacultyByProgramId/${entity?.id}`, {
  query: {
    include: 'customFieldValues',
  },
  deep: false,
  watch: false,
  transform(res) {
    const faculty = {
      icon: null,
      presentation: null,
      preview_video: null,
      video: null,
    } as { [key: string]: string | null };

    if (!res) return faculty;

    faculty['icon'] = res.data.attributes.preview_image ?? DefaultFacultyIcon;

    if (res.included) {
      res.included.forEach((item) => {
        if (Object.hasOwn(faculty, item.attributes.name)) {
          faculty[item.attributes.name] = item.attributes.value;
        }
      });
    }

    return faculty;
  },
});
</script>

<template>
  <MSection
    v-if="facultyInfo?.presentation"
    class="s-presentation"
  >
    <MCardText
      is-big
      title="Презентация о&nbsp;факультете"
      title-class="a-font_h4"
      text="Мы собрали подробную информацию о&nbsp;факультетах, студенческой жизни и&nbsp;трудоустройстве"
      text-class="a-font_h6"
      :icons="['simple-25', 'simple-bag']"
    >
      <AButton :to="facultyInfo.presentation">
        <span>Смотреть презентацию</span>
      </AButton>
    </MCardText>
    <MVideoCard
      :image="facultyInfo?.preview_video ?? DefaultVideoBgSm"
      :image-md="facultyInfo?.preview_video ?? DefaultVideoBgMd"
      :image-lg="facultyInfo?.preview_video ?? DefaultVideoBgLg"
      :video="facultyInfo.video ?? ''"
      :tag="facultyInfo?.video ? 'Смотрите видео о Факультете' : ''"
    >
      <template
        v-if="!facultyInfo?.preview_video"
        #image
      >
        <AImg
          :src="facultyInfo.icon ?? DefaultFacultyIcon"
          class="faculty-icon"
          decoding="async"
          alt="faculty"
        />
      </template>
    </MVideoCard>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SProgramPresentation.scss';
</style>
