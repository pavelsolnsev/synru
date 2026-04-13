import { synergyApi } from '~/utils/mediaCdn';
const rectorate = [
  {
    image: synergyApi('uploads/content/teaching_staff/rector.webp'),
    name: 'Васильев Артем Игоревич',
    position: 'Ректор',
    contacts: '<div><span class="nobr">8 (800) 100-00-11</span> доб. 4801<br><a href="mailto:info@university.example" target="_blank">info@university.example</a></div>',
  },
  {
    image: synergyApi('uploads/content/teaching_staff/uporovl_sa.webp'),
    name: 'Упоров Сергей Александрович',
    position: 'Проректор по образовательной деятельности',
    contacts: '<div><span class="nobr">8 (800) 100-00-11</span> доб. 2344<br><a href="mailto:SUporov@university.example" target="_blank">SUporov@university.example</a></div>',
  },
  {
    image: synergyApi('uploads/content/teaching_staff/belchenko_nina.webp'),
    name: 'Бельченко Нина Владимировна',
    position: 'Проректор по среднему профессиональному и школьному образованию',
    contacts: '<div><span class="nobr">8 (800) 100-00-11</span> доб. 4200<br><a href="mailto:NBogatyreva@university.example" target="_blank">NBogatyreva@university.example</a></div>',
  },
  {
    image: synergyApi('uploads/content/teaching_staff/erofeev.webp'),
    name: 'Ерофеев Михаил Валериевич',
    position: 'Проректор по региональному развитию',
    contacts: '<div><span class="nobr">8 (800) 100-00-11</span> доб. 4770<br><a href="mailto:MErofeev@university.example" target="_blank">MErofeev@university.example</a></div>',
  },
  {
    image: synergyApi('uploads/content/teaching_staff/platov_av.webp'),
    name: 'Платов Александр Валерьевич',
    position: 'Проректор по финансовому мониторингу обучающихся',
    contacts: '<div><span class="nobr">8 (800) 100-00-11</span> доб. 1689<br><a href="mailto:aplatov@university.example" target="_blank">aplatov@university.example</a></div>',
  },
  {
    image: synergyApi('uploads/content/teaching_staff/kuznecov.webp'),
    name: 'Кузнецов Игорь Максимович',
    position: 'Проректор по организации приема',
    contacts: '<div><span class="nobr">8 (800) 100-00-11</span> доб. 7683<br><a href="mailto:IKuznetsov@university.example" target="_blank">IKuznetsov@university.example</a></div>',
  },
  {
    image: synergyApi('uploads/content/teaching_staff/polohina.webp'),
    name: 'Полихина Надежда Александровна',
    position: 'Проректор по исследовательской деятельности',
    contacts: '<div><span class="nobr">8 (800) 100-00-11</span> доб. 2256<br><a href="mailto:NPolikhina@university.example" target="_blank">NPolikhina@university.example</a></div>',
  },
  {
    image: synergyApi('uploads/content/teaching_staff/sultanov_r.webp'),
    name: 'Султанов Роман Сергеевич',
    position: 'Проректор по молодежной политике',
    contacts: '<div><span class="nobr">8 (800) 100-00-11</span> доб. 3443<br><a href="mailto: RSultanov@university.example" target="_blank"> RSultanov@university.example</a></div>',
  },
  {
    image: synergyApi('uploads/content/teaching_staff/medvedeva_o.webp'),
    name: 'Медведева Оксана Олеговна',
    position: 'Проректор по просветительской деятельности',
    contacts: '<div>8 (800) 100-00-11<br><a href="mailto: OMedvedeva@university.example" target="_blank"> OMedvedeva@university.example</a></div>',
  },
  {
    image: synergyApi('uploads/content/teaching_staff/kudinov_mv.webp'),
    name: 'Кудинов Михаил Владимирович',
    position: 'Проректор по патриотическому воспитанию',
    contacts: '<div><span class="nobr">8 (800) 100-00-11</span> доб. 4897<br><a href="mailto:MKudinov@university.example" target="_blank">MKudinov@university.example</a></div>',
  },
  {
    image: synergyApi('uploads/content/teaching_staff/semkinata.webp'),
    name: 'Семкина Татьяна Александровна',
    position: 'Проректор',
    contacts: '<div><span class="nobr">8 (800) 100-00-11</span> доб. 4920<br><a href="mailto:TSemkina@university.example" target="_blank">TSemkina@university.example</a></div>',
  },
  {
    image: synergyApi('uploads/content/teaching_staff/hitrov.webp'),
    name: 'Хитров Андрей Викторович',
    position: 'Руководитель аппарата Президента, Проректор по общим вопросам',
    contacts: '<div><span class="nobr">8 (800) 100-00-11</span> доб. 3399<br><a href="mailto:AKhitrov@university.example" target="_blank">AKhitrov@university.example</a></div>',
  },
];

const council = [
  {
    image: synergyApi('uploads/content/teaching_staff/rubin.webp'),
    name: 'Рубин Юрий Борисович',
    position: `
    <ul>
      <li>Президент демо-вуза.</li>
      <li>Заслуженный работник высшей школы&nbsp;РФ.</li>
      <li>Лауреат премии Правительства&nbsp;РФ в&nbsp;области образования.</li>
      <li>Член-корреспондент Российской академии образования.</li>
      <li>Доктор экономических наук, профессор.</li>
      <li>Заведующий кафедрой Теории и&nbsp;практики конкуренции.</li>
    </ul>
  `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/lobov.webp'),
    name: 'Лобов Вадим Георгиевич',
    position: `
    <ul>
      <li>Президент демо-корпорации.</li>
      <li>Кандидат экономических наук, доцент.</li>
      <li>Член Комиссии Государственного Совета Российской Федерации по&nbsp;направлению «Малое и&nbsp;среднее предпринимательство».</li>
    </ul>
  `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/malishkov.webp'),
    name: 'Малышков Владимир Иванович',
    position: `
    <ul>
      <li>Вице-президент.</li>
      <li>Доктор экономических наук, профессор.</li>
      <li>Первый вице-президент&nbsp;МБА.</li>
      <li>Президент Академии предпринимательства при&nbsp;Правительстве Москвы.</li>
      <li>Заслуженный работник торговли Российской Федерации.</li>
    </ul>
  `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/lukashenko.webp'),
    name: 'Лукашенко Марианна Анатольевна',
    position: `
    <ul>
      <li>Вице-президент.</li>
      <li>Доктор экономических наук, профессор.</li>
      <li>Проректор МФПУ (демо).</li>
      <li>Член рабочей группы РСПП по&nbsp;реформированию системы образования.</li>
    </ul>
  `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/lednev.webp'),
    name: 'Леднев Владимир Алексеевич',
    position: `
    <ul>
      <li>Вице-президент.</li>
      <li>Профессор, доктор экономических наук.</li>
      <li>Член Экспертного Совета Министерства образования и&nbsp;науки&nbsp;РФ по&nbsp;совершенствованию системы физического воспитания.</li>
    </ul>
  `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/habarov.webp'),
    name: 'Хабаров Владимир Иванович',
    position: `
    <ul>
      <li>Вице-президент.</li>
      <li>Почетный работник высшего профессионального образования&nbsp;РФ.</li>
      <li>Профессор, заведующий кафедрой Организационного менеджмента.</li>
      <li>Доктор экономических наук.</li>
      <li>Эксперт по&nbsp;управлению проектами.</li>
    </ul>
  `,
  },
];

const professors = [
  {
    image: synergyApi('uploads/content/teaching_staff/pryanishnikov.webp'),
    name: 'Николай Николаевич Прянишников',
    position: `
      <ul>
        <li>Генеральный директор «Русской Фитнес Группы», управляющей сетью спортивных клубов World Class.</li>
        <li>Занимал пост Президента Microsoft в&nbsp;России и&nbsp;гендиректора Вымпелкома.</li>
      </ul>
    `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/senderov.webp'),
    name: 'Дмитрий Владимирович Сендеров',
    position: `
      <ul>
        <li>Руководитель и&nbsp;совладелец рекламного агентства Strong.</li>
        <li>Среди клиентов: Microsoft, Mary Kay, Lacalut, Union Pay, Роснефть, «Останкино» и&nbsp;др.</li>
      </ul>
    `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/kosorukova.webp'),
    name: 'Ирина Вячеславовна Косорукова',
    position: `
      <ul>
        <li>Доктор экономических наук, профессор, заведующая кафедрой корпоративных финансов и&nbsp;оценочной деятельности.</li>
        <li>Член Правления&nbsp;НП «Российская коллегия оценщиков», член редакционного совета журнала «Имущественные отношения в&nbsp;РФ», почетный работник сферы образования Российской Федерации.</li>
        <li>Основатель научной школы оценки собственности демо-вуза.</li>
        <li>Является одним из&nbsp;разработчиков профессиональных стандартов Российской Федерации в&nbsp;области оценки.</li>
        <li>Консультирует государственные корпорации по&nbsp;вопросам риск-ориентированного менеджмента.</li>
      </ul>
    `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/navashina.webp'),
    name: 'Татьяна Сергеевна Новашина',
    position: `
      <ul>
        <li>Кандидат экономических наук, доцент, почетный работник высшего образования Российской Федерации.</li>
        <li>Основатель научной школы Университета по&nbsp;вопросам обеспечения финансовой устойчивости банков, стабильности банковской системы Российской Федерации.</li>
      </ul>
    `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/grib.webp'),
    name: 'Владимир Григорьевич Гриб',
    position: `
      <ul>
        <li>Доктор юридических наук, профессор, Заслуженный юрист РФ, полковник милиции в&nbsp;отставке. Награжден медалью ордена «За&nbsp;заслуги перед Отечеством» ІІ степени, орденом «За&nbsp;службу России»,</li>
        <li>нагрудным знаком «Почетный работник МВД», именным оружием.</li>
      </ul>
    `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/xabarov.webp'),
    name: 'Владимир Иванович Хабаров',
    position: `
      <ul>
        <li>Вице-президент демо-вуза, профессор кафедры организационного менеджмента.</li>
        <li>Почетный работник высшего профессионального образования Российской Федерации.</li>
        <li>Почетный деятель науки и&nbsp;техники города Москвы.</li>
      </ul>
    `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/lukashenko.webp'),
    name: 'Марианна Анатольевна Лукашенко',
    position: `
        <ul>
        <li>Доктор экономических наук, профессор.</li>
        <li>Почетный работник высшего профессионального образования Российской Федерации.</li>
        <li>Вице-президент демо-вуза, заведующая кафедрой корпоративной культуры.</li>
        <li>Член редакционной коллегии журнала «Высшее образование в&nbsp;России».</li>
        <li>Ведущий эксперт-консультант Школы бизнеса демо-вуза и&nbsp;компании «Организация времени», бизнес-тренер высшей категории.</li>
        <li>Автор монографий, учебников и&nbsp;статей по&nbsp;проблемам образования, корпоративным коммуникациям и&nbsp;тайм-менеджменту.</li>
        </ul>
    `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/lednev.webp'),
    name: 'Владимир Алексеевич Леднев',
    position: `
      <ul>
        <li>Вице-президент демо-вуза.</li>
        <li>Доктор экономических наук, профессор.</li>
        <li>Заведующий кафедрой спортивного менеджмента. Почетный работник высшего профессионального образования Российской Федерации.</li>
        <li>Член Экспертного Совета Федеральной антимонопольной службы по&nbsp;развитию конкуренции в&nbsp;области образования и&nbsp;науки. Член Экспертного Совета при Комитете Государственной Думы по&nbsp;физической культуре, спорту, туризму и&nbsp;делам молодежи.</li>
        <li>Автор первой в&nbsp;России докторской диссертации по&nbsp;развитию индустрии спорта, создатель научно-педагогической школы «Индустрия спорта и&nbsp;спортивный менеджмент». Разработчик профессиональных стандартов и&nbsp;инициатор независимой оценки специалистов в&nbsp;сфере спортивной отрасли. Программный директор деловой программы форума «Россия&nbsp;— спортивная держава» в&nbsp;2019 году.</li>
      </ul>
    `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/logvinova.webp'),
    name: 'Ирина Львовна Логвинова',
    position: `
      <ul>
        <li>Доктор экономических наук, профессор.</li>
        <li>Почетный работник высшего профессионального образования Российской Федерации.</li>
        <li>Заведующая кафедрой страхования Московского финансово-промышленного демо-вуза.</li>
        <li>Член редколлегии журнала «Страховое дело», автор более 80 публикаций и&nbsp;5 монографий.</li>
        <li>Постоянный спикер и&nbsp;модератор сессий российских и&nbsp;международных конференций по&nbsp;страховой деятельности.</li>
        <li>Основные сферы научных интересов: взаимное страхование, такафул (исламское страхование). Осуществляет научное руководство аспирантами, официальный оппонент на&nbsp;защите кандидатских диссертаций в&nbsp;таких вузах, как Российская экономическая академия им.&nbsp;Г.В. Плеханова; МГИМО (У) при Министерстве иностранных дел РФ, МГУ им.&nbsp;М.В. Ломоносова.</li>
      </ul>
    `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/pashkovskaya.webp'),
    name: 'Маргарита Васильевна Пашковская',
    position: `
      <ul>
        <li>Кандидат экономических наук, доцент.</li>
        <li>Заведующая кафедрой экономической теории и&nbsp;мировой экономики. Почетный работник сферы образования Российской Федерации.</li>
        <li>Эксперт национальных проектов «Цифровая экономика», «Наука и&nbsp;Университеты»; разработчик государственных программ по&nbsp;вопросам экспорта российского образования.</li>
        <li>Автор учебников по&nbsp;микроэкономике, макроэкономике, мировой экономике, цифровой экономике.</li>
      </ul>
    `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/alaverdov.webp'),
    name: 'Ашот Робертович Алавердов',
    position: `
      <ul>
        <li>Доктор экономических наук, профессор кафедры управления человеческими ресурсами, почетный работник высшего профессионального образования Российской Федерации.</li>
        <li>Автор 4 монографий, 7 учебников, 18 учебных пособий, 83 научных статей.</li>
        <li>Область профессиональных интересов: стратегическое и&nbsp;антикризисное управление персоналом, управление лояльностью персонала.</li>
      </ul>
    `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/adizes.webp'),
    name: 'Ицхак Кальдерон Адизес',
    position: `
      <ul>
        <li>Один из&nbsp;ведущих мировых экспертов в&nbsp;области повышения эффективности ведения бизнеса.</li>
        <li>Преподаватель Школы менеджмента Андерсена при Калифорнийском университете, Стэнфордского и&nbsp;Колумбийского университетов, Еврейского университета в&nbsp;Иерусалиме и&nbsp;Тель-Авивского университета.</li>
      </ul>
    `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/fridman.webp'),
    name: 'Александр Семёнович Фридман',
    position: `
      <ul>
        <li>Консультант и&nbsp;бизнес-тренер.</li>
        <li>Управляющий партнер консалтинговой компании Amadeus Group.</li>
        <li>Экспертная квалификация: внедрение регулярного менеджмента; повышение точности корпоративного управления; обучение методам.</li>
      </ul>
    `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/docenko.webp'),
    name: 'Евгений Владимирович Доценко',
    position: `
      <ul>
        <li>Директор R&amp;D, руководитель направления «HR-консалтинг» ГК «Институт Тренинга&nbsp;— АРБ Про».</li>
        <li>Член American Society for Training &amp; Development (США) и&nbsp;Chartered Institute of&nbsp;Personnel &amp; Development (Великобритания).</li>
      </ul>
    `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/strelkova.webp'),
    name: 'Зоя Александровна Стрелкова',
    position: `
      <ul>
        <li>Ведущий финансовый аналитик&nbsp;ГК «Институт Тренинга&nbsp;— АРБ Про».</li>
        <li>Эксперт в&nbsp;области стратегического планирования, управленческого учета и&nbsp;бизнес-моделирования.</li>
      </ul>
    `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/batyrev.webp'),
    name: 'Максим Валерьевич Батырев',
    position: `
      <ul>
        <li>Эксперт по&nbsp;продажам, автор бестселлера «45 татуировок менеджера», получившего «Книжную премию Рунета&nbsp;— 2014» как самая продаваемая бизнес-книга в&nbsp;России.</li>
      </ul>
    `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/astakhov.webp'),
    name: 'Павел Алексеевич Астахов',
    position: `
      <ul>
        <li>Государственный деятель, адвокат, телеведущий, писатель.</li>
        <li>Среди клиентов&nbsp;— ведущие политики, спортсмены, звезды шоу-бизнеса, руководители госкорпораций.</li>
      </ul>
    `,
  },
  {
    image: synergyApi('uploads/content/teaching_staff/kukushkin.webp'),
    name: 'Марк Евгеньевич Кукушкин',
    position: `
      <ul>
        <li>Бизнес-тренер, эксперт в&nbsp;области ораторского искусства и&nbsp;публичных выступлений.</li>
        <li>Автор книг по&nbsp;бизнесу, психологии и&nbsp;саморазвитию.</li>
        <li>Обладатель премии Trainings.</li>
      </ul>
    `,
  },
];

export {
  rectorate,
  council,
  professors,
};
