import MQuiz from './MQuiz.vue';

export default {
  title: 'Molecules/MQuiz',
  component: MQuiz,
  argTypes: {},
};

const bgImage = 'https://example.com/assets/template/v5/new3/images/s_quiz/abiturientam-lg.webp';

const Template = (args) => ({
  components: { MQuiz },
  setup() {
    return { args };
  },
  template: `<div style="background: url('${bgImage}'); color: white"><m-quiz v-bind="args" /></div>`,
});

export const Default = Template.bind({});
Default.args = {
};
