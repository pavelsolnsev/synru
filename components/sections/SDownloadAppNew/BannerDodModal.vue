<script setup lang='ts'>
interface Props {
  formTitle?: string;
  date?: string;
  time?: string;
  title?: string;
  format?: string;
  imageFormLg?: string;
  imageFormMd?: string;
  imageFormSm?: string;
  actionParams?: { param: string }[];
}

defineProps<Props>();
</script>

<template>
  <MModalForm
    class="m-modal-form"
    :title="formTitle"
    title-class="a-font_slider-text"
    btn="Подать заявку"
    form-name
    form-phone
    :image-lg="imageFormLg"
    :image-md="imageFormMd"
    :image-sm="imageFormSm"
    :action-params
  >
    <div class="ether_banner__modal-text">
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
        class="a-font_h3 ether_banner__title"
        v-html="title"
      />
    </div>
  </MModalForm>
</template>

<style scoped lang='scss'>
.s-download-app-new__dod {
  &-tags {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: scale(6);
    margin-bottom: scale(18);

    @include tablet(max) {
      justify-content: center;
    }

    @include desktop {
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

    @include desktop {
      min-height: scale(31);
      gap: scale(8)
    }

    svg {
      min-width: scale(10);
      max-width: scale(10);
      height: auto;

      @include desktop {
        min-width: scale(15);
        max-width: scale(15);
      }
    }
  }
}

.ether_banner__modal-text {
  position: absolute;
  top: var(--padding_def);
  left: var(--padding_def);

  .ether_banner__title {
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
  .ether_banner__time {
    font-size: scale(18);

    @include desktop(min) {
      font-size: scale(24);
    }
  }
}
</style>

<style lang='scss'>
.--modal-banner-dod-modal {
  .m-modal-content {
    max-width: scale(420);
    @include desktop {
      max-width: unset;
    }
  }

  .m-modal-form {
    overflow: auto;
    align-self: normal;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    @include desktop {
      max-height: unset;
      min-height: auto;
    }
    &__img {
      flex: none;
      height: scale(356);

      @include desktop {
        height: scale(318);
      }

      img {
        object-fit: cover;
        object-position: center;
        width: 100%;
        height: 100%;
      }
    }
  }

  .m-form__title {
    @include tablet(min) {
      position: static;
    }

    @include desktop {
      font-size: scale(26);
    }

    .hidden-sm {
      @include mobile() {
        display: none;
      }
    }

    .hidden-min-md {
      @include tablet(min) {
        display: none;
      }
    }
  }
}
</style>