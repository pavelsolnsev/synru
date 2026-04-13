import SAchievementsFaculties from './SAchievementsFaculties.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'sections/SAchievementsFaculties',
  component: SAchievementsFaculties,
  argTypes: {},
};

const Template = (args) => ({
  components: { SAchievementsFaculties },
  setup() {
    return { args };
  },
  template:
    '<div><SAchievementsFaculties v-bind="args"/></div>',
});

export const Default = Template.bind({});


Default.args = {
  title:'Достижения факультетов',
  articles: [
    {
      image: synergyApi('uploads/content/events/event1.webp'),
      title: 'Студенты колледжа посетили «Битву роботов»',
      text: '16&nbsp;декабря 2023&nbsp;года в&nbsp;московском Экспоцентре состоялся финал «Битвы роботов-2023». Что&nbsp;такое «Битва роботов»? Это&nbsp;зрелищный чемпионат и&nbsp;международная площадка по&nbsp;обмену опытом в&nbsp;области робототехники.',
    },
    {
      image: synergyApi('uploads/content/events/event2.webp'),
      title: 'Студенты колледжа демо-вуза посетили спектакль «Преступление и&nbsp;наказание» в&nbsp;театре Моссовета',
      text: '14&nbsp;декабря студенты колледжа Школы Нового театра посетили театр&nbsp;им. Моссовета. Они&nbsp;посмотрели спектакль Юрия Ерёмина «Р.Р.Р». по&nbsp;роману Ф.М.&nbsp;Достоевского «Преступление и&nbsp;наказание» Школы Нового театра посетили театр&nbsp;им. Моссовета Юрия Ерёмина «Р.Р.Р».',
    },
    {
      image: synergyApi('uploads/content/events/event3.webp'),
      title: 'От теории к практике визуального мерчендайзинга на Международной выставке-форуме «Россия»',
      text: 'В&nbsp;рамках выездного занятия студенты колледжа демо-вуза посетили Культурный центр «Дом-музей Марины Цветаевой».',
    },
    {
      image: synergyApi('uploads/content/events/event4.webp'),
      title: '4 декабря на площадке колледжа демо-вуза состоялась встреча литературно-творческого клуба «ПоЧитатели»',
      text: 'Студенты колледжа, обучающиеся по&nbsp;специальности «Анимация», прочли стихотворения собственного сочинения, прозу, фанфики, а&nbsp;также спели авторские песни.',
    },
    {
      image: synergyApi('uploads/content/events/event6.webp'),
      title: 'Студенты колледжа демо-вуза посетили спектакль «Преступление и&nbsp;наказание» в&nbsp;театре Моссовета',
      text: '14 декабря студенты колледжа Школы Нового театра посетили театр им. Моссовета. Они посмотрели спектакль Юрия Еремина «Р.Р.Р.» по роману Ф.М. Достоевского «Преступление и наказание» Школы Нового театра посетили театр им. Моссовета Юрия Еремина «Р.Р.Р.».',
    },
  ],
};
