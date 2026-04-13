import SArticleMenu from './SArticleMenu.vue';

export default {
  title: 'Sections/Articles/SArticleMenu',
  component: SArticleMenu,
  argTypes: {},
};

const Template = (args) => ({
  components: { SArticleMenu },
  setup() {
    return { args };
  },
  template: '<s-article-menu v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  items: [{ text: '<a>Первый пункт</a>' }, { text: '<a>Второй пункт</a>' }],
};
