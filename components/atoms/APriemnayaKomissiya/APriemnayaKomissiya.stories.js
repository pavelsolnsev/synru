import APriemnayaKomissiya from './APriemnayaKomissiya.vue';

export default {
  title: 'Atoms/APriemnayaKomissiya',
  component: APriemnayaKomissiya,
  argTypes: {
    onClick: {},
  },
};

const Template = (args) => ({
  components: { APriemnayaKomissiya },
  setup() {
    return { args };
  },
  template: '<a-priemnaya-komissiya src="/admission_committee/header_btn.webp" v-bind="args"></a-priemnaya-komissiya>',
});

export const Default = Template.bind({});