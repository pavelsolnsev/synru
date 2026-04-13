import SArticleNb from './SArticleNb.vue';

export default {
  title: 'Sections/Articles/SArticleNb',
  component: SArticleNb,
  argTypes: {},
};

const Template = (args) => ({
  components: { SArticleNb },
  setup() {
    return { args };
  },
  template: '<SArticleNb v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  text: '<p><strong>ГВЭ, ОГЭ и ЕГЭ — всё это разные формы сдачи государственной итоговой аттестации.</strong> По результатам этих экзаменов ученик завершает определённый этап школьной программы и может выбирать дальнейший путь. Подробнее про итоговую аттестацию читайте в нашей статье&nbsp;«ЕГЭ, ОГЭ, ГВЭ — что это за экзамены и чем они отличаются?».</p>',
};
