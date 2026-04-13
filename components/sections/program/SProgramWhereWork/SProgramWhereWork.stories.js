import SProgramWhereWork from './SProgramWhereWork.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SProgramWhereWork',
  component: SProgramWhereWork,
  argTypes: {},
};

const Template = (args) => ({
  components: { SProgramWhereWork },
  setup() {
    return { args };
  },
  template: '<s-program-where-work v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  entity: {
    custom_field_values: [
      {
        where_can_work: [
          {
            'image': synergyApi('uploads/content/program/where_work/art_facultet/departament_kulturnogo_naslediya_1.webp'),
            'title': 'Департамент культурного наследия города Москвы',
            'description': 'Отраслевой орган исполнительной власти Москвы, уполномоченный в&nbsp;области государственной охраны, сохранения, использования и&nbsp;популяризации объектов культурного наследия народов РФ, обеспечивает разработку и&nbsp;реализацию политики города в&nbsp;области недвижимого культурного наследия. Основными задачами департамента являются выявление, изучение и&nbsp;сохранение объектов культурного наследия.',
          },
          {
            'image': synergyApi('uploads/content/program/where_work/art_facultet/galereya_art_bryut.webp'),
            'title': 'Галерея Арт-Брют',
            'description': 'Галерея современного искусства ART &amp; BRUT сочетает в&nbsp;себе высочайшее качество и&nbsp;разумные цены. ART &amp; BRUT пребывает в&nbsp;постоянном поиске новых идей, имён и&nbsp;форм, и&nbsp;охотно делится своими открытиями с&nbsp;теми, кто готов наполнить свою повседневность красотой. Красотой, которая не&nbsp;требует жертв.',
          },
          {
            'image': synergyApi('uploads/content/program/where_work/art_facultet/galereya_reloft_art.webp'),
            'title': 'Галерея Reloft ART',
            'description': 'Галерея основана в&nbsp;2020 году Александром Анциферовым&nbsp;— арт-директором группы компаний Reloft.<br>В&nbsp;основе создания галереи&nbsp;— популяризация российского искусства и&nbsp;подбор произведений для частных и&nbsp;публичных интерьеров. Reloft ART тесно сотрудничает с&nbsp;архитекторами, декораторами и&nbsp;дизайнерами интерьера. В&nbsp;галерее регулярно проходят светские и&nbsp;образовательные мероприятия для профессионального сообщества.',
          },
        ],
      },
    ],
  },
};
