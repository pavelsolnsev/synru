<script setup lang="ts">
import { PRIVACY } from '~/constants/documents';

const props = defineProps<{
  type?: 'course' | 'program',
  modalTitle: string,
  actionParams?: { param: string }[],
}>();

const subtitle = props.type === 'course' ? 'Учись сейчас - плати потом' : 'Презентацию о программе обучения вы получите по СМС и в Telegram';
const id = props.type === 'course' ? 'popup__form_redesign-course' : 'popup__form_redesign';
</script>

<template>
  <div
    :id
    class="a-popup"
  >
    <div class="a-popup__container">
      <!-- popup_info-->
      <div class="a-popup__text">
        <p class="a-popup__title" v-html="props.modalTitle" />
        <p class="a-popup__subtitle" v-html="subtitle" />
      </div>
      <MForm
        title=""
        :form-phone="true"
        :form-name="false"
        :action-params
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.a-popup {
// 	top: scale(-90);
	position: relative;
// 	overflow: visible;
	border-radius: scale(16);
	max-width: scale(910);
// 	box-sizing: border-box;

 :deep() {
		.f-button.is-close-btn {
			background-color: var(--a-color_grey_60);
		}
 }
}

.a-popup__container {
	border-radius: scale(16);
	background: #F5F5F6;
	padding: scale(12);
}

@media (min-width: 1200px) {
	.a-popup__container {
		border-radius: scale(32);
		padding: scale(24);
	}
}

.a-popup__text {
	border-radius: scale(12);
	background-color: #fff;
	padding: scale(12);
	margin: 0;
}

@media screen and (min-width: 1200px) {
	.a-popup__text {
		padding: scale(24);
	}
}

.m-form {
	margin-top: scale(12);
  :deep() {
    .a-input {
      height: auto;
      width: 100%;
      color: #7E7F81;
      font-size: scale(16);
      font-style: normal;
      font-weight: 500;
      line-height: 120%;
      /* 16.8px */
      border-radius: scale(8);
      outline: none;
      border: none;
      background: #ECEDF0;
      padding: scale(10.5) scale(12);
      @media screen and (min-width: 1200px) {
        font-size: scale(19);
        border-radius: scale(20);
        padding: scale(20);
      }
    }

    .a-btn {
      height: auto;
      width: 100%;
      border-radius: scale(12);
      background: #ED131C;
      box-shadow: 0 scale(6) 0 0 rgba(0, 0, 0, 0.02);
      backdrop-filter: blur(scale(30));
      color: #FFF;
      font-size: scale(18);
      font-style: normal;
      font-weight: 600;
      line-height: 130%;
      outline: none;
      border: none;
      padding: scale(15.5);
      margin-top: scale(32);
      @media screen and (min-width: 1200px) {
        font-size: scale(32);
        padding: scale(24);
        margin-top: scale(40);
      }
    }
  }
}

.a-popup__title {
	color: #1C1C1C;
	font-size: scale(27);
	font-style: normal;
	font-weight: 600;
	line-height: 93%;
	letter-spacing: scale(-0.54);
	word-wrap: break-word;
	margin: 0;
}

@media screen and (min-width: 768px) {
	.a-popup__title {
		min-height: scale(50);
	}
}

@media screen and (min-width: 1200px) {
	.a-popup__title {
		font-size: scale(56);
		min-height: scale(208);
	}
}

.a-popup__subtitle {
	color: var(--Black, #1C1C1C);
	font-size: scale(12);
	font-style: normal;
	font-weight: 500;
	line-height: 120%;
	margin: 0;
	margin-top: scale(23);
}

@media screen and (min-width: 1200px) {
	.a-popup__subtitle {
		font-size: scale(18);
		line-height: 110%;
		margin-top: scale(28);
	}
}

.a-popup .fancybox-close-small {
	position: absolute;
	background-color: #E0E1E5;
	width: scale(44);
	height: scale(44);
	border-radius: 8px;
	top: scale(-46);
}

@media screen and (min-width: 1200px) {
	.a-popup .fancybox-close-small {
		width: scale(60);
		height: scale(60);
		top: 0;
		left: auto;
		right: -75px;
		transform: none;
	}
}

.a-popup #phone-error.error {
	display: none !important;
}
</style>
