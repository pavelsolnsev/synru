import MAccordion from './MAccordion.vue';

export default {
  title: 'Molecules/MAccordion',
  component: MAccordion,
  argTypes: {},
};

const Template = (args) => ({
  components: { MAccordion },
  setup() {
    return { args };
  },
  template: '<MAccordion v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      title: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
      content: {
        text: 'Donec semper dapibus ligula, sit amet varius augue. Vestibulum placerat convallis dui id facilisis. Donec neque nisi, consectetur ut lacus sed, suscipit cursus ante. Nunc luctus magna vel mollis facilisis. Integer justo libero, imperdiet eget ornare vitae, posuere vitae nisi.',
      },
    },
    {
      title: {
        text: 'Pellentesque dignissim velit dolor, id tempor eros auctor in',
      },
      content: {
        text: 'Nulla facilisi. Integer in purus velit. Integer vestibulum non arcu ac laoreet. Duis mollis quis purus laoreet condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
      },
    },
    {
      title: {
        text: 'Vestibulum accumsan est at metus ultrices ultrices',
      },
      content: {
        text: 'Nunc eget turpis ac ante feugiat sodales nec ac mauris. Sed malesuada justo ut nisi suscipit, id semper sapien vulputate. Vestibulum venenatis, massa vitae suscipit tempor, massa enim dapibus ex, sed congue nulla mauris vel dolor. ',
      },
    },
  ],
  multipleOpen: false,
};

export const Multiple = Template.bind({});
Multiple.args = {
  items: [
    {
      title: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
      content: {
        text: 'Donec semper dapibus ligula, sit amet varius augue. Vestibulum placerat convallis dui id facilisis. Donec neque nisi, consectetur ut lacus sed, suscipit cursus ante. Nunc luctus magna vel mollis facilisis. Integer justo libero, imperdiet eget ornare vitae, posuere vitae nisi.',
      },
    },
    {
      title: {
        text: 'Pellentesque dignissim velit dolor, id tempor eros auctor in',
      },
      content: {
        text: 'Nulla facilisi. Integer in purus velit. Integer vestibulum non arcu ac laoreet. Duis mollis quis purus laoreet condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
      },
    },
    {
      title: {
        text: 'Vestibulum accumsan est at metus ultrices ultrices',
      },
      content: {
        text: 'Nunc eget turpis ac ante feugiat sodales nec ac mauris. Sed malesuada justo ut nisi suscipit, id semper sapien vulputate. Vestibulum venenatis, massa vitae suscipit tempor, massa enim dapibus ex, sed congue nulla mauris vel dolor. ',
      },
    },
  ],
  multipleOpen: true,
};
