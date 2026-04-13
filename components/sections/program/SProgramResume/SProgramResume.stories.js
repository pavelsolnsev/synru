import SProgramResume from './SProgramResume.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SProgramResume',
  component: SProgramResume,
  argTypes: {},
};

const Template = (args) => ({
  components: { SProgramResume },
  setup() {
    return { args };
  },
  template: '<s-program-resume v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  entity: {
    custom_field_values: [
      {
        'full_resume': [
          {
            'title': 'Арт-дилер',
            'photo': synergyApi('uploads/avatars/VfIRQ7AyHG4K4C3XFqCK.png'),
            'name': 'Артём Сергеевич',
            'info__text': '',
            'contacts': [],
            'education_faculty': 'Получил учёную степень бакалавриата по специальности «Арт-критика», факультет Дизайна и рекламы',
            'education_university': 'Московский финансово-промышленный университет (демо)',
            'skills': [
              {
                'skill': 'Художественный анализ и&nbsp;художественная оценка произведений',
              },
              {
                'skill': 'Критическая оценка видов и&nbsp;моделей культурных арт-инноваций',
              },
              {
                'skill': 'Квалификация в&nbsp;области искусства',
              },
            ],
            'experience': [
              {
                'experience_item': 'Стажировка в департаменте Культурного наследия города Москвы',
              },
              {
                'experience_item': 'Практика в галерее «Арт-Брют»',
              },
              {
                'experience_item': 'г., Москва 2027',
              },
            ],
            'achievements': [
              {
                'achievement_item': 'Веду свой телеграм-канал об истории искусства',
              },
              {
                'achievement_item': 'Публикация статьи о влиянии социальной среды на формирование личностных черт у подростков',
              },
            ],
          },
        ],
      },
    ],
  },
};
