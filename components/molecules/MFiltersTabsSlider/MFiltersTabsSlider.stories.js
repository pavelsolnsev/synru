import MFiltersTabsSlider from './MFiltersTabsSlider.vue';

export default {
  title: 'Molecules/MFiltersTabsSlider',
  component: MFiltersTabsSlider,
  argTypes: {},
};

const Template = (args) => ({
  components: { MFiltersTabsSlider },
  setup() {
    return { args };
  },
  template: '<m-filters-tabs-slider v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  tabs: [
    { title: 'Технические', value: 'Технические', icon: 'faculty_1' },
    { title: 'Гуманитарные', value: 'Гуманитарные', icon: 'faculty_2' },
    { title: 'Медицинские', value: 'Медицинские', icon: 'faculty_3' },
    { title: 'Творческие', value: 'Творческие', icon: 'faculty_4' },
    { title: 'Экономические', value: 'Экономические', icon: 'faculty_5' },
  ],
};
