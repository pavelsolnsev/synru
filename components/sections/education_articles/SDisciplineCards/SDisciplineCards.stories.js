import SDisciplineCards from './SDisciplineCards.vue';

export default {
  title: 'Sections/Articles/SDisciplineCards',
  component: SDisciplineCards,
  argTypes: {},
};

const Template = (args) => ({
  components: { SDisciplineCards },
  setup() {
    return { args };
  },
  template: '<SDisciplineCards v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Заголовок',
  items: [
    {
      title: 'Ссылка 1',
      ext: 'PDF',
      to: '#',
    },
  ],
};
