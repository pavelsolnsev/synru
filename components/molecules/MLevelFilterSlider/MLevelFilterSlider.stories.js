import MLevelFilterSlider from './MLevelFilterSlider.vue';

export default {
  title: 'Molecules/MLevelFilterSlider',
  component: MLevelFilterSlider,
};

const Template = (args) => ({
  components: { MLevelFilterSlider },
  setup() {
    const modelValue = ref(1);
    return {
      args,
      modelValue,
    };
  },
  template: `
    <MLevelFilterSlider v-model="modelValue" v-bind="args"></MLevelFilterSlider>
     <br>
    <div>Current modelValue: {{ modelValue }}</div>
  `,
});

const levels = {
  1: {
    value: 1,
    text: 'Колледж',
    rank: 50,
    count: 10,
  },
  2: {
    value: 2,
    text: 'Бакалавриат',
    rank: 100,
    count: 20,
  },
  3: {
    value: 3,
    text: 'Второе высшее',
    rank: 300,
    count: 15,
  },
  4: {
    value: 4,
    text: 'Магистратура',
    rank: 400,
    count: 7,
  },
  5: {
    value: 5,
    text: 'Специалитет',
    rank: 150,
    count: 34,
  },
  6: {
    value: 6,
    text: 'Аспирантура',
    rank: 600,
    count: 47,
  },
  7: {
    value: 7,
    text: 'Ординатура',
    rank: 700,
    count: 22,
  },
  1000: {
    text: 'Курсы',
    value: 1000,
    rank: 1000,
    count: 99,
  },
};

export const Default = Template.bind({});
Default.args = { levels };

