import SCooperation from './SCooperation.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SCooperation',
  component: SCooperation,
  argTypes: {},
};

const Template = (args) => ({
  components: { SCooperation },
  setup() {
    return { args };
  },
  template: '<s-cooperation v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Международное сотрудничество',
  description: 'Среди партнёров демо-вуза&nbsp;— множество вузов и&nbsp;компаний',
  btnText: 'Узнать о партнёрах',
  link: '/about/university_partners',
  cooperationItems:[
    {
      'icon': null,
      'image': synergyApi('uploads/content/s-cooperation/logo-1.svg'),
      'title': 'Демо-вуз является членом Европейского фонда гарантий качества электронного обучения (The European Foundation in E-Learning, EFQUEL)',
    },
    {
      'icon': null,
      'image': synergyApi('uploads/content/s-cooperation/logo-2.svg'),
      'title': 'Демо-вуз является членом Великой Хартии Университетов (Magna Charta Universitatum)',
    },
    {
      'icon': null,
      'image': synergyApi('uploads/content/s-cooperation/logo-3.svg'),
      'title': 'Демо-вуз входит в Международную ассоциацию университетов (International Association of Universities), работающую на базе ЮНЕСКО',
    },
  ],
};
