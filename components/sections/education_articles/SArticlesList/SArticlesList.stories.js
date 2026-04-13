import SArticlesList from './SArticlesList.vue';

export default {
  title: 'Sections/Articles/SArticlesList',
  component: SArticlesList,
  argTypes: {},
};

const Template = (args) => ({
  components: { SArticlesList },
  setup() {
    return { args };
  },
  template: '<s-articles-list v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
