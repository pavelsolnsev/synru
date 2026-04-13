import SSuccessHistory from './SSuccessHistory.vue';
import { synergyApi, synergyRu } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SSuccessHistory',
  component: SSuccessHistory,
  argTypes: {},
};

const Template = (args) => ({
  components: { SSuccessHistory },
  setup() {
    return { args };
  },
  template: '<s-success-history v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Говорят студенты и&nbsp;выпускники',
  items: [
    {
      text: 'Факультет гостиничного и&nbsp;ресторанного бизнеса',
      title: 'Арина Полищук',
      image: synergyRu('content/otzivi/vertikal/arina_polishhuk.webp'),
      video: 'https://www.youtube.com/shorts/lgFeQZMcMDo?feature=share',
    },
    {
      text: 'Факультет дизайна',
      title: 'Виктория Штеле',
      image: synergyRu('content/otzivi/vertikal/shtele_viktoriya.webp'),
      video: 'https://www.youtube.com/shorts/A9Rl9iwKeXY?feature=share',
    },
    {
      text: 'Факультет программирования',
      title: 'Артём Языкин',
      image: synergyRu('content/otzivi/vertikal/yazyikin_artem.webp'),
      video: 'https://www.youtube.com/shorts/Dpp5mSLvVQg?feature=share',
    },
    {
      text: 'Факультет педагогики',
      title: 'Александр Минаков',
      image: synergyRu('content/otzivi/vertikal/aleksandr_minakov.webp'),
      video: 'https://www.youtube.com/shorts/oj5HDggaoD4?feature=share',
    },
    {
      text: 'Факультет экономики',
      title: 'Елизавета Загорнюк',
      image: synergyRu('content/otzivi/vertikal/elizaveta_zagornyuk.webp'),
      video: 'https://www.youtube.com/shorts/rQzn6LWKQHQ?feature=share',
    },
    {
      text: 'Факультет программирования',
      title: 'Владимир Гранкин',
      image: synergyRu('content/otzivi/vertikal/grankin_vladimir.webp'),
      video: 'https://www.youtube.com/shorts/GoKs51eCIfE?feature=share',
    },
    {
      text: 'Факультет бизнеса',
      title: 'Азизмурод Ормониён',
      image: synergyRu('content/otzivi/vertikal/azizmurod_ormoniyon.webp'),
      video: 'https://www.youtube.com/shorts/rYTNtsNRwtc?feature=share',
    },
  ],
};
