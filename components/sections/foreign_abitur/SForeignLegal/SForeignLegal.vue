<script setup lang="ts">
import { INOSTR_ABTUR_SPISOK_UCHEREJDENIY } from '~/constants/documents';

const nostr = [
  'Между вашей страной и&nbsp;Россией подписан двусторонний договор о&nbsp;взаимном признании документов об&nbsp;образовании.',
  'Вы закончили университет, диплом которого автоматически признается в&nbsp;Российской Федерации.',
];
</script>

<template>
  <MSection
    class="s-foreign-legal"
    title="Легализация и&nbsp;нострификация"
  >
    <div class="s-foreign-legal__wrapper">
      <div class="s-foreign-legal__item">
        <div class="s-foreign-legal__legal__title a-font_h5">
          Легализация не&nbsp;требуется, если между страной выдачи и&nbsp;Россией заключено соглашение о&nbsp;ее отмене.
        </div>
        <div class="s-foreign-legal__legal__desc a-font_xl-m">
          Список стран, заключивших такие договоры, размещён на&nbsp;сайте
          <a
            target="_blank"
            href="https://nic.gov.ru/"
            rel="noopener noreferrer nofollow"
          >
            Национального информационного центра.
          </a>
          Этот вопрос можно также уточнить в&nbsp;посольстве России в&nbsp;вашей стране.
        </div>

        <div class="s-foreign-legal__legal__bottom">
          <div class="s-foreign-legal__legal__link">
            <AButton
              target="_blank"
              :to="INOSTR_ABTUR_SPISOK_UCHEREJDENIY"
            >
              <span class="a-font_s-m">Скачать список</span>
              <ASvgMono name="arrow_outward" />
            </AButton>
          </div>
          <span class="s-foreign-legal__legal__bottom__text a-font_s-m">доступных для&nbsp;поступления образовательных учреждений</span>
        </div>
      </div>

      <div class="s-foreign-legal__item">
        <div class="s-foreign-legal__nostr__title a-font_h5">
          Признавать документ об&nbsp;образовании не&nbsp;нужно в&nbsp;случаях, если:
        </div>

        <div class="s-foreign-legal__nostr__items">
          <div
            v-for="item, index in nostr"
            :key="item"
            class="s-foreign-legal__nostr__item"
          >
            <div class="s-foreign-legal__nostr__item__num">
              {{ formatNumberWithLeadingZero(index + 1) }}
            </div>
            <div
              class="s-foreign-legal__nostr__item__title a-font_xl-m"
              v-html="item"
            />
          </div>
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SForeignLegal.scss';
</style>
