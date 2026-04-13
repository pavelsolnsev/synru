import ASelectSecond from './ASelectSecond.vue';

export default {
  title: 'Atoms/ASelectSecond',
  component: ASelectSecond,
  argTypes: {
    fontSize: {
      control: { type: 'select' },
      options: [
        'a-font_xl',
        'a-font_xl-m',
        'a-font_l',
        'a-font_l-m',
        'a-font_m',
        'a-font_m-m',
        'a-font_s',
        'a-font_s-m',
        'a-font_xs',
        'a-font_xs-m',
        'a-font_xxs',
        'a-font_xxs-m',
      ],
    },
    inputmode: {
      control: { type: 'select' },
      options: [
        'a-font_xl',
        'a-font_xl-m',
        'a-font_l',
        'a-font_l-m',
        'a-font_m',
        'a-font_m-m',
        'a-font_s',
        'a-font_s-m',
        'a-font_xs',
        'a-font_xs-m',
        'a-font_xxs',
        'a-font_xxs-m',
      ],
    },
  },
};

const Template = (args) => ({
  components: { ASelectSecond },
  setup() {
    const value = ref(null);
    return { args, value };
  },
  template: '<ASelectSecond v-model="value" v-bind="args"/>',
});


export const Default = Template.bind({});
Default.args = {
  options: [{ value: 1, text: 'One' }, { value: 2, text: 'Two' }, { value:3, text:'Three' }],
};
export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  placeholder: 'Choose number',
  name: 'select',
  options: [{ value: 1, text: 'One' }, { value: 2, text: 'Two' }, { value:3, text:'Three' }],
};
