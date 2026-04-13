import SPaymentsOptions from './SPaymentsOptions.vue';

export default {
  title: 'sections/SPaymentsOptions',
  component: SPaymentsOptions,
  argTypes: {},
};

const Template = (args) => ({
  components: { SPaymentsOptions },
  setup() {
    return { args };
  },
  template:
    '<div><SPaymentsOptions v-bind="args"/></div>',
});

export const Default = Template.bind({});
