import MReview from './MReview.vue';
import MReviewImage from '~/assets/images/m_review/kapustina.webp';

export default {
  title: 'Molecules/MReview',
  component: MReview,
  argTypes: {},
};

const Template = (args) => ({
  components: { MReview },
  setup() {
    return { args };
  },
  template: '<m-review v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  image: MReviewImage,
  name: 'Дарья Житинская',
  info: 'Профессия «Python-разработчик»',
  text: 'Я&nbsp;учусь в&nbsp;колледже демо-вуза по&nbsp;программе «Гостиничное дело». Очень люблю свой ВУЗ, потому что здесь есть возможность трудоустройства, что помогает мне совмещать практику',
};

