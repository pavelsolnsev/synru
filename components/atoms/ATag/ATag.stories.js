import ATag from './ATag.vue';

export default {
  title: 'Atoms/ATag',
  component: ATag,
  argTypes: {
    text: {
      control: { type: 'text' },
    },
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'white',
        'black',
        'grey',
        'blur',
        'fill',
        'fill_grey_20',
        'fill_grey_40',
      ],
    },
    font: {
      control: { type: 'text' },
    },
    onClick: {},
  },
};

const Template = (args) => ({
  components: { ATag },
  setup() {
    return { args };
  },
  template: '<a-tag v-bind="args"></a-tag>',
});

export const Default = Template.bind({});
Default.args = { text: 'Оффлайн' };
export const Black = Template.bind({});
Black.args = { text: 'Онлайн', variant: 'black' };
export const Fill = Template.bind({});
Fill.args = { text: 'Новости', variant: 'fill' };
export const Grey = Template.bind({});
Grey.args = { text: 'Онлайн', variant: 'grey' };
export const Font_L_M = Template.bind({});
Font_L_M.args = { text: 'Новости', font: 'a-font_l-m' };
