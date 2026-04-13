<script setup>
import { synergyApi, synergyRu } from '~/utils/mediaCdn';
import BgImageLg from '~/assets/images/program/intro/intro-lg.webp';
import BgImageMd from '~/assets/images/program/intro/intro-md.webp';
import BgImageSm from '~/assets/images/program/intro/intro-sm.webp';

function testPay(e) {
  e.preventDefault();
  window.location.href = 'https://merchant.intellectmoney.ru/?invoiceId=3568923214';
}
</script>

<template>
  <MSection class="l-section s-intro s-intro-pay">
    <div class="s-intro__wrap">
      <div class="a-tag s-intro-pay__procent a-font_h5">-60%</div>
      <div class="s-intro__desc">
        <!-- <div
          class="m-breadcrumbs swiper a-font_xs swiper-initialized swiper-horizontal swiper-free-mode swiper-backface-hidden"
          itemscope="itemscope" itemtype="https://schema.org/BreadcrumbList">
          <div class="swiper-wrapper">
            <div class="swiper-slide swiper-slide-active"><span class="m-breadcrumbs__link" itemprop="itemListElement"
                itemscope="itemscope" itemtype="https://schema.org/ListItem"><a href="#" itemprop="item"><span
                    itemprop="name">Главная</span></a></span></div>
            <div class="swiper-slide swiper-slide-next"><span class="m-breadcrumbs__link" itemprop="itemListElement"
                itemscope="itemscope" itemtype="https://schema.org/ListItem"><a href="#" itemprop="item"><span
                    itemprop="name">Страница второго порядка</span></a></span></div>
            <div class="swiper-slide"><span class="m-breadcrumbs__link" itemprop="itemListElement" itemscope="itemscope"
                itemtype="https://schema.org/ListItem"><a href="#" itemprop="item"><span itemprop="name">Страница
                    третьего порядка</span></a></span></div>
            <div class="swiper-slide"><span class="m-breadcrumbs__link m-breadcrumbs__link--last"
                itemprop="itemListElement" itemscope="itemscope" itemtype="https://schema.org/ListItem"><a href="#"
                  itemprop="item"><span itemprop="name">Текущая страница</span></a></span></div>
          </div>
        </div> -->
        <!-- <div class="s-intro__tags a-font_m-m">
          <div class="s-intro__tag"><svg class="ico icon-sprite ico-mono-pin">
              <use xlink:href="/assets/dist/images/sprite-mono.svg#ico-mono-pin"></use>
            </svg><span>Дубай</span></div>
          <div class="s-intro__tag"><svg class="ico icon-sprite ico-mono-star">
              <use xlink:href="/assets/dist/images/sprite-mono.svg#ico-mono-star"></use>
            </svg><span>Партнерская программа</span></div>
        </div> -->
        <h1 class="a-font_h3 s-intro__title">Автоматизация технологических процессов</h1>
        <div class="s-intro-pay__price">
          <div class="a-font_l-m s-intro-pay__price-old">7 958 руб.</div>
          <div class="a-font_h3 s-intro-pay__price-new">3 190 руб.</div>
        </div>
        <!-- <a
          class="a-btn a-btn--primary a-btn--lg a-font_xl-m a-btn--red"
          href="#programModal"
          data-fancybox
        >
          <span>Купить со скидкой 60%</span>
        </a> -->
        <AButton
          bg-color="red"
          data-src="#programModal"
          data-fancybox
        >
          <span>Купить со скидкой 60%</span>
        </AButton>
        <div class="a-timer">
          <div class="a-font_l">До конца скидки:</div>
          <div class="a-font_l-m a-timer__time">1 день : 22 часа : 41 минута</div>
        </div>
        <div
          id="programModal"
          class="m-modal-form"
        >
          <form
            class="m-form m-form--bgColor-grey_10"
            @submit.prevent="testPay"
          >
            <div class="m-form__title a-font_h4">Вышлем доступ к курсу на указанную почту сразу после оплаты</div>
            <div class="m-form__content">
              <input
                class="a-input a-font_l"
                type="text"
                name="name"
                placeholder="Имя"
                inputmode="text"
              >
              <input
                class="a-input a-font_l"
                type="text"
                name="phone"
                placeholder="Телефон"
                inputmode="tel"
              >
              <input
                class="a-input a-font_l"
                type="email"
                name="email"
                placeholder="Почта"
                inputmode="email"
              >
            </div>
            <div class="m-form__bottom">
              <!-- <button class="a-btn a-btn--primary a-btn--lg a-font_xl-m a-btn--red">
                <span>Подать заявку</span>
              </button> -->
              <AButton
                bg-color="red"
              >
                <span>Подать заявку</span>
              </AButton>
              <label class="a-chekbox m-form__privacy a-font_xs">
                <input
                  type="checkbox"
                  name="personalDataAgree"
                >
                <span class="a-chekbox__label"> Я даю согласие на&nbsp;обработку
                  персональных данных, согласен на&nbsp;получение информационных рассылок от&nbsp;Университета
                  демо-порталом и&nbsp;соглашаюсь c
                  <a
                    href="#policy"
                    data-fancybox
                  > политикой&nbsp;конфиденциальности</a>.</span></label>
            </div>
          </form>
        </div>
      </div>
      <div class="s-intro__promo">
        <picture class="s-intro__image">
          <source
            media="(min-width: 1200px)"
            :srcset="BgImageLg"
          >
          <source
            media="(min-width: 768px)"
            :srcset="BgImageMd"
          >
          <AImg
            :src="BgImageSm"
            alt=""
            decoding="async"
          />
        </picture>
        <AImg
          class="faculty-icon"
          src=synergyRu('content/faculties/icons7_big/gosudarstvennoe_i_municzipalnoe_upravlenie.svg')
          alt=""
          decoding="async"
        />
      </div>
    </div>
    <div class="s-intro__slider">
      <div class="swiper-wrapper">
        <div class="s-intro__info-item swiper-slide">
          <div class="s-intro__info-item-title a-font_m-m">Уровень образования</div>
          <div class="s-intro__info-item-text a-font_m-m">Колледж, бакалавриат, специалитет</div>
        </div>
        <div class="s-intro__info-item swiper-slide">
          <div class="s-intro__info-item-title a-font_m-m">Срок обучения</div>
          <div class="s-intro__info-item-text a-font_m-m">1 год 10 месяцев&nbsp;— 3 года 10 месяцев</div>
        </div>
        <div class="s-intro__info-item swiper-slide --forms">
          <div class="s-intro__info-item-title a-font_m-m">Форма обучения</div>
          <div class="s-intro__info-item-tags">
            <span class="a-tag a-tag--lg a-tag--black a-font_xs-m">очная</span>
            <span class="a-tag a-tag--lg a-tag--black a-font_xs-m">очно-заочная</span>
            <span class="a-tag a-tag--lg a-tag--black a-font_xs-m">вечерняя</span>
            <span class="a-tag a-tag--lg a-tag--black a-font_xs-m">выходного&nbsp;дня</span>
            <span class="a-tag a-tag--lg a-tag--black a-font_xs-m">онлайн</span>
            <span class="a-tag a-tag--lg a-tag--black a-font_xs-m">Вечерний</span>
          </div>
        </div>
        <div class="s-intro__info-item swiper-slide">
          <div class="s-intro__info-item-title a-font_m-m">Результат обучения</div>
          <div class="s-intro__info-item-text a-font_m-m">Диплом гос. образца демо-вуза и&nbsp;диплом Университета Шаньтоу</div>
        </div>
        <div class="s-intro__info-item swiper-slide">
          <div class="s-intro__info-item-title a-font_m-m">Карьера</div>
          <div class="s-intro__info-item-text a-font_m-m">Помощь в&nbsp;трудоустройстве и&nbsp;знание двух языков: английского и&nbsp;китайского</div>
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import '../program/SProgramIntro/SProgramIntro.scss';
@import './SProgramIntroPay.scss';
</style>
