import SFormPay from './SFormPay.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'sections/SFormPay',
  component: SFormPay,
  argTypes: {},
};

const Template = (args) => ({
  components: { SFormPay },
  setup() {
    return { args };
  },
  template: '<div><SFormPay v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {
  bgColor: 'white',
  title: 'Оплата обучения картой',
  description: 'Быстро, просто, удобно',
  imageSm: synergyApi('uploads/content/formpay/form_pay_sm.webp'),
  imageMd: synergyApi('uploads/content/formpay/form_pay_md.webp'),
  imageLg: synergyApi('uploads/content/formpay/form_pay_lg.webp'),
  formTitle: 'Заполните форму для оплаты',
  formBgColor: 'white',
  btnText: 'Оплатить',
  tags: [
    { tag: 'Проверка' },
  ],
};
