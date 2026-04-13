import SStudentCouncil from './SStudentCouncil.vue';

export default {
  title: 'sections/SStudentCouncil',
  component: SStudentCouncil,
  argTypes: {},
};

const Template = (args) => ({
  components: { SStudentCouncil },
  setup() {
    return { args };
  },
  template:
    '<div><SStudentCouncil v-bind="args"/></div>',
});

export const Default = Template.bind({});
