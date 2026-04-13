import SCourseWhyUs from './SCourseWhyUs.vue';

export default {
  title: 'Sections/SCourseWhyUs',
  component: SCourseWhyUs,
  argTypes: {},
};

const Template = (args) => ({
  components: { SCourseWhyUs },
  setup() {
    return { args };
  },
  template: '<s-course-why-us v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  entity: {
    custom_field_values: [
      {
        for_whom: [
          {
            'title': 'Новичкам',
            'text': null,
          },
          {
            'title': 'Начинающим специалистам',
            'text': null,
          },
          {
            'title': 'Разработчикам и&nbsp;тестировщикам',
            'text': null,
          },
        ],
      },
    ],
  },
};
