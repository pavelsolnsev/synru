import SQuizFranchises from './SQuizFranchises.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SQuizFranchises',
  component: SQuizFranchises,
  argTypes: {},
};

const Template = (args) => ({
  components: { SQuizFranchises },
  setup() {
    return { args };
  },
  template: '<SQuizFranchises v-bind="args"/>',
});


export const Default = Template.bind({});
Default.args = {
  title: 'Франшизы',
  buttonText: 'Стать партнером',
  titleClass: 'a-font_h1',
  showBreadcrumbs: true,
  routeName: 'franchises',
  bgImages:[
    { image: synergyApi('uploads/content/franchises/franchises-sm.webp') },
    { image: synergyApi('uploads/content/franchises/franchises-md.webp') },
    { image: synergyApi('uploads/content/franchises/franchises-lg.webp') },
  ],
};

