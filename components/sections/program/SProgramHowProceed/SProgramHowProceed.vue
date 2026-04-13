<script setup lang="ts">
const { reachGoal } = sendYandexMetricaGoal()

function sendReachGoal(phone: string) {
  reachGoal('click_call_button', {
    'button': 'nomera_telefonov_v_stranitse',
    'telephone_number': phone,
  });
}
</script>

<template>
  <MSection
    title="Как поступить"
    class="s-how-proceed"
  >
    <div class="s-how-proceed__wrap">
      <div class="s-how-proceed__item">
        <p class="s-how-proceed__item-title a-font_h5">
          <span>Прийти очно или&nbsp;онлайн <br>на&nbsp;день открытых дверей</span>
          <span class="a-font_l-m s-how-proceed__item-num">01</span>
        </p>
        <ATag
          text="Пн–Пт:  08:00–16:00"
          variant="black"
        />
      </div>
      <div class="s-how-proceed__item">
        <p class="s-how-proceed__item-title a-font_h5">
          <span>Позвонить</span>
          <span class="a-font_l-m s-how-proceed__item-num">02</span>
        </p>
        <div class="s-how-proceed__item-wrap">
          <AButtonThird
            to="tel:+74958001001"
            size="lg_m"
            @click="sendReachGoal('+74958001001')"
          >
            <span> +7 495 800-10-01</span>
          </AButtonThird>
          <AButtonThird
            to="tel:88001000011"
            size="lg_m"
            @click="sendReachGoal('88001000011')"
          >
            <span> 8 800 100-00-11</span>
          </AButtonThird>
        </div>
      </div>
      <MForm
        bg-color="red"
        title="<span>Оставить заявку</span> <span class='a-font_l-m'>03</span>"
        title-class="a-font_h5"
        :action-params="[
          {param: 'grcampaign=e_mail_chain_vpo'},
          {param: 'form=postupi'},
        ]"
      />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SProgramHowProceed.scss';
</style>
