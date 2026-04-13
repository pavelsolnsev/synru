import ASvgMono from './ASvgMono.vue';

export default {
  title: 'Atoms/ASvgMono',
  component: ASvgMono,
  argTypes: {
    name: {
      control: { type: 'text' },
    },
    type: {
      control: { type: 'select' },
      options: ['mono', 'colors'],
    },
  },
};

const Template = (args) => ({
  components: { ASvgMono },
  setup() {
    return { args };
  },
  template: '<a-svg-mono v-bind="args" />',
});

export const Burger = Template.bind({});
Burger.args = { name: 'burger', type: 'mono' };

export const Clock = Template.bind({});
Clock.args = { name: 'clock', type: 'mono' };

export const Email = Template.bind({});
Email.args = { name: 'email', type: 'mono' };
