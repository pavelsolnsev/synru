import SBanner from './SBanner.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'sections/SBanner',
  component: SBanner,
  argTypes: {},
};

const Template = (args) => ({
  components: { SBanner },
  setup() {
    return { args };
  },
  template:
    '<div><SBanner v-bind="args"/></div>',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Хотите стать волонтёром?',
  titleClass: 'a-font_h2',
  description:
    'Примите участие в важной части учебного процесса демо-вуза',
  imageSm:
    synergyApi('uploads/content/banner/sm.webp'),
  imageMd:
    synergyApi('uploads/content/banner/md.webp'),
  imageLg:
    synergyApi('uploads/content/banner/lg.webp'),
  btnText: 'Принять участие',
  btnHref: 'https://vk.com/dobro.synergy',
  btnColor: 'black',
};
