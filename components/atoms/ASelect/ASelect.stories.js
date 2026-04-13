import ASelect from './ASelect.vue';

export default {
  title: 'Atoms/ASelect',
  component: ASelect,
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
  components: { ASelect },
  setup() {
    const value = ref('');
    return { args, value };
  },
  template: '<ASelect v-model="value" v-bind="args"/>',
});


export const Default = Template.bind({});
Default.args = {
  options: ['One', 'Two', 'Three'],
};
export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  placeholder: 'Choose number',
  name: 'select',
  options: ['One', 'Two', 'Three'],
};
