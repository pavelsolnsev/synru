<script setup lang="ts">
import CardImgLg from '~/assets/images/branch/s_contacts/contact-card-lg.webp';
import CardImgMd from '~/assets/images/branch/s_contacts/contact-card-md.webp';
import CardImgSm from '~/assets/images/branch/s_contacts/contact-card-sm.webp';
import type { RegionCity } from '~/types';

interface RegionCityWithPlaceData extends RegionCity {
  place_title: string;
  place_order: number;
}

interface Props {
  places: RegionCityWithPlaceData[]
}

const { places = [] } = defineProps<Props>();

const { openModal } = useModalStore();

const { reachGoal } = sendYandexMetricaGoal()

function sendReachGoal(phone: string) {
  reachGoal('click_call_button', {
    'button': 'nomera_telefonov_v_stranitse',
    'telephone_number': phone,
  });
}

function openForm() {
  openModal('MModalForm', {
    title: "Оставьте заявку, и&nbsp;мы откроем <span class='--free-red'>бесплатный</span> доступ к&nbsp;вводной части обучения",
    btn: 'Отправить',
    formName: true,
    formPhone: true,
    actionParams: [
      {param: 'grcampaign=e_mail_chain_vpo'},
      {param: 'form=branch_form'},
    ],
  });
}

function formatContactInfo(additionalPhone: string, additionalEmail: string) {
  return [
    {
      phone: '8 800 100-00-11',
      normalizePhone: '88001000011',
      email: 'info@university.example',
    },
    {
      phone: additionalPhone ?? '',
      normalizePhone: normalizePhoneNumber(additionalPhone),
      email: additionalEmail?.toLowerCase() ?? '',
    },
  ];
}
</script>

<template>
  <MSection
    v-if="places?.length"
    class="s-contacts-second"
  >
    <div class="s-contacts-second__header">
      <div class="s-contacts-second__header__title a-font_h4">
        Поступить удалённо <span><br></span>или проконсультироваться <br>перед посещением приёмной комиссии
      </div>
      <div class="s-contacts-second__header__info a-font_h4">
        <NuxtLink
          to="tel:88005553535"
          class="s-contacts-second__header__phone"
          @click="sendReachGoal('88005553535')"
        >
          8 800 555-35-35
        </NuxtLink>
        <NuxtLink
          to="mailto:info@university.example"
          class="s-contacts-second__header__email"
        >
          info@university.example
        </NuxtLink>
      </div>
    </div>

    <div class="s-contacts-second__items">
      <div
        v-for="place in places"
        :key="place.key"
        class="s-contacts-second__item"
      >
        <div class="s-contacts-second__item__info">
          <span class="s-contacts-second__item__info-title a-font_s-m">
            Адрес
          </span>
          <span
            class="s-contacts-second__item__info-text a-font_xl-m"
            v-html="place.address"
          />
        </div>

        <div class="s-contacts-second__item__info">
          <span class="s-contacts-second__item__info-title a-font_s-m">
            Контакты
          </span>
          <div
            class="s-contacts-second__item__info-text a-font_xl-m"
          >
            <div class="s-contacts-second__item__contacts">
              <div
                v-for="contact, index in formatContactInfo(place.phone_main, place.email)"
                :key="index"
                class="s-contacts-second__item__contacts-item"
              >
                <NuxtLink
                  v-if="contact.phone"
                  class="a-font_m-m s-contacts-second__item__contacts-link"
                  :to="`tel:${contact.normalizePhone}`"
                >
                  <span>{{ contact.phone }}</span>
                </NuxtLink>
                <NuxtLink
                  v-if="contact.email"
                  class="a-font_m-m s-contacts-second__item__contacts-link"
                  :class="contact.email.length > 18 ? 'a-font_xs-m' : 'a-font_m-m'"
                  :to="`mailto:${contact.email}`"
                >
                  <span>{{ contact.email }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class="s-contacts-second__item__card">
          <div class="s-contacts-second__item__card-title a-font_banner-text">
            Подберите программу<br> обучения
          </div>
          <div class="s-contacts-second__item__card-footer">
            <div class="s-contacts-second__item__card-description a-font_banner-text">
              и начните учиться<br> бесплатно
            </div>
            <AButton
              bg-color="black"
              size="sm"
              @click="openForm()"
            >
              Подать заявку
            </AButton>
          </div>
          <picture class="s-contacts-second__item__card-image">
            <source
              :srcset="CardImgLg"
              media="(min-width: 1200px)"
            >
            <source
              :srcset="CardImgMd"
              media="(min-width: 768px)"
            >
            <AImg
              :src="CardImgSm"
              alt="card"
              decoding="async"
              loading="lazy"
            />
          </picture>
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SBranchContactsSecond.scss';
</style>
