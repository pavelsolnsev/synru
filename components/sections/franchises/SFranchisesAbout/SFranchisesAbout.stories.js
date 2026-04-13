import SFranchisesAbout from './SFranchisesAbout.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SFranchisesAbout',
  component: SFranchisesAbout,
  argTypes: {},
};

const Template = (args) => ({
  components: { SFranchisesAbout },
  setup() {
    return { args };
  },
  template: '<SFranchisesAbout v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title:`<p>Откройте бизнес по&nbsp;франшизе и&nbsp;станьте партнёром крупнейшей образовательной корпорации <span class="red">демо-вуза</span></p>`,
  text: `<p>Франшиза&nbsp;— это эффективная модель бизнеса, которая даёт право работать под брендом известной компании, использовать ее <span style="white-space:nowrap;">бизнес-модель,</span> брендбук, технологии, процессы и&nbsp;другой опыт.</p><p>Открытие бизнеса по&nbsp;франшизе может стать хорошим выбором для тех, кто хочет начать своё дело, но&nbsp;не&nbsp;имеет достаточного опыта и&nbsp;знаний в&nbsp;данной области.</p>`,
  tags: [{ tag: 'Эффективная модель' }, { tag: 'Готовый бизнес-план' }],
  buttonText: 'Стать партнером',
  factoids:[
    {
      image: synergyApi('uploads/content/franchises/1.webp'),
      title: '> 25 лет',
      text: 'на образовательном рынке',
    },
    {
      image: synergyApi('uploads/content/franchises/2.webp'),
      title: '> 500 000',
      text: 'выпускников',
    },
    {
      classname: '--bg-red',
      image: synergyApi('uploads/content/franchises/3.webp'),

      title: 'Топ-3',
      text: 'в&nbsp;рейтинге<br>лучших вузов страны',

    },
    {
      image: synergyApi('uploads/content/franchises/4.webp'),
      title: '№ 1',
      text: 'по&nbsp;численности <br>студентов',
      classname: '--bg-img',
    },
  ],
};
