import SMediaCenterNews from './SMediaCenterNews.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'sections/mediacenter/SMediaCenterNews',
  component: SMediaCenterNews,
  argTypes: {},
};

const Template = (args) => ({
  components: { SMediaCenterNews },
  setup() {
    return { args };
  },
  template:
    '<div><SMediaCenterNews v-bind="args"/></div>',
});

export const Default = Template.bind({});


Default.args = {
  title: 'Новости Университета',
  items: [
    {
      title: 'Новость',
      date: '3 сентября',
      image: synergyApi('uploads/content/25_11zon.png'),
      share: true,
    },
    {
      title: 'Новость',
      date: '3 сентября',
      image: synergyApi('uploads/content/25_11zon.png'),
      share: true,
    },
    {
      title: 'Новость',
      date: '3 сентября',
      image: synergyApi('uploads/content/25_11zon.png'),
      share: true,
    },
    {
      title: 'Новость',
      date: '3 сентября',
      image: synergyApi('uploads/content/25_11zon.png'),
      share: true,
    },
    {
      title: 'Новость',
      date: '3 сентября',
      image: synergyApi('uploads/content/25_11zon.png'),
      share: true,
    },
  ],
};
