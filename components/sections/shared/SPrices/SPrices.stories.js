import SPrices from './SPrices.vue';

export default {
  title: 'Sections/SPrices',
  component: SPrices,
  argTypes: {},
};

const Template = (args) => ({
  components: { SPrices },
  setup() {
    return { args };
  },
  template: '<s-prices v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};

