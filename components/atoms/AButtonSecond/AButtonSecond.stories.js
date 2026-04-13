import AButtonSecond from './AButtonSecond.vue';

export default {
  title: 'Atoms/AButtonSecond',
  component: AButtonSecond,
  argTypes: {
    bgColor: {
      control: { type: 'select' },
      options: ['grey', 'transparent'],
    },
    onClick: {},
  },
};

const Template = (args) => ({
  components: { AButtonSecond },
  setup() {
    return { args };
  },
  template: '<a-button-second v-bind="args">AButtonSecond</a-button-second>',
});

export const Default = Template.bind({});
Default.args = {};

export const Grey = Template.bind({});
Grey.args = { bgColor: 'grey' };

export const Transparent = Template.bind({});
Transparent.args = { bgColor: 'transparent' };

