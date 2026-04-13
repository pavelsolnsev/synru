<script setup lang='ts'>
const { openModal } = useModalStore();

interface Props {
  title?: string,
  date?: string,
  time?: string,
  format?: string,
  formTitle?: string,
  actionParams?: { param: string }[],
}

const {
  title = 'ПРИСОЕДИНЯЙТЕСЬ <br>КО&nbsp;ДНЮ ОТКРЫТЫХ ДВЕРЕЙ <span class="red">ДЕМО-ВУЗА</span>',
  date = '25 апреля',
  time = '12:00 мск',
  format = 'Очно и онлайн',
  formTitle = 'Узнайте все о&nbsp;проходных баллах, льготах и&nbsp;целевом обучении в&nbsp;2026&nbsp;году',
  actionParams = [{ param: 'version=dod_faculties' }, { param: 'form=dod_form' }],
} = defineProps<Props>();

const modalConfig = {
  formTitle: formTitle,
  title: title,
  date: date,
  time: time,
  format: format,
  imageFormLg: '/img/dodBanner/dod_banner_lg.webp',
  imageFormSm: '/img/dodBanner/dod_banner_sm.webp',
  actionParams: actionParams,
};
</script>

<template>
  <div class="s-download-app-new__dod">
    <picture>
      <source
        srcset="/img/dodBanner/dod_banner_lg.webp"
        media="(min-width: 1200px)"
      >
      <AImg
        src="/img/dodBanner/dod_banner_sm.webp"
        decoding="async"
        loading="lazy"
      />
    </picture>
    <div class="s-download-app-new__dod-tags">
      <div class="s-download-app-new__dod-tag a-font_l-m">
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
        <span v-html="date" />
      </div>
      <div class="s-download-app-new__dod-tag a-font_l-m">
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
      <div class="s-download-app-new__dod-tag a-font_l-m">
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
    <p
      class="s-download-app-new__dod-title"
      v-html="title"
    />
    <AButton
      size="lg"
      @click="openModal('banner-dod-modal', modalConfig)"
    >
      Подробнее
    </AButton>
  </div>
</template>

<style scoped lang='scss'>
.s-download-app-new__dod {
  overflow: hidden;
  position: relative;
  z-index: 1;
  display: flex;
  padding: var(--padding_def);
  flex-direction: column;
  background-color: var(--a-color_grey_20);
  border-radius: scale(16);

  @include tablet(max) {
    min-height: scale(436);
  }

  picture {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-tags {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: scale(6);
    margin-bottom: scale(18);

    @include tablet(max) {
      justify-content: center;
    }

    @include desktop(min) {
      gap: scale(8);
      margin-bottom: scale(22);
    }
  }

  &-tag {
    display: flex;
    align-items: center;
    gap: scale(6);
    line-height: 1;
    min-height: scale(23);
    padding: scale(3) scale(9);
    background-color: var(--a-color_white);
    border: 1px solid var(--a-color_red);
    border-radius: scale(19);
    white-space: nowrap;

    @include desktop(min) {
      min-height: scale(31);
      gap: scale(8)
    }

    svg {
      min-width: scale(10);
      max-width: scale(10);
      height: auto;

      @include desktop(min) {
        min-width: scale(15);
        max-width: scale(15);
      }
    }
  }

  &-title {
    font-size: scale(20);
    font-weight: 900;

    @include tablet(max) {
      text-align: center;
    }

    @include desktop(min) {
      font-size: scale(39);
      max-width: scale(590);
    }
  }

  :deep() {
    .a-btn {
      margin-top: auto;

      @include desktop(min) {
        max-width: scale(426);
      }
    }
  }
}
</style>
