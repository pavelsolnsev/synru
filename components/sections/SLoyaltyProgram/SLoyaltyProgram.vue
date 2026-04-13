<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';
import { ROUTES } from '~/constants';

const title = 'Участвуйте в&nbsp;программе лояльности';
const cardTitle = 'Demo Friends&nbsp;— сообщество самых активных студентов';
const cardText = 'Приглашайте друзей учиться вместе с&nbsp;вами, получайте внутренние баллы&nbsp;— и&nbsp;оплачивайте ими обучение или&nbsp;товары из&nbsp;каталога!';

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Стать участником программы',
    btn: 'Подать заявку',
    formName: true,
    formPhone: true,
    actionParams: [
      {param:'grcampaign=e_mail_chain_vpo'},
      {param:'form=demo_friends'},
    ],
  });
}
</script>
<template>
  <MSection
    class="s-loyalty-program"
    :title
  >
    <div class="s-loyalty-program__wrap">
      <MCardText
        text-class="a-font_xl-m"
        :text="cardText"
        :is-big="true"
        :title="cardTitle"
        :icons="['simple-star', 'simple-catalog']"
      >
        <div class="s-loyalty-program__subtext a-font_m">
          После регистрации вы получите карту лояльности и&nbsp;доступ в&nbsp;личный кабинет.&nbsp;С&nbsp;его помощью
          удобно рекомендовать друзей, делать покупки и&nbsp;контролировать баланс токенов.
        </div>
        <NuxtLink
          :to="ROUTES.FRIENDS"
          class="a-btn a-btn--primary a-btn--lg a-font_xl-m a-btn--black"
        >
          <span>Подробнее о&nbsp;Synergy Friends</span>
        </NuxtLink>
        <AButton @click="openForm()">
          <span>Стать участником программы</span>
        </AButton>
      </MCardText>

      <div class="s-loyalty-program__banner">
        <NuxtLink
          :to="ROUTES.FRIENDS"
          class="a-btn a-btn--primary a-btn--lg a-font_xl-m a-btn--black"
        >
          <span>Подробнее о&nbsp;Synergy Friends</span>
        </NuxtLink>
        <AButton @click="openForm()">
          <span>Стать участником программы</span>
        </AButton>
        <picture>
          <source
            media="(min-width: 1200px)"
            srcset=synergyApi('uploads/content/s-loyalty-program/banner.webp')
          >
          <source
            media="(min-width: 768px)"
            srcset=synergyApi('uploads/content/s-loyalty-program/banner-md.webp')
          >
          <AImg
            src=synergyApi('uploads/content/s-loyalty-program/banner-sm.webp')
            decoding="async"
            loading="lazy"
            alt="Программа лояльности (демо)"
          />
        </picture>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SLoyaltyProgram.scss';
</style>
