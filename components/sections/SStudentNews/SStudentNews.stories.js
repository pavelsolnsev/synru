import SStudentNews from './SStudentNews.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'sections/SStudentNews',
  component: SStudentNews,
  argTypes: {},
};

const Template = (args) => ({
  components: { SStudentNews },
  setup() {
    return { args };
  },
  template:
    '<div><SStudentNews v-bind="args"/></div>',
});

export const Default = Template.bind({});
Default.args = {
  studentLifeItems: [{
    image: synergyApi('uploads/content/s-student-life/01.jpeg'),
    video: '',
    title: 'Студенты программы посетили джип-сафари в Дубае',
    date: '8.09.2024',
    tag: '#Культурно-развлекательное мероприятие',
  }, {
    image: synergyApi('uploads/content/s-student-life/02.jpeg'),
    video: '',
    title: 'Студенты программы МКР посетили мастер-класс по тайскому боксу',
    date: '27.08.2024',
    tag: '#Спортивное мероприятие',
  }, {
    image: synergyApi('uploads/content/s-student-life/03.jpeg'),
    video: '',
    title: 'Студенты и выпускники программы приняли участие в Московских корпоративных играх',
    date: '13.08.2023',
    tag: '#Спортивное мероприятие',
  }],
};
