import ATextarea from './ATextarea.vue';

export default {
  title: 'Atoms/ATextarea',
  component: ATextarea,
  argTypes: {
    placeholder: {
      control: { type: 'text' },
    },
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
        'none',
        'text',
        'decimal',
        'numeric',
        'tel',
        'search',
        'email',
        'url',
      ],
    },
  },
};

const Template = (args) => ({
  components: { ATextarea },
  setup() {
    const value = ref('');
    return { args, value };
  },
  template: '<a-textarea v-model="value" v-bind="args"/>',
});

export const Default = Template.bind({});

export const DefaultPlaceholder = Template.bind({});
DefaultPlaceholder.args = { placeholder: 'By Default with Placeholder' };
