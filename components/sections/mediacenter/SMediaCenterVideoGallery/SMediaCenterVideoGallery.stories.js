import SMediaCenterVideoGallery from './SMediaCenterVideoGallery.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'sections/mediacenter/SMediaCenterVideoGallery',
  component: SMediaCenterVideoGallery,
  argTypes: {},
};

const Template = (args) => ({
  components: { SMediaCenterVideoGallery },
  setup() {
    return { args };
  },
  template:
    '<div><SMediaCenterVideoGallery v-bind="args"/></div>',
});

export const Default = Template.bind({});


Default.args = {
  title: 'Видео-галерея',
  items: [
    {
      title: 'Топ разочарований высшего образования',
      text:'24.11.2022',
      video:'https://rutube.ru/play/embed/fa6162e01c7c5017abd9415c0b4248b5/',
      image: synergyApi('uploads/content/storybook/sections/s-media-center-video-gallery/test_2.webp'),
    },
    {
      title: 'Международный фестиваль команд КВН «КиВиН-2025» в г. Сочи',
      text:'24.11.2023',
      video:'https://rutube.ru/play/embed/fa6162e01c7c5017abd9415c0b4248b5/',
      image: synergyApi('uploads/content/storybook/sections/s-media-center-video-gallery/test_1.webp'),
    },
    {
      title: 'Топ разочарований высшего образования',
      text:'24.11.2022',
      video:'https://rutube.ru/play/embed/fa6162e01c7c5017abd9415c0b4248b5/',
      image: synergyApi('uploads/content/storybook/sections/s-media-center-video-gallery/test_2.webp'),
    },
    {
      title: 'Международный фестиваль команд КВН «КиВиН-2025» в г. Сочи',
      text:'24.11.2023',
      video:'https://rutube.ru/play/embed/fa6162e01c7c5017abd9415c0b4248b5/',
      image: synergyApi('uploads/content/storybook/sections/s-media-center-video-gallery/test_1.webp'),
    },
    {
      title: 'Топ разочарований высшего образования',
      text:'24.11.2022',
      video:'https://rutube.ru/play/embed/fa6162e01c7c5017abd9415c0b4248b5/',
      image: synergyApi('uploads/content/storybook/sections/s-media-center-video-gallery/test_2.webp'),
    },
    {
      title: 'Международный фестиваль команд КВН «КиВиН-2025» в г. Сочи',
      text:'24.11.2023',
      video:'https://rutube.ru/play/embed/fa6162e01c7c5017abd9415c0b4248b5/',
      image: synergyApi('uploads/content/storybook/sections/s-media-center-video-gallery/test_1.webp'),
    },
  ],
};
