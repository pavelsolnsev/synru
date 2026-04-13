import SDirections from './SDirections.vue';

export default {
  title: 'sections/SDirections',
  component: SDirections,
  argTypes: {},
};

const Template = (args) => ({
  components: { SDirections },
  setup() {
    return { args };
  },
  template:
    '<div><SDirections v-bind="args"/></div>',
});

export const Default = Template.bind({});

