import MSearch from './MSearch.vue';

export default {
  title: 'Molecules/MSearch',
  component: MSearch,
  argTypes: {},
};

const Template = (args) => ({
  components: { MSearch },
  setup() {
    return { args };
  },
  template: '<m-search v-bind="args" />',
});

export const Default = Template.bind({});
