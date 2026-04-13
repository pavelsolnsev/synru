import SProgramForm from './SProgramForm.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SProgramForm',
  component: SProgramForm,
  argTypes: {},
};

const Template = (args) => ({
  components: { SProgramForm },
  setup() {
    return { args };
  },
  template: '<s-program-form v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  bgColor:'transparent',
  btnText: 'Узнать больше',
  descClass: 'a-font_h6',
  description: 'Узнай, как студенту взять кредит на&nbsp;образование по&nbsp;льготной ставке',
  formMail: false,
  formTitle: 'Заполните форму и наш менеджер свяжется с вами',
  imageLg: synergyApi('uploads/content/program/form/form_1_lg.webp'),
  imageMd: synergyApi('uploads/content/program/form/form_1_md.webp'),
  imageSm: synergyApi('uploads/content/program/form/form_1_sm.webp'),
  title: 'Кредит на образование с поддержкой государства',
};
