import AShare from './AShare.vue';

export default {
  title: 'Atoms/Articles/AShare',
  component: AShare,
  argTypes: {},
};

const Template = (args) => ({
  components: { AShare },
  setup() {
    return { args };
  },
  template: '<AShare v-bind="args"/>',
});


export const Default = Template.bind({});
Default.args = {
  showLabel: true,
};
