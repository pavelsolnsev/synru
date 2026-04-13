<script setup lang="ts">
import { useWindowScroll, useWindowSize, useDebounceFn } from '@vueuse/core';
import PopupFormImg from '~/assets/images/s_bottom_buttons/bottom-form.webp';
import FormApplyIcon from '~/assets/images/s_bottom_buttons/form_apply.svg';
import FormCallIcon from '~/assets/images/s_bottom_buttons/form_call.svg';

const bottomButtons = [
  {
    modal: true,
    classname: '--bottom-buttons-apply',
    href: '',
    text: 'Заявка',
  },
  {
    classname: '--bottom-buttons-call',
    href: 'tel:88001000011',
    text: 'Позвонить',
  },
];

const route = useRoute();

const baseParams = [
  { param: 'grcampaign=e_mail_chain_vpo' },
  { param: 'form=button_zayavka' },
];

// TODO: Проверка роута для А/Б теста приемной комиссии

const actionParams: ComputedRef<{ param: string }[]> = computed(() => getAbTestActionParams(baseParams, route.path));

const FORM_TITLE = 'Начните учиться <span class="red">бесплатно</span>';

const { y: windowScroll } = useWindowScroll();
const { width: windowWidth } = useWindowSize();

const popupFormRef = templateRef('popupFormRef');
const sectionRef = templateRef('sectionRef');

watch([windowScroll, windowWidth], () => {
  bottomButtonsPopupToggle();
});

const bottomButtonsPopupToggle = useDebounceFn(() => {
  const isWideScreen = window.outerWidth > 767;
  const isNearBottom = (document.documentElement.offsetHeight - window.scrollY) < (window.innerHeight + 100);
  const isNearTop = window.scrollY < 100;

  if (isWideScreen || isNearBottom || isNearTop) {
    document.documentElement.classList.remove('--visible-bottom-btns');
    return;
  }
  document.documentElement.classList.add('--visible-bottom-btns');
}, 50);

const { reachGoal } = sendYandexMetricaGoal();

onMounted(() => {
  if (navigator && navigator.userAgent.indexOf('iPhone') > -1) {
    sectionRef.value.style.height = '52px';
  }

  bottomButtonsPopupToggle();
});

function onShowPopupFormButtonClick() {
  popupFormRef.value?.classList.add('--open');
  document.documentElement.style.overflow = 'hidden';
}

function onClosePopupFormButtonClick() {
  popupFormRef.value?.classList.add('--close');
  popupFormRef.value?.classList.remove('--open');

  setTimeout(() => {
    popupFormRef.value?.classList.remove('--close');
  }, 300);

  document.documentElement.style.overflow = '';
}

function sendReachGoal(phone: string) {
  reachGoal('click_call_button', {
    'button': 'ploskaya_konopka_telefona_snizu',
    'telephone_number': phone,
  });
}
</script>

<template>
  <div
    ref="sectionRef"
    class="bottom-buttons"
  >
    <div class="bottom-buttons__inner a-font_xl-m">
      <template
        v-for="item in bottomButtons"
        :key="item.text"
      >
        <button
          v-if="item.modal"
          class="bottom-buttons__entity"
          :to="item.href"
          :class="item.classname"
          @click.stop.prevent="onShowPopupFormButtonClick"
        >
          <FormApplyIcon />
          <span
            class="bottom-buttons__entity-title a-font_xl-m"
            v-html="item.text"
          />
        </button>
        <NuxtLink
          v-else
          class="bottom-buttons__entity"
          :to="item.href"
          :class="item.classname"
          @click="sendReachGoal(item.href)"
        >
          <FormCallIcon />
          <span
            class="bottom-buttons__entity-title"
            v-html="item.text"
          />
        </NuxtLink>
      </template>
    </div>
  </div>

  <div
    ref="popupFormRef"
    class="bottom-buttons__form"
  >
    <AImg
      :src="PopupFormImg"
      decoding="async"
      alt="formImg"
      loading="lazy"
    />
    <button
      class="bottom-buttons__form-close"
      @click.stop.prevent="onClosePopupFormButtonClick"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 9 13"
        width="9"
        height="13"
      >
        <path
          fill="#1c1c1c"
          d="M7 0 0 6.2l7 6.2 1.5-1.3L3 6.2l5.5-4.9z"
        />
      </svg>
      <span class="a-font_l-m">
        Вернуться
      </span>
    </button>
    <MForm
      title-class="a-font_h4"
      bg-color="white"
      btn="Начать бесплатно"
      :title="FORM_TITLE"
      :form-name="false"
      :action-params
    />
  </div>
</template>

<style lang="scss" scoped>
@import './SBottomButtons.scss';
</style>
