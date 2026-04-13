import AUikitSelect from './AUikitSelect.vue';

export default {
  title: 'Atoms/AUikitSelect',
  component: AUikitSelect,
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    name: {
      control: { type: 'text' },
    },
    otherOption: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    error: {
      control: { type: 'boolean' },
    },
  },
};

const Template = (args) => ({
  components: { AUikitSelect },
  setup() {
    const modelValue = ref('');
    return {
      args,
      modelValue,
    };
  },
  template: `
    <a-uikit-select v-model="modelValue" v-bind="args"></a-uikit-select>
    <br>
    <div>Current modelValue: {{ modelValue }}</div><br>
    <button @click="modelValue = null">Reset</button>
  `,
});

const optionsPrimitive = [
  '2001',
  '2002',
  '2003',
  '2004',
];

const optionsObject = [
  { value: '1209', text: 'Колледж' },
  { value: '1729', text: 'Бакалавриат' },
  { value: '5531', text: 'Второе высшее' },
  { value: '5533', text: 'Магистратура' },
  { value: '9091', text: 'Аспирантура' },
  { value: '18259', text: 'Специалитет' },
  { value: '34138', text: 'Переподготовка' },
];

const optionsPopularDisabled = [
  { value: '23832', text: 'Медицина', popular: true },
  { value: '31320', text: 'Программирование', popular: true },
  { value: '9186', text: 'Лингвистика' },
  { value: '17460', text: 'Игровая индустрия и&nbsp;киберспорт', popular: true },
  { value: '9184', text: 'Интернет-профессии', disabled: true },
  { value: '9120', text: 'Экономика', disabled: true },
  { value: '9169', text: 'Бизнес' },
];

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Выберите год',
  options: optionsPrimitive,
  disabled: true,
};

export const WithOther = Template.bind({});
WithOther.args = {
  placeholder: 'Выберите год',
  options: optionsPrimitive,
  otherOption: true,
};

export const Error = Template.bind({});
Error.args = {
  placeholder: 'Уровень образования',
  options: optionsObject,
  error: true,
};

export const PopularAndDisabledOptions = Template.bind({});
PopularAndDisabledOptions.args = {
  placeholder: 'Уровень образования',
  options: optionsPopularDisabled,
};
