import MVideoCard from './MVideoCard.vue';
import { synergyApi, synergyRu } from '~/utils/mediaCdn';

export default {
  title: 'Molecules/MVideoCard',
  component: MVideoCard,
  argTypes: {},
};

const Template = (args) => ({
  components: { MVideoCard },
  setup() {
    return { args };
  },
  template:
    '<div style="max-width: 600px;height: 400px;"><MVideoCard v-bind="args"/></div>',
});

export const Default = Template.bind({});

Default.args = {
  video: synergyRu('video/otzyvprouniversitetsinergya.mp4'),
  image: synergyApi('uploads/content/video-bg/video.webp'),
  title: 'Заголовок карточки видео',
  text: 'Подзаголовок карточки видео',
  imageLg:
    synergyApi('uploads/content/video-bg/video_lg.webp'),
  imageMd:
    synergyApi('uploads/content/video-bg/video_md.webp'),
  videoBg: '',
  tag: 'Смотрите видео об Университете',
};
