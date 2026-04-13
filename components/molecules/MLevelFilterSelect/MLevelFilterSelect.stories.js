import MLevelFilterSelect from './MLevelFilterSelect.vue';

export default {
  title: 'Molecules/MLevelFilterSelect',
  component: MLevelFilterSelect,
};

const Template = (args) => ({
  components: { MLevelFilterSelect },
  setup() {
    const modelValue = ref('');
    return {
      args,
      modelValue,
    };
  },
  template: `
    <MLevelFilterSelect v-model="modelValue" v-bind="args"></MLevelFilterSelect>
     <br>
    <div>Current modelValue: {{ modelValue }}</div>
  `,
});

const levels = [
  { value: '23832', text: 'Колледж', disabled: false },
  { value: '31320', text: 'Бакалавриат', disabled: false },
  { value: '9186', text: 'Магистратура' },
  {
    value: '17460',
    text: 'Аспирантура',
    disabled: false,
  },
  { value: '9184', text: 'Специалитет', disabled: true },
  { value: '9120', text: 'Курсы', disabled: true },
];

export const Default = Template.bind({});
Default.args = { levels };

