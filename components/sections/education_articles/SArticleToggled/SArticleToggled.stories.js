import SArticleToggled from './SArticleToggled.vue';

export default {
  title: 'Sections/Articles/SArticleToggled',
  component: SArticleToggled,
  argTypes: {},
};

const Template = (args) => ({
  components: { SArticleToggled },
  setup() {
    return { args };
  },
  template: '<SArticleToggled v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  items:[
    {
      title: {
        text: 'Первый вопрос',
      },
      content: {
        text: 'Первый ответ',
      },
      isOpen: false,
      itemKey: '111',
    },
  ],
};
