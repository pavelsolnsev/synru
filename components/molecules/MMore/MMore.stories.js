import MMore from './MMore.vue';

export default {
  title: 'Molecules/MMore',
  component: MMore,
  argTypes: {},
};

const Template = (args) => ({
  components: { MMore },
  setup() {
    return { args };
  },
  template: '<MMore v-bind="args" />',
});

export const Default = Template.bind({});

Default.args = {
  href: 'https://ya.ru',
  text: 'Узнать больше',
};
