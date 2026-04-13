import SMediaCenterForMedia from './SMediaCenterForMedia.vue';

export default {
  title: 'sections/mediacenter/SMediaCenterForMedia',
  component: SMediaCenterForMedia,
  argTypes: {},
};

const Template = (args) => ({
  components: { SMediaCenterForMedia },
  setup() {
    return { args };
  },
  template:
    '<div><SMediaCenterForMedia v-bind="args"/></div>',
});

export const Default = Template.bind({});


Default.args = {

};
