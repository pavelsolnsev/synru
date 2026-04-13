<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import IMAGE from '~/assets/images/franchises/rounds.webp';

interface Props {
  title?: string;
  text?: string;
  tags?: Tag[];
  buttonText?: string;
  factoids?: Item[];
}

interface Item {
  title?: string;
  text?: string;
  classname?: string;
  imageLg?: string;
  imageMd?: string;
  image?: string;
}

interface Tag {
  tag: string;
}

const {
  buttonText = '',
  tags = [],
  text = '',
  title = '',
  factoids = [],
} = defineProps<Props>();

const mapTags = tags.reduce((acc, item) => {
  acc.push(item.tag);
  return acc;
}, [] as string[]);

const swiperConfig = {
  grabCursor: true,
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
};

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Заполните форму и наш менеджер свяжется с вами',
    formName: true,
    formPhone: true,
    actionParams: [
      {param: 'form=franchises_about'}
    ],
  });
}
</script>

<template>
  <MSection class="s-about">
    <div class="s-about__grid">
      <MCardText
        title-class="a-font_h4"
        text-class="a-font_h6"
        tag-class="a-font_m-m"
        :title
        :text
        :tags="mapTags"
      >
        <div class="s-about__block-content">
          <AButton
            v-if="buttonText"
            class="a-btn a-btn--primary a-btn--red a-btn--lg a-font_l-m"
            @click="openForm()"
          >
            {{ buttonText }}
          </AButton>
          <AImg
            :src="IMAGE"
            alt=""
            decoding="async"
            width="80"
            height="32"
          />
        </div>
      </MCardText>

      <swiper
        v-if="factoids.length"
        class="s-about__slider"
        v-bind="swiperConfig"
        slides-per-view="auto"
      >
        <swiper-slide
          v-for="item in factoids"
          :key="item.title"
          class="swiper-slide"
        >
          <div
            class="s-about__card"
            :class="item.classname"
          >
            <span
              class="s-about__card-title a-font_h3"
              v-html="item.title"
            />
            <span
              class="s-about__card-text a-font_slider-text"
              v-html="item.text"
            />
            <picture class="s-about__card-img">
              <source
                v-if="item.imageLg"
                :srcset="item.imageLg"
                media="(min-width: 1200px)"
              >
              <source
                v-if="item.imageMd"
                :srcset="item.imageMd"
                media="(min-width: 768px)"
              >
              <AImg
                :src="item.image"
                :alt="item.title"
              />
            </picture>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import '../../shared/SAbout/SAbout.scss';
@import './SFranchisesAbout.scss';
</style>
