import SKvnTeams from './SKvnTeams.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'sections/SKvnTeams',
  component: SKvnTeams,
  argTypes: {},
};

const Template = (args) => ({
  components: { SKvnTeams },
  setup() {
    return { args };
  },
  template:
    '<div><SKvnTeams v-bind="args"/></div>',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Команды КВН',
  titleCard: 'У&nbsp;нас вы сможете не&nbsp;только получить новые знания, но&nbsp;и&nbsp;раскрыть свой творческий потенциал.',
  textCard: 'Профессиональные команды университета играют в&nbsp;Высшей лиге и&nbsp;Международной лиге КВН, Московской студенческой лиге и&nbsp;студенческой лиге ВУЗов и&nbsp;ССУЗов.',
  teams: [
    {
      img: synergyApi('uploads/content/kvn/final_pervaya_liga_09.12.24_sekcziya_.webp'),
      title: '«Просто зашли»',
      subtitle: 'Получила награду Кубка КВН МГПУ.',
      text: '21 октября студенты факультета Анимации представили демо-вуз на игре, организованной Московским городским педагогическим университетом. По итогам встречи команда «Просто зашли» получила награду за лучшую шутку Кубка КВН МГПУ.',
    },
    {
      img: synergyApi('uploads/content/kvn/kvn_vtoraya_seriya.webp'),
      socialLink: 'https://vk.com/s_miru_po_shutke_kvn',
      socialNameLogo: 'social-vk',
      title: '«Просто зашли»',
      subtitle: 'Заняла третье место в Кубке КВН.',
      text: '13 октября прошла игра, организованная демо-вузом и МГУПП, в которой приняли участие 24 команды из Москвы и других регионов России. Университет представлял коллектив факультета Анимации. По итогам встречи команда «Просто зашли» заняла третье место, уступив представителям РЭУ им. Плеханова и АГПС МЧС России',
    },
    {
      img: synergyApi('uploads/content/kvn/kvn_oborovich.webp'),
      socialLink: 'https://t.me/shale_oborovich',
      socialNameLogo: 'social-telegram',
      title: '«С миру по шутке»',
      subtitle: 'Колледж демо-вуза вышел в полуфинал Официальной Подмосковной лиги КВН.',
      text: '24 октября в Королеве пройдёт 1/2 финала Официальной Подмосковной лиги КВН. Демо-вуз будет представлять команда колледжа «С миру по шутке», организованная факультетом Права и социального обеспечения.',
    },
    {
      img: synergyApi('uploads/content/kvn/sekcziya_vyisshaya_liga.webp'),
      title: '«С миру по шутке»',
      subtitle: 'Колледж демо-вуза вышел в полуфинал Официальной Подмосковной лиги КВН.',
      text: '24 октября в Королеве пройдёт 1/2 финала Официальной Подмосковной лиги КВН. Демо-вуз будет представлять команда колледжа «С миру по шутке», организованная факультетом Права и социального обеспечения.',
    },
  ],
};
