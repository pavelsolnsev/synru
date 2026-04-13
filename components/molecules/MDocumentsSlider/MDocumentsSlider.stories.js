import MDocumentsSlider from './MDocumentsSlider.vue';

export default {
  title: 'Molecules/MDocumentsSlider',
  component: MDocumentsSlider,
  argTypes: {
    dark: {
      control: { type: 'boolean' },
    },
  },
};

const Template = (args) => ({
  components: { MDocumentsSlider },
  setup() {
    return { args };
  },
  template: '<m-documents-slider v-bind="args" />',
});

const documents = [
  {
    title: 'Лицензия',
    text: 'осуществление образовательной деятельности',
    link: 'https://example.com/assets/upload/official_documents/pdf/reestrovaya_vyipiska.pdf',
    isDocs: true,
  },
  {
    title: 'Свидетельство ',
    text: 'о государственной <br>аккредитации',
    link: 'https://example.com/assets/template/v5/new2/images/diplomas/vypiska_iz_reestra_akkreditacii.pdf',
  },
  {
    title: 'Аккредитация',
    text: 'Международной ассоциации MBA',
    link: 'https://example.com/assets/template/v5/new2/images/diplomas/07B.jpg',
    isDocs: true,
  },
];

export const Default = Template.bind({});
Default.args = {
  documents,
};

export const Dark = Template.bind({});
Dark.args = {
  documents,
  dark: true,
};
