import MFormPay from './MFormPay.vue';

export default {
  title: 'Molecules/MFormPay',
  component: MFormPay,
  argTypes: {},
};

const Template = (args) => ({
  components: { MFormPay },
  setup() {
    return { args };
  },
  template: '<MFormPay v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
