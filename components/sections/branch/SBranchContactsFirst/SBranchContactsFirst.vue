<script setup lang="ts">
import MapImgSm from '~/assets/images/branch/s_contacts/contact_map_sm.webp';
import MapImgMd from '~/assets/images/branch/s_contacts/contact_map_md.webp';
import MapImgLg from '~/assets/images/branch/s_contacts/contact_map_lg.webp';
import mapImg from '~/assets/images/branch/s_contacts/s-contact-first-lg1.webp';
import type { RegionCity } from '~/types';

interface RegionCityWithPlaceData extends RegionCity {
  place_title: string;
  place_order: number;
}

interface Props {
  places: RegionCityWithPlaceData[]
}

const { places = [] } = defineProps<Props>();

const emits = defineEmits<{
  (e: 'updateActiveMapKey', key: string): void;
}>();

const { reachGoal } = sendYandexMetricaGoal()

function sendReachGoal(phone: string) {
  reachGoal('click_call_button', {
    'button': 'nomera_telefonov_v_stranitse',
    'telephone_number': phone,
  });
}

function formatPlaceMetro(metro: string) {
  if (typeof metro !== 'string' || !metro) return '';

  const match = metro.match(/«(.*?)»/);
  return match ? match[1] : '';
}

function formatPlaceSchedule(schedule: string) {
  if (typeof schedule !== 'string' || !schedule) return '';

  return schedule.split(';').join(' | ');
}

function formatPlaceAddress(address: string) {
  if (typeof address !== 'string' || !address) return '';

  return address.split(',')?.slice(1)?.join(',')?.trim();
}
</script>

<template>
  <MSection
    v-if="places?.length"
    class="s-contacts-first"
  >
    <div class="s-contacts-first__header">
      <div class="s-contacts-first__header__title a-font_h4">
        Поступить удалённо <span><br></span>или проконсультироваться <br>перед посещением приёмной комиссии
      </div>
      <div class="s-contacts-first__header__info a-font_h4">
        <NuxtLink
          to="tel:88001000011"
          class="s-contacts-first__header__phone"
          @click="sendReachGoal('88001000011')"
        >
          8 800 100-00-11
        </NuxtLink>
        <NuxtLink
          to="mailto:info@university.example"
          class="s-contacts-first__header__email"
        >
          info@university.example
        </NuxtLink>
      </div>
    </div>

    <div class="s-contacts-first__items">
      <div
        v-for="place in places"
        :key="place.key"
        class="s-contacts-first__item"
      >
        <div class="s-contacts-first__item__metro">
          <template v-if="place.region">
            <span class="a-font_h4">M</span>
            <span
              class="a-font_h4"
              v-html="formatPlaceMetro(place.region)"
            />
          </template>
        </div>

        <div class="s-contacts-first__item__location">
          <div class="s-contacts-first__item__info">
            <span class="s-contacts-first__item__info-title a-font_s-m">
              Адрес
            </span>
            <span
              class="s-contacts-first__item__info-text a-font_xl-m"
            >
              <span v-html="formatPlaceAddress(place.address)" />
            </span>
          </div>

          <div class="s-contacts-first__item__info">
            <span class="s-contacts-first__item__info-title a-font_s-m">
              График работы
            </span>
            <span
              class="s-contacts-first__item__info-text a-font_xl-m"
              v-html="formatPlaceSchedule(place.schedule)"
            />
          </div>

          <div class="s-contacts-first__item__map">
            <picture class="s-contacts-first__item__map-image">
              <source
                :srcset="mapImg"
                media="(min-width: 1200px)"
              >
              <source
                :srcset="mapImg"
                media="(min-width: 768px)"
              >
              <AImg
                alt="map"
                :src="mapImg"
              />
            </picture>
            <button
              class="s-contacts-first__item__map-button"
              @click="emits('updateActiveMapKey', place.key)"
            >
              <span class="a-font_s-m">Смотреть&nbsp;на&nbsp;карте</span>
              <ASvgMono name="pin" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SBranchContactsFirst.scss';
</style>
