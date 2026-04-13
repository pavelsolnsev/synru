<script setup lang="ts">
import { SOCIAL, COMMON } from '~/constants';

const socialLinks = [
  {
    name: 'vkontakte',
    href: SOCIAL.VK,
    icon: 'social-vk',
  },
  {
    name: 'rutube',
    href: SOCIAL.RUTUBE,
    icon: 'social-rutube',
  },
];

const emits = defineEmits(['feedback']);

const { openModal } = useModalStore();

function openFeedback() {
  openModal('SFormFeedback');
}

const path = useRoute().path;

const { reachGoal } = sendYandexMetricaGoal();

function sendReachGoal(phone: string) {
  reachGoal('click_call_button', {
    'button': 'nomera_telefonov_v_navigatsionnom_menyu',
    'telephone_number': phone,
  });
}
</script>

<template>
  <div class="s-header-menu__info a-font_m-m">
    <div
      class="s-header-menu__info-wrap"
    >
      <div class="s-header-menu__info-item">
        <AImg
          :src="COMMON.LOGO_URL"
          style="display: none;"
          itemprop="image"
        />
        <div class="s-header-menu__info-title">
          <span>Приёмная комиссия</span>
        </div>
        <AButtonThird
          to="tel:+74958001001"
          size="md"
          @click="sendReachGoal('+74958001001')"
        >
          <span>
            +7&nbsp;495&nbsp;800-10-01
          </span>
        </AButtonThird>
        <AButtonThird
          to="tel:88001000011"
          size="md"
          @click="sendReachGoal('88001000011')"
        >
          <span>
            8&nbsp;800&nbsp;100-00-11
          </span>
        </AButtonThird>
      </div>
      <div class="s-header-menu__info-item">
        <div class="s-header-menu__info-title">
          Для&nbsp;студентов:
        </div>
        <AButtonThird
          to="tel:88003500060"
          size="md"
          @click="sendReachGoal('88003500060')"
        >
          <span>
            8&nbsp;800&nbsp;350-00-60
          </span>
        </AButtonThird>
      </div>
      <div class="s-header-menu__info-item --schedule">
        <div class="s-header-menu__info-title">
          График работы:
        </div>
        <ATag
          text="Пн–Пт: 09:00–20:00"
          variant="black"
        />
        <ATag
          text="Сб: 10:00–19:00"
          variant="black"
        />
        <ATag
          text="Вс: 10:00–17:00"
          variant="black"
        />
      </div>
    </div>
    <AButton
      class="s-header-menu__info-feedback"
      size="md"
      bg-color="black"
      @click="openFeedback(); emits('feedback');"
    >
      <span>
        Обратная связь
      </span>
    </AButton>

    <MSocialLinks
      :show-title="false"
      :links="socialLinks"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './SHeaderMenu.scss';
</style>
