<script setup lang="ts">
import Image1 from '~/assets/images/s-credit-second-simple/s-credit-second-simple-2.webp';
import { ROUTES } from '~/constants';
</script>

<template>
  <MSectionSecond
    class="s-credit-second-simple"
  >
    <AImg
      class="s-credit-second-simple__image"
      alt="credit"
      decoding="async"
      loading="lazy"
      :src="Image1"
    />

    <div class="s-credit-second-simple__main">
      <div class="s-credit-second-simple__title">
        Кредит на&nbsp;образование с&nbsp;платежом от&nbsp;150&nbsp;<span class="--rub">Р</span>/месяц
      </div>
      <div class="s-credit-second-simple__desc">
        Если хотите учиться у нас, но&nbsp;боитесь не&nbsp;пройти на&nbsp;бюджет, поможем получить выгодный кредит с&nbsp;господдержкой всего под&nbsp;3%.
        <br><br>
        Ежемесячный платёж за&nbsp;учёбу будет не&nbsp;больше стоимости подписки на&nbsp;музыку или&nbsp;кино.
      </div>
      <AButton
        :to="ROUTES.CREDIT"
      >
        Узнать подробности
      </AButton>
    </div>
  </MSectionSecond>
</template>

<style lang="scss" scoped>
@import './SCreditSecondSimple.scss';
</style>
