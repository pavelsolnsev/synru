import SProgramHowProceed from './SProgramHowProceed.vue';

export default {
  title: 'Sections/SProgramHowProceed',
  component: SProgramHowProceed,
  argTypes: {},
};

const Template = (args) => ({
  components: { SProgramHowProceed },
  setup() {
    return { args };
  },
  template: '<s-program-how-proceed v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
