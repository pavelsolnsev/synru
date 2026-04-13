import AMenuLink from './AMenuLink.vue';

export default {
  title: 'Atoms/AMenuLink',
  component: AMenuLink,
  argTypes: {
    to: {
      control: { type: 'text' },
    },
    bgColor: {
      control: { type: 'select' },
      options: ['default', 'red'],
    },
    textColor: {
      control: { type: 'select' },
      options: ['default', 'red'],
    },
    active: {
      control: { type: 'boolean' },
    },
    onClick: {},
  },
};

const Template = (args) => ({
  components: { AMenuLink },
  setup() {
    return { args };
  },
  template: '<a-menu-link v-bind="args">Абитуриентам</a-menu-link>',
});

export const Default = Template.bind({});
Default.args = { to: '/' };
export const BgRed = Template.bind({});
BgRed.args = { to: '/', bgColor: 'red' };
export const TextRed = Template.bind({});
TextRed.args = { to: '/', textColor: 'red' };
export const Active = Template.bind({});
Active.args = { to: '/', active: true };