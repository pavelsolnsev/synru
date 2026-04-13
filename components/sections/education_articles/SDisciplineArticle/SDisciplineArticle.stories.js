import SDisciplineArticle from './SDisciplineArticle.vue';

export default {
  title: 'Sections/Articles/SDisciplineArticle',
  component: SDisciplineArticle,
  argTypes: {},
};

const Template = (args) => ({
  components: { SDisciplineArticle },
  setup() {
    return { args };
  },
  template: '<SDisciplineArticle v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
