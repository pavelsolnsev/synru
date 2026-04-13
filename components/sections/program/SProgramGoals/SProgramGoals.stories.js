import SProgramGoals from './SProgramGoals.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SProgramGoals',
  component: SProgramGoals,
  argTypes: {},
};

const Template = (args) => ({
  components: { SProgramGoals },
  setup() {
    return { args };
  },
  template: '<s-program-goals v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  entity: {
    custom_field_values: [
      {
        goals: [
          {
            'image': synergyApi('uploads/content/program/goals/iskusstvovedenie_i_art_biznes._istoriya_iskusstv.webp'),
            'title': 'Построить карьеру на менеджменте творческих проектов? Легко!',
            'text': '<span>В&nbsp;рамках обучения вы&nbsp;научитесь создавать собственные творческие проекты, выстраивать отношения художников с&nbsp;галереями, развивать и&nbsp;укреплять культурные связи между представителями российского искусства и&nbsp;международным арт-сообществом.</span>',
          },
          {
            'image': synergyApi('uploads/content/program/goals/bespilotnyie_texnologii_1.webp'),
            'title': 'Подготовка специалистов по управлению БПЛА',
            'text': '<p>Студенты на&nbsp;этой программе разрабатывают, конструируют, осуществляют техническое обслуживание, локализуют и&nbsp;устраняют неисправности оборудования, программируют системы управления беспилотных авиационных систем.</p>\n<p>После окончания обучения выпускники могут работать в&nbsp;различных областях: таких как авиационная промышленность, транспорт, геодезия, сельское хозяйство, экология и&nbsp;другие, где требуется использование беспилотных робототехнических авиационных систем.</p>',
          },
          {
            'image': synergyApi('uploads/content/program/goals/iskusstvovedenie_i_art_biznes._istoriya_iskusstv.webp'),
            'title': 'Построить карьеру на менеджменте творческих проектов? Легко!',
            'text': '<span>В&nbsp;рамках обучения вы&nbsp;научитесь создавать собственные творческие проекты, выстраивать отношения художников с&nbsp;галереями, развивать и&nbsp;укреплять культурные связи между представителями российского искусства и&nbsp;международным арт-сообществом.</span>',
          },
          {
            'image': synergyApi('uploads/content/program/goals/bespilotnyie_texnologii_1.webp'),
            'title': 'Подготовка специалистов по управлению БПЛА',
            'text': '<p>Студенты на&nbsp;этой программе разрабатывают, конструируют, осуществляют техническое обслуживание, локализуют и&nbsp;устраняют неисправности оборудования, программируют системы управления беспилотных авиационных систем.</p>\n<p>После окончания обучения выпускники могут работать в&nbsp;различных областях: таких как авиационная промышленность, транспорт, геодезия, сельское хозяйство, экология и&nbsp;другие, где требуется использование беспилотных робототехнических авиационных систем.</p>',
          },
        ],
      },
    ],
  },
};
