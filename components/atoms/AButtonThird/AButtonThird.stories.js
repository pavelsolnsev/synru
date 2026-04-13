import AButtonThird from './AButtonThird.vue';

export default {
  title: 'Atoms/AButtonThird',
  component: AButtonThird,
  argTypes: {
    bgColor: {
      control: { type: 'select' },
      options: ['light', 'light-white', 'dark', 'red'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    rounding: {
      control: { type: 'select' },
      options: ['circle', 'rect'],
    },
    onClick: {},
  },
};

const Template = (args) => ({
  components: { AButtonThird },
  setup() {
    return { args };
  },
  template: '<a-button-third v-bind="args">Button</a-button-third>',
});

export const Default = Template.bind({});
Default.args = {};

export const Light = Template.bind({});
Light.args = { bgColor: 'light' };

export const LightWhite = Template.bind({});
LightWhite.args = { bgColor: 'light-white' };

export const Dark = Template.bind({});
Dark.args = { bgColor: 'dark' };

export const Red = Template.bind({});
Red.args = { bgColor: 'red' };
