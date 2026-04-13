<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import type { SectionConditionalGroup } from '~/types';

interface Props {
  title?: string;
  subtitle?: string;
  text?: string;
  isBtn?: boolean;
  btnText?: string;
  formTitle?: string;
  images?: { image: string }[];
  slides?: { title: string; text: string; }[];
  routeName?: string;
  conditionalGroup?: SectionConditionalGroup[];
  entity?: { id: number, url: string, properties?: { external_id?: string, price?: number, currency?: string, is_express?: boolean, } }
}

const {
  title = 'Гарантия трудоустройства',
  subtitle = '',
  text = 'Образование в&nbsp;колледже строится от&nbsp;запросов работодателей. <br><br>Мы привлекаем индустриальных партнёров из&nbsp;числа ведущих российских компаний к&nbsp;составлению программ и&nbsp;преподаванию, поэтому учим тому, что&nbsp;прямо сейчас востребовано на&nbsp;рынке труда. <br><br>Уверенность в&nbsp;качестве нашего образования мы подтверждаем юридически&nbsp;— гарантия трудоустройства зафиксирована в&nbsp;договоре.',
  isBtn = false,
  btnText = 'Узнать средний балл аттестата для&nbsp;поступления',
  formTitle = 'Узнайте средний балл аттестата для&nbsp;поступления, оставив заявку',
  routeName = '',
  images = [],
  slides = [],
  conditionalGroup = [],
  entity,
} = defineProps<Props>();

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });

const {
  external_id: externalId = null,
  price = 0,
  currency = '',
  is_express,
} = entity?.properties || {};

const hasPriceInfo = (externalId && price && currency) || is_express;

const isChildDirection = entity?.url.includes('detiam');

const {
  swiperConfig,
} = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
});

const imageDef = [
  { image: '/img/SEmploymentGuarantee/s-employment-guarantee_sm.webp' },
  { image: '/img/SEmploymentGuarantee/s-employment-guarantee_md.webp' },
  { image: '/img/SEmploymentGuarantee/s-employment-guarantee_lg.webp' },
];

const slidesDef = [{
  title: 'Сопровождение',
  text: 'Персональные консультации, тренинги, практикумы, вебинары и&nbsp;сопровождение до&nbsp;трудоустройства',
}, {
  title: 'Cотрудничество',
  text: '300+ ведущих компаний сотрудничают с&nbsp;Центром карьеры',
}, {
  title: 'Экспертиза',
  text: '<span class="nobr">HR-специалисты,</span> знающие все тонкости поиска и&nbsp;приёма на&nbsp;работу соискателей',
}, {
  title: 'Преимущество',
  text: 'Доступ к&nbsp;горячим вакансиям наших партнёров',
}];

const items = slides.length ? slides : slidesDef;
const pictureImages = images.length ? images : imageDef;

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: formTitle,
    btn: 'Отправить',
    formName: true,
    formPhone: true,
    actionParams: [{param: 'form=garantija_k'}],
    routeName: routeName,
  });
}
</script>

<template>
  <MSection
    v-if="showSection && !hasPriceInfo && !isChildDirection"
    class="s-employment-guarantee"
  >
    <div class="s-employment-guarantee__text">
      <h2
        class="a-font_h4 s-employment-guarantee__title"
        v-html="title"
      />
      <p
        v-if="subtitle"
        class="a-font_h5 s-employment-guarantee__subtitle"
        v-html="subtitle"
      />
      <div
        v-if="text"
        class="a-font_xl-m s-employment-guarantee__desc"
        v-html="text"
      />
      <AButton
        v-if="isBtn"
        @click="openForm()"
      >
        <span v-html="btnText" />
      </AButton>
    </div>

    <div class="s-employment-guarantee__banner">
      <picture>
        <source
          media="(min-width: 1200px)"
          :srcset="pictureImages[2].image"
        >
        <source
          media="(min-width: 768px)"
          :srcset="pictureImages[1].image"
        >
        <AImg
          :src="pictureImages[0].image"
          :alt="title"
          decoding="async"
          loading="lazy"
        />
      </picture>
      <p class="a-font_xl-m s-employment-guarantee__banner-text">85% студентов и&nbsp;выпускников получили оффер <br>в&nbsp;первые месяцы поиска работы через&nbsp;наш Центр карьеры</p>
    </div>

    <div class="s-employment-guarantee__slider">
      <Swiper v-bind="swiperConfig">
        <SwiperSlide
          v-for="(item,idx) in items"
          :key="item.title"
          class="s-employment-guarantee__slide"
        >
          <p
            class="a-font_h5"
            v-html="item.title"
          />
          <p
            class="a-font_s-m s-employment-guarantee__slide-text"
            v-html="item.text"
          />
          <AImg
            :src="`/img/SEmploymentGuarantee/icon${idx + 1}.svg`"
            :alt="item.title"
            loading="lazy"
            decoding="async"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SEmploymentGuarantee.scss';
</style>
