import SStudentCenter from './SStudentCenter.vue';

export default {
  title: 'sections/SStudentCenter',
  component: SStudentCenter,
  argTypes: {},
};

const Template = (args) => ({
  components: { SStudentCenter },
  setup() {
    return { args };
  },
  template:
    '<div><SStudentCenter v-bind="args"/></div>',
});

export const Default = Template.bind({});