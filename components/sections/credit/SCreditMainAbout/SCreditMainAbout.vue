<script setup lang="ts">
const cards = [
  {
    title: 'Выберите программу и&nbsp;форму обучения в&nbsp;колледже или&nbsp;университете.',
  },
  {
    title: 'Отправьте заявку на кредит в банк, получите одобрение и заключите договор.',
  },
  {
    title: 'Во время учёбы и ещё 9 месяцев после оплачивайте только проценты:',
    text: 'в&nbsp;первый год&nbsp;— 40% от&nbsp;суммы процентов, во&nbsp;второй год&nbsp;— 60%, с&nbsp;третьего года&nbsp;— 100%. Основной долг можно вернуть в&nbsp;течение 15 лет, когда у&nbsp;вас уже будет работа и&nbsp;стабильный доход.',
  },
];

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Оставьте заявку, чтобы узнать больше об&nbsp;условиях кредитования с&nbsp;поддержкой государства',
    subtitle: 'Заполните форму, и&nbsp;наш менеджер свяжется с&nbsp;вами',
    subtitleClass: 'a-font_h6',
    btn: 'Отправить',
    formPhone: true,
    formName: true,
    actionParams: [
      {param: 'grcampaign=e_mail_chain_vpo'},
      {param: 'form=get_credit'},
    ],
  });
}
</script>

<template>
  <MSection
    class="s-credit-main-about"
  >
    <div class="s-credit-main-about__wrapper">
      <MCardText
        title="О кредите"
        title-class="a-font_h4"
        text="Образовательный кредит с&nbsp;господдержкой&nbsp;— целевой заём, который можно потратить только на&nbsp;учёбу. Выдаётся под&nbsp;льготную процентную ставку&nbsp;— 3% годовых, а&nbsp;разницу между рыночной ставкой и&nbsp;льготной компенсирует государство."
        text-class="a-font_h6"
      >
        <ul class="a-font_l-m">
          <li>Ставка 3% на&nbsp;весь срок кредитования</li>
          <li>Платёж от&nbsp;300 ₽/мес.</li>
          <li>Оформление с&nbsp;14 лет без&nbsp;справки о&nbsp;доходах</li>
          <li>До&nbsp;15 лет на&nbsp;погашение</li>
        </ul>
        <AButton @click="openForm()">
          <span>Узнать условия</span>
        </AButton>
      </MCardText>

      <div class="s-credit-main-about__info">
        <div class="s-credit-main-about__info-title a-font_h4">
          Как начать учиться в&nbsp;кредит
        </div>

        <div class="s-credit-main-about__info__items">
          <div
            v-for="card, index in cards"
            :key="card.title"
            class="s-credit-main-about__info__item"
          >
            <div class="s-credit-main-about__info__item-num a-font_l-m">
              <span>
                {{ formatNumberWithLeadingZero(index+1) }}
              </span>
            </div>

            <div
              class="s-credit-main-about__info__item-title a-font_h6"
              v-html="card.title"
            />

            <div
              v-if="card.text"
              class="s-credit-main-about__info__item-text a-font_m-m"
              v-html="card.text"
            />
          </div>
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCreditMainAbout.scss';
</style>
