import SDownloadApp from './SDownloadApp.vue';

export default {
  title: 'sections/SDownloadApp',
  component: SDownloadApp,
  argTypes: {},
};

const Template = (args) => ({
  components: { SDownloadApp },
  setup() {
    return { args };
  },
  template:
    '<div><SDownloadApp v-bind="args"/></div>',
});

export const Default = Template.bind({});

