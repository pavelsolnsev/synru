import SCourseLms from './SCourseLms.vue';

export default {
  title: 'Sections/SCourseLms',
  component: SCourseLms,
  argTypes: {},
};

const Template = (args) => ({
  components: { SCourseLms },
  setup() {
    return { args };
  },
  template: '<s-course-lms v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
