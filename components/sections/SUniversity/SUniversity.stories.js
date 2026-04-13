import SUniversity from './SUniversity.vue';

export default {
  title: 'sections/SUniversity',
  component: SUniversity,
  argTypes: {},
};

const Template = (args) => ({
  components: { SUniversity },
  setup() {
    return { args };
  },
  template:
    '<div><SUniversity v-bind="args"/></div>',
});

export const Default = Template.bind({});

