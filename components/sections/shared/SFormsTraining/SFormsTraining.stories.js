import SFormsTraining from './SFormsTraining.vue';

export default {
  title: 'Sections/SFormsTraining',
  component: SFormsTraining,
  argTypes: {},
};

const Template = (args) => ({
  components: { SFormsTraining },
  setup() {
    return { args };
  },
  template: '<s-forms-training v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
