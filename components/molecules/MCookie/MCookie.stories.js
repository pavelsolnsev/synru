import MCookie from './MCookie.vue';

export default {
  title: 'Molecules/MCookie',
  component: MCookie,
  argTypes: {},
};

const Template = (args) => ({
  components: { MCookie },
  setup() {
    return { args };
  },
  template: '<MCookie v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
