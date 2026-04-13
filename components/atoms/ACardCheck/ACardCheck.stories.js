import ACardCheck from './ACardCheck.vue';

export default {
  title: 'Atoms/ACardCheck',
  component: ACardCheck,
  argTypes: {},
};

const Template = (args) => ({
  components: { ACardCheck },
  setup() {
    return { args };
  },
  template: '<a-card-check v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
