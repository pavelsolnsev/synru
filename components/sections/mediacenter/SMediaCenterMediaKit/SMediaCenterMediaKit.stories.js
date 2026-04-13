import SMediaCenterMediaKit from './SMediaCenterMediaKit.vue';

export default {
  title: 'sections/mediacenter/SMediaCenterMediaKit',
  component: SMediaCenterMediaKit,
  argTypes: {},
};

const Template = (args) => ({
  components: { SMediaCenterMediaKit },
  setup() {
    return { args };
  },
  template:
    '<div><SMediaCenterMediaKit v-bind="args"/></div>',
});

export const Default = Template.bind({});


Default.args = {
};
