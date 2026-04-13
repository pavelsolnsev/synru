import MCoursesTypeFilterSlider from './MCoursesTypeFilterSlider.vue';

export default {
  title: 'Molecules/MCoursesTypeFilterSlider',
  component: MCoursesTypeFilterSlider,
};

const Template = (args) => ({
  components: { MCoursesTypeFilterSlider },
  setup() {
    const modelValue = ref('fromSix');
    return {
      args,
      modelValue,
    };
  },
  template: `
    <MCoursesTypeFilterSlider v-model="modelValue" v-bind="args"></MCoursesTypeFilterSlider>
     <br>
    <div>Current modelValue: {{ modelValue }}</div>
  `,
});

const types = [{
  label: 'От 6 месяцев',
  value: 'fromSix',
  count: 20,
},
{
  label: 'До 6 месяцев',
  value: 'upSix',
  count: 45,
},
{
  label: 'Мини-курсы',
  value: 'isMini',
  count: 111,
}];

export const Default = Template.bind({});
Default.args = { types };

