import SCatalog from './SCatalog.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SCatalog',
  component: SCatalog,
  argTypes: {},
};

const Template = (args) => ({
  components: { SCatalog },
  setup() {
    return { args };
  },
  template: '<SCatalog v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  franchises: [
    {
      title: 'Академия хореографии (демо)',
      select: 'up',
      description: 'Франшиза c гарантией и поддержкойна каждом этапе в социально значимойи прибыльной нише',
      investment: 'от 1.5 млн. руб.',
      time: '6 месяцев',
      profit: 'от 350 000 тыс. руб.',
      'image': synergyApi('uploads/content/franchises/akademiya_xoreografii.webp'),
    },
    {
      title: 'Школа музыки (демо)',
      select: 'up',
      description: 'Мы меняем рынок дополнительного музыкального образования',
      investment: 'от 1.3 млн. руб.',
      time: '6 месяцев',
      profit: 'от 300 000 тыс. руб.',
      'image': synergyApi('uploads/content/franchises/shkola_muzyiki.webp'),
    },
    {
      title: 'Детский центр демо-вуза',
      select: 'from',
      description: 'Объединяем заботу о детях и академический подход к их обучению',
      investment: 'от 2.3 млн. руб.',
      time: '18 месяцев',
      profit: 'от 200 000 тыс. руб.',
      'image': synergyApi('uploads/content/franchises/detskij_czentr.webp'),
    },
    {
      title: 'Детский сад демо-вуза',
      select: 'from',
      description: 'Объединяем заботу о детях и академический подход к их обучению',
      investment: 'от 7 млн. руб.',
      time: '18 месяцев',
      profit: 'от 450 000 тыс. руб.',
      'image': synergyApi('uploads/content/franchises/detskij_sad.webp'),
    },
    {
      title: 'Бьюти-коворкинг',
      select: 'up',
      description: 'Бьюти-коворкинг — это пространство для развития специалистов индустрии красоты, включающее оборудованные рабочие зоны, образовательную площадку для бьюти-мастеров',
      investment: 'от 1.65 млн. руб.',
      time: '10 месяцев',
      profit: 'от 300 000 тыс. руб.',
      'image': synergyApi('uploads/content/franchises/detskij_sad.webp'),
    },
  ],
};
