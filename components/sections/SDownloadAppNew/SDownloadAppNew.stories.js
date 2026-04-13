import SDownloadAppNew from './SDownloadAppNew.vue';

export default {
  title: 'sections/SDownloadAppNew',
  component: SDownloadAppNew,
  argTypes: {},
};

const Template = (args) => ({
  components: { SDownloadAppNew },
  setup() {
    return { args };
  },
  template:
    '<div><SDownloadAppNew v-bind="args"/></div>',
});

export const Default = Template.bind({});

