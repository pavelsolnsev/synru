import AApplyBtn from './AApplyBtn.vue';

export default {
  title: 'Atoms/AApplyBtn',
  component: AApplyBtn,
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    onClick: {},
  },
};

const Template = (args) => ({
  components: { AApplyBtn },
  setup() {
    return { args };
  },
  template: '<a-apply-btn v-bind="args">Абитуриентам</a-apply-btn>',
});

export const Default = Template.bind({});
Default.args = { title: 'Подобрать программу' };