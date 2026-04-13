import SPlatform from './SPlatform.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SPlatform',
  component: SPlatform,
  argTypes: {},
};

const Template = (args) => ({
  components: { SPlatform },
  setup() {
    return { args };
  },
  template: '<s-platform v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  docLink: synergyApi('uploads/documents/minobr_25_12_2020_N_1580.pdf'),
};

