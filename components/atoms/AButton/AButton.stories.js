import AButton from './AButton.vue';

export default {
  title: 'Atoms/AButton',
  component: AButton,
  argTypes: {
    bgColor: {
      control: { type: 'select' },
      options: ['red', 'black', 'white'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    onClick: {},
  },
};

const Template = (args) => ({
  components: { AButton },
  setup() {
    return { args };
  },
  template: '<a-button v-bind="args">Button</a-button>',
});

export const Default = Template.bind({});
Default.args = {};

export const Red = Template.bind({});
Red.args = { bgColor: 'red' };

export const Black = Template.bind({});
Black.args = { bgColor: 'black' };

export const White = Template.bind({});
White.args = { bgColor: 'white' };
