import MVideoCardVertical from './MVideoCardVertical.vue';
import { synergyApi, synergyRu } from '~/utils/mediaCdn';

export default {
  title: 'Molecules/MVideoCardVertical',
  component: MVideoCardVertical,
  argTypes: {},
};

const Template = (args) => ({
  components: { MVideoCardVertical },
  setup() {
    return { args };
  },
  template:
    '<div style="width: 282px; height: 468px;"><MVideoCardVertical v-bind="args"/></div>',
});

export const Default = Template.bind({});

Default.args = {
  video: 'https://rutube.ru/play/embed/4e6f58e8c4711f8621f352152bc4721a/?autoplay=1',
  image:
    synergyRu('content/otzivi/vertikal/arina_polishhuk.webp'),
  title: 'Арина Полищук',
  text: 'Факультет гостиничного и ресторанного бизнеса',
  fancybox: '',
  imageLg:
    synergyRu('content/otzivi/vertikal/arina_polishhuk.webp'),
  imageMd:
    synergyRu('content/otzivi/vertikal/arina_polishhuk.webp'),
  uploadDate: '2022-04-27T15:08:00+00:00',
};
