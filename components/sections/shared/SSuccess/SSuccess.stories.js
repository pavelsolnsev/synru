import SSuccess from './SSuccess.vue';

export default {
  title: 'Sections/SSuccess',
  component: SSuccess,
  argTypes: {},
};

const Template = (args) => ({
  components: { SSuccess },
  setup() {
    return { args };
  },
  template: '<s-success v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
