import SHowProceed from './SHowProceed.vue';

export default {
  title: 'Sections/SHowProceed',
  component: SHowProceed,
  argTypes: {},
};

const Template = (args) => ({
  components: { SHowProceed },
  setup() {
    return { args };
  },
  template: '<s-how-proceed v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
