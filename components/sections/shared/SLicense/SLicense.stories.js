import SLicense from './SLicense.vue';

export default {
  title: 'Sections/SLicense',
  component: SLicense,
  argTypes: {},
};

const Template = (args) => ({
  components: { SLicense },
  setup() {
    return { args };
  },
  template: '<s-license v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
