import SDormitorySliderV from './SDormitorySliderV.vue';

export default {
  title: 'Sections/SDormitorySliderV',
  component: SDormitorySliderV,
  argTypes: {},
};

const Template = (args) => ({
  components: { SDormitorySliderV },
  setup() {
    return { args };
  },
  template: '<s-dormitory-slider-v v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
