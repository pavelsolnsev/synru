import SThanksBanner from './SThanksBanner.vue';

export default {
  title: 'Sections/SThanksBanner',
  component: SThanksBanner,
  argTypes: {},
};

const Template = (args) => ({
  components: { SThanksBanner },
  setup() {
    return { args };
  },
  template: '<SThanksBanner v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {};
