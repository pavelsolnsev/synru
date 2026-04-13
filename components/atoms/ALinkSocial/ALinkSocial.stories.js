import ALinkSocial from './ALinkSocial.vue';

export default {
  title: 'Atoms/ALinkSocial',
  component: ALinkSocial,
  argTypes: {
    to: {
      control: { type: 'text' },
    },
    onClick: {},
  },
};

const Template = (args) => ({
  components: { ALinkSocial },
  setup() {
    return { args };
  },
  template: '<a-link-social v-bind="args"></a-link-social>',
});

const TemplateText = (args) => ({
  components: { ALinkSocial },
  setup() {
    return { args };
  },
  template: '<a-link-social v-bind="args">Телеграмм</a-link-social>',
});

export const Telegram = Template.bind({});
Telegram.args = { to: 't.me' };
export const Youtube = Template.bind({});
Youtube.args = { to: 'youtube.com' };
export const VK = Template.bind({});
VK.args = { to: 't.me' };
export const TelegramWithText = TemplateText.bind({});
TelegramWithText.args = { to: 't.me' };