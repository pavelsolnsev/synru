import SVolunteerCenter from './SVolunteerCenter.vue';
import { synergyApi, synergyRu } from '~/utils/mediaCdn';

export default {
  title: 'sections/SVolunteerCenter',
  component: SVolunteerCenter,
  argTypes: {},
};

const Template = (args) => ({
  components: { SVolunteerCenter },
  setup() {
    return { args };
  },
  template:
    '<div><SVolunteerCenter v-bind="args"/></div>',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Волонтерский центр',
  titleCard:
    'Волонтерский центр — возможность для каждого открыть новые горизонты, найти новых <span class="nobr">друзей-единомышленников,</span> реализовать желание быть полезным.',
  titleClassCard: 'a-font_h6',
  textCard:
    'Наши волонтеры принимают участие в организации масштабных событий, музыкальных фестивалей, спортивных мероприятий. Волонтерский центр демо-вуза сотрудничает с крупнейшими добровольческими организациями: «Мосволонтер», «Волонтеры Победы», «Красный крест» и др.',
  textClassCard: 'a-font_l-m',
  cards: [
    {
      img: synergyRu('content/volunteer_center/vfm.webp'),
      text:'Всемирный фестиваль молодежи 2024',
    },
    {
      img: synergyRu('content/volunteer_center/vfm.webp'),
      text:'Всемирный фестиваль молодежи 2024',
    },
    {
      img: synergyRu('content/volunteer_center/vfm.webp'),
      text:'Всемирный фестиваль молодежи 2024',
    },
    {
      img: synergyRu('content/volunteer_center/vfm.webp'),
      text:'Всемирный фестиваль молодежи 2024',
    },
    {
      img: synergyRu('content/volunteer_center/vfm.webp'),
      text:'Всемирный фестиваль молодежи 2024',
    },
  ],
  bannerTitle: 'Хотите стать волонтёром?',
  bannerClass: 'a-font_h2',
  bannerDescription:
    'Примите участие в важной части учебного процесса демо-вуза',
  bannerImageSm:
    synergyApi('uploads/content/banner/sm.webp'),
  bannerImageMd:
    synergyApi('uploads/content/banner/md.webp'),
  bannerImageLg:
    synergyApi('uploads/content/banner/lg.webp'),
  bannerBtnText: 'Принять участие',
  bannerBtnHref: 'https://vk.com/dobro.synergy',
  bannerBtnColor: 'black',
};
