import MRatingCard from './MRatingCard.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Molecules/MRatingCard',
  component: MRatingCard,
  argTypes: {},
};


const Template = (args) => ({
  components: { MRatingCard },
  setup() {
    return { args };
  },
  template: `<MRatingCard v-bind="args" />`,
});

export const Default = Template.bind({});
Default.args = {
  position: 1,
  organization: 'HeadHunter',
  year: '2024',
  name: 'По количеству студентов',
  image: synergyApi('uploads/content/m-rating-card/bag.png'),
};
