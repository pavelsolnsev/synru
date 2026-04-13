import type { Direction, HelpCard } from './SChooseDirectionData';
import { synergyApi } from '~/utils/mediaCdn';

export const helpCard: HelpCard = {
  title: 'Не&nbsp;знаю, <br>что выбрать',
  description: 'Не&nbsp;определились с&nbsp;профессией?',
  text: 'Специалист подскажет, какие специальности востребованы на&nbsp;рынке труда и&nbsp;где лучше учиться с&nbsp;учётом предпочтений',
  btn: 'Помогите выбрать',
  formId: 'direction-help-card',
  type: 'helpCard',
};

export const helpCard2: HelpCard = {
  title: 'Не&nbsp;могу определиться',
  description: 'Пока не&nbsp;выбрали профессию?',
  text: 'Расскажите специалисту о&nbsp;своих интересах и&nbsp;склонностях. Он&nbsp;поможет выбрать направление, подходящее именно вам',
  btn: 'Помогите выбрать',
  formId: 'direction-help-cant',
  type: 'helpCard',
};

const directionsCollegeOnline: Array<Direction | HelpCard> = [
  {
    title: 'IT и&nbsp;AI',
    text: 'Программирование и&nbsp;разработка, игры',
    titleForm: 'Скачайте программы по&nbsp;направлению «IT и&nbsp;AI»',
    icon: '',
    iconSm: '',
    iconNew: synergyApi('uploads/content/s-directions/IT2.webp'),
  },
  {
    title: 'Бизнес и&nbsp;менеджмент',
    text: 'Финансы, управление, бухгалтерия, маркетинг',
    titleForm: 'Скачайте программы по&nbsp;направлению «Бизнес и&nbsp;менеджмент»',
    icon: '',
    iconSm: '',
    iconNew: synergyApi('uploads/content/s-directions/business.webp'),
  },
  helpCard,
  {
    title: 'Психология',
    text: 'Клиническая, детская, консультативная, семейная, коучинг',
    titleForm: 'Скачайте программы по&nbsp;направлению «Психология»',
    icon: 'psih',
    iconSm: 'icons7_small/psixologiya',
    iconNew: synergyApi('uploads/content/s-directions/psih.webp'),
  },
  {
    title: 'Педагогика',
    text: 'Учитель, воспитатель, преподаватель',
    titleForm: 'Скачайте программы по&nbsp;направлению «Педагогика»',
    icon: 'ped',
    iconSm: 'icons7_small/fakultetpedagogika',
    iconNew: synergyApi('uploads/content/s-directions/ped.webp'),
  },
  {
    title: 'Творчество',
    text: 'Дизайн, анимация, игры, кино',
    titleForm: 'Скачайте программы по&nbsp;направлению «Творчество»',
    icon: '',
    iconSm: '',
    iconNew: synergyApi('uploads/content/s-directions/tvor.webp'),
  },
  {
    title: 'Инженерия',
    text: 'Строительство, снабжение',
    titleForm: 'Скачайте программы по&nbsp;направлению «Инженерия»',
    icon: '',
    iconSm: '',
    iconNew: synergyApi('uploads/content/s-directions/it.webp'),
  },
];


const directionsCollegeTechnology: Array<Direction | HelpCard> = [
  {
    title: 'AI и&nbsp;VR',
    text: 'Роботы, игры, дополненная реальность',
    titleForm: 'Скачайте программы по&nbsp;направлению «AI и&nbsp;VR»',
    icon: '',
    iconSm: '',
    iconNew: synergyApi('uploads/content/s-directions/ai_vr.webp'),
  },
  {
    title: 'IT',
    text: 'Программирование, тестирование, игры, безопасность',
    titleForm: 'Скачайте программы по&nbsp;направлению «IT»',
    icon: '',
    iconSm: '',
    iconNew: synergyApi('uploads/content/s-directions/IT2.webp'),
  },
  {
    title: 'Бизнес и&nbsp;менеджмент',
    text: 'Финансы, управление, бухгалтерия, маркетинг',
    titleForm: 'Скачайте программы по&nbsp;направлению «Бизнес и&nbsp;менеджмент»',
    icon: '',
    iconSm: '',
    iconNew: synergyApi('uploads/content/s-directions/business.webp'),
  },
  helpCard2,
  {
    title: 'Творчество',
    text: 'Дизайн, анимация, игры,&nbsp;кино',
    titleForm: 'Скачайте программы по&nbsp;направлению «Творчество»',
    icon: '',
    iconSm: '',
    iconNew: synergyApi('uploads/content/s-directions/tvor.webp'),
  },
  {
    title: 'Инженерия',
    text: 'Мехатроника, строительство, электроника, БПЛА',
    titleForm: 'Скачайте программы по&nbsp;направлению «Инженерия»',
    icon: '',
    iconSm: '',
    iconNew: synergyApi('uploads/content/s-directions/it.webp'),
  },
];


export const directionsData = {
  'online': {
    directions: directionsCollegeOnline,
    actionParams: [
      { param: 'form=postupi_short_c_o' },
    ],
  },
  'technology': {
    directions: directionsCollegeTechnology,
    actionParams: [
      { param: 'form=postupi_short_c_t' },
    ],
  }
};
