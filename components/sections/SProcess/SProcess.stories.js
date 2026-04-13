import SProcess from './SProcess.vue';
import { synergyApi, synergyRu } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SProcess',
  component: SProcess,
  argTypes: {},
};

const Template = (args) => ({
  components: { SProcess },
  setup() {
    return { args };
  },
  template: '<Suspense><SProcess v-bind="args"/></Suspense>',
});


export const Default = Template.bind({});
Default.args = {
  entity: {
    custom_field_values: {
      s_process: [
        {
          title: 'Медицинский класс',
          text: 'Обучение проходит на базе Медицинского Университета. Профильное изучение химии и биологии для подготовки к поступлению в вуз. Кроме того, школьники будут иметь доступ к столу Пирогова, стоматологическому кабинету и другим профильным классам студентов Медицинского Университета.',
          image: synergyRu('content/school/kak%20prohodit%20obuchenie/online/obuchenie.webp'),
        }, {
          title: 'IT-класс',
          text: 'Обучение проходит на базе Медицинского Университета. Профильное изучение химии и биологии для подготовки к поступлению в вуз. Кроме того, школьники будут иметь доступ к столу Пирогова, стоматологическому кабинету и другим профильным классам студентов Медицинского Университета.',
          image: synergyRu('content/school/kak%20prohodit%20obuchenie/online/rabota_na_uroke.webp'),
        }, {
          title: 'Арт-класс',
          text: 'Самое творческое обучение рождается в стенах лучших вузов. Демо-вуз, в рамках программы 10−11 класса с дизайнерским уклоном подготовил для вас программу, после которой вы сможете стать не просто художником, а топовым художником, дизайнером всех отраслей и даже арт-продюсером. ',
          image: synergyRu('content/school/kak%20prohodit%20obuchenie/online/podderzhka.webp'),
        }, {
          title: 'Арт-класс',
          text: 'Самое творческое обучение рождается в стенах лучших вузов. Демо-вуз, в рамках программы 10−11 класса с дизайнерским уклоном подготовил для вас программу, после которой вы сможете стать не просто художником, а топовым художником, дизайнером всех отраслей и даже арт-продюсером. ',
          image: synergyRu('content/school/kak%20prohodit%20obuchenie/online/samostoyatelnaya_rabota.webp'),
        },
      ],
    },
  },
};
