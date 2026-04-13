import SHistory from './SHistory.vue';

export default {
  title: 'Sections/SHistory',
  component: SHistory,
  argTypes: {},
};

const Template = (args) => ({
  components: { SHistory },
  setup() {
    return { args };
  },
  template: '<s-history v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
