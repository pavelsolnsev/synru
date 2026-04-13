import SArticleForm from './SArticleForm.vue';

export default {
  title: 'Sections/Articles/SArticleForm',
  component: SArticleForm,
  argTypes: {},
};

const Template = (args) => ({
  components: { SArticleForm },
  setup() {
    return { args };
  },
  template: '<s-article-form v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Оставьте заявку на обучение',
  subtitle: 'Заполните форму и наш менеджер свяжется с вами',
};
