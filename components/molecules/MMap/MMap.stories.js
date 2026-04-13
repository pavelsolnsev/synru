import MMap from './MMap.vue';
import { dataMock } from './mapData';

export default {
  title: 'Molecules/MMap',
  component: MMap,
  argTypes: {},
  parameters: {
    mockData: [
      {
        url: 'https://example.com/old/api.php?action=getRegions',
        method: 'GET',
        status: 200,
        response: dataMock,
      },
    ],
  },
};

const Template = (args) => ({
  components: { MMap },
  setup() {
    return { args };
  },
  template: '<MMap v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {};
