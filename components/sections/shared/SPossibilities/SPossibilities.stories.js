import SPossibilities from './SPossibilities.vue';

export default {
  title: 'Sections/SPossibilities',
  component: SPossibilities,
  argTypes: {},
};

const Template = (args) => ({
  components: { SPossibilities },
  setup() {
    return { args };
  },
  template: '<s-possibilities v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
