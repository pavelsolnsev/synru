import SCalculator from './SCalculator.vue';

export default {
  title: 'Sections/Articles/SCalculator',
  component: SCalculator,
  argTypes: {},
};

const Template = (args) => ({
  components: { SCalculator },
  setup() {
    return { args };
  },
  template: '<SCalculator v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
