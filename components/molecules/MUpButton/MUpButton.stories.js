import MUpButton from './MUpButton.vue';

export default {
  title: 'Molecules/MUpButton',
  component: MUpButton,
  argTypes: {},
};

const containerStyle = `
      position: fixed;
      z-index: 9000;
      overflow: hidden;
      width: 100%;
      left: 0;
      top: auto;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-end;`;

const Template = (args) => ({
  components: { MUpButton },
  setup() {
    return { args, containerStyle };
  },
  template:
    '<div style="height: 5000px;"><div :style="args.containerStyle"><MUpButton v-bind="args"/></div></div>',
});

export const Default = Template.bind({});

Default.args = { containerStyle };
