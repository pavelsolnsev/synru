import MArticleBannerCard from './MArticleBannerCard.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Molecules/Articles/MArticleBannerCard',
  component: MArticleBannerCard,
  argTypes: {},
};

const Template = (args) => ({
  components: { MArticleBannerCard },
  setup() {
    return { args };
  },
  template: '<MArticleBannerCard v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title:'IT, экология и межотраслевое образование: что определяет профессии будущего',
  text:'Если хотите учиться у нас, но боитесь не пройти на бюджет, поможем получить выгодный кредит с господдержкой всего под 3%',
  share: true,
  image: synergyApi('uploads/content/storybook/molecules/m-article-banner-card/marticlebannercard.webp'),
  tags: [{ text: 'Магистратура' }, { text:'26 октября 2024' }],
};

