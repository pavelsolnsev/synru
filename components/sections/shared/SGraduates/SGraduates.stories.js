import SGraduates from './SGraduates.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SGraduates',
  component: SGraduates,
  argTypes: {},
};

const Template = (args) => ({
  components: { SGraduates },
  setup() {
    return { args };
  },
  template: '<s-graduates v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  athletes: [
    {
      'info': 'Боксер',
      'name': 'Ахмадшох Махмадшоев',
      'text': '<ul><li>Мастер спорта по&nbsp;боксу</li><li>Победитель первенства России по&nbsp;боксу</li><li>Финалист чемпионата России среди студентов</li></ul>',
      'image': synergyApi('uploads/content/s-graduates/ahmadshoh.webp'),
    },
    {
      'info': 'Боксер',
      'name': 'Тамерлан Касымов',
      'text': '<ul><li>Мастер спорта по&nbsp;боксу</li><li>Призёр Всероссийской летней Универсиады 2020 года</li><li>Чемпион России среди студентов</li><li>Победитель Кубка командующего ВДВ</li></ul>',
      'image': synergyApi('uploads/content/s-graduates/kysymov.webp'),
    },
    {
      'info': 'Боксер',
      'name': 'Рамзан Карнукаев',
      'text': '<ul><li>Мастер спорта по&nbsp;боксу</li><li>Чемпион России среди молодёжи</li><li>Победитель всероссийских и&nbsp;международных турниров</li></ul>',
      'image': synergyApi('uploads/content/s-graduates/karnukaev.webp'),
    },
  ],
  graduates: [
    {
      'info': 'Выпуск 2008, магистратура',
      'name': 'Заргарян Арсен Сержевич',
      'text': '<p class="a-font_m"><strong>Должность: </strong>Руководитель проектов</p><p class="a-font_m"><strong>Место работы: </strong>PM&nbsp;Excellence&nbsp;— PMC-подрядчик, оказывающий услуги управления крупными и&nbsp;мегапроектами (нефтегазовая, нефтехимическая, строительная, горнорудная промышленность, инфраструктура, энергетика, морские и&nbsp;речные порты и&nbsp;др.).</p><p class="a-font_m"><strong>Специальность: </strong>«Менеджмент», профиль «Менеджмент в&nbsp;организации»</p>',
      'image': synergyApi('uploads/content/s-graduates/1_kopiya.webp'),
    },
    {
      'info': 'Выпуск 2023, бакалавриат',
      'name': 'Бизюлев Роман Александрович',
      'text': '<p class="a-font_m"><strong>Должность: </strong>Специалист по&nbsp;международным проектам</p><p class="a-font_m"><strong>Место работы: </strong>Международный молодежный центр федерального государственного автономного образовательного учреждения высшего образования «Российский университет дружбы народов»</p><p class="a-font_m"><strong>Специальность: </strong>«Менеджмент», профиль «Управление проектами»</p>',
      'image': synergyApi('uploads/content/s-graduates/2.webp'),
    },
    {
      'info': 'Выпуск 2022, аспирантура',
      'name': 'Леонов Михаил Евгеньевич',
      'text': '<p class="a-font_m"><strong>Должность: </strong>Директор по&nbsp;качеству</p><p class="a-font_m"><strong>Место работы: </strong>Компании «ПромоСтар» (специализируется на&nbsp;производстве автомобильной аудиотехники под брендом «Урал»)</p><p class="a-font_m"><strong>Специальность: </strong>«Менеджмент», профиль «Экономика управления народным хозяйством»</p>',
      'image': synergyApi('uploads/content/s-graduates/3.webp'),
    },
  ],
};
