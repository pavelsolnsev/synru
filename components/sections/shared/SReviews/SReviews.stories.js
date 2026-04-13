import SReviews from './SReviews.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SReviews',
  component: SReviews,
  argTypes: {},
};

const Template = (args) => ({
  components: { SReviews },
  setup() {
    return { args };
  },
  template: '<s-reviews v-bind="args"/>',
});


export const Default = Template.bind({});
Default.args = {
  items: [
    {
      img: synergyApi('uploads/content/reviews/test-img/evdokimov_pavel.webp'),
      name: 'Иван Горских',
      date: 'Frontend-разработчик',
      text: 'Поступил к&nbsp;нам на&nbsp;факультет бизнеса только потому, что это единственное интересующее меня направление. Здесь в&nbsp;роли преподавателей выступают люди, которые практикуют свои знания, практикуют свои компетенции в&nbsp;реальных компаниях с&nbsp;реальными сделками&nbsp;— это значит, что нам предоставляется не&nbsp;только теория, но&nbsp;еще и&nbsp;настоящий бизнес-опыт. А&nbsp;это влияет на&nbsp;нашу компетенцию в&nbsp;целом.',
    },
    {
      img: synergyApi('uploads/content/reviews/test-img/ivan_gorskix.webp'),
      name: 'Даниэль Жаныбеков',
      date: 'Backend-разработчик',
      text: 'Впечатления от&nbsp;обучения остались положительные благодаря гибкости преподавательского состава, а&nbsp;также возможностям обучения, которые представлялись некоторыми из&nbsp;преподавателей и&nbsp;профессоров. Те&nbsp;практические навыки, которые я&nbsp;получил, помогли мне не&nbsp;только при написании диплома, но&nbsp;и&nbsp;для понимания структуры гостинично-ресторанного бизнеса в&nbsp;целом.',
    },
    {
      img: synergyApi('uploads/content/reviews/test-img/larin_roman.webp'),
      name: 'Дарья Житинская',
      date: 'Разработчик',
      text: 'Я&nbsp;учусь в&nbsp;колледже демо-вуза по&nbsp;программе «Гостиничное дело». Очень люблю свой ВУЗ, потому что здесь есть возможность трудоустройства, что помогает мне совмещать практику',
    },
    {
      img: 'images/s_reviews/photo-1.jpg',
      name: 'Даниэль Жаныбеков',
      date: 'Python-разработчик',
      text: 'Впечатления от&nbsp;обученя остались положительные благодаря гибкости преподавательского состава, а&nbsp;также возможностям обучения, которые представлялись некоторыми из&nbsp;преподавателей и&nbsp;профессоров. Те&nbsp;практические навыки, которые я&nbsp;получил, помогли мне не&nbsp;только при написании диплома, но&nbsp;и&nbsp;для понимания структуры гостинично-ресторанного бизнеса в&nbsp;целом.',
    },
  ],
};
