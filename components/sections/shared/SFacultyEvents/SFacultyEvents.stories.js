import SFacultyEvents from './SFacultyEvents.vue';
import { synergyApi, synergyRu } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SFacultyEvents',
  component: SFacultyEvents,
  argTypes: {},
};

const Template = (args) => ({
  components: { SFacultyEvents },
  setup() {
    return { args };
  },
  template: '<s-faculty-events v-bind="args"/>',
});


export const Default = Template.bind({});
Default.args = {
  title: 'События факультета',
  articles: [
    {
      title: 'День открытых дверей в технопарке «Сколково»',
      text: '18&nbsp;ноября в&nbsp;Москве в&nbsp;рамках Международной выставки-форума «Россия» состоялся гранд-финал крупнейшего Международного фестиваля студенческого киберспорта и&nbsp;науки о&nbsp;компьютерном спорте «Битва за&nbsp;науку»&nbsp;— 2023″.',
      image: synergyRu('content/sobytija_fak/stali_izvestnyi_pobediteli_finala_bitvyi_za_nauku.webp'),
    },
    {
      title: 'Студенты медицинского факультета организовали патриотическое мероприятие «Мы&nbsp;разные… Но&nbsp;мы&nbsp;едины»',
      text: 'На&nbsp;встрече ребята прониклись чувством патриотизма, бережного отношения к&nbsp;историческому наследию и&nbsp;культурным традициям российского народа. Студенты совершили историческое путешествие в&nbsp;прошлое нашей страны и&nbsp;в&nbsp;историю медицины.',
      image: synergyRu('content/sobytija_fak/studentyi_mediczinskogo_fakulteta_organizovali_patrioticheskoe_meropriyatie_myi_raznyie_no_myi_edinyi.webp'),
    },
    {
      title: 'Студенты факультета дизайна и рекламы прошли в финал конкурса Digital PRактика',
      text: 'Конкурс включает исследовательскую и&nbsp;креативную часть. Над брифами реальных компаний работают студенты рекламных и&nbsp;PR направлений вузов Москвы, а&nbsp;проходит конкурс по&nbsp;2 сезона ежегодно, осенью и&nbsp;весной.',
      image: synergyRu('content/sobytija_fak/14_aspir.webp'),
    },
    {
      title: 'Студент факультета киберспорта вошёл в рейтинг Forbes',
      text: 'Студент факультета киберспорта Илья «m0NESY» Осипов из&nbsp;клуба G2 занял 28 место в&nbsp;рейтинге «30 самых ценных персональных брендов российских спортсменов» от&nbsp;Forbes.',
      image: synergyRu('content/sobytija_fak/student_fakulteta_kibersporta_voshyol_v_rejting_forbes.webp'),
    },
  ],
};
