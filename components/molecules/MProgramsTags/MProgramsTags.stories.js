import MProgramsTags from './MProgramsTags.vue';

export default {
  title: 'Molecules/MProgramsTags',
  component: MProgramsTags,
  argTypes: {},
};

const Template = (args) => ({
  components: { MProgramsTags },
  setup() {
    return { args };
  },
  template: '<m-programs-tags v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  tags: [
    { text: 'Популярные', value: 100 },
    { text: 'IT', value: 101 },
    { text: 'Международные', value: 102 },
    { text: 'Медицина', value: 103 },
    { text: 'Профессии с 0', value: 104 },
  ],
};
