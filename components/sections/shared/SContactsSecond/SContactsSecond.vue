<script setup lang="ts">
import { contacts } from '~/components/sections/layouts/SFooter/FooterNavigationData';
import BgImageLg from '~/assets/images/s-contacts-second/s-contacts-second-lg.webp';
import BgImageMd from '~/assets/images/s-contacts-second/s-contacts-second-md.webp';
import BgImageSm from '~/assets/images/s-contacts-second/s-contacts-second-sm.webp';

interface Props {
  title?: string;
}

const {
  title = 'Приёмная комиссия',
} = defineProps<Props>();

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    formName: false,
    formPhone: true,
    actionParams: [
      {param: 'form=contacts'}
    ],
  });
}
</script>

<template>
  <MSection
    class="s-contacts"
    :title
  >
    <div class="s-contacts__wrapper">
      <div class="s-contacts__item">
        <div class="s-contacts__item__title a-font_h5">
          Время работы:
        </div>
        <div class="s-contacts__item__times">
          <div
            v-for="time in contacts.schedules"
            :key="time.days"
            class="s-contacts__item__time"
          >
            <span
              class="a-font_m-m"
              v-html="`${time.days} ${time.opens}–${time.closes}`"
            />
          </div>
        </div>
      </div>

      <div class="s-contacts__item">
        <div class="s-contacts__item__title a-font_h5">
          Телефон
        </div>
        <div class="s-contacts__item__phones">
          <div
            v-for="phone in contacts.commonPhones"
            :key="phone"
            class="s-contacts__item__phone"
          >
            <NuxtLink :to="`tel:${$phoneToLink(phone)}`">
              <span
                class="a-font_m-m"
                v-html="phone"
              />
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="s-contacts__addresses">
        <picture
          class="s-contacts__addresses__img"
        >
          <source
            :srcset="BgImageLg"
            media="(min-width: 1200px)"
          >
          <source
            :srcset="BgImageMd"
            media="(min-width: 768px)"
          >
          <AImg
            :src="BgImageSm"
            alt="address"
            decoding="async"
            loading="lazy"
          />
        </picture>
        <div class="s-contacts__addresses__title a-font_h5">Адреса</div>
        <div
          v-for="address in contacts.address"
          :key="address.metro"
          class="s-contacts__addresses__item"
        >
          <span class="a-font_l-m">М</span>
          <span>&nbsp;</span>
          <span
            class="a-font_l-m"
            v-html="`${address.metro} ${address.city}  ${address.address}`"
          />
        </div>

        <AButton @click="openForm()">
          Подать заявку
        </AButton>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SContactsSecond.scss';
</style>
