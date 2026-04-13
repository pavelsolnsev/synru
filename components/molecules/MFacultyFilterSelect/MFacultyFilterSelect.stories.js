import MFacultyFilterSelect from './MFacultyFilterSelect.vue';

export default {
  title: 'Molecules/MFacultyFilterSelect',
  component: MFacultyFilterSelect,
};

const Template = (args) => ({
  components: { MFacultyFilterSelect },
  setup() {
    const modelValue = ref('');
    return {
      args,
      modelValue,
    };
  },
  template: `
    <MFacultyFilterSelect v-model="modelValue" v-bind="args"></MFacultyFilterSelect>
    <br>
    <div>Current modelValue: {{ modelValue }}</div>
  `,
});

const faculties = [
  {
    value: 2,
    text: 'Факультет Искусственного интеллекта',
    disabled: false,
    popular: true,
  },
  {
    value: 12,
    text: 'Факультет кино и телевидения',
    disabled: false,
    popular: true,
  },
  { value: 32, text: 'Факультет Управления', popular: false },
  {
    value: 14,
    text: 'Медицинский факультет',
    disabled: false,
  },
  { value: 16, text: 'Факультет Анимации', disabled: true },
  { value: 22, text: '	Юридический факультет', disabled: true },
];

export const Default = Template.bind({});
Default.args = { faculties };

