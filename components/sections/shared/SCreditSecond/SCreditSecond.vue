<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';
import { Swiper } from 'swiper/vue';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import { CREDIT_PRICES } from '~/constants/creditPrices';
import { ROUTES } from '~/constants';

interface Props {
  isShowPopup?: boolean;
}

interface Cost {
  tag: string;
  title: string;
  value: string;
  text: string;
}

const {
  isShowPopup = false,
} = defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
}  = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
});

const CreditImageLg = synergyApi('uploads/content/s-credit-second/credit_2_2_lg.webp');
const CreditImageMd = synergyApi('uploads/content/s-credit-second/credit_2_2_md.webp');
const CreditImageSm = synergyApi('uploads/content/s-credit-second/credit_2_2_sm.webp');
const PrecentImage = synergyApi('uploads/content/s-credit-second/precent_2.webp');
const RhinoImage = synergyApi('uploads/content/s-credit-second/rhino_2.webp');

const modalTitle = shallowRef('');
const modalText = shallowRef('');

const { openModal } = useModalStore();
const modalProps = {
  title: "Узнать условия кредита",
  formName: true,
  formPhone: true,
  actionParams: [
    {param: 'grcampaign=e_mail_chain_vpo'},
    {param: 'form=credit'},
  ],
};

function showModal(item: Cost) {
  modalTitle.value = item.tag;
  modalText.value = item.text;

  openModal('MCreditModal', {
    title: modalTitle,
    text: modalText,
  });
};
</script>

<template>
  <MSection class="s-credit-2">
    <div class="s-credit-2__banner">
      <picture class="s-credit-2__banner-pic">
        <source
          :srcset="CreditImageLg"
          media="(min-width: 1200px)"
        >
        <source
          :srcset="CreditImageMd"
          media="(min-width: 768px)"
        >
        <AImg
          :src="CreditImageSm"
          alt="credit"
          decoding="async"
          loading="lazy"
          width="336"
          height="224"
        />
      </picture>
      <div class="s-credit-2__banner-bg">
        <span class="s-credit-2__banner-bg-precent">
          <AImg
            :src="PrecentImage"
            alt="precent"
            decoding="async"
            loading="lazy"
            width="336"
            height="224"
          />
        </span>
        <span class="s-credit-2__banner-bg-rhino">
          <AImg
            :src="RhinoImage"
            alt="rhino"
            decoding="async"
            loading="lazy"
            width="336"
            height="224"
          />
        </span>
      </div>
      <div class="s-credit-2__desc">
        <h3 class="s-credit-2__title a-font_h3">
          Кредит на&nbsp;образование
        </h3>
        <div class="s-credit-2__desc-main">
          <p class="a-font_h6">Если хочешь учиться у нас, но&nbsp;боишься не&nbsp;пройти на&nbsp;бюджет, мы поможем получить выгодный кредит с&nbsp;господдержкой всего под&nbsp;3%</p>
          <p class="a-font_xl-m">Твой ежемесячный платёж за&nbsp;учёбу будет не&nbsp;больше стоимости подписки на&nbsp;музыку или&nbsp;кино.</p>
        </div>
        <AButton
          v-if="isShowPopup"
          bg-color="black"
          @click="openModal('MModalForm', modalProps)"
        >
          <span>Мне интересно</span>
        </AButton>
        <AButton
          v-else
          bg-color="black"
          :to="ROUTES.CREDIT"
        >
          <span>Мне интересно</span>
        </AButton>
      </div>
    </div>
    <div class="s-credit-2__prices">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <template #wrapper-start>
          <MCardTagTitle
            v-for="item in CREDIT_PRICES"
            :key="item.title"
            class="swiper-slide"
            :tag="item.tag"
            tag-type="black"
            tag-font-size="a-font_m-m"
            :title="item.title"
            title-class="a-font_h5"
            @click="showModal(item)"
          >
            <ACardCheck />
          </MCardTagTitle>
        </template>
      </swiper>
    </div>
    <AButton
      v-if="isShowPopup"
      class="s-credit-2__prices__bottom-btn"
      bg-color="black"
      @click="openModal('MModalForm', modalProps)"
    >
      <span>Мне интересно</span>
    </AButton>
    <AButton
      v-else
      class="s-credit-2__bottom-btn"
      bg-color="black"
      :to="ROUTES.CREDIT"
    >
      <span>Мне интересно</span>
    </AButton>
    
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCreditSecond.scss';
</style>
