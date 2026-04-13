import SResultDocs from './SResultDocs.vue';
import { synergyApi, synergyRu } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SResultDocs',
  component: SResultDocs,
  argTypes: {},
};

const Template = (args) => ({
  components: { SResultDocs },
  setup() {
    return { args };
  },
  template: '<s-result-docs v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title:'Бюджетные места',
  description:'Демо-вуз имеет государственную лицензию и&nbsp;аккредитацию, поэтому на&nbsp;ряде факультетов мы ежегодно выделяем бюджетные места для&nbsp;самых талантливых студентов.',
  docs:[{
    title: 'Государственная лицензия на ведение образовательной деятельности',
    link: 'https://example.com/assets/upload/official_documents/pdf/reestrovaya_vyipiska.pdf?v=070224',
    image: synergyRu('content/diplom/thumb_diploma.svg'),
  }, {
    title: 'Государственная аккредитация',
    link: 'https://example.com/assets/template/v5/new2/images/diplomas/08B.jpg',
    image: synergyRu('content/diplom/doc_black.svg'),
  }],
  docButtonText:'Смотреть образец',
  formText:'Хотите поступить на бюджет?',
  formButtonText:'Подать заявку',
  formTextClass:'a-font_h3',
};
