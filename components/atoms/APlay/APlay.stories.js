import APlay from './APlay.vue';

export default {
  title: 'Atoms/APlay',
  component: APlay,
  argTypes: {},
};

const Template = (args) => ({
  components: { APlay },
  setup() {
    return { args };
  },
  template: '<a-play v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
