import SProgramLearningMobile from './SProgramLearningMobile.vue';

export default {
  title: 'Sections/SProgramLearningMobile',
  component: SProgramLearningMobile,
  argTypes: {},
};

const Template = (args) => ({
  components: { SProgramLearningMobile },
  setup() {
    return { args };
  },
  template: '<s-program-learning-mobile v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
