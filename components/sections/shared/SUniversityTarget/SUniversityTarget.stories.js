import SUniversityTarget from './SUniversityTarget.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SUniversityTarget',
  component: SUniversityTarget,
  argTypes: {},
};

const Template = (args) => ({
  components: { SUniversityTarget },
  setup() {
    return { args };
  },
  template: '<s-university-target v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title:'Наша цель',
  secondTitle:'<span class="red">Наша цель</span>&nbsp;&mdash; качественное образование для&nbsp;вашей успешной карьеры',
  secondTitleClass:'a-font_h4',
  text:'<p>Более 25&nbsp;лет у&nbsp;нас учат актуальным и&nbsp;востребованным профессиям. У&nbsp;нас вы получите знания, которые помогут развить свой бизнес или&nbsp;устроиться на&nbsp;работу в&nbsp;крупную компанию.</p><a class=&quot;a-btn a-btn--lg a-font_xl-m a-btn--primary a-btn--red&quot; href=&quot;https://example.com/about&quot;><span>Подробнее</span></a>',
  textClass:'a-font_h6',
  icons:[{ icon:'simple-25' }, { icon:'simple-bag' }],
  videoBgImages:[
    { 'image': synergyApi('uploads/content/s-university/video/video.webp') },
    { 'image': synergyApi('uploads/content/s-university/video/video_md.webp') },
    { 'image': synergyApi('uploads/content/s-university/video/video_lg.webp') },
  ],
  video:'https://rutube.ru/play/embed/fa6162e01c7c5017abd9415c0b4248b5/',
  videoTag:'Смотрите видео об университете',
  achievements:[
    {
      title: '1995',
      text: 'год основания демо-портала',
      icon: 'https://example.com/assets/template/v5/new3/images/s_university/achievs/1.webp',
    },
    {
      title: '>1000',
      text: 'образовательных программ',
      icon: 'https://example.com/assets/template/v5/new3/images/s_university/achievs/2.webp',
    },
    {
      title: '>200&nbsp;000',
      text: 'обучающихся на платформе',
      icon: 'https://example.com/assets/template/v5/new3/images/s_university/achievs/3.webp',
    },
    {
      title: '>500&nbsp;000',
      text: 'выпускников',
      icon: 'https://example.com/assets/template/v5/new3/images/s_university/achievs/4.webp',
    },
  ],
  showTalisman: true,
  showDocuments: true,
  ratings:[{
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
    difference: '-',
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
    position: 3,
    difference: '+2',
  }, {
    name: 'Рейтинг Top Universities in Russia',
    subname: 'среди российских вузов',
    link: '#',
    organization: 'UniRank',
    logo: synergyApi('uploads/content/s-ratings/qs.png'),
    year: '2021',
    position: '23',
    difference: '+-',
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
