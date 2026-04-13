import SCardTags from './SCardTags.vue';

export default {
  title: 'Sections/Articles/SCardTags',
  component: SCardTags,
  argTypes: {},
};

const Template = (args) => ({
  components: { SCardTags },
  setup() {
    return { args };
  },
  template: '<SCardTags v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Заголовок',
  text: 'Описание',
  tags: [
    { title: 'Материалы ЕГЭ 2023', to: '#' },
    { title: 'Расписание ЕГЭ', to: '#' },
    { title: 'Ссылка 3', to: '#' },
    { title: 'Таблица результатов', to: '#' },
    { title: 'Ссылка 5', to: '#' },
  ],
};
