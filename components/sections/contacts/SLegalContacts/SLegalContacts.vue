<script setup lang="ts">
const { reachGoal } = sendYandexMetricaGoal()

function sendReachGoal(phone: string) {
  reachGoal('click_call_button', {
    'button': 'nomera_telefonov_v_stranitse',
    'telephone_number': phone,
  });
}

function onFocusTime(event: FocusEvent) {
  const target = event.target as HTMLInputElement;

  if (target && typeof target.showPicker === 'function') target.showPicker();
}

function onBlurTime(event: FocusEvent) {
  const target = event.target as HTMLInputElement;

  if (target.value) {
    target.classList.add('hidden-label');
    return;
  }

  target.classList.remove('hidden-label');
}
</script>

<template>
  <MSection
    title="Контакты"
    class="s-contacts"
  >
    <div class="s-contacts__inner">
      <div class="s-contacts__item">
        <h5 class="s-contacts__item-title a-font_h5">
          Телефон
        </h5>
        <span class="s-contacts__item-text a-font_s-m">
          Пн — Пт: 14:00–18:00
        </span>
        <AButtonThird
          to="tel:+74958001001p3380"
          size="md"
          rounding="rect"
          bg-color="bordered"
          @click="sendReachGoal('+74958001001')"
        >
          <span>+7 (495) 800 10 01 (доб.&nbsp;3380)</span>
        </AButtonThird>
        <AButtonThird
          to="tel:+74958001001p2371"
          size="md"
          rounding="rect"
          bg-color="bordered"
          @click="sendReachGoal('+74958001001')"
        >
          <span>+7 (495) 800 10 01 (доб.&nbsp;2371)</span>
        </AButtonThird>
      </div>

      <div class="s-contacts__item">
        <h5 class="s-contacts__item-title a-font_h5">
          Электронная почта
        </h5>
        <span class="s-contacts__item-text a-font_s-m">
          Пишите нам
        </span>
        <AButtonThird
          to="mailto:legal@university.example"
          size="md"
          rounding="rect"
          bg-color="dark"
        >
          <span>legal@university.example</span>
          <ASvgMono name="arrow_outward" />
        </AButtonThird>
      </div>

      <div class="s-contacts__item">
        <h5 class="s-contacts__item-title a-font_h5">
          Время работы
        </h5>
        <span class="s-contacts__item-text a-font_s-m">
          <span>Адрес:</span> г.&nbsp;Москва, Хлебозаводский проезд, д.&nbsp;7, стр.&nbsp;10, 1&nbsp;этаж., каб.&nbsp;106
        </span>
        <div class="s-contacts__item-bottom">
          <ATag text="Сентябрь – Декабрь" />
          <ATag text="Февраль – Июнь" />
          <ATag text="Пн-Пт 14:00–18:00" />
        </div>
      </div>

      <div class="s-contacts__form">
        <MFormMin
          title="Оставьте номер, и мы вам перезвоним"
          title-class="a-font_h5"
          bg-color="red"
          input-size="lg"
          :add-fields="[
            {
              type: 'time',
              name: 'time',
              label: 'Когда вам удобно?',
              placeholder: 'Когда вам удобно?',
              fontSize: 'a-font_l',
              size: 'lg'
            }
          ]"
          :action-params="[
            {param: 'form=yur_klinika_contacts'}
          ]"
          @custom-field-focus="onFocusTime"
          @custom-field-blur="onBlurTime"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import '../SContactsContacts/SContactsContacts.scss';
@import './SLegalContacts.scss';
</style>
