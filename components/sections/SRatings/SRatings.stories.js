import SRatings from './SRatings.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'sections/SRatings',
  component: SRatings,
  argTypes: {},
};

const Template = (args) => ({
  components: { SRatings },
  setup() {
    return { args };
  },
  template:
    '<div><SRatings v-bind="args"/></div>',
});

export const Default = Template.bind({});
Default.args = {
  raitings: [{
    name: 'Рейтинг по численности студентов',
    subname: '',
    link: '#',
    organization: 'Министерство науки и высшего образования РФ',
    logo: synergyApi('uploads/content/s-ratings/hh.png'),
    year: '2022-<br>-2023',
    position: 1,
    difference: '+',
  }, {
    name: 'Рейтинг предпринимательских программ',
    link: '#',
    organization: 'Интерфакс',
    logo: synergyApi('uploads/content/s-ratings/ed-techs.png'),
    year: '2023, 1 квартал',
    position: 1,
    difference: '+-',
  }, {
    name: 'Рейтинг лучших вузов России',
    link: '#',
    organization: 'hh.ru',
    logo: synergyApi('uploads/content/s-ratings/interfax.png'),
    year: '2021',
    position: 3,
    difference: '-',
  }, {
    name: 'Рейтинг по количеству иностранных студентов',
    link: '#',
    organization: 'Министерство науки и высшего образования РФ',
    logo: synergyApi('uploads/content/s-ratings/min-science.png'),
    year: '2021',
    position: 2,
    difference: '+1',
  }, {
    name: 'Рейтинг крупнейших компаний',
    subname: 'в сфере онлайн-образования',
    link: '#',
    organization: 'EdTechs',
    logo: synergyApi('uploads/content/s-ratings/uni-rank.png'),
    year: '2023',
    position: '3',
    difference: '+2',
  }, {
    name: 'Рейтинг Top Universities in Russia',
    subname: 'среди российских вузов',
    link: '#',
    organization: 'UniRank',
    logo: synergyApi('uploads/content/s-ratings/qs.png'),
    year: '2021',
    position: '23',
    difference: '',
  }, {
    name: 'Национальный рейтинг университетов',
    link: '#',
    organization: 'Интерфакс',
    logo: synergyApi('uploads/content/s-ratings/qs.png'),
    year: '2021',
    position: 'ТОП-100',
    difference: '',
  }, {
    name: 'Международный рейтинг вузов',
    subname: 'стран Восточной Европы и Центральной Азии',
    link: '#',
    organization: 'QS EECA University Rankings',
    logo: synergyApi('uploads/content/s-ratings/qs.png'),
    year: '2021',
    position: 'ТОП-400',
    difference: '',
  }],
};
