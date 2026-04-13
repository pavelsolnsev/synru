import SAcademicPartners from './SAcademicPartners.vue';

export default {
  title: 'Sections/SAcademicPartners',
  component: SAcademicPartners,
  argTypes: {},
};

const Template = (args) => ({
  components: { SAcademicPartners },
  setup() {
    return { args };
  },
  template: '<s-academic-partners v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  items:[
    {
      image:'https://example.com/assets/template/v5/new2/images/academic-partners/1.webp',
      title:'USGM , Италия',
    },
    {
      image:'https://example.com/assets/template/v5/new2/images/academic-partners/10.webp',
      title:'Aldo Moro Institute, Италия',
    },
    {
      image:'https://example.com/assets/template/v5/new2/images/academic-partners/13.webp',
      title:'Univerzitet Singidunum, Сербия',
    },
    {
      image:'https://example.com/assets/template/v5/new2/images/academic-partners/2.webp',
      title:'Univerzitet Singidunum, Сербия',
    },
    {
      image:'https://example.com/assets/template/v5/new2/images/academic-partners/2.webp',
      title:'Университет Центрального<br> Ланкашира, Кипр',
    },
    {
      image:'https://example.com/assets/template/v5/new2/images/academic-partners/gGmbH.webp?v=1804',
      title:'Academy of Languages gGmbH, Германия',
    },
    {
      image:'https://example.com/assets/template/v5/new2/images/academic-partners/7.webp',
      title:'Частный Университет <br> «Аль-Хаваш», Сирия',
    },
    {
      image:'https://example.com/assets/template/v5/new2/images/academic-partners/8.webp',
      title:'Dar Al-Hekma University,',
    },
    {
      image:'https://example.com/assets/template/v5/new2/images/academic-partners/9.webp',
      title:'Asian University of Bangladesh,',
    },
    {
      image:'https://example.com/assets/template/v5/new2/images/academic-partners/11.webp',
      title:'Wohan University, Китай',
    },
    {
      image:'https://example.com/assets/template/v5/new2/images/academic-partners/11.webp',
      title:'Vega School of Brand Leadership, ЮАР',
    },
    {
      image:'https://example.com/assets/template/v5/new2/images/academic-partners/12.webp',
      title:'Частный Университет <br> «Аль-Хаваш», Сирия',
    },
  ],
};
