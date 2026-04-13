import SCreditSecond from './SCreditSecond.vue';

export default {
  title: 'Sections/SCreditSecond',
  component: SCreditSecond,
  argTypes: {},
};

const Template = (args) => ({
  components: { SCreditSecond },
  setup() {
    return { args };
  },
  template: '<s-credit-second v-bind="args"/>',
});


export const Default = Template.bind({});
Default.args = {};
