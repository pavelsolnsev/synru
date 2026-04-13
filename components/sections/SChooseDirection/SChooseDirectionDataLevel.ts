import type { Direction, HelpCard } from './SChooseDirectionData';

export const helpCard: HelpCard = {
  title: 'Не&nbsp;знаю, что выбрать',
  description: 'Не&nbsp;определились с&nbsp;профессией?',
  text: 'Специалист подскажет, что востребовано на&nbsp;рынке труда и&nbsp;где вам лучше учиться',
  btn: 'Помогите выбрать',
  formId: 'direction-help-card',
  type: 'helpCard',
};


const directionsCollege: Array<Direction | HelpCard> = [
  {
    title: 'Юриспруденция',
    text: 'Юрист, правоохранительная деятельность',
    titleForm: 'Скачайте программы по&nbsp;направлению «Юриспруденция»',
    icon: 'urid',
    iconSm: 'icons7_small/yurisprudencziya',
  },
  {
    title: 'IT и инженерия',
    text: 'Программирование и&nbsp;разработка, игры, робототехника, строительство,&nbsp;БПЛА',
    titleForm: 'Скачайте программы по&nbsp;направлению «IT и&nbsp;инженерия»',
    icon: 'it',
    iconSm: 'icons7_small/programmirovanie',
  },
  {
    title: 'Бизнес и менеджмент',
    text: 'Маркетинг, финансы, бухгалтерия, управление',
    titleForm: 'Скачайте программы по&nbsp;направлению «Бизнес и&nbsp;менеджмент»',
    icon: 'business',
    iconSm: 'icons7_small/biznesa',
  },
  helpCard,
  {
    title: 'Психология',
    text: 'Клиническая, детская консультативная, семейная, коучинг',
    titleForm: 'Скачайте программы по&nbsp;направлению «Психология»',
    icon: 'psih',
    iconSm: 'icons7_small/psixologiya',
  },
  {
    title: 'Медицина',
    text: 'Стоматология, фармацевтика, здоровье, красота',
    titleForm: 'Скачайте программы по&nbsp;направлению «Медицина»',
    icon: 'medic',
    iconSm: 'icons7_small/mediczina',
  },
  {
    title: 'Педагогика',
    text: 'Учитель, воспитатель, преподаватель',
    titleForm: 'Скачайте программы по&nbsp;направлению «Педагогика»',
    icon: 'ped',
    iconSm: 'icons7_small/fakultetpedagogika',
  },
  {
    title: 'Творчество',
    text: 'Дизайн, анимация, игры, кино и&nbsp;театр, музыка',
    titleForm: 'Скачайте программы по направлению «Творчество»',
    icon: 'tvor',
    iconSm: 'icons7_small/dizajn',
  },
];

const directionsBachelor: Array<Direction | HelpCard> = [
  {
    title: 'Юриспруденция',
    text: 'Юрист, государственная и муниципальная служба',
    titleForm: 'Скачайте программы по&nbsp;направлению «Юриспруденция»',
    icon: 'urid',
    iconSm: 'icons7_small/yurisprudencziya',
  },
  {
    title: 'IT и AI',
    text: 'Программирование и&nbsp;разработка, игры, робототехника,&nbsp;БПЛА',
    titleForm: 'Скачайте программы по&nbsp;направлению «IT и&nbsp;AI»',
    icon: 'it',
    iconSm: 'icons7_small/programmirovanie',
  },
  {
    title: 'Бизнес и менеджмент',
    text: 'Маркетинг, финансы, бухгалтерия, управление, HR',
    titleForm: 'Скачайте программы по&nbsp;направлению «Бизнес и&nbsp;менеджмент»',
    icon: 'business',
    iconSm: 'icons7_small/biznesa',
  },
  helpCard,
  {
    title: 'Психология',
    text: 'Клиническая, детская консультативная, семейная, коучинг',
    titleForm: 'Скачайте программы по&nbsp;направлению «Психология»',
    icon: 'psih',
    iconSm: 'icons7_small/psixologiya',
  },
  {
    title: 'Педагогика',
    text: 'Учитель, воспитатель, преподаватель',
    titleForm: 'Скачайте программы по&nbsp;направлению «Педагогика»',
    icon: 'ped',
    iconSm: 'icons7_small/fakultetpedagogika',
  },
  {
    title: 'Строительство',
    text: 'Промышленное и&nbsp;городское, архитектура, дороги, энергетика',
    titleForm: 'Скачайте программы по&nbsp;направлению «Строительство»',
    icon: 'build_new',
    iconSm: 'icons7_small/build_mob',
  },
  {
    title: 'Творчество',
    text: 'Дизайн, анимация, игры, кино и&nbsp;театр, музыка',
    titleForm: 'Скачайте программы по направлению «Творчество»',
    icon: 'tvor',
    iconSm: 'icons7_small/dizajn',
  },
];

const directionsSecond: Array<Direction | HelpCard> = [
  {
    title: 'Юриспруденция',
    text: 'Юрист, государственная и муниципальная служба',
    titleForm: 'Скачайте программы по&nbsp;направлению «Юриспруденция»',
    icon: 'urid',
    iconSm: 'icons7_small/yurisprudencziya',
  },
  {
    title: 'IT и AI',
    text: 'Программирование и&nbsp;разработка, игры, робототехника,&nbsp;БПЛА',
    titleForm: 'Скачайте программы по&nbsp;направлению «IT и&nbsp;AI»',
    icon: 'it',
    iconSm: 'icons7_small/programmirovanie',
  },
  {
    title: 'Бизнес и менеджмент',
    text: 'Маркетинг, финансы, бухгалтерия, управление, HR',
    titleForm: 'Скачайте программы по&nbsp;направлению «Бизнес и&nbsp;менеджмент»',
    icon: 'business',
    iconSm: 'icons7_small/biznesa',
  },
  helpCard,
  {
    title: 'Психология',
    text: 'Клиническая, детская консультативная, семейная, коучинг',
    titleForm: 'Скачайте программы по&nbsp;направлению «Психология»',
    icon: 'psih',
    iconSm: 'icons7_small/psixologiya',
  },
  {
    title: 'Педагогика',
    text: 'Учитель, воспитатель, преподаватель',
    titleForm: 'Скачайте программы по&nbsp;направлению «Педагогика»',
    icon: 'ped',
    iconSm: 'icons7_small/fakultetpedagogika',
  },
  {
    title: 'Строительство',
    text: 'Промышленное и&nbsp;городское, архитектура, дороги, энергетика',
    titleForm: 'Скачайте программы по&nbsp;направлению «Строительство»',
    icon: 'build_new',
    iconSm: 'icons7_small/build_mob',
  },
  {
    title: 'Творчество',
    text: 'Дизайн, анимация, игры, кино и&nbsp;театр, музыка',
    titleForm: 'Скачайте программы по направлению «Творчество»',
    icon: 'tvor',
    iconSm: 'icons7_small/dizajn',
  },
];

const directionsSpec: Array<Direction | HelpCard> = [
  {
    title: 'Юриспруденция',
    text: 'Юрист, правоохранительная деятельность',
    titleForm: 'Скачайте программы по&nbsp;направлению «Юриспруденция»',
    icon: 'urid',
    iconSm: 'icons7_small/yurisprudencziya',
  },
  {
    title: 'Экономика',
    text: 'Финансы, безопасность',
    titleForm: 'Скачайте программы по&nbsp;направлению «Экономика»',
    icon: 'economy_new',
    iconSm: 'icons7_small/economy_mob',
  },
  {
    title: 'Медицина',
    text: 'Стоматология, фармацевтика, здоровье',
    titleForm: 'Скачайте программы по&nbsp;направлению «Медицина»',
    icon: 'medic',
    iconSm: 'icons7_small/mediczina',
  },
  helpCard,
  {
    title: 'Психология',
    text: 'Клиническая, детская консультативная, семейная, коучинг',
    titleForm: 'Скачайте программы по&nbsp;направлению «Психология»',
    icon: 'psih',
    iconSm: 'icons7_small/psixologiya',
  },
  {
    title: 'IT и AI',
    text: 'Программирование и&nbsp;разработка, игры, робототехника,&nbsp;БПЛА',
    titleForm: 'Скачайте программы по&nbsp;направлению «IT и&nbsp;AI»',
    icon: 'it',
    iconSm: 'icons7_small/programmirovanie',
  },
  {
    title: 'Строительство и&nbsp;инженерия',
    text: 'Геология, добыча ископаемых',
    titleForm: 'Скачайте программы по&nbsp;направлению «Строительство и&nbsp;инженерия»',
    icon: 'build_new',
    iconSm: 'icons7_small/build_mob',
  },
  {
    title: 'Творчество',
    text: 'Дизайн, анимация, игры, кино и&nbsp;театр, музыка',
    titleForm: 'Скачайте программы по направлению «Творчество»',
    icon: 'tvor',
    iconSm: 'icons7_small/dizajn',
  },
];

const directionsMagistracy: Array<Direction | HelpCard> = [
  {
    title: 'Юриспруденция',
    text: 'Юрист, государственная и&nbsp;муниципальная служба',
    titleForm: 'Скачайте программы по&nbsp;направлению «Юриспруденция»',
    icon: 'urid',
    iconSm: 'icons7_small/yurisprudencziya',
  },
  {
    title: 'IT и инженерия',
    text: 'Программирование и&nbsp;разработка, облачные технологии, строительство',
    titleForm: 'Скачайте программы по&nbsp;направлению «IT и&nbsp;инженерия»',
    icon: 'it',
    iconSm: 'icons7_small/programmirovanie',
  },
  {
    title: 'Бизнес и менеджмент',
    text: 'Маркетинг, аналитика, финансы, бухгалтерия, управление, HR',
    titleForm: 'Скачайте программы по&nbsp;направлению «Бизнес и&nbsp;менеджмент»',
    icon: 'business',
    iconSm: 'icons7_small/biznesa',
  },
  helpCard,
  {
    title: 'Психология',
    text: 'Клиническая, детская консультативная, семейная, коучинг, кризисная, организационная ',
    titleForm: 'Скачайте программы по&nbsp;направлению «Психология»',
    icon: 'psih',
    iconSm: 'icons7_small/psixologiya',
  },
  {
    title: 'Педагогика',
    text: 'Учитель, воспитатель, преподаватель',
    titleForm: 'Скачайте программы по&nbsp;направлению «Педагогика»',
    icon: 'ped',
    iconSm: 'icons7_small/fakultetpedagogika',
  },
  {
    title: 'Лингвистика',
    text: 'Межъязыковые коммуникации, языковая локализация',
    titleForm: 'Скачайте программы по&nbsp;направлению «Лингвистика»',
    icon: 'lang_new',
    iconSm: 'icons7_small/lang_mob',
  },
  {
    title: 'Творчество',
    text: 'Дизайн, анимация, мода, продюсирование и медиа',
    titleForm: 'Скачайте программы по направлению «Творчество»',
    icon: 'tvor',
    iconSm: 'icons7_small/dizajn',
  },
];

const directionsPostgraduate: Array<Direction | HelpCard> = [
  {
    title: 'Юриспруденция',
    text: 'Правовые науки, финансы',
    titleForm: 'Скачайте программы по&nbsp;направлению «Юриспруденция»',
    icon: 'urid',
    iconSm: 'icons7_small/yurisprudencziya',
  },
  {
    title: 'IT и AI',
    text: 'Программирование и&nbsp;разработка, роботы,&nbsp;мехатроника',
    titleForm: 'Скачайте программы по&nbsp;направлению «IT и&nbsp;AI»',
    icon: 'it',
    iconSm: 'icons7_small/programmirovanie',
  },
  {
    title: 'Бизнес и менеджмент',
    text: 'Аналитика, коммерциализация, логистика, организационное изменение и&nbsp;развитие',
    titleForm: 'Скачайте программы по&nbsp;направлению «Бизнес и&nbsp;менеджмент»',
    icon: 'business',
    iconSm: 'icons7_small/biznesa',
  },
  helpCard,
  {
    title: 'Медицина',
    text: 'Стоматология, организация и&nbsp;социология здравоохранения, медико-социальная экспертиза',
    titleForm: 'Скачайте программы по&nbsp;направлению «Медицина»',
    icon: 'medic',
    iconSm: 'icons7_small/mediczina',
  },
  {
    title: 'Педагогика',
    text: 'Общая и&nbsp;профессиональная',
    titleForm: 'Скачайте программы по&nbsp;направлению «Педагогика»',
    icon: 'ped',
    iconSm: 'icons7_small/fakultetpedagogika',
  },
  {
    title: 'Государство',
    text: 'Развитие институтов, государственное и&nbsp;муниципальное управление',
    titleForm: 'Скачайте программы по&nbsp;направлению «Государство»',
    icon: 'krem_new',
    iconSm: 'icons7_small/krem_mob',
  },
  {
    title: 'Творчество',
    text: 'Дизайн, искусство, архитектура, культура',
    titleForm: 'Скачайте программы по направлению «Творчество»',
    icon: 'tvor',
    iconSm: 'icons7_small/dizajn',
  },
];


export const directionsData = {
  'college': {
    directions: directionsCollege,
    actionParams: [
      { param: 'form=postupi_short_f_k' },
    ],
  },
  'pervoe_vysshee': {
    directions: directionsBachelor,
    actionParams: [
      { param: 'form=postupi_short_f_b' },
    ],
  },
  'second_highest': {
    directions: directionsSecond,
    actionParams: [
      { param: 'form=postupi_short_f_vv' },
    ],
  },
  'speczialitet': {
    directions: directionsSpec,
    actionParams: [
      { param: 'form=postupi_short_f_s' },
    ],
  },
  'magistracy': {
    directions: directionsMagistracy,
    actionParams: [
      { param: 'form=postupi_short_f_m' },
    ],
  },
  'postgraduate_study': {
    directions: directionsPostgraduate,
    actionParams: [
      { param: 'form=postupi_short_f_a' },
    ],
  },
};
