import SForm from './SForm.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'sections/SForm',
  component: SForm,
  argTypes: {},
};

const Template = (args) => ({
  components: { SForm },
  setup() {
    return { args };
  },
  template:
    '<div><SForm v-bind="args"/></div>',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Каталог образовательных программ',
  subtitle: 'Подзаголовок формы',
  description: 'Узнайте подробную информацию о факультетах, студенческой жизни и трудоустройстве',
  tags: ['pdf', 'pdff'],
  imageLg: synergyApi('uploads/content/s-form/3_lg.webp'),
  imageMd: synergyApi('uploads/content/s-form/3_md.webp'),
  imageSm: synergyApi('uploads/content/s-form/3_sm.webp'),
  formMail: 'true',
  btnText: 'Подать заявку',
  bgColor: 'white',
};
