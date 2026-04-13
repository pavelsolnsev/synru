import SCoursesWhy from './SCoursesWhy.vue';

export default {
  title: 'Sections/SCoursesWhy',
  component: SCoursesWhy,
  argTypes: {},
};

const Template = (args) => ({
  components: { SCoursesWhy },
  setup() {
    return { args };
  },
  template: '<s-courses-why v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
