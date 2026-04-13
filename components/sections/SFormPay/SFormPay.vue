<script lang="ts" setup>
import type { FormBgColor } from '~/types';

interface Tag {
  tag: string
}
interface Props {
  bgColor?: string;
  title: string;
  formTitle: string;
  tags?: Tag[];
  descClass?: string;
  description?: string;
  text?: string;
  imageSm?: string;
  imageMd?: string;
  imageLg?: string;
  btnText: string;
  formBgColor: FormBgColor;
}

const {
  descClass = 'a-font_h6',
  bgColor,
} = defineProps<Props>();

const runtimeConfig = useRuntimeConfig();

const contentClass = bgColor ? `s-form__content--bgColor-${bgColor}` : '';

let pay: null | HTMLDivElement = null;
let contractNum: null | HTMLInputElement = null;
let nameInputs: null | NodeListOf<HTMLInputElement> = null;

onMounted(() => {
  const findPay = document.querySelector('.s-form-pay') as HTMLDivElement;
  if (!findPay) return;
  pay = findPay;
  pay.addEventListener('submit', payment);

  const findContractNum = pay.querySelector('input[name="contract_num_num"]') as HTMLInputElement;
  if (findContractNum) {
    contractNum = findContractNum;
    contractNum.addEventListener('input', contractNumHandler);
  }

  const findNameInputs = pay.querySelectorAll('input[name^="fio"]') as NodeListOf<HTMLInputElement>;
  if (findNameInputs) {
    nameInputs = findNameInputs;
    nameInputs.forEach((el) => {
      el.addEventListener('input', nameInputsHandler);
    });
  }
});

onBeforeUnmount(() => {
  if (pay) pay.removeEventListener('submit', payment);
  if (contractNum) contractNum.removeEventListener('input', contractNumHandler);
  if (nameInputs) {
    nameInputs.forEach((el) => {
      el.removeEventListener('input', nameInputsHandler);
    });
  }
});

function payment() {
  let namevar = '';
  const inputFio = pay?.querySelector("input[name='fio']") as HTMLInputElement;
  const inputName = pay?.querySelector("input[name='name']") as HTMLInputElement;
  if (inputFio) {
    namevar = inputFio.value;
  } else if (inputName) {
    namevar = inputName.value;
  }


  let email = '';
  const findEmail = pay?.querySelector('input[name="email"]') as HTMLInputElement;
  if (findEmail) {
    email = findEmail.value;
  }

  let from = '';
  const findFrom = pay?.querySelector('input[name="from"]') as HTMLInputElement;
  if (findFrom) {
    from = findFrom.value;
  }

  let contract_num = '';
  const findContractNum = pay?.querySelector('input[name="contract_num"]') as HTMLInputElement;
  if (findContractNum) {
    contract_num = findContractNum.value;
  }

  let eshopId = '';
  const findEshopId = pay?.querySelector('input[name="eshopId"]') as HTMLInputElement;
  if (findEshopId) {
    eshopId = findEshopId.value;
  }

  if (!eshopId) {
    eshopId = '434911';
  }

  if (!namevar) {
    const findFioF = pay?.querySelector('input[name="fio_f"]') as HTMLInputElement;
    const findFioI = pay?.querySelector('input[name="fio_i"]') as HTMLInputElement;
    const findFioO = pay?.querySelector('input[name="fio_o"]') as HTMLInputElement;

    const fio_f = findFioF ? findFioF.value : '';
    const fio_i = findFioI ? findFioI.value : '';
    const fio_o = findFioO ? findFioO.value : '';

    namevar = fio_f + ' ' + fio_i + ' ' + fio_o;
  }

  if (!contract_num) {
    const findNumNum = pay?.querySelector('input[name="contract_num_num"]') as HTMLInputElement;
    const num = findNumNum ? findNumNum.value : '';

    //let year = pay.querySelector('input[name="contract_num_year"]') ? pay.querySelector('input[name="contract_num_year"]').value : '';

    contract_num = num;
  }

  // Добавление комисии, если есть поле final_sum
  const findSum = pay?.querySelector("input[name='sum']") as HTMLInputElement;
  const sum = findSum?.value ?? '';

  const payBase = runtimeConfig.public.intellectMoneyPayUrl as string;
  if (!payBase) {
    console.warn('NUXT_PUBLIC_INTELLECTMONEY_PAY_URL не задан — редирект на оплату отключён.');
    return;
  }

  const join = payBase.includes('?') ? '&' : '?';
  location.href = `${payBase}${join}invoicepayment&shopId=${encodeURIComponent(eshopId)}&price=${encodeURIComponent(sum)}&email=${encodeURIComponent(email)}&username=${encodeURIComponent(namevar)}&form=${encodeURIComponent(from)}&contractNum=${encodeURIComponent(contract_num)}&land=demo-pay`;
}

function contractNumHandler(e: Event) {
  const target = e.target as HTMLInputElement;

  target.value = target.value.replace(/[^0-9/]+/g, '');
}

function nameInputsHandler(e: Event) {
  const target = e.target as HTMLInputElement;

  target.value = target.value.replace(/[^[a-zA-Zа-яА-ЯёЁ]+$/g, '');
}
</script>

<template>
  <MSection class="s-form s-form-pay">
    <div class="s-form__wrap">
      <div
        class="s-form__content"
        :class="contentClass"
      >
        <h4
          class="s-form__title a-font_h2"
        >
          {{ title }}
        </h4>
        <div
          v-for="(tag, index) in tags"
          :key="index"
          class="s-form__tags"
        >
          <ATag
            variant="white"
            :text="tag?.tag"
          />
        </div>
        <div
          v-if="description"
          class="s-form__desc"
          :class="descClass"
        >
          {{ description }}
        </div>
        <div
          v-if="text"
          class="s-form__text a-font_l-m"
        >
          {{ text }}
        </div>
        <picture
          v-if="imageSm"
          class="s-form__image"
        >
          <source
            v-if="imageLg"
            media="(min-width: 1200px)"
            :srcset="imageLg"
          >
          <source
            v-if="imageMd"
            media="(min-width: 768px)"
            :srcset="imageMd"
          >
          <AImg
            :src="imageSm"
            alt=""
            loading="lazy"
          />
        </picture>
      </div>
      <div class="s-form__form">
        <MFormPay
          :title="formTitle"
          :bg-color="formBgColor"
          :btn="btnText"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
  @import '../SForm/SForm.scss';
</style>
<style lang="scss" scoped>
  @import './SFormPay.scss';
</style>
