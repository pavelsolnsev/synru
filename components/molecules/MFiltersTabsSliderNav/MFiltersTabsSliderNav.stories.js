import MFiltersTabsSliderNav from './MFiltersTabsSliderNav.vue';

export default {
  title: 'Molecules/MFiltersTabsSliderNav',
  component: MFiltersTabsSliderNav,
  argTypes: {},
};

const Template = (args) => ({
  components: { MFiltersTabsSliderNav },
  setup() {
    return { args };
  },
  template: '<m-filters-tabs-slider-nav v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  tabs: [
    { title: 'Психология', value: 'Психология' },
    { title: 'Программирование', value: 'Программирование' },
    { title: 'Дизайн', value: 'Дизайн' },
    { title: 'Лингвистика', value: 'Лингвистика' },
    { title: 'E-commerce', value: 'E-commerce' },
    { title: 'Управление', value: 'Управление' },
    { title: 'Интернет-маркетинг', value: 'Интернет-маркетинг' },
    { title: 'Геймдизайн', value: 'Геймдизайн' },
    { title: 'Искусственный интеллект', value: 'Искусственный интеллект' },
    { title: 'Анимация', value: 'Анимация' },
  ],
};
