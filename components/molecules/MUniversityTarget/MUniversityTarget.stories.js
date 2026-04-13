import MUniversityTarget from './MUniversityTarget.vue';
import { synergyApi, synergyRu } from '~/utils/mediaCdn';

export default {
  title: 'Molecules/MUniversityTarget',
  component: MUniversityTarget,
  argTypes: {},
};

const Template = (args) => ({
  components: { MUniversityTarget },
  setup() {
    return { args };
  },
  template: '<m-university-target v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: '<span class="red">Наша цель</span>&nbsp;— качественное образование для&nbsp;вашей успешной карьеры',
  text: '<p>У&nbsp;нас готовят высококлассных специалистов, востребованных в&nbsp;России и&nbsp;за&nbsp;рубежом. Начните строить своё профессиональное будущее вместе с&nbsp;нами.</p><p>Более 25&nbsp;лет у&nbsp;нас обучают актуальным и&nbsp;востребованным профессиям. У&nbsp;нас вы получите знания, которые помогут развить свой бизнес или&nbsp;устроиться на&nbsp;работу в&nbsp;крупную компанию.</p>',
  icons: ['simple-25', 'simple-bag' ],
  image: 'https://example.com/assets/template/v5/new3/images/s_university/video/video.webp',
  imageLg: 'https://example.com/assets/template/v5/new3/images/s_university/video/video_lg.webp',
  imageMd: 'https://example.com/assets/template/v5/new3/images/s_university/video/video_md.webp',
  tag: 'Смотрите видео об&nbsp;Университете',
  video: synergyRu('video/otzyvprouniversitetsinergya.mp4'),
  priorities: [
    {
      title: 'Приоритет',
      text: 'Требования крупнейших компаний-работодателей',
      image: 'https://example.com/assets/template/v5/new3/images/s_university/priorities/1.webp',
    },
    {
      title: 'Актуальные знания',
      text: 'Преподавание от практиков в своей сфере',
      image: 'https://example.com/assets/template/v5/new3/images/s_university/priorities/2.webp',
    },
    {
      title: 'Высокий результат',
      text: 'Выпускники — новая профессиональная элита',
      image: 'https://example.com/assets/template/v5/new3/images/s_university/priorities/3.webp',
    },
  ],
  achievements: [
    {
      title: '1995',
      text: 'год основания демо-портала',
      icon: 'simple-calendar',
    },
    {
      title: '> 1000',
      text: 'образовательных программ',
      icon: 'simple-papers',
    },
    {
      title: '> 200 000',
      text: 'обучающихся на платформе',
      icon: 'simple-group',
    },
    {
      title: '> 500 000',
      text: 'выпускников',
      icon: 'simple-hat',
    },
  ],
};
