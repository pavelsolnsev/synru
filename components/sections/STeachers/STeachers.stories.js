import STeachers from './STeachers.vue';

export default {
  title: 'sections/STeachers',
  component: STeachers,
  argTypes: {},
};

const Template = (args) => ({
  components: { STeachers },
  setup() {
    return { args };
  },
  template:
    '<div><STeachers v-bind="args"/></div>',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Команда Центра карьеры',
  tags: ['centr-karery'],
};
