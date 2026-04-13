<script setup lang="ts">
import ContentImage from '~/assets/images/s_about/rounds.webp';
import { useWindowSize } from '@vueuse/core';

interface Props {
  title?: string;
  text?: string;
  tags?: Array<{ tag: string }>;
  icons?: Array<{ icon: string }>;
  items?: Array<{
    title?: string;
    text?: string;
    classname?: string;
    image?: string;
    imageLg?: string;
    imageMd?: string;
  }>;
}

const {
  title = '',
  text = '',
  icons = [],
  tags = [],
  items = [],
} = defineProps<Props>();

const { width: windowWidth } = useWindowSize();

const isInitSwiper = computed(() => windowWidth.value > 768);

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    formName: true,
    formPhone: true,
    actionParams: [
      {param: 'form=main_about'}
    ],
  });
}
</script>

<template>
  <SAbout
    :title
    :text
    :icons
    :tags
    :items
    :is-init-swiper
  >
    <div class="s-about__block-content">
      <AButton
        size="lg"
        class="a-font_l-m"
        @click="openForm()"
      >
        Хочу поступить
      </AButton>
      <AImg
        :src="ContentImage"
        alt="about"
        decoding="async"
        width="80"
        height="32"
      />
    </div>
    <MModalForm
      id="about_modal"
      form-name
      form-phone
      :action-params="[
        {param: 'form=main_about'}
      ]"
    />
  </SAbout>
</template>

<style lang="scss" scoped>
@import './SAboutAbout.scss';
</style>
