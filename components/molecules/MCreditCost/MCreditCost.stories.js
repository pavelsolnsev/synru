import MCreditCost from './MCreditCost.vue';

export default {
  title: 'Molecules/MCreditCost',
  component: MCreditCost,
  argTypes: {},
};

const Template = (args) => ({
  components: { MCreditCost },
  setup() {
    return { args };
  },
  template: '<MCreditCost v-bind="args" />',
});

export const Default = Template.bind({});

