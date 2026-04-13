import MPhones from './MPhones.vue';

export default {
  title: 'Molecules/MPhones',
  component: MPhones,
  argTypes: {},
};

const Template = (args) => ({
  components: { MPhones },
  setup() {
    return { args };
  },
  template: '<MPhones v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {
  showBtn: 'false',
  phones: ['+7 495 800-10-01', '8 800 100-00-11'],
};

export const ButtonOnMobile = Template.bind({});
ButtonOnMobile.args = {
  showBtn: 'true',
  phones: ['+7 495 800-10-01', '8 800 100-00-11'],
};
