<script setup lang="ts">
import BannerImageLg from '~/assets/images/s_credit/credit_lg.webp';
import BannerImageMd from '~/assets/images/s_credit/credit_md.webp';
import BannerImageSm from '~/assets/images/s_credit/credit_sm.webp';
import { ROUTES } from '~/constants';

interface Props {
  isShowPopup?: boolean;
  actionParams?: { param: string }[]
}

const {
  isShowPopup = false,
  actionParams = [{ param: 'form=credit_sber' }],
} = defineProps<Props>();

const title = 'Кредит на&nbsp;образование под&nbsp;3% годовых';
const cardTitle = 'С&nbsp;кредитом от&nbsp;«Сбера» ваш ежемесячный платёж за&nbsp;учёбу будет не&nbsp;больше стоимости подписки на&nbsp;музыку или&nbsp;кино';
const cardText = 'Хотите учиться у нас, но&nbsp;боитесь не&nbsp;пройти на&nbsp;бюджет? Поможем получить выгодный кредит с&nbsp;господдержкой всего под&nbsp;3%';
const buttonText = 'Узнать подробности';
const secondTitle = 'Стоимость обучения за&nbsp;месяц с&nbsp;кредитом от&nbsp;«Сбера» будет не&nbsp;больше стоимости подписки на&nbsp;музыку или&nbsp;кино';
const creditFormTitle = 'Узнать условия кредита';

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: creditFormTitle,
    formName: true,
    formPhone: true,
    actionParams: actionParams,
  });
}
</script>

<template>
  <MSection
    class="s-credit"
    :title
  >
    <div class="s-credit__info">
      <MCardText
        is-big
        title-class="a-font_h5"
        text-class="a-font_h6"
        :text="cardText"
        :title="cardTitle"
        :icons="['simple-hat', 'simple-catalog']"
      >
        <AButton
          v-if="isShowPopup"
          bg-color="black"
          @click="openForm()"
        >
          <span>{{ buttonText }}</span>
        </AButton>
        <AButton
          v-else
          bg-color="black"
          :to="ROUTES.CREDIT"
        >
          <span>{{ buttonText }}</span>
        </AButton>
      </MCardText>
      <div class="s-credit__banner">
        <picture>
          <source
            media="(min-width: 1200px)"
            :srcset="BannerImageLg"
          >
          <source
            media="(min-width: 768px)"
            :srcset="BannerImageMd"
          >
          <AImg
            alt="credit"
            decoding="async"
            loading="lazy"
            width="336"
            height="224"
            :src="BannerImageSm"
          />
        </picture>
      </div>
    </div>

    <MCreditCost :is-swiper-nav="false" />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCredit.scss';
</style>
