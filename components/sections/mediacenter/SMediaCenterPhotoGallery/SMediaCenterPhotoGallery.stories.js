import SMediaCenterPhotoGallery from './SMediaCenterPhotoGallery.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'sections/mediacenter/SMediaCenterPhotoGallery',
  component: SMediaCenterPhotoGallery,
  argTypes: {},
};

const Template = (args) => ({
  components: { SMediaCenterPhotoGallery },
  setup() {
    return { args };
  },
  template:
    '<div><SMediaCenterPhotoGallery v-bind="args"/></div>',
});

export const Default = Template.bind({});


Default.args = {
  title: 'Фотогалерея',
  items: [
    {
      title: 'Студент демо-вуза — пятикратный чемпион России по кикбоксингу',
      date: '21 сентября',
      image: synergyApi('uploads/content/storybook/sections/SMediaCenterPhotoGallery/test_photo_1.webp'),
    },
    {
      title: 'В демо-вузе прошло собрание руководителей волонтерских центров вузов Москвы',
      date: '22 сентября',
      image: synergyApi('uploads/content/storybook/sections/SMediaCenterPhotoGallery/test_photo_2.webp'),
    },
    {
      title: 'Третий элемент',
      date: '23 сентября',
      image: synergyApi('uploads/content/storybook/sections/SMediaCenterPhotoGallery/test_photo_1.webp'),
    },
    {
      title: 'Четвёртый элемент',
      date: '24 сентября',
      image: synergyApi('uploads/content/storybook/sections/SMediaCenterPhotoGallery/test_photo_2.webp'),
    },
    {
      title: 'Студент демо-вуза — пятикратный чемпион России по кикбоксингу',
      date: '25 сентября',
      image: synergyApi('uploads/content/storybook/sections/SMediaCenterPhotoGallery/test_photo_1.webp'),
    },
    {
      title: 'В демо-вузе прошло собрание руководителей волонтерских центров вузов Москвы',
      date: '26 сентября',
      image: synergyApi('uploads/content/storybook/sections/SMediaCenterPhotoGallery/test_photo_2.webp'),
    },
  ],
};
