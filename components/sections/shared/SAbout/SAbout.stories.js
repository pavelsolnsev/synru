import SAbout from './SAbout.vue';

export default {
  title: 'Sections/SAbout',
  component: SAbout,
  argTypes: {},
};

const Template = (args) => ({
  components: { SAbout },
  setup() {
    return { args };
  },
  template: '<s-about v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title:'О курсах',
  text: '<p><span>Курсы длятся от&nbsp;1 до&nbsp;6 месяцев и&nbsp;предназначены для людей, которые хотят развить свои навыки и&nbsp;углубить знания</span></p> Программы переподготовки подойдут тем, кто уже получил специальность, но&nbsp;хочет поменять род деятельности и&nbsp;получить помощь в&nbsp;трудоустройстве. Их&nbsp;продолжительность&nbsp;— от&nbsp;6 месяцев',
  tags:[{ tag:'Переподготовка — от 6 месяцев' }, { tag:'Курсы — от 1 месяца' }],
  icons:[{ icon:'simple-hat' }, { icon:'simple-bag' }],
  items:[
    {
      image: 'https://example.com/assets/template/v5/new3/images/level/s_about/1.webp',
      title: '217',
      text: 'программ дополнительного образования',
    },
    {
      image: 'https://example.com/assets/template/v5/new3/images/level/s_about/2.webp',
      title: 'От 1 месяца',
      text: 'продолжительность <br> обучения',
    },
    {
      classname: '--bg-red',
      image: 'https://example.com/assets/template/v5/new3/images/level/s_about/3.webp',

      title: 'Диплом',
      text: 'официального образца по окончании обучения',

    },
    {
      image: 'https://example.com/assets/template/v5/new3/images/courses/s_about/4.webp',
      title: 'Центр карьеры',
      text: 'поможем подобрать вакансии',
      classname: '--bg-img',
    },
  ],
};
