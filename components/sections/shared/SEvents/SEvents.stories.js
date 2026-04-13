import SEvents from './SEvents.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SEvents',
  component: SEvents,
  argTypes: {},
};

const Template = (args) => ({
  components: { SEvents },
  setup() {
    return { args };
  },
  template: '<s-events v-bind="args"/>',
});


export const Default = Template.bind({});
Default.args = {
  title: 'Ближайшие мероприятия',
  events: [
    {
      'tag': 'Онлайн',
      'date': 'С 21 по 23.11.2024,<br>каждый день в 18:00',
      'image': synergyApi('uploads/content/events/web11klass.webp'),
      'place': null,
      'title': 'Онлайн-интенсивы для 11 классов',
      'description': '<p><strong>Онлайн-интенсивы от&nbsp;студентов и&nbsp;выпускников МГУ по&nbsp;темам:&nbsp;</strong><br><strong>«Актуальные профессии 2025»,</strong><br><strong>«План действий для гарантированного поступления в&nbsp;вуз»,</strong><br><strong>Демо-урок «ЕГЭ по&nbsp;обществознанию».</strong></p>',
    },
    {
      'tag': 'Онлайн',
      'date': '22.11.2024 в 18:00',
      'image': synergyApi('uploads/content/events/kak_sdat_ekzamenyi_na_maksimum_i_postupit_v_2025_godu_12.10_1.webp'),
      'place': null,
      'title': '«Как учиться и&nbsp;работать в&nbsp;Дубае?». Открыт набор со&nbsp;стартом обучения в&nbsp;феврале 2025 года!',
      'description': '<p><strong>Вы&nbsp;поймете культурные и&nbsp;социальные аспекты учебы в&nbsp;Дубае, узнаете, как найти работу мечты и&nbsp;совмещать её&nbsp;с&nbsp;учебой. Познакомитесь с&nbsp;историями успеха от&nbsp;студентов и&nbsp;молодых специалистов уже построивших карьеру в&nbsp;ОАЭ. Получите пошаговый план, как получить шанс на&nbsp;переезд за&nbsp;счет спонсорства от&nbsp;Synergy University Dubai.</strong></p>',
    },
    {
      'tag': 'Очно',
      'date': '23.11.2024 в 12:00',
      'image': synergyApi('uploads/content/events/dod_shki.webp'),
      'place': 'Кампус «Семёновская», ул.&nbsp;Измайловский вал, дом 2',
      'title': 'День открытых дверей Университета и&nbsp;колледжа демо-вуза',
      'description': '<p><strong>Вы&nbsp;узнаете как и&nbsp;куда можно поступить, посетите экскурсию по&nbsp;кампусу и&nbsp;узнаете секреты студенческой жизни. Специалист ответит на&nbsp;все вопросы и&nbsp;поможет подать документы. Каждый участник получит памятный подарок.</strong></p>',
    },
    {
      'tag': 'Онлайн',
      'date': '30.11.2024 в 12:00',
      'image': synergyApi('uploads/content/events/dod_tver.webp'),
      'place': null,
      'title': '«Как учиться и&nbsp;работать в&nbsp;Дубае?». Открыт набор со&nbsp;стартом обучения в&nbsp;феврале 2025 года!',
      'description': '<p><strong>Вы&nbsp;поймете культурные и&nbsp;социальные аспекты учебы в&nbsp;Дубае, узнаете, как найти работу мечты и&nbsp;совмещать её&nbsp;с&nbsp;учебой. Познакомитесь с&nbsp;историями успеха от&nbsp;студентов и&nbsp;молодых специалистов уже построивших карьеру в&nbsp;ОАЭ. Получите пошаговый план, как получить шанс на&nbsp;переезд за&nbsp;счет спонсорства от&nbsp;Synergy University Dubai.</strong></p>',
    },
    {
      'tag': 'Онлайн',
      'date': '30.11.2024 в 12:00',
      'image': synergyApi('uploads/content/events/pryamoj_efir_s_rukovoditelem_priyomnoj_komissii_kak_postupit_v_sentyabre_28.09_7.webp'),
      'place': null,
      'title': 'Встреча с руководителем приёмной комиссии',
      'description': '<p><strong>Вы&nbsp;узнаете, какие документы необходимы для поступления в&nbsp;2025 году, какие предметы ЕГЭ необходимо сдавать для поступления на&nbsp;желаемый факультет. Каждый участник получит памятку!</strong></p>',
    },
  ],
};
