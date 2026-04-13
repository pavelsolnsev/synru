import { synergyApi, synergyRu } from '~/utils/mediaCdn';
<script setup lang="ts">
const docs = [
  {
    'icon': synergyApi('uploads/content/s-docs/doc.svg'),
    'image': synergyApi('uploads/content/s-docs/prof.jpg'),
    'title': 'Диплом о профессиональной переподготовке',
  },
  {
    'icon': synergyApi('uploads/content/s-docs/sertificate.svg'),
    'image': synergyApi('uploads/content/s-docs/certificate.png'),
    'title': 'Сертификат об успешном прохождении обучения',
  },
];

const achievementsFacultetsList = [{
  image: synergyApi('uploads/content/s-achievements-faculties/img-2.jpg'),
  title: 'День открытых дверей в технопарке «Сколково»',
  text: 'Спикеры рассказали о самой практико-ориентированной в России учебной программе технологического предпринимательства. Ее студенты уже в процессе обучения создают свои стартапы в технопарке.',
}, {
  image: synergyApi('uploads/content/s-achievements-faculties/img-3.jpg'),
  title: 'День открытых дверей',
  text: 'Представители киностудии пообщались с гостями, рассказали о создании кинокластера на базе киностудии совместно с демо-вузом. Преподаватели-практики киноиндустрии провели мастер-классы по режиссуре короткого метра, сценарному мастерству, также провели лекции по истории кино.',
}, {
  image: synergyApi('uploads/content/s-achievements-faculties/img-1.jpg'),
  title: 'Иван «Pure» Москаленко',
  text: 'Игрок команды BetBoom Team по DOTA2, выступал на The International в 2022 г.',
}, {
  image: synergyApi('uploads/content/s-achievements-faculties/img.jpg'),
  title: 'Иван «Pure» Москаленко',
  text: 'Игрок команды BetBoom Team по DOTA2, выступал на The International в 2022 г.',
}];

const raitings = [{
  name: 'Рейтинг по численности студентов',
  subname: '',
  link: '#',
  organization: 'Министерство науки и высшего образования РФ',
  logo: synergyApi('uploads/content/s-ratings/hh.png'),
  year: '2022-<br>-2023',
  position: 1,
  difference: '+',
}, {
  name: 'Рейтинг предпринимательских программ',
  link: '#',
  organization: 'Интерфакс',
  logo: synergyApi('uploads/content/s-ratings/ed-techs.png'),
  year: '2023, 1 квартал',
  position: 1,
  difference: '-',
}, {
  name: 'Рейтинг лучших вузов России',
  link: '#',
  organization: 'hh.ru',
  logo: synergyApi('uploads/content/s-ratings/interfax.png'),
  year: '2021',
  position: 3,
  difference: '-',
}, {
  name: 'Рейтинг по количеству иностранных студентов',
  link: '#',
  organization: 'Министерство науки и высшего образования РФ',
  logo: synergyApi('uploads/content/s-ratings/min-science.png'),
  year: '2021',
  position: 2,
  difference: '+1',
}, {
  name: 'Рейтинг крупнейших компаний',
  subname: 'в сфере онлайн-образования',
  link: '#',
  organization: 'EdTechs',
  logo: synergyApi('uploads/content/s-ratings/uni-rank.png'),
  year: '2023',
  position: 3,
  difference: '+2',
}, {
  name: 'Рейтинг Top Universities in Russia',
  subname: 'среди российских вузов',
  link: '#',
  organization: 'UniRank',
  logo: synergyApi('uploads/content/s-ratings/qs.png'),
  year: '2021',
  position: '23',
  difference: '+-',
}, {
  name: 'Национальный рейтинг университетов',
  link: '#',
  organization: 'Интерфакс',
  logo: synergyApi('uploads/content/s-ratings/qs.png'),
  year: '2021',
  position: 'ТОП-100',
  difference: '',
}, {
  name: 'Международный рейтинг вузов',
  subname: 'стран Восточной Европы и Центральной Азии',
  link: '#',
  organization: 'QS EECA University Rankings',
  logo: synergyApi('uploads/content/s-ratings/qs.png'),
  year: '2021',
  position: 'ТОП-400',
  difference: '',
}];

const studentLifeItems = [
  {
    image: synergyApi('uploads/content/s-student-life/01.jpeg'),
  },
  {
    image: synergyApi('uploads/content/s-student-life/02.jpeg'),
  },
  {
    image: synergyApi('uploads/content/s-student-life/03.jpeg'),
  },
  {
    image: synergyApi('uploads/content/s-student-life/04.jpeg'),
  },
  {
    image: synergyApi('uploads/content/s-student-life/05.jpeg'),
  },
  {
    image: synergyApi('uploads/content/s-student-life/06.jpeg'),
  },
  {
    image: synergyApi('uploads/content/s-student-life/07.jpeg'),
  },
];

const tags = ['centr-karery'];

const images = [
  {
    value: synergyApi('uploads/content/synergy-nations/01.jpg'),
  },
  {
    value: synergyApi('uploads/content/synergy-nations/02.jpg'),
  },
  {
    value: synergyApi('uploads/content/synergy-nations/03.jpg'),
  },
];

const tagsFormPay = [{
  tag: 'Проверка',
}];

const teams = [
  {
    img:synergyApi('uploads/content/kvn/final_pervaya_liga_09.12.24_sekcziya_.webp'),
    title: '«Просто зашли»',
    subtitle: 'Получила награду Кубка КВН МГПУ.',
    text: '21 октября студенты факультета Анимации представили демо-вуз на игре, организованной Московским городским педагогическим университетом. По итогам встречи команда «Просто зашли» получила награду за лучшую шутку Кубка КВН МГПУ.',
  },
  {
    img: synergyApi('uploads/content/kvn/kvn_vtoraya_seriya.webp'),
    socialLink: 'https://vk.com/s_miru_po_shutke_kvn',
    socialNameLogo: 'social-vk',
    title: '«Просто зашли»',
    subtitle: 'Заняла третье место в Кубке КВН.',
    text: '13 октября прошла игра, организованная демо-вузом и МГУПП, в которой приняли участие 24 команды из Москвы и других регионов России. Университет представлял коллектив факультета Анимации. По итогам встречи команда «Просто зашли» заняла третье место, уступив представителям РЭУ им. Плеханова и АГПС МЧС России',
  },
  {
    img:synergyApi('uploads/content/kvn/kvn_oborovich.webp'),
    socialLink: 'https://t.me/shale_oborovich',
    socialNameLogo: 'social-telegram',
    title: '«С миру по шутке»',
    subtitle: 'Колледж демо-вуза вышел в полуфинал Официальной Подмосковной лиги КВН.',
    text: '24 октября в Королеве пройдёт 1/2 финала Официальной Подмосковной лиги КВН. Демо-вуз будет представлять команда колледжа «С миру по шутке», организованная факультетом Права и социального обеспечения.',
  },
  {
    img:synergyApi('uploads/content/kvn/sekcziya_vyisshaya_liga.webp'),
    title: '«С миру по шутке»',
    subtitle: 'Колледж демо-вуза вышел в полуфинал Официальной Подмосковной лиги КВН.',
    text: '24 октября в Королеве пройдёт 1/2 финала Официальной Подмосковной лиги КВН. Демо-вуз будет представлять команда колледжа «С миру по шутке», организованная факультетом Права и социального обеспечения.',
  },
];

const cards = [
  {
    img: synergyRu('content/volunteer_center/vfm.webp'),
    text:'Всемирный фестиваль молодежи 2024',
  },
  {
    img: synergyRu('content/volunteer_center/vfm.webp'),
    text:'Всемирный фестиваль молодежи 2024',
  },
  {
    img: synergyRu('content/volunteer_center/vfm.webp'),
    text:'Всемирный фестиваль молодежи 2024',
  },
  {
    img: synergyRu('content/volunteer_center/vfm.webp'),
    text:'Всемирный фестиваль молодежи 2024',
  },
  {
    img: synergyRu('content/volunteer_center/vfm.webp'),
    text:'Всемирный фестиваль молодежи 2024',
  },
];
</script>

<template>
  <SPaymentsOptions />
  <SSynergyNations
    title="Клуб Synergy Nations"
    title-card="Snergy Nations&nbsp;— это открытый клуб интернационального общения, объединяющий российских и&nbsp;иностранных студентов из&nbsp;более 50 стран."
    title-class-card="a-font_h5"
    text-card="На&nbsp;его собраниях можно найти новых друзей, партнёров, обменяться культурным опытом."
    text-class-card="a-font_h6"
    prefix="В&nbsp;рамках клуба студенты получают возможность:"
    :images
  />
  <SLms />
  <SFormPay
    bg-color="white"
    title="Оплата обучения картой!!"
    description="Быстро, просто, удобно"
    image-sm=synergyApi('uploads/content/formpay/form_pay_sm.webp')
    image-md=synergyApi('uploads/content/formpay/form_pay_md.webp')
    image-lg=synergyApi('uploads/content/formpay/form_pay_lg.webp')
    form-title="Заполните форму для оплаты"
    form-bg-color="white"
    btn-text="Оплатить"
    :tags="tagsFormPay"
  />
  <SKvnTeams
    title="Команды КВН"
    title-card="У&nbsp;нас вы сможете не&nbsp;только получить новые знания, но&nbsp;и&nbsp;раскрыть свой творческий потенциал."
    text-card="Профессиональные команды университета играют в&nbsp;Высшей лиге и&nbsp;Международной лиге КВН, Московской студенческой лиге и&nbsp;студенческой лиге ВУЗов и&nbsp;ССУЗов."
    :teams
  />
  <SVolunteerCenter
    title="Волонтерский центр"
    title-card="Волонтерский центр&nbsp;— возможность для&nbsp;каждого открыть новые горизонты, найти новых <span class=&quot;nobr&quot;>друзей-единомышленников,</span> реализовать желание быть полезным."
    title-class-card="a-font_h6"
    text-card="Наши волонтеры принимают участие в&nbsp;организации масштабных событий, музыкальных фестивалей, спортивных мероприятий. Волонтерский центр демо-вуза сотрудничает с&nbsp;крупнейшими добровольческими организациями: «Мосволонтер», «Волонтеры Победы», «Красный крест» и&nbsp;др."
    text-class-card="a-font_l-m"
    :cards
    banner-title="Хотите стать волонтёром?"
    banner-class="a-font_h2"
    banner-description="Примите участие в&nbsp;важной части учебного процесса демо-вуза"
    banner-image-sm=synergyApi('uploads/content/banner/sm.webp')
    banner-image-md=synergyApi('uploads/content/banner/md.webp')
    banner-image-lg=synergyApi('uploads/content/banner/lg.webp')
    banner-btn-text="Принять участие"
    banner-btn-href="https://vk.com/dobro.synergy"
    banner-btn-color="black"
  />
  <SCenterCareers />
  <SStudentCouncil />
  <SStudentCenter />
  <STeachers
    title="Команда Центра карьеры"
    :tags
  />
  <SDownloadAppNew />
  <SForm
    title="Дни открытых дверей"
    description="Расскажем о востребованных профессиях и поможем выбрать подходящую."
    form-title="Заполните форму и наш менеджер свяжется с вами"
    btn-text="Подать заявку"
    image-lg=synergyApi('uploads/content/s-form/10_lg.webp')
    image-md=synergyApi('uploads/content/s-form/10_md.webp')
    image-sm=synergyApi('uploads/content/s-form/10_sm.webp')
  />
  <SFormMin
    title="Оставьте заявку на обучение"
    title-class="a-font_h3"
    subtitle="Заполните форму и наш менеджер свяжется с вами"
    subtitle-class="a-font_h6"
    bg-color="red"
    :show-logo="true"
    action=""
    btn="Подать заявку"
  />
  <SDownloadApp />
  <SUniversity />
  <SLoyaltyProgram />
  <STalisman />
  <SDirections />
  <SDocs
    title="Документы по&nbsp;окончании"
    subtitle="По&nbsp;окончании образовательной программы вы получаете один из&nbsp;документов"
    text="При&nbsp;успешном прохождении итоговой аттестации вы получите диплом государственного образца, подтверждающий ваши профессиональные компетенции."
    :docs
  />
  <SAchievementsFaculties
    title="Достижения факультетов"
    :articles="achievementsFacultetsList"
  />
  <SFaculties
    :has-entity="false"
    route-name="faculties"
    title="Факультеты"
    title-banner="Кредит на&nbsp;образование под&nbsp;3% годовых"
    subtitle-banner="Оплачивайте высшее и&nbsp;среднее образование в&nbsp;кредит, а&nbsp;государство поможет вам его погасить"
    btn-text-banner="Мне интересно"
    img-banner=synergyApi('uploads/content/m-credit-banner/sm.webp')
    img-md-banner=synergyApi('uploads/content/m-credit-banner/md.webp')
    img-lg-banner=synergyApi('uploads/content/m-credit-banner/lg.webp')
  />
  <SRatings :raitings />
  <SStudentLife :student-life-items />
</template>
