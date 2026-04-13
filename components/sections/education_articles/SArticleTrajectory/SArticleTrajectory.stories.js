import SArticleTrajectory from './SArticleTrajectory.vue';

export default {
  title: 'Sections/Articles/SArticleTrajectory',
  component: SArticleTrajectory,
  argTypes: {},
};

const Template = (args) => ({
  components: { SArticleTrajectory },
  setup() {
    return { args };
  },
  template: '<SArticleTrajectory v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Заголовок',
  items: [
    'Шаг 1',
    'Шаг 2',
    'Шаг 3',
    'Шаг 4',
    'Шаг 5',
    'Шаг 6',
  ],
};
