<script setup lang="ts">
import type { TeacherCard } from '~/types';

const {
  name = '',
  image = '',
  position = '',
  text = '',
  contacts = '',
} = defineProps<TeacherCard>();

const { openModal } = useModalStore();

function openTeacherModal() {
  openModal('MTeacherModal', {
    name: name,
    image: image,
    text: text,
  });
}
</script>

<template>
  <div class="m-teacher-card a-font_l-m">
    <picture
      v-if="image"
      class="m-teacher-card__img"
    >
      <AImg
        :src="image"
        :alt="name"
        width="128"
        height="172"
        decoding="async"
        loading="lazy"
      />
    </picture>
    <div class="m-teacher-card__wrap">
      <div
        class="m-teacher-card__name a-font_h5"
        v-html="name"
      />
      <div
        v-if="position || name"
        class="m-teacher-card__position"
        :class="{ '--popup': text }"
        v-html="position"
      />
      <div
        v-if="contacts"
        class="m-teacher-card__text"
        v-html="contacts"
      />
      <AButtonSecond
        v-if="text"
        bg-color="transparent"
        @click="openTeacherModal()"
      >
        <span>Узнать больше</span>
      </AButtonSecond>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MTeacherCard.scss';
</style>
