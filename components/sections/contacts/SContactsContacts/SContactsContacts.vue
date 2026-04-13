<script setup lang="ts">
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
          Пн — Вс: 07:00–23:00
        </span>
        <AButtonThird
          to="tel:88001000011"
          size="md"
          rounding="rect"
          bg-color="bordered"
        >
          <span>8 (800) 100-00-11</span>
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
          to="mailto:info@university.example"
          size="md"
          rounding="rect"
          bg-color="bordered"
        >
          <span>info@university.example</span>
          <ASvgMono name="arrow_outward" />
        </AButtonThird>
      </div>

      <div class="s-contacts__form">
        <MFormMin
          title="Оставьте номер, и мы вам перезвоним"
          title-class="a-font_h5"
          bg-color="red"
          input-size="md"
          :add-fields="[
            {
              type: 'time',
              label: 'Удобное время',
              name: 'time',
              placeholder: 'Удобное время',
              fontSize: 'a-font_l',
              size: 'md'
            }
          ]"
          :action-params="[
            {param: 'form=main_contacts'}
          ]"
          @custom-field-focus="onFocusTime"
          @custom-field-blur="onBlurTime"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SContactsContacts.scss';
</style>
