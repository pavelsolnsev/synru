import MFormatFilterSelect from './MFormatFilterSelect.vue';

export default {
  title: 'Molecules/MFormatFilterSelect',
  component: MFormatFilterSelect,
};

const Template = (args) => ({
  components: { MFormatFilterSelect },
  setup() {
    const modelValue = ref('');
    return {
      args,
      modelValue,
    };
  },
  template: `
    <MFormatFilterSelect v-model="modelValue" v-bind="args" />
    <br>
    <div>Current modelValue: {{ modelValue }}</div>
  `,
});

const formats = [
  {
    value: 2,
    text: 'Очный',
    disabled: false,
  },
  {
    value: 12,
    text: 'Заочный',
    disabled: false,
  },
  { value: 32, text: 'Онлайн', disabled: false },
  {
    value: 14,
    text: 'Вечерний',
    disabled: true,
  },
  { value: 16, text: 'Выходного дня', disabled: true },
];

export const Default = Template.bind({});
Default.args = { formats };
