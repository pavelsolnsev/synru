import SHappiness from './SHappiness.vue';

export default {
  title: 'Sections/SHappiness',
  component: SHappiness,
  argTypes: {},
};

const Template = (args) => ({
  components: { SHappiness },
  setup() {
    return { args };
  },
  template: '<s-happiness v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
