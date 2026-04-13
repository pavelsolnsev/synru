<script setup lang="ts">
import type { SectionConditionalGroup } from '~/types';

interface Props {
  date: string;
  time: string;
  title?: string;
  format?: string;
  formTitle?: string;
  conditionalGroup: SectionConditionalGroup[];
  actionParams?: { param: string }[];
  entity?: { id?: number };
}

const {
  date,
  time,
  title = 'ПРИСОЕДИНЯЙТЕСЬ <br>КО&nbsp;ДНЮ ОТКРЫТЫХ ДВЕРЕЙ <span class="red">ДЕМО-ВУЗА</span>',
  format = 'Очно и онлайн',
  formTitle = 'Узнайте все о&nbsp;проходных баллах, льготах и&nbsp;целевом обучении в&nbsp;2026&nbsp;году',
  conditionalGroup = [],
  actionParams = [
    { param: 'form=dod_form' },
    { param: 'version=dod_faculties' },
  ],
  entity = {},
} = defineProps<Props>();

const modalConfig = {
  formTitle: formTitle,
  title: title,
  date: formateDateToLocale(date, { day: 'numeric', month: 'long' }),
  time: time,
  format: format,
  imageFormLg: '/img/dodBanner/dod_banner_lg.webp',
  imageFormSm: '/img/dodBanner/dod_banner_sm.webp',
  actionParams: actionParams,
};

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });

const { openModal } = useModalStore();
</script>

<template>
  <MSectionNewResponsive
    v-if="showSection"
    class="ether_banner"
  >
    <div class="ether_banner__wrap">
      <picture>
        <source
          srcset="/img/dodBanner/dod_man.webp"
          media="(min-width: 1200px)"
        >
        <AImg
          src="/img/dodBanner/dod_banner_sm.webp"
          alt="dod"
          decoding="async"
          loading="lazy"
        />
      </picture>

      <div class="ether_banner__desc">
        <div class="s-download-app-new__dod-tags">
          <div class="s-download-app-new__dod-tag a-font_xl-m">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="15"
              fill="none"
              viewBox="0 0 14 15"
            >
              <path
                fill="#1c1b1f"
                d="M1.5 15q-.62 0-1.06-.44Q0 14.1 0 13.5V3q0-.62.44-1.06Q.9 1.5 1.5 1.5h.75V0h1.5v1.5h6V0h1.5v1.5H12q.62 0 1.06.44.45.45.44 1.06v10.5q0 .62-.44 1.06Q12.6 15 12 15zm0-1.5H12V6H1.5zm0-9H12V3H1.5z"
              />
            </svg>
            <span v-html="formateDateToLocale(date, { day: 'numeric', month: 'long' })" />
          </div>
          <div class="s-download-app-new__dod-tag a-font_xl-m">
            <svg
              xmlns="http://www.w3.org/2000/svg"

              fill="none"
              viewBox="0 0 15 15"
            >
              <mask
                id="a"
                x="0"
                y="0"
                maskUnits="userSpaceOnUse"
                style="mask-type: alpha"
              >
                <path
                  fill="#d9d9d9"
                  d="M0 0h15v15H0z"
                />
              </mask>
              <g mask="url(#a)">
                <path
                  fill="#1c1b1f"
                  d="m9.56 10.44.88-.88-2.31-2.31V4.38H6.87v3.37zM7.5 13.75a6 6 0 0 1-4.42-1.83 6.3 6.3 0 0 1-1.34-6.86 6.3 6.3 0 0 1 3.32-3.32q1.15-.5 2.44-.49a6 6 0 0 1 4.42 1.83 6.3 6.3 0 0 1 1.34 6.86 6.3 6.3 0 0 1-3.32 3.32q-1.15.5-2.44.49m0-1.25q2.09 0 3.54-1.46A4.8 4.8 0 0 0 12.5 7.5q0-2.08-1.46-3.54A4.8 4.8 0 0 0 7.5 2.5q-2.08 0-3.54 1.46A4.8 4.8 0 0 0 2.5 7.5q0 2.09 1.46 3.54A4.8 4.8 0 0 0 7.5 12.5"
                />
              </g>
            </svg>
            <span v-html="time" />
          </div>
          <div class="s-download-app-new__dod-tag a-font_xl-m">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 15 15"
            >
              <mask
                id="a"
                x="0"
                y="0"
                maskUnits="userSpaceOnUse"
                style="mask-type: alpha"
              >
                <path
                  fill="#d9d9d9"
                  d="M0 0h15v15H0z"
                />
              </mask>
              <g mask="url(#a)">
                <path
                  fill="#1c1b1f"
                  d="M5 13.13v-1.26h1.25v-1.24H2.5a1.2 1.2 0 0 1-.88-.37 1.2 1.2 0 0 1-.37-.88V3.12q0-.5.37-.88.37-.37.88-.37h10q.51 0 .88.37t.37.88v6.26q0 .5-.37.88a1.2 1.2 0 0 1-.88.37H8.75v1.24H10v1.26zM2.5 9.37h10V3.14h-10z"
                />
              </g>
            </svg>
            <span v-html="format" />
          </div>
        </div>
        <h3
          class="a-font_h3 ether_banner__title"
          v-html="title"
        />
      </div>

      <AButton
        @click="openModal('BannerDodModal', modalConfig)"
      >
        Подробнее
      </AButton>
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SDodBanner.scss';
</style>
