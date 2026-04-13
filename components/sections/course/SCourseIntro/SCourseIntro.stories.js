import SCourseIntro from './SCourseIntro.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SCourseIntro',
  component: SCourseIntro,
  argTypes: {},
};

const Template = (args) => ({
  components: { SCourseIntro },
  setup() {
    return { args };
  },
  template: '<s-course-intro v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  annotation: '<p>Python-разработчик занимается разработкой серверной части веб-приложений, написанием кода, исправлением ошибок в готовом программном обеспечении.</p>',
  content: '<p>аняяяяяяяяяя</p>',
  custom_field_values: [
    {
      course_triggers: [
        {
          'duration_hours': '262  часа',
          'format': null,
          'duration': '6 месяцев',
          'start': null,
          'diploma': 'О профессиональной переподготовке',
        },
      ],
    },
  ],
  id: 12,
  image: synergyApi('Промышленный дизайн.jpg'),
  name: 'Тест Аня Копия',
  properties:{ title: null, description: null, international: null, show_employment: false },
};
