<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, FreeMode } from 'swiper/modules';
import Line from '~/assets/images/s_admission_campaign/line.svg?url';
import BgImg from '~/assets/images/s_admission_campaign/bg.webp';
import { admissionCampaignItems } from './admissionCampaignData';

const route = useRoute();

const baseParams = [
  { param:'form=admission-form' },
];

// TODO: Проверка роута для А/Б теста приемной комиссии

const actionParams: ComputedRef<{ param: string }[]> = computed(() => getAbTestActionParams(baseParams, route.path));

const { openModal } = useModalStore();

const modalProps = {
  title: "Оставить заявку на обучение",
  formName: true,
  formPhone: true,
  actionParams: actionParams,
};
</script>

<template>
  <MSection
    class="s-admission-campaign"
    :title="`Приёмная кампания ${new Date().getFullYear()}`"
  >
    <div class="s-admission-campaign__list">
      <MCardText
        :icons="['simple-hat', 'simple-calendar']"
        :bg-image="Line"
      >
        <template #title>
          У&nbsp;нас можно учиться очно и&nbsp;дистанционно, из любой точки мира. 
          
          <AButton
            type="button"
            size="lg"
            @click="openModal('MModalForm', modalProps)"
          >
            <span class="a-font_h4">Узнайте</span>
          </AButton>
          
          о&nbsp;правилах поступления и&nbsp;доступных программах.
        </template>
      </MCardText>
      <AImg
        class="s-admission-campaign__list-bg"
        loading="lazy"
        :src="BgImg"
        alt="Приёмная кампания"
        decoding="async"
      />
      <div
        class="s-admission-campaign__slider"
      >
        <swiper
          :modules="[Autoplay, FreeMode]"
          :grab-cursor="true"
          :slides-per-view="'auto'"
          space-between="20"
          direction="horizontal"
          :loop="false"
          :autoplay="true"
          :speed="5000"
          :free-mode="true"
          :breakpoints="{
            0: {
              autoplay: false,
              speed: 1000,
            },
            768: {
              spaceBetween: 20,
              autoplay: false,
              speed: 1000,
            },
            1200: {
              loop: true,
              autoplay: {
                delay: 0,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
              },
              direction: 'vertical',
              spaceBetween: 20,
              speed: 5000,
            },
          }"
        >
          <swiper-slide
            v-for="item in admissionCampaignItems"
            :key="item.text"
            class="s-admission-campaign__card"
          >
            <span
              class="s-admission-campaign__card-title a-font_h5"
              v-html="item.text"
            />
            <span
              v-if="item.desc"
              class="s-admission-campaign__card-desc a-font_l-m"
              v-html="item.desc"
            />
            <AImg
              :src="item.image"
              :alt="item.text"
              class="s-admission-campaign__card-img"
              loading="lazy"
              decoding="async"
            />
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <MModalForm
      id="admission-campaign"
      title="Оставить заявку на обучение"
      form-name
      form-phone
      :action-params
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SAdmissionCampaign.scss';
</style>