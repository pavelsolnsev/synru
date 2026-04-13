<script setup lang="js">
import { PRIVACY } from '~/constants/documents';

const modalParams = {
  type: 'program',
  modalTitle: 'Скачать программу',
  actionParams: [],
}

onMounted(() => {
  initDirections();
  initListings();
  initThemes();
  initPopupButtons();
});

useHead({
  script: [
    {
      src: 'https://example.com/js/lander.js?v=270225',
      tagPosition: 'bodyClose',
      defer: true,
    },
  ],
});

const { openModal } = useModalStore();

function initDirections() {
  document.querySelectorAll('.s-directions__item').forEach((item) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelectorAll('.s-directions__item').forEach((i) => i.classList.remove('active'));

      const id = item.dataset.id;
      const section = document.getElementById(id);

      if (section.classList.contains('first')) {
        section.classList.remove('first');
      } else {
        document.querySelectorAll('.s-listing').forEach((i) => i.classList.remove('first'));
        section.classList.add('first');
        item.classList.add('active');
      }

      // Изменяем скролл до элемента с классом .s-directions
      document.documentElement.scrollTop = document.querySelector('.s-directions').offsetTop;
    });
  });
}

function initListings() {
  document.querySelectorAll('.s-listing').forEach((listing) => {
    const wrappers = listing.querySelectorAll('.s-listing__wrapper');

    if (wrappers.length > 0) {
      // --- ВАРИАНТ 1: «Подгруппы», т.е. есть несколько .s-listing__wrapper ---
      wrappers.forEach((wrapper) => {
        const previewButtons = wrapper.querySelectorAll('.s-listing__preview-name');
        const listItems = wrapper.querySelectorAll('.s-listing__item');

        previewButtons.forEach((button, index) => {
          button.addEventListener('click', () => {
            // Снимаем .active только внутри этого wrapper
            previewButtons.forEach((b) => b.classList.remove('active'));
            listItems.forEach((i) => i.classList.remove('active'));

            // Ставим .active той кнопке (и соответствующему блоку), по которой кликнули
            button.classList.add('active');
            listItems[index].classList.add('active');
          });
        });
      });

    } else {
      // --- ВАРИАНТ 2: «Простой», без подгрупп ---
      // Вся логика переключения находится прямо в .s-listing
      const previewButtons = listing.querySelectorAll('.s-listing__preview-name');
      const listItems = listing.querySelectorAll('.s-listing__item');

      previewButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
          // Снимаем .active у всех кнопок и элементов
          previewButtons.forEach((b) => b.classList.remove('active'));
          listItems.forEach((i) => i.classList.remove('active'));

          // Ставим .active нажатой кнопке + соответствующему блоку
          button.classList.add('active');
          listItems[index].classList.add('active');
        });
      });
    }
  });
}

function initThemes() {
  // Находим все блоки .s-listing__theme (то есть, каждую «тему»)
  document.querySelectorAll('.s-listing__theme').forEach((theme) => {
    theme.addEventListener('click', () => {
      // Узнаём id, записанный в data-id
      const themeId = theme.dataset.id;

      // 1. Если нужно визуально выделять саму нажатую «тему»
      //    — сбрасываем класс .active со всех .s-listing__theme
      //      и назначаем .active на текущий
      document.querySelectorAll('.s-listing__theme').forEach((t) => t.classList.remove('active'));
      theme.classList.add('active');

      // 2. Если нужно свернуть/скрыть остальные .s-listing__wrapper,
      //    а показать только тот, у кого id=themeId
      //    (предположим, что .s-listing__wrapper имеет id="marketing" и т.д.)
      document.querySelectorAll('.s-listing__wrapper').forEach((wrapper) => wrapper.classList.remove('active'));
      document.getElementById(themeId).classList.add('active');
    });
  });
}

function initPopupButtons() {
  const popupButtons = document.querySelectorAll('.s-listing__item-btn');

  popupButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const programName = button.dataset.programName;
      const programTitle = button.dataset.programTitle;

      modalParams.type = button.dataset.type;
      modalParams.modalTitle = `Скачать программу ${programName}`;

      const formNameMap = {
        Колледж: 'college',
        Бакалавриат: 'pervoe_vysshee',
        Аспирантура: 'postgraduate_study',
        MBA: 'mba',
        Курсы: 'courses',
        'Магистратура / Второе высшее': 'magistracy',
      };

      const formName = `popup__form-${formNameMap[programTitle] ?? 'empty'}`;

      // Кодируем параметры для URL
      const encodedProgramName = encodeURIComponent(programName);
      const encodedProgramTitle = encodeURIComponent(programTitle);
      const encodedFormTitle = encodeURIComponent(modalParams.modalTitle);

      // Формируем правильный redirect URL
      //const redirectUrl = `https://example.com/thanks/?lidforma=${encodedProgramName}&level=${encodedProgramTitle}`;

      // Устанавливаем обновленный action
      modalParams.actionParams = [
        { param: `form=${formName}` },
        { param: `form_title=${encodedFormTitle}` },
        { param: `lidforma=${encodedProgramName}` },
        { param: `lidinfo=${encodedProgramName}%20${encodedProgramTitle}` },
        { param: `level=${encodedProgramTitle}` },
      ]

      openModal('SPriemnayaKomissiyaModal', modalParams);
    });
  });
}
</script>

<template>
  <div class="wrapper --redesign">
    <main>
      <div class="s-top">
        <section class="s-main --main-frame">
          <div class="l-default">
            <div class="s-main__conatainer">
              <div class="s-main__wrapper">
                <h1 class="s-main__title title--h1">
                  Демо-вуз
                  <br>
                  <span>
                    Приёмная комиссия
                  </span>
                  <br>
                  Поступи прямо сейчас
                </h1>
                <p class="s-main__subtitle small">
                  Узнай минимальный проходной балл <br>в 2025 году, оставив заявку
                </p>
              </div>
              <form
                action="https://example.com/lander.php?r=land/index&type=univer&graccount=demo&land=example.com&form=main_form&unit=demo&version=priemnaya_komissiya_v2&alias=priemnaya_komissiya"
                class="s-main__form"
                novalidate="novalidate"
              >
                <input
                  class="s-main__input"
                  type="text"
                  name="phone"
                  placeholder="Ваш телефон"
                  inputmode="tel"
                  data-inputmask="'mask': '+9 999 999 99 99[9]', 'showMaskOnHover': false, 'showMaskOnFocus': false"
                >
                <button
                  class="s-main__submit btn"
                  type="submit"
                >
                  Отправить заявку
                </button>
                <label for="checked-main">
                  <input
                    id="checked-main"
                    type="checkbox"
                    checked=""
                    name="personalDataAgree"
                  >
                  <span>
                    Даю согласие на обработку персональных данных и соглашаюсь<a
                      :href="PRIVACY"
                      target="_blank"
                    > с политикой
                      конфиденциальности</a>.
                  </span>
                </label>
              </form>
            </div>
          </div>
        </section>
        <section class="s-directions">
          <div class="s-directions__container l-default">
            <h2 class="s-directions__title h3--title">
              Выберите направление&nbsp; <span> образования</span>
            </h2>
            <div class="s-directions__items">
              <div
                data-id="college"
                class="s-directions__item active"
              >
                <div class="s-directions__item-text">
                  <div class="s-directions__item-title">
                    Колледж
                  </div>
                  <div class="s-directions__item-subtitle">
                    47 программ
                  </div>
                </div>
              </div>
              <div
                data-id="bachelor"
                class="s-directions__item"
              >
                <div class="s-directions__item-text">
                  <div class="s-directions__item-title">
                    Бакалавриат
                  </div>
                  <div class="s-directions__item-subtitle">
                    127 программ
                  </div>
                </div>
              </div>
              <div
                data-id="magistr"
                class="s-directions__item"
              >
                <div class="s-directions__item-text">
                  <div class="s-directions__item-title">
                    Магистратура
                  </div>
                  <div class="s-directions__item-subtitle">
                    48 программ
                  </div>
                </div>
              </div>
              <div
                data-id="postgraduate"
                class="s-directions__item"
              >
                <div class="s-directions__item-text">
                  <div class="s-directions__item-title">
                    Аспирантура
                  </div>
                  <div class="s-directions__item-subtitle">
                    19 программ
                  </div>
                </div>
              </div>
              <div
                data-id="mba"
                class="s-directions__item"
              >
                <div class="s-directions__item-text">
                  <div class="s-directions__item-title">
                    MBA
                  </div>
                  <div class="s-directions__item-subtitle">
                    10 программ
                  </div>
                </div>
              </div>
              <div
                data-id="course"
                class="s-directions__item"
              >
                <div class="s-directions__item-text">
                  <div class="s-directions__item-title">
                    Курсы
                  </div>
                  <div class="s-directions__item-subtitle">
                    59 программ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="s-list">
        <section
          id="college"
          class="s-listing"
        >
          <div class="l-default">
            <div class="s-listing__container">
              <div class="s-listing__title">
                <h3 class="h3--title">
                  Колледж <span>52</span>
                </h3>
                <div class="s-listing__subtitles">
                  <div class="s-listing__subtitle">
                    <div class="s-listing__subtitle-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.46738 12.5291C1.7764 12.843 2.15236 13 2.59526 13H11.4026C11.8483 13 12.2266 12.843 12.5376 12.5291C12.8485 12.215 13.004 11.8329 13.004 11.3828V2.62756C13.004 2.17455 12.8485 1.79004 12.5376 1.47402C12.2266 1.15801 11.8483 1 11.4026 1H2.59526C2.15236 1 1.7764 1.15801 1.46738 1.47402C1.15846 1.79004 1.00401 2.17455 1.00401 2.62756V11.3828C1.00401 11.8329 1.15846 12.215 1.46738 12.5291ZM9.30308 4.50968L6.22683 7.74578L5.24106 6.81542C5.04507 6.60999 4.80371 6.50727 4.517 6.50727C4.23029 6.50727 3.9872 6.60691 3.78773 6.80618C3.58825 7.00533 3.4907 7.23774 3.49509 7.50344C3.49934 7.76901 3.60243 7.98738 3.80435 8.15855L5.50529 9.81611C5.69419 10.005 5.93233 10.0995 6.21968 10.0995C6.50704 10.0995 6.74994 10.005 6.94838 9.81611L10.7205 5.90216C10.9309 5.70992 11.0361 5.47658 11.0361 5.20213C11.0361 4.92769 10.9316 4.69644 10.7226 4.50839C10.5135 4.33266 10.2738 4.24479 10.0036 4.24479C9.73321 4.24479 9.49972 4.33309 9.30308 4.50968Z"
                          fill="#1C1C1C"
                        />
                      </svg>
                    </div>
                    <div class="s-listing__subtitle-title">
                      Зачисление в колледж без экзаменов и ЕГЭ
                    </div>
                  </div>
                  <div class="s-listing__subtitle">
                    <div class="s-listing__subtitle-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M6.43908 2.15624C6.66888 1.68592 7.33917 1.68592 7.56897 2.15624L8.76106 4.59601C8.84993 4.77791 9.02096 4.90589 9.22054 4.93985L11.8452 5.38642C12.3404 5.47068 12.5417 6.07293 12.1968 6.43808L10.2855 8.46124C10.1532 8.60125 10.0924 8.79416 10.1205 8.98471L10.5309 11.7694C10.6061 12.2795 10.0691 12.6583 9.6138 12.4164L7.29905 11.1865C7.11458 11.0885 6.89348 11.0885 6.709 11.1865L4.39425 12.4164C3.93894 12.6583 3.402 12.2795 3.47717 11.7694L3.88756 8.98471C3.91564 8.79416 3.85484 8.60125 3.72257 8.46124L1.81127 6.43808C1.46631 6.07293 1.66766 5.47068 2.16287 5.38642L4.78752 4.93985C4.9871 4.90589 5.15812 4.77791 5.247 4.59602L6.43908 2.15624Z"
                          fill="#1C1C1C"
                        />
                      </svg>
                    </div>
                    <div class="s-listing__subtitle-title">
                      После 9 и 11 классов
                    </div>
                  </div>
                  <div class="s-listing__subtitle">
                    <div class="s-listing__subtitle-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M5.11191 13C4.68842 13 4.39303 12.5424 4.53614 12.1081L5.41322 9.44597C5.48477 9.2288 5.33707 9 5.12533 9H2.61696C2.09282 9 1.81138 8.32864 2.15453 7.89688L7.26993 1.46043C7.50233 1.16801 7.83982 1 8.1948 1H8.43362C8.84304 1 9.13691 1.42976 9.01984 1.8573L8.12458 5.12673C8.06604 5.3405 8.21298 5.55538 8.41769 5.55538H11.391C11.9407 5.55538 12.2115 6.28392 11.8168 6.70078L6.2082 12.6241C5.97995 12.8652 5.67456 13 5.3567 13H5.11191Z"
                          fill="#1C1C1C"
                        />
                      </svg>
                    </div>
                    <div class="s-listing__subtitle-title">
                      Отсрочка от армии
                    </div>
                  </div>
                </div>
              </div>
              <div class="s-listing__content">
                <div class="s-listing__preview">
                  <button class="s-listing__preview-name college active">
                    Юридический факультет
                  </button>
                  <button class="s-listing__preview-name college ">
                    Дизайн
                  </button>
                  <button class="s-listing__preview-name college ">
                    Маркетинг
                  </button>
                  <button class="s-listing__preview-name college ">
                    Предпринимательство
                  </button>
                  <button class="s-listing__preview-name college ">
                    Сестринское дело
                  </button>
                  <button class="s-listing__preview-name college ">
                    Информационные системы
                  </button>
                  <button class="s-listing__preview-name college ">
                    Гостиничного сервиса
                  </button>
                  <button class="s-listing__preview-name college ">
                    Поварское дело
                  </button>
                  <button class="s-listing__preview-name college ">
                    Педагогический факультет
                  </button>
                  <button class="s-listing__preview-name college ">
                    Программирование
                  </button>
                  <button class="s-listing__preview-name college ">
                    Экономика и бухгалтерский учет
                  </button>
                  <button class="s-listing__preview-name college ">
                    Игровая индустрия и киберспорт
                  </button>
                  <button class="s-listing__preview-name college ">
                    Спортивный менеджмент
                  </button>
                  <button class="s-listing__preview-name college ">
                    Кондитерское дело
                  </button>
                  <button class="s-listing__preview-name college ">
                    Графический дизайн
                  </button>
                  <button class="s-listing__preview-name college ">
                    Строительство и эксплуатация зданий и сооружений
                  </button>
                  <button class="s-listing__preview-name college ">
                    Художник-мультипликатор
                  </button>
                  <button class="s-listing__preview-name college ">
                    Строительство
                  </button>
                  <button class="s-listing__preview-name college ">
                    Туризм
                  </button>
                  <button class="s-listing__preview-name college ">
                    Коммерция (по отраслям)
                  </button>
                  <button class="s-listing__preview-name college ">
                    Стоматология
                  </button>
                  <button class="s-listing__preview-name college ">
                    Менеджмент туров и ивентов
                  </button>
                  <button class="s-listing__preview-name college ">
                    Комиксы
                  </button>
                  <button class="s-listing__preview-name college ">
                    Технологическое предпринимательство
                  </button>
                  <button class="s-listing__preview-name college ">
                    Воспитатель детей дошкольного возраста
                  </button>
                  <button class="s-listing__preview-name college ">
                    Учитель начальных классов
                  </button>
                  <button class="s-listing__preview-name college ">
                    Педагог дополнительного образования
                  </button>
                  <button class="s-listing__preview-name college ">
                    Разработчик веб и мультимедийных приложений
                  </button>
                  <button class="s-listing__preview-name college ">
                    Торговое дело
                  </button>
                  <button class="s-listing__preview-name college ">
                    Лечебное дело
                  </button>
                  <button class="s-listing__preview-name college ">
                    Банковское дело
                  </button>
                  <button class="s-listing__preview-name college ">
                    Фармация
                  </button>
                  <button class="s-listing__preview-name college ">
                    Право и организация социального обеспечения
                  </button>
                  <button class="s-listing__preview-name college ">
                    Монтаж, наладка и эксплуатация электрооборудования
                  </button>
                  <button class="s-listing__preview-name college ">
                    Анимация
                  </button>
                  <button class="s-listing__preview-name college ">
                    Разработка мобильных игр
                  </button>
                  <button class="s-listing__preview-name college ">
                    Менеджмент в музыкальной индустрии
                  </button>
                  <button class="s-listing__preview-name college ">
                    Веб-разработка
                  </button>
                  <button class="s-listing__preview-name college ">
                    Управление продуктами и проектами
                  </button>
                  <button class="s-listing__preview-name college ">
                    Робототехника и мехатроника
                  </button>
                  <button class="s-listing__preview-name college ">
                    Актерское искусство
                  </button>
                  <button class="s-listing__preview-name college ">
                    Технология эстетических услуг
                  </button>
                  <button class="s-listing__preview-name college ">
                    Комьюнити менеджмент
                  </button>
                  <button class="s-listing__preview-name college ">
                    Специалист по рекламе
                  </button>
                  <button class="s-listing__preview-name college ">
                    Фитнес и культура здоровья
                  </button>
                  <button class="s-listing__preview-name college ">
                    Специалист по информационным системам умного города
                  </button>
                  <button class="s-listing__preview-name college ">
                    Разработчик игр
                  </button>
                  <button class="s-listing__preview-name college ">
                    Стоматология профилактическая
                  </button>
                  <button class="s-listing__preview-name college ">
                    Фельдшер
                  </button>
                  <button class="s-listing__preview-name college ">
                    Фармацевт
                  </button>
                  <button class="s-listing__preview-name college ">
                    Оператор БПЛА
                  </button>
                  <button class="s-listing__preview-name college ">
                    Правоохранительная деятельность
                  </button>
                </div>
                <div class="s-listing__list">
                  <div class="s-listing__item college active">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Юридический факультет
                    </div>
                    <div class="s-listing__item-description">
                      Выберите интересную вам область права, научитесь ориентироваться в современном законодательстве и
                      пройдите практику в органах власти и судопроизводства для получения всех компетенций
                      профессионального юриста.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="юридического факультета"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Факультет дизайна
                    </div>
                    <div class="s-listing__item-description">
                      Изучите основы рекламных и цифровых технологий, освойте современные инструменты разработки дизайна
                      и станьте высокооплачиваемым специалистом в области создания веб-сайтов, мобильных приложений и
                      проектирования среды.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета дизайна"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Факультет маркетинга
                    </div>
                    <div class="s-listing__item-description">
                      Получите крепкую теоретическую базу по классическому маркетингу, изучите актуальные инструменты
                      интернет-продвижения, научитесь эффективно совмещать онлайн- и офлайн-коммуникации и станьте
                      высокооплачиваемым специалистом по продвижению бизнеса в интернете.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета маркетинга"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Факультет предпринимательства
                    </div>
                    <div class="s-listing__item-description">
                      Изучите основы экономики, финансов, маркетинга и деловых отношений, научитесь генерировать
                      перспективные идеи и превращать их в конкретные бизнес-планы, начните свое дело уже во время
                      обучения.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета предпринимательства"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Сестринское дело
                    </div>
                    <div class="s-listing__item-description">
                      Сможете оказать первую помощь, подготовить пациента к любой процедуре и проконсультировать по
                      вопросам профилактики заболеваний. Научитесь делать уколы, перевязки и капельницы. По окончании
                      обучения сможете работать медицинской сестрой, ассистентом врача или руководить коллективом
                      медсестер.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета сестринского дела"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Факультет информационных систем
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь разрабатывать программное обеспечение, получите углубленные знания 1С, погрузитесь в
                      специфику построения IT-инфраструктуры предприятия и станьте универсальным IT-специалистом.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета информационных систем"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Факультет гостиничного сервиса
                    </div>
                    <div class="s-listing__item-description">
                      Получите все необходимые компетенции для работы в индустрии HoReCa. Вас ждет практика в известных
                      сетевых отелях и ресторанах, мастер-классы ведущих экспертов и посещение отраслевых мероприятий.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета гостиничного сервиса"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Поварское дело
                    </div>
                    <div class="s-listing__item-description">
                      Изучите основы поварского дела, научитесь готовить и оформлять блюда, сможете найти работу в
                      ресторане уже во время обучения.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета поварского дела"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Педагогический факультет
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь использовать современные образовательные технологии, освоите различные методики
                      преподавания. Сможете работать учителем в школе, преподавателем в вузе или воспитателем в детском
                      саду.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета педагогического факультета"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Факультет программирования
                    </div>
                    <div class="s-listing__item-description">
                      Получите практические знания для создания приложений, игр, сервисов и сайтов и создайте продукт,
                      который будет интересен и полезен миллионам пользователей.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета программирования"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Факультет экономики и бухгалтерского учета
                    </div>
                    <div class="s-listing__item-description">
                      Получите отличную теоретическую подготовку в области экономики, пройдите практику в крупнейших
                      банках страны и станьте высокооплачиваемым специалистом по управлению финансовыми ресурсами
                      компании.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета экономики и бухгалтерского учета"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Факультет игровой индустрии и киберспорта
                    </div>
                    <div class="s-listing__item-description">
                      Станьте продюсером международных событий в киберспорте, разработайте креативные кампании, создайте
                      платформенные решения для индустрии и контент для специализированных медиа.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета игровой индустрии и киберспорта"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Факультет спортивного менеджмента
                    </div>
                    <div class="s-listing__item-description">
                      Получите знания в области спортивного менеджмента и маркетинга. Пройдите практику в спортивных
                      организациях, примите участие в подготовке и проведении спортивных мероприятий и начните работать
                      в индустрии спорта.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета спортивного менеджмента"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Кондитерское дело
                    </div>
                    <div class="s-listing__item-description">
                      Получите навыки приготовления изысканных кондитерских шедевров, отвечающие запросам различных
                      категорий потребителей. Сможете работать в кафе, ресторанах, пекарнях, кулинарных цехах и других
                      местах.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета кондитерского дела"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Факультет графического дизайна
                    </div>
                    <div class="s-listing__item-description">
                      Узнайте, как создавать фирменный стиль и разрабатывать логотипы, научитесь работать в Illustrator
                      и Photoshop — и сделайте свой первый проект.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета графического дизайна"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Строительство и эксплуатация зданий и сооружений
                    </div>
                    <div class="s-listing__item-description">
                      Получите знания о технике и технологии строительства, о реконструкции зданий и сооружений,
                      научитесь организовывать строительно-монтажные работы. По окончании обучения сможете работать
                      буровым мастером, топографом, инженером и техником-строителем.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета строительства и эксплуатации зданий и сооружений"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Художник-мультипликатор
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь современным анимационным технологиям, которые пригодятся в различных сферах бизнеса:
                      реклама, PR, интернет-маркетинг, кино и телевидение.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета художник-мультипликатор"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Строительство
                    </div>
                    <div class="s-listing__item-description">
                      Получите знания о технике и технологии строительства, о реконструкции зданий и сооружений,
                      научитесь организовывать строительно-монтажные работы. По окончании обучения сможете работать
                      буровым мастером, топографом, инженером и техником-строителем.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета строительства"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Туризм
                    </div>
                    <div class="s-listing__item-description">
                      Вы научитесь грамотно организовывать туристическую деятельность, принимать правильные
                      управленческие решения, разрабатывать интересные маршруты и проекты туров. Овладеете иностранным
                      языком и разберетесь в деловой документации.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета туризма"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Факультет коммерции (по отраслям)
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь методологии закупки и продажи товаров, определению ассортимента товаров, оценке качества
                      товаров, их конкурентоспособности, изучению спроса, организации товародвижения.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета коммерции (по отраслям)"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Стоматология
                    </div>
                    <div class="s-listing__item-description">
                      Вы научитесь диагностировать и проводить профилактику стоматологических заболеваний. Получите
                      практические навыки профессиональной гигиены полости рта, а также изучите экономическое и правовое
                      обеспечение профессиональной деятельности.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета стоматологии"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Менеджмент туров и ивентов
                    </div>
                    <div class="s-listing__item-description">
                      Вы узнаете все секреты туринга, организации фестивалей и концертов. Научитесь разрабатывать
                      концепции мероприятий, составлять план продвижения, работать со СМИ.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета менеджмента туров и ивентов"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Факультет комиксов
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь рисовать обложки и иллюстрации для книг и журналов, кадры и страницы манги, комиксов,
                      принты для одежды, создавать персонажей для брендов, чат-ботов и приложений, оформлять
                      онлайн-публикации, ну и, конечно, рисовать веб-комиксы и мангу.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета комиксов"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Технологическое предпринимательство
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь оценивать риски и возможности для инвестиций в проекты, разрабатывать технологические
                      продукты для решения задач разных отраслей. По окончании обучения сможете работать специалистом по
                      бизнес-планированию, менеджером по развитию, техническим директором или запустите свой успешный
                      инновационный проект.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета технологического предпринимательства"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Воспитатель детей дошкольного возраста
                    </div>
                    <div class="s-listing__item-description">
                      Вы научитесь работать с детьми дошкольного возраста: организовывать их деятельность, применять
                      различные методики воспитания и осуществлять психодиагностику. Вы сможете стать воспитателем,
                      педагогом-психологом или тьютором.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета воспитателя детей дошкольного возраста"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Учитель начальных классов
                    </div>
                    <div class="s-listing__item-description">
                      Изучите современные подходы к начальному образованию, научитесь планировать и проводить учебные
                      занятия и находить подход к любому ребенку. По окончании обучения вы сможете работать учителем
                      младших классов в школе и центрах развития детей.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета учителя начальных классов"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Педагог дополнительного образования
                    </div>
                    <div class="s-listing__item-description">
                      Вы получите необходимые практические и теоретические знания для организации педагогического
                      взаимодействия с детьми во внеурочное время. Сможете работать преподавателем дополнительного
                      образования, дизайнером образовательных программ.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета педагога дополнительного образования"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Разработчик веб и мультимедийных приложений
                    </div>
                    <div class="s-listing__item-description">
                      Вы научитесь работать с базами данных, разрабатывать и сопровождать программное обеспечение,
                      сможете стать frontend-разработчиком и получите возможность присоединиться к команде крупной
                      IT-компании.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета разработчика веб и мультимедийных приложений"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Торговое дело
                    </div>
                    <div class="s-listing__item-description">
                      Программа позволяет приобрести глубокие знания о торговле, маркетинге, управлении розничным и
                      оптовым бизнесом. Студенты изучат основы коммерческой деятельности, а также получат практические
                      навыки для успешной работы в сфере торговли и продаж.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета торгового дела"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Лечебное дело
                    </div>
                    <div class="s-listing__item-description">
                      Такой специалист самостоятельно диагностирует заболевания, проводит лечение и занимается
                      профилактикой. Хороший фельдшер часто может полностью заменить врача и сам справится с
                      большинством патологий.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета лечебного дела"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Факультет банковского дела
                    </div>
                    <div class="s-listing__item-description">
                      Получите комплексное экономическое образование, углубленные знания по организации банковского
                      обслуживания и постановке бизнес-процессов в финансовых структурах и устройтесь на работу в
                      крупнейшие банки страны.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета банковского дела"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Фармация
                    </div>
                    <div class="s-listing__item-description">
                      Изучите общую, органическую, токсикологическую и фармацевтическую химию. Получите навыки
                      медицинского и фармацевтического товароведения и сможете работать химиком-аналитиком, провизором
                      или заведующим лабораторией, проводить маркетинговые исследования.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета фармации"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Факультет права и организации социального обеспечения
                    </div>
                    <div class="s-listing__item-description">
                      Область профессиональной деятельности выпускников: реализация правовых норм в социальной сфере,
                      выполнение государственных полномочий по пенсионному обеспечению, государственных и муниципальных
                      полномочий по социальной защите населения.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета права и организации социального обеспечения"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Монтаж, наладка и эксплуатация электрооборудования
                    </div>
                    <div class="s-listing__item-description">
                      Сможете выполнять монтаж силового и осветительного оборудования, электропроводки, кабельных и
                      воздушных линий, будете уметь эксплуатировать электрооборудование промышленных и гражданских
                      зданий. Выпускники программы могут работать монтажниками электрических сетей,
                      инженерами-сметчиками, специалистами службы качества.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета монтажа, наладки и эксплуатации электрооборудования"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Факультет анимации
                    </div>
                    <div class="s-listing__item-description">
                      Станьте универсальным специалистом, который умеет в 3D все: создавать объекты и окружение,
                      настраивать текстуры и цвет, анимировать и внедрять модели в 3D-сцену. Освойте Houdini, Autodesk
                      Maya, Photoshop, ZBrush и Marmoset Toolbag — и сможете претендовать на работу в рекламе, играх или
                      кино.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета анимации"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Разработка мобильных игр
                    </div>
                    <div class="s-listing__item-description">
                      Факультет готовит специалистов работать с языком программирования C#. Вы создадите серию
                      собственных мобильных игр на самом популярном игровом движке — Unity, получите знания в
                      3D-моделировании и полноценный курс sound-дизайна для того, чтобы сделать вашу игру поистине
                      уникальной.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета разработки мобильных игр"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Менеджмент в музыкальной индустрии
                    </div>
                    <div class="s-listing__item-description">
                      Программа готовит кадры для теле- и радио-проектов, музыкальных шоу, концертного бизнеса. Вы
                      научитесь продвигать музыкальные проекты, работать с артистами и творческими коллективами. Станете
                      продюсером, организатором шоу-программ или менеджером музыкальной группы.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета менеджмента в музыкальной индустрии"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Веб-разработка
                    </div>
                    <div class="s-listing__item-description">
                      Вы научитесь работать с базами данных, разрабатывать и сопровождать программное обеспечение,
                      сможете стать frontend-разработчиком и получите возможность присоединиться к команде крупной
                      IT-компании.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета веб-разработки"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Управление продуктами и проектами
                    </div>
                    <div class="s-listing__item-description">
                      Освоите все этапы создания продукта, научитесь эффективно управлять проектом: от распределения
                      задач в команде до оценки результатов. Такие специалисты востребованы в крупных коммерческих
                      компаниях и государственных учреждениях.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета управления продуктами и проектами"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Робототехника и мехатроника
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь работать с компьютерными и электротехническими элементами, будете создавать,
                      эксплуатировать и обслуживать новые виды машин, устройств и механизмов. Сможете работать
                      IT-специалистом, робототехником, инженером, кибернетиком.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета робототехники и мехатроники"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Актерское искусство
                    </div>
                    <div class="s-listing__item-description">
                      Совместно с Новой Театральной школой получите знания для успешной работы на сцене, пройдите все
                      этапы работы в области студийной и концертной звукорежиссуры, участвуйте в организации крупных
                      мастер-классов от известных российских и зарубежных актеров и станьте профессионалом,
                      востребованным в ведущих студиях страны и мира.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета актерского искусства"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Технология эстетических услуг
                    </div>
                    <div class="s-listing__item-description">
                      Получите знания и практические навыки для поддержания красоты и здоровья человека. Сможете
                      построить карьеру технолога-эстетиста, SPA-мастера или специалиста по body-коррекции.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета технологии эстетических услуг"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Комьюнити менеджмент
                    </div>
                    <div class="s-listing__item-description">
                      Факультет создан демо-вузом совместно с Community University и готовит специалистов
                      по социальным и организационным технологиям, современным коммуникациям.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета комьюнити менеджмента"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Специалист по рекламе
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь разрабатывать и координировать рекламные стратегии и кампании, находить рынки сбыта
                      товаров и услуг. Станете востребованным специалистом в любой отрасли экономики.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета специалиста по рекламе"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Фитнес и культура здоровья
                    </div>
                    <div class="s-listing__item-description">
                      Факультет готовит квалифицированных тренеров и управленцев, владеющих актуальными мировыми и
                      российскими методиками. Вы сможете построить карьеру в сфере спорта.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета фитнеса и культуры здоровья"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Специалист по информационным системам умного города
                    </div>
                    <div class="s-listing__item-description">
                      Вы научитесь программировать, тестировать и администрировать цифровые системы в сфере
                      интеллектуальных городских решений.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета специалиста по информационным системам умного города"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Разработчик игр
                    </div>
                    <div class="s-listing__item-description">
                      На данной программе учащиеся получат знания в области программирования и геймдизайна, изучат
                      разные аспекты создания компьютерных игр, включая работу с различными движками, графикой, звуком и
                      игровым дизайном. Программа включает проектную деятельность: студенты смогут применить полученные
                      знания на практике, создав собственную игру.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Факультета разработчика игр"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Стоматология профилактическая
                    </div>
                    <div class="s-listing__item-description">
                      Изучите стоматологию, диагностику и общение с клиентами, чтобы стать детским или взрослым
                      стоматологом-гигиенистом.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="факультетата профилактической стоматологии"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Фельдшер
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь лечить и диагностировать заболевания, проводить профилактику и справляться с
                      большинством патологий. Сможете работать врачом-терапевтом, фельдшером и сотрудником скорой
                      помощи.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Фельдшера"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Фармацевт
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь разбираться в лекарствах — их составе, взаимодействиях и побочных эффектах. После этого
                      вы сможете работать в аптеке или фармацевтическим представителем.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Фельдшера"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Оператор БПЛА
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь управлять беспилотниками, настраивать их работать с системами передачи информации.
                      Изучите техническую механику, основы экономики воздушного транспорта и все, что необходимо для
                      работы с БПЛА.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Оператора БПЛА"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item college ">
                    <div class="s-listing__item-tooltip">
                      Колледж
                    </div>
                    <div class="s-listing__item-title">
                      Правоохранительная деятельность
                    </div>
                    <div class="s-listing__item-description">
                      Студенты получают знания и навыки в области правовых дисциплин связанных с правоохранительной
                      деятельностью, особенности раскрытия и расследования отдельных видов преступлений, осваивают
                      тактико-специальную и огневую подготовку, криминологию и предупреждение преступлений и др.
                    </div>
                    <a
                      class="s-listing__item-btn"
                      data-program-name="Правоохранительной деятельности"
                      data-program-title="Колледж"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="bachelor"
          class="s-listing"
        >
          <div class="l-default">
            <div class="s-listing__container">
              <div class="s-listing__title">
                <h3 class="h3--title">
                  Бакалавриат <span>140</span>
                </h3>
                <div class="s-listing__subtitles">
                  <div class="s-listing__subtitle">
                    <div class="s-listing__subtitle-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.46738 12.5291C1.7764 12.843 2.15236 13 2.59526 13H11.4026C11.8483 13 12.2266 12.843 12.5376 12.5291C12.8485 12.215 13.004 11.8329 13.004 11.3828V2.62756C13.004 2.17455 12.8485 1.79004 12.5376 1.47402C12.2266 1.15801 11.8483 1 11.4026 1H2.59526C2.15236 1 1.7764 1.15801 1.46738 1.47402C1.15846 1.79004 1.00401 2.17455 1.00401 2.62756V11.3828C1.00401 11.8329 1.15846 12.215 1.46738 12.5291ZM9.30308 4.50968L6.22683 7.74578L5.24106 6.81542C5.04507 6.60999 4.80371 6.50727 4.517 6.50727C4.23029 6.50727 3.9872 6.60691 3.78773 6.80618C3.58825 7.00533 3.4907 7.23774 3.49509 7.50344C3.49934 7.76901 3.60243 7.98738 3.80435 8.15855L5.50529 9.81611C5.69419 10.005 5.93233 10.0995 6.21968 10.0995C6.50704 10.0995 6.74994 10.005 6.94838 9.81611L10.7205 5.90216C10.9309 5.70992 11.0361 5.47658 11.0361 5.20213C11.0361 4.92769 10.9316 4.69644 10.7226 4.50839C10.5135 4.33266 10.2738 4.24479 10.0036 4.24479C9.73321 4.24479 9.49972 4.33309 9.30308 4.50968Z"
                          fill="#1C1C1C"
                        />
                      </svg>
                    </div>
                    <div class="s-listing__subtitle-title">
                      Поступление без ЕГЭ по программе Колледж+Бакалавриат.
                    </div>
                  </div>
                  <div class="s-listing__subtitle">
                    <div class="s-listing__subtitle-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M5.11191 13C4.68842 13 4.39303 12.5424 4.53614 12.1081L5.41322 9.44597C5.48477 9.2288 5.33707 9 5.12533 9H2.61696C2.09282 9 1.81138 8.32864 2.15453 7.89688L7.26993 1.46043C7.50233 1.16801 7.83982 1 8.1948 1H8.43362C8.84304 1 9.13691 1.42976 9.01984 1.8573L8.12458 5.12673C8.06604 5.3405 8.21298 5.55538 8.41769 5.55538H11.391C11.9407 5.55538 12.2115 6.28392 11.8168 6.70078L6.2082 12.6241C5.97995 12.8652 5.67456 13 5.3567 13H5.11191Z"
                          fill="#1C1C1C"
                        />
                      </svg>
                    </div>
                    <div class="s-listing__subtitle-title">
                      Отсрочка от армии
                    </div>
                  </div>
                </div>
              </div>
              <div class="s-listing__content">
                <div class="s-listing__preview">
                  <button class="s-listing__preview-name bachelor active">
                    Психология
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Педагогика
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Юридический факультет
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Лингвистика
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Управление
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Дизайна
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Строительство
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Вычислительные машины, комплексы, системы и сети
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Городское строительство и хозяйство
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Автоматизация технологических процессов в теплоэнергетике
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Менеджмент в энергетике
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Антикризисное управление
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Актерское мастерство
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Институт театра, кино и телевидения
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Артист эстрады
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    GR-стратегии
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Учитель русского языка и литературы
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Учитель математики
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет комиксов
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет экономики
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет информационных технологий
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Программирование
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет физической культуры
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет бизнеса
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет электроэнергетики
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет интернет-маркетинга
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет игровой индустрии и киберспорта
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет рекламы
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет управления персоналом
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет менеджмента
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет журналистики
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Международная торговля с Китаем
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет архитектуры
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет разработки компьютерных игр
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет музыкальной звукорежиссуры
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет уголовного права
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет гостиничного дела
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Кибербезопасность
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет графического дизайна
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет теплоэнергетики
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Логистика
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет банковского дела
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет спортивного менеджмента
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет маркетинга
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Психология и педагогика дошкольного образования
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Государственная и муниципальная служба
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Фармация
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Художник компьютерной графики
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет анимации
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Туризм
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Международные отношения
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Экономико-правовое обеспечение экономической безопасности
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет предпринимательства
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Педагогика. Начальное образование
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет разработки мобильных приложений
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет event-менеджмента
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Пожарная безопасность
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Менеджмент в нефтегазовом комплексе
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Педагог по хореографии
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет торгового дела
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    ИТ-менеджмент в бизнесе
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет гражданского права
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет кинооператорства
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет дизайна среды
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Промышленное и гражданское строительство
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет продюсирования
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет управления продажами
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Безопасность труда
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Менеджмент в машиностроении
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Робототехника и мехатроника
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Лечебное дело
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Искусственный интеллект и программирование
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Системы автоматизации технологических процессов
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Финансы и кредит
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Тележурналистика
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Педагогика. Правовое образование
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Менеджмент в музыкальной индустрии
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Управление малым бизнесом
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Налоги и налогообложение
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Экономика. Анализ данных и управление рисками
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Экономика предприятий и организаций
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Теплогазоснабжение и вентиляция
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Безопасность технологических процессов и производств
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Водоснабжение и водоотведение
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Электроснабжение производственных объектов
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Экспертиза и управление недвижимостью
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Международный менеджмент гостеприимства
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Мировая экономика
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Менеджмент в образовании
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Финансовый менеджмент
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Электрооборудование предприятий, организаций и учреждений
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Экономика горной промышленности
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Международная торговля
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Управление технологическими инновациями
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Производство строительных материалов изделий и конструкций
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Электронная коммерция
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Стоматология
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Управление проектами
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Цифровая трансформация
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Экономическая безопасность
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Педиатрия
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Менеджмент в строительстве
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Информационный менеджмент
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Full-stack разработка
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Технологическое предпринимательство
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Педагог по вокалу
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Учитель английского языка
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Учитель информатики
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Комьюнити менеджмент
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Факультет комиксов
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Спортивный тренер
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Проектирование и строительство автомобильных дорог
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Менеджмент игровых видов спорта
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Эксплуатация и обслуживание беспилотных робототехнических авиационных систем
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Управление городскими инновациями
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Зеленые цифровые технологии в городском хозяйстве
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Учитель истории и обществознания
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Бухгалтерский учет, анализ и аудит
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Архитектурный дизайн
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Ландшафтный дизайн
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Лингвистика (английский и испанский языки)
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Лингвистика (английский и немецкий языки)
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Стартапы и инвестиции
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Блокчейн-разработчик
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Управление и технологии интернет-продаж на маркетплейсах
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Клиническая психология
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Продакт-менеджмент
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Текстильный дизайн
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Дизайн костюма и аксессуаров
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Дизайн украшений и фурнитуры
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Инженер искусственного интеллекта
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Блокчейн-разработчик
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Архитектура
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Тренерская деятельность в спорте и фитнесе
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Эксплуатация и обслуживание беспилотных систем
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Учитель истории
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Физическая культура
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Продюсер кино и телевидения
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Дантист
                  </button>
                  <button class="s-listing__preview-name bachelor ">
                    Зубной врач
                  </button>
                </div>
                <div class="s-listing__list">
                  <div class="s-listing__item bachelor active">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Психология
                    </div>
                    <div class="s-listing__item-description">
                      Узнайте, как подбирать и мотивировать персонал, освойте все аспекты организационного поведения,
                      методы разрешения рабочих конфликтов и научитесь создавать комфортную среду для эффективной работы
                      компании.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета психологии"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Педагогика
                    </div>
                    <div class="s-listing__item-description">
                      Овладейте навыками обучения и воспитания студентов с учетом специфики преподаваемого предмета в
                      соответствии с требованиями государственного образовательного стандарта. Факультет способствует
                      социализации, формированию общей культуры личности, осознанному выбору и последующему освоению
                      профессиональных образовательных программ.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета педагогики"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Юридический факультет
                    </div>
                    <div class="s-listing__item-description">
                      Выберите интересную вам область права, научитесь ориентироваться в современном законодательстве и
                      пройдите практику в органах власти и судопроизводства для получения всех компетенций
                      профессионального юриста.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Юридического факультета"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Лингвистика
                    </div>
                    <div class="s-listing__item-description">
                      Изучайте иностранные языки, проходите практику в зарубежных организациях, учитесь свободно
                      общаться с носителями языка и приобретайте знания, необходимые для работы в международных
                      компаниях и на дипломатической службе.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета лингвистики"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Управление
                    </div>
                    <div class="s-listing__item-description">
                      Изучите основы менеджмента, экономики, стратегического планирования и работы с персоналом.
                      Узнайте, как управлять проектами любых масштабов и выводить организации на пик эффективности.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета управления"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Дизайна
                    </div>
                    <div class="s-listing__item-description">
                      Изучите основы рекламных и цифровых технологий, освойте современные инструменты разработки дизайна
                      и станьте высокооплачиваемым специалистом в области создания веб-сайтов, мобильных приложений и
                      проектирования среды.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета дизайна"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Строительство
                    </div>
                    <div class="s-listing__item-description">
                      Приобретайте знания по организации и управлению в строительстве, а также архитектуре и
                      реконструкции зданий и сооружений и становитесь высокооплачиваемым специалистом в области
                      промышленного и гражданского строительства.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета строительства"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Вычислительные машины, комплексы, системы и сети
                    </div>
                    <div class="s-listing__item-description">
                      Сможете работать с информационными технологиями и программным обеспечением, обучитесь созданию
                      операционных систем. Будете работать системным администратором, менеджером IT-проектов,
                      инженером-программистом в IT-компаниях и государственных учреждениях.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета вычислительных машин, комплексов, систем и сетей"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Городское строительство и хозяйство
                    </div>
                    <div class="s-listing__item-description">
                      Вы станете специалистом, способным заниматься вопросами благоустройства прилегающих территорий к
                      построенным объектам гражданского или промышленного назначения, парков, скверов, улиц, площадей.
                      Сможете работать инженером-проектировщиком, прорабом, государственным инспектором.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета городского строительства и хозяйства"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Автоматизация технологических процессов в теплоэнергетике
                    </div>
                    <div class="s-listing__item-description">
                      В процессе обучения вы получите знания по математике, автоматике, кибернетике, современным
                      средствам вычислительной техники, экономике и программированию. Сможете работать
                      инженером-теплоэнергетиком, разработчиком систем энергопотребления, специалистом по
                      энергобезопасности.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета автоматизации технологических процессов в теплоэнергетике"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Менеджмент в энергетике
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь совместному управлению электрическими сетями, сможете руководить распределением
                      финансовых потоков, контролем качества. Будете работать технологическим менеджером, главным
                      энергетиком, управляющим объектом.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета менеджмента в энергетике"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Антикризисное управление
                    </div>
                    <div class="s-listing__item-description">
                      Сможете проводить разносторонний анализ предприятия, будете выполнять и организовывать комплексную
                      деятельность по выводу предприятия из кризиса, разрабатывать проекты преобразования компаний. По
                      окончании обучения сможете работать риск-менеджером, антикризисным консультантом, финансовым
                      аналитиком.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета антикризисного управления"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Актерское мастерство
                    </div>
                    <div class="s-listing__item-description">
                      Освойте актерские приемы, раскройте свой творческий потенциал, развивайте сценическую память и
                      внимание, научитесь работать с партнером на сцене.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета актерского мастерства"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Институт театра, кино и телевидения
                    </div>
                    <div class="s-listing__item-description">
                      Получите знания для успешной работы на сцене, пройдите все этапы работы в области студийной и
                      концертной звукорежиссуры, участвуйте в организации крупных мастер-классов от известных российских
                      и зарубежных актеров и станьте профессионалом, востребованным в ведущих студиях страны и мира.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Института театра, кино и телевидения"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Артист эстрады
                    </div>
                    <div class="s-listing__item-description">
                      Будете разрабатывать программы выступлений, работать над своим ярким образом, обучитесь
                      ораторскому искусству. Вы сможете выступать на любой сцене: от ресторанного зала до концертного
                      холла.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета артиста эстрады"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      GR-стратегии
                    </div>
                    <div class="s-listing__item-description">
                      Познакомитесь с видами и стратегиями GR, этапами GR-деятельности. Научитесь находить баланс
                      интересов потребителей, властей и бизнеса.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета GR-стратегий"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Учитель русского языка и литературы
                    </div>
                    <div class="s-listing__item-description">
                      Изучите литературоведение, филологию, лексикологию, речевые практики. Освоите современные
                      педагогические приемы, методики преподавания русского языка и литературы. Сможете преподавать в
                      школах, заниматься репетиторством, заведовать учебной частью.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета учителя русского языка и литературы"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Учитель математики
                    </div>
                    <div class="s-listing__item-description">
                      Будете изучать элементарную математику, алгебру, математический анализ, геометрию. Освоите
                      методики преподавания. Сможете работать в школах и заниматься с учениками в частном порядке.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета учителя математики"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет комиксов
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь рисовать обложки и иллюстрации для книг и журналов, кадры и страницы манги, комиксов,
                      принты для одежды, создавать персонажей для брендов, чат-ботов и приложений, оформлять
                      онлайн-публикации, ну и, конечно, рисовать веб-комиксы и мангу.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета комиксов"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет экономики
                    </div>
                    <div class="s-listing__item-description">
                      Получите отличную теоретическую подготовку в области экономики, пройдите практику в крупнейших
                      банках страны и станьте высокооплачиваемым специалистом по управлению финансовыми ресурсами
                      компании.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета экономики"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет информационных технологий
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь разрабатывать программное обеспечение, получите углубленные знания 1С, погрузитесь в
                      специфику построения IT-инфраструктуры предприятия и станьте универсальным IT-специалистом.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета информационных технологий"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Программирование
                    </div>
                    <div class="s-listing__item-description">
                      Получите практические знания для создания приложений, игр, сервисов и сайтов и создайте продукт,
                      который будет интересен и полезен миллионам пользователей.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета программирования"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет физической культуры
                    </div>
                    <div class="s-listing__item-description">
                      Получите педагогическое образование в области спорта и международных коммуникаций, станьте
                      тренером олимпийских чемпионов и организатором спортивных событий мирового масштаба.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета физической культуры"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет бизнеса
                    </div>
                    <div class="s-listing__item-description">
                      Изучите основы экономики, финансов, маркетинга и деловых отношений, научитесь генерировать
                      перспективные идеи и превращать их в конкретные бизнес-планы, начните свое дело уже во время
                      обучения.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета бизнеса"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет электроэнергетики
                    </div>
                    <div class="s-listing__item-description">
                      Изучите основы электротехники и электроэнергетики, научитесь управлять и оптимизировать работы
                      энергетического хозяйства организации и станьте конкурентоспособным специалистом в области
                      электрооборудования и электрохозяйства.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета электроэнергетики"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет интернет-маркетинга
                    </div>
                    <div class="s-listing__item-description">
                      Получите крепкую теоретическую базу по классическому маркетингу, изучите актуальные инструменты
                      интернет-продвижения, научитесь эффективно совмещать онлайн- и офлайн-коммуникации и станьте
                      высокооплачиваемым специалистом по продвижению бизнеса в интернете.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета интернет-маркетинга"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет игровой индустрии и киберспорта
                    </div>
                    <div class="s-listing__item-description">
                      Рынок киберспорта — пока еще новый, и на нем долгое время будет сохраняться дефицит
                      профессионалов. Получи возможность пройти практику и стажировку на реальных событиях игровой
                      индустрии, закрепить это теоретическими знаниями и стать востребованным специалистом в динамично
                      развивающейся сфере.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета игровой индустрии и киберспорта"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет рекламы
                    </div>
                    <div class="s-listing__item-description">
                      Изучите основы рекламы, маркетинга, брендинга и PR, освойте инструменты продвижения в интернете и
                      станьте экспертом в разработке креативных концепций и ярких рекламных кампаний, о которых будут
                      говорить все.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета рекламы"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет управления персоналом
                    </div>
                    <div class="s-listing__item-description">
                      Получите современные методы подбора и оценки персонала, научитесь мотивировать сотрудников и
                      освоите методику формирования корпоративной культуры в компании.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета управления персоналом"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет менеджмента
                    </div>
                    <div class="s-listing__item-description">
                      Освойте навыки первоклассного управленца от уровня отдельных бизнес-процессов до всей компании в
                      самых востребованных направлениях на рынке.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета менеджмента"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет журналистики
                    </div>
                    <div class="s-listing__item-description">
                      Освойте навыки редактирования материалов и написания статей, новостей, пресс-релизов, работы с
                      системами управления сайтов и фото- и видеоматериалами, научитесь искать нужную информацию и
                      интервьюировать специалистов.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета журналистики"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Международная торговля с Китаем
                    </div>
                    <div class="s-listing__item-description">
                      Вы изучите мировые рынки и их специфику, получите навыки международных переговоров, научитесь
                      вести бизнес в сфере международной торговли. Особое внимание в программе уделено Китаю. По
                      окончании обучения получите два диплома и сможете работать на российско-китайских предприятиях и в
                      международных компаниях.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета международной торговли с Китаем"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет архитектуры
                    </div>
                    <div class="s-listing__item-description">
                      Освоите навыки создания и реализации проектных решений, сможете разрабатывать и проверять
                      строительную и проектную документацию, преподносить в доступной и визуализированной форме принятые
                      проектные решения.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета архитектуры"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет разработки компьютерных игр
                    </div>
                    <div class="s-listing__item-description">
                      Вы научитесь работать в двух игровых движках — Unity и Unreal Engine. Будете программировать на
                      языках C# и C++. С нуля продумаете свои игровые продукты, пропишите баланс и просчитаете
                      монетизацию, научитесь интегрировать рекламу и выводить продукты на крупнейшие игровые площадки.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета разработки компьютерных игр"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет музыкальной звукорежиссуры
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь работать со звуком: от записи до сведения и мастеринга. Сможете озвучивать видео, писать
                      саундтреки и заниматься звукорежиссурой. Соберете портфолио и получите востребованную профессию.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета музыкальной звукорежиссуры"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет уголовного права
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь разрабатывать нормативные документы, проводить их будущую экспертизу, чтобы участвовать
                      в судебных разбирательствах, расследовать и раскрывать преступления и правонарушения.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета уголовного права"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет гостиничного дела
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь разбираться в законодательстве, узнайте как общие принципы организации гостиничного
                      комплекса, так и детали: составление финансовой отчетности, проведение рекламных кампаний, работа
                      с наемными сотрудниками.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета гостиничного дела"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Кибербезопасность
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь прогнозировать появление угроз, минимизировать и расследовать последствия атак.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета кибербезопасности"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет графического дизайна
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь создавать фирменный стиль: разрабатывать логотип, подбирать цветовую гамму и шрифты,
                      продумывать дизайн упаковки, полиграфических материалов, мерча и другой сувенирной продукции,
                      рисовать иллюстрации.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета графического дизайна"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет теплоэнергетики
                    </div>
                    <div class="s-listing__item-description">
                      Получите знания и компетенции для обеспечения бесперебойной работы энергетических комплексов,
                      разработки планов по оптимизации потребления энергоресурсов и постройте успешную карьеру в области
                      теплоэнергетики.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета теплоэнергетики"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Логистика
                    </div>
                    <div class="s-listing__item-description">
                      Получите навыки эффективного управления материальными и информационными потоками компании,
                      научитесь сокращать издержки и принимать оптимальные решения. Вы сможете работать логистом,
                      менеджером по качеству или импорт-менеджером в логистических и транспортных компаниях,
                      производственно-торговых фирмах, в магазинах и торговых сетях.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета логистики"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет банковского дела
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь реализовывать проекты в различных областях банковской деятельности, формировать и
                      управлять портфелями активов коммерческого банка.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета банковского дела"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет спортивного менеджмента
                    </div>
                    <div class="s-listing__item-description">
                      Получите знания в области спортивного менеджмента и маркетинга. Пройдите практику в спортивных
                      организациях, примите участие в подготовке и проведении спортивных мероприятий и начните работать
                      в индустрии спорта.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета спортивного менеджмента"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет маркетинга
                    </div>
                    <div class="s-listing__item-description">
                      Станьте профи в изучении потребностей аудитории, анализе рынка и эффективном продвижении товаров и
                      услуг компании с целью увеличения прибыли.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета маркетинга"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Психология и педагогика дошкольного образования
                    </div>
                    <div class="s-listing__item-description">
                      Вы научитесь работать с детьми дошкольного возраста: организовывать их деятельность, применять
                      различные методики воспитания и осуществлять психодиагностику. Вы сможете стать воспитателем,
                      педагогом-психологом или тьютором.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета психологии и педагогики дошкольного образования"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Государственная и муниципальная служба
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь решать сложные управленческие вопросы и планировать деятельность департаментов органов
                      власти. Постройте карьеру в государственных и муниципальных структурах, некоммерческих и
                      межгосударственных организациях.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета государственной и муниципальной службы"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Фармация
                    </div>
                    <div class="s-listing__item-description">
                      Вы станете экспертом в области химии, изучите экономические аспекты работы аптек и
                      фармацевтических производств. Сможете работать провизором, медицинским маркетологом или
                      фармакологом.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета фармации"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Художник компьютерной графики
                    </div>
                    <div class="s-listing__item-description">
                      Познакомьтесь с базовыми понятиями света, цвета, композиции, анатомии и перспективы, научитесь
                      работать с референсами и создавать правильные заготовки для будущих объектов. Освойте тонкости
                      работы в Photoshop и приемы опытных художников.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета художника компьютерной графики"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет анимации
                    </div>
                    <div class="s-listing__item-description">
                      Изучите создание спецэффектов с помощью компьютерной графики и комбинированной видеосъемки,
                      научитесь использовать анимацию, 2D- и 3D-моделирование для привлечения внимания зрителей,
                      разрабатывать графику для видеоигр.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета анимации"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Туризм
                    </div>
                    <div class="s-listing__item-description">
                      Изучите географию, международный туризм, гостиничный менеджмент и иностранные языки. Сможете
                      работать менеджером по туризму, экскурсоводом или специалистом по организации досуга.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета туризма"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Международные отношения
                    </div>
                    <div class="s-listing__item-description">
                      Станете востребованным специалистом в области международной безопасности, мировой политики и
                      бизнеса, экономических и культурных отношений. Будете работать референтом, менеджером,
                      консультантом и экспертом по стране или региону.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета международных отношений"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Экономико-правовое обеспечение экономической безопасности
                    </div>
                    <div class="s-listing__item-description">
                      Вы освоите финансовое, банковское, налоговое право, будете знать бухгалтерский учёт,
                      налогообложение, формирование и использование государственных и муниципальных ресурсов. Получите
                      углубленную подготовку в области экономики и юриспруденции.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета экономико-правового обеспечения экономической безопасности"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет предпринимательства
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь ведению финансовой отчетности, продвижению бизнеса при помощи инструментов маркетинга и
                      избежанию подводных камней в делопроизводстве. Заложите надежный фундамент вашего бизнеса,
                      сформулируйте УТП и научитесь контролировать финансовые процессы.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета предпринимательства"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Педагогика. Начальное образование
                    </div>
                    <div class="s-listing__item-description">
                      Изучите современные подходы к начальному образованию, научитесь планировать и проводить учебные
                      занятия и находить подход к любому ребенку. По окончании обучения вы сможете работать учителем
                      младших классов в школе и центрах развития детей.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета педагогики. Начального образования"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет разработки мобильных приложений
                    </div>
                    <div class="s-listing__item-description">
                      Освойте востребованную профессию, получите навыки разработки сложных UX/UI-решений, научитесь
                      создавать приложения на Android или iOS и расширять функциональность продукта.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета разработки мобильных приложений"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет event-менеджмента
                    </div>
                    <div class="s-listing__item-description">
                      Получите знания для успешной работы в event-индустрии, пройдите практику в event-агентствах,
                      участвуйте в организации крупных деловых и развлекательных мероприятий и станьте профессионалом,
                      востребованным в ведущих event-компаниях страны и мира.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета event-менеджмента"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Пожарная безопасность
                    </div>
                    <div class="s-listing__item-description">
                      Вы получите знания по организации и проведению работ по предупреждению и тушению пожаров,
                      проведению аварийно-спасательных работ, техническому обслуживанию и устранению неисправностей
                      пожарного оборудования. Сможете работать спасателем, инженером по пожарной безопасности,
                      государственным инспектором.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета пожарной безопасности"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Менеджмент в нефтегазовом комплексе
                    </div>
                    <div class="s-listing__item-description">
                      Сможете строить финансовые модели инновационных проектов, будете проводить экологический аудит,
                      научитесь координировать работу по проектам. Выпускник может работать менеджером-нефтяником,
                      бизнес-аналитиком, руководителем технического отдела.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета менеджмента в нефтегазовом комплексе"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Педагог по хореографии
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь строить линию танца, подбирать костюмы и выбирать верную методику преподавания. Сможете
                      работать постановщиком танцевальных программ, балетов, хореографических номеров или руководить
                      целой труппой.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета педагога по хореографии"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет торгового дела
                    </div>
                    <div class="s-listing__item-description">
                      Пройдите подготовку по направлению «Retail-менеджмент», научитесь управлять механизмом продаж,
                      начиная с соблюдения стандартов работы продавца и заканчивая стратегией продвижения бренда.
                      Программа обеспечивает связь теории с практикой, а студенты получают образование, гарантированно
                      отвечающее его требованиям.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета торгового дела"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      ИТ-менеджмент в бизнесе
                    </div>
                    <div class="s-listing__item-description">
                      Вы сможете управлять ИТ-проектами и анализировать бизнес-процессы, получите знания о разработке
                      мобильных приложений и основах нейронных сетей. Выпускники программы становятся product или
                      project менеджерами, руководителями IT-проектов или бизнес-аналитиками.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета ИТ-менеджмента в бизнесе"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет гражданского права
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь разбираться и применять законы, обеспечивать соблюдение законодательства в деятельности
                      государственных органов, физических и юридических лиц и осуществлять правовую экспертизу
                      нормативных актов.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета гражданского права"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет кинооператорства
                    </div>
                    <div class="s-listing__item-description">
                      Узнайте, как выстраивать композицию кадра, развивайте насмотренность, научитесь создавать
                      впечатляющие видео, знакомьтесь с приемами опытных операторов, соберите свое видеопортфолио — и
                      сможете начать карьеру в кино, рекламе или на телевидении.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета кинооператорства"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет дизайна среды
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь работать со средой, освоите ArchiCAD для проектирования чертежей и 3ds Max для
                      визуализации идей. Узнаете, как продвигать свои услуги и управлять дизайн-студией. Сможете
                      получить востребованную профессию, выйти на новый уровень или запустить собственный бизнес.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета дизайна среды"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Промышленное и гражданское строительство
                    </div>
                    <div class="s-listing__item-description">
                      Освоите законы в области инженерного проектирования, сможете организовать строительно-монтажные
                      работы на сложных строительных объектах, овладеете навыками организации и управления на всех
                      стадиях строительного производства. Будете работать инженером-сметчиком или проектировщиком,
                      производителем или мастером работ.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета промышленного и гражданского строительства"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет продюсирования
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь разбираться в продюсировании актуальных видов контента: полный метр, сериал, digital
                      media и анимация; оценивать идеи и развивать свои собственные; организовывать съемочный процесс;
                      принимать грамотные производственные и управленческие решения; ориентироваться на медиарынке в
                      России и мире.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета продюсирования"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет управления продажами
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь эффективно управлять коммерческой деятельностью компании, продвигать и продавать товары
                      и услуги, управлять офлайн- и онлайн-проектами.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета управления продажами"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Безопасность труда
                    </div>
                    <div class="s-listing__item-description">
                      Сможете организовать и координировать работы по охране труда, составлять инструкции по
                      безопасности, осуществлять контроль за соблюдением законодательных и иных нормативных правовых
                      актов по охране труда. Будете работать в органах государственного надзора и на различных
                      предприятиях в качества специалиста по охране труда, оценке профессиональных рисков или по
                      промышленной безопасности.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета безопасности труда"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Менеджмент в машиностроении
                    </div>
                    <div class="s-listing__item-description">
                      Программа готовит профессиональных управленцев для машиностроительной отрасли, способных управлять
                      инженерно-технической частью на предприятиях и разрабатывать технологические процессы. По
                      окончании обучения сможете работать технологическим менеджером, техническим экспертом, директором
                      по развитию.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета менеджмента в машиностроении"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Робототехника и мехатроника
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь работать с компьютерными и электротехническими элементами, будете создавать,
                      эксплуатировать и обслуживать новые виды машин, устройств и механизмов. Сможете работать
                      IT-специалистом, робототехником, инженером, кибернетиком.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета робототехники и мехатроники"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Лечебное дело
                    </div>
                    <div class="s-listing__item-description">
                      Лечебное дело подходит тем, кто мечтает быть врачом, хочет погрузиться в самые сложные разделы
                      медицины и быть готовым оказать любую помощь.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета лечебного дела"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Искусственный интеллект и программирование
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь программировать на Python, работать с большими данными и анализировать их. Изучите
                      основы программирования на C++. По окончании обучения получите востребованную и высокооплачиваемую
                      профессию.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета искусственного интеллекта и программирования"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Системы автоматизации технологических процессов
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь анализировать данные, необходимые для проектирования технических систем, контролировать
                      проекты на соответствие стандартам, подбирать средства программного обеспечения. Выпускник может
                      работать инженером-проектировщиком, архитектором или организатором систем.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета систем автоматизации технологических процессов"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Финансы и кредит
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь осуществлять экономический анализ предприятий, разрабатывать финансовые стратегии,
                      овладеете основами аудита. Вы сможете работать экономистом, аналитиком, риск-менеджером в банках,
                      страховых фирмах и финансовых отделах компаний.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета финансов и кредита"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Тележурналистика
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь создавать и редактировать телевизионные материалы, писать сценарии, изучите основы
                      телевизионных жанров и форматов. Сможете работать репортером, редактором, сценаристом или
                      корреспондентом на телеканалах.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета тележурналистики"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Педагогика. Правовое образование
                    </div>
                    <div class="s-listing__item-description">
                      Изучите дисциплины, связанные с правоведением и юриспруденцией. Вы сможете преподавать право в
                      школах, колледжах и высших учебных заведениях.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета педагогики. Правового образования"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Менеджмент в музыкальной индустрии
                    </div>
                    <div class="s-listing__item-description">
                      Вы научитесь продвигать музыкальные проекты, работать с артистами и музыкальными коллективами, и
                      узнаете, как монетизировать их творчество. Сможете работать концертным организатором, продюсером,
                      менеджером артиста или музыкального лейбла.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета менеджмента в музыкальной индустрии"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Управление малым бизнесом
                    </div>
                    <div class="s-listing__item-description">
                      Освоите методы создания и продвижения товаров и услуг, сможете управлять деятельностью
                      организации, получите навыки запуска стартапа. Вы сможете работать бизнес-тренером, консультантом
                      для молодых предпринимателей или создать свой успешный проект.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета управления малым бизнесом"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Налоги и налогообложение
                    </div>
                    <div class="s-listing__item-description">
                      Овладеете навыками консультирования в сфере налогообложения, научитесь оценивать финансовую
                      состоятельность физических и юридических лиц, изучите виды налоговых систем. Будете работать
                      аудитором, налоговым инспектором или консультантом в государственных органах, банках и
                      консалтинговых фирмах.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета налогов и налогообложения"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Экономика. Анализ данных и управление рисками
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь анализировать финансовую информацию и сможете прогнозировать угрозы, оценивать риски и
                      минимизировать потери. Постройте карьеру в кредитных и страховых учреждениях, станьте специалистом
                      аналитической службы или риск-менеджером.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета экономики. Анализа данных и управления рисками"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Экономика предприятий и организаций
                    </div>
                    <div class="s-listing__item-description">
                      В процессе обучения вы получите знания по планированию и организации производства, а также анализу
                      производственно-хозяйственной деятельности и менеджменту. Будете уметь разрабатывать планы
                      предприятия и сможете работать экономистом, аналитиком-экономистом, руководителем отдела
                      планирования.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета экономики предприятий и организаций"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Теплогазоснабжение и вентиляция
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь проектировать системы теплогазоснабжения и вентиляции, овладеете навыками
                      прогнозирования, изучения и разработки тепловых балансов предприятий. Сможете работать инженером
                      по техническому надзору, инженером по проектно-сметной документации, специалистом по модернизации
                      строительных технологий.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета теплогазоснабжения и вентиляции"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Безопасность технологических процессов и производств
                    </div>
                    <div class="s-listing__item-description">
                      Получите знания по охране окружающей среды, научитесь анализировать механизмы воздействия
                      опасностей на человека. Сможете работать координатором безопасности, специалистом отдела
                      экологической безопасности в органах государственного надзора, на промышленных предприятиях.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета безопасности технологических процессов и производств"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Водоснабжение и водоотведение
                    </div>
                    <div class="s-listing__item-description">
                      По окончании обучения сможете проектировать системы для подачи и отвода воды, для ее очистки и
                      оценки качества. Будете работать инженером по водоснабжению, инженером-проектировщиком, экспертом
                      исследовательской лаборатории.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета водоснабжения и водоотведения"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Электроснабжение производственных объектов
                    </div>
                    <div class="s-listing__item-description">
                      Будете уметь проводить оценку затрат на выполнение работ по ремонту устройств электроснабжения,
                      сможете обеспечивать безопасное производство и осуществлять контроль качества устройств
                      электроснабжения. Сможете работать специалистом по энергосберегающим технологиям, главным
                      энергетиком или инженером.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета электроснабжения производственных объектов"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Экспертиза и управление недвижимостью
                    </div>
                    <div class="s-listing__item-description">
                      Вы получите знания в области тактического и стратегического управления строительством,
                      эксплуатацией, содержанием и развитием объекта недвижимости, сможете определить бюджет содержания
                      объекта, оптимизировать функции и структуру управляющей компании. Сможете работать девелопером,
                      оценщиком недвижимости, риелтором.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета экспертизы и управления недвижимостью"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Международный менеджмент гостеприимства
                    </div>
                    <div class="s-listing__item-description">
                      Изучите все аспекты сферы HoReCa: от организации работы кухни до проектирования и открытия
                      гостиниц и ресторанов. Вы сможете пройти международную стажировку, стать менеджером курортов,
                      управляющим крупного отеля или ресторана.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета международного менеджмента гостеприимства"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Мировая экономика
                    </div>
                    <div class="s-listing__item-description">
                      Вы будете анализировать внешнеэкономическую деятельность организаций, прогнозировать ситуации на
                      мировом рынке, оценивать перспективы международных сделок. Сможете работать таможенным экспертом,
                      специалистом по международным перевозкам и внешнеторговым отношениям.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета мировой экономики"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Менеджмент в образовании
                    </div>
                    <div class="s-listing__item-description">
                      Изучите все аспекты управления образовательным учреждением и научитесь планировать образовательные
                      проекты. Выпускников будут ждать в школах, колледжах и вузах в роли заведующего учебной частью,
                      ректора, декана.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета менеджмента в образовании"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Финансовый менеджмент
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь разрабатывать финансовую стратегию организации, будете заниматься финансовым
                      планированием и оценивать риски. Будете работать специалистом банковской сферы, инвестиционным
                      менеджером или финансовым координатором в государственных структурах, консалтинговых компаниях и
                      банках.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета финансового менеджмента"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Электрооборудование предприятий, организаций и учреждений
                    </div>
                    <div class="s-listing__item-description">
                      Будете уметь производить сложные инженерные расчеты и проектировать электроэнергетические системы,
                      разрабатывать проектную и рабочую техническую документацию и применять методы математического
                      анализа. Сможете работать специалистом по энергобезопасности, инженером, техническим директором.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета электрооборудования предприятий, организаций и учреждений"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Экономика горной промышленности
                    </div>
                    <div class="s-listing__item-description">
                      Станете специалистом по финансово-экономическому планированию и управлению на горных предприятиях.
                      Будете работать экономистом или консультантом в горном производстве, специалистом по закупкам
                      горнодобывающей техники.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета экономики горной промышленности"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Международная торговля
                    </div>
                    <div class="s-listing__item-description">
                      Получите практические навыки проектирования и реализации международных торговых сделок и узнаете,
                      как устроен международный рынок. Сможете работать в области международной торговли и
                      предпринимательства, в транснациональных компаниях и консультационных фирмах.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета международной торговли"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Управление технологическими инновациями
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь проводить маркетинговые исследования и выявлять потребности рынка, сможете оценивать
                      возможности для внедрения новых технологий. Будете работать технологическим менеджером,
                      техническим экспертом, менеджером по развитию.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета управления технологическими инновациями"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Производство строительных материалов изделий и конструкций
                    </div>
                    <div class="s-listing__item-description">
                      По окончании обучения сможете заниматься снабжением строительных объектов необходимыми
                      строительными материалами, будете владеть знаниями в области сертификации и контроля качества
                      строительных материалов. Сможете работать технологом, инженером по проектно-сметной документации
                      или государственным инспектором.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета производства строительных материалов изделий и конструкций"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Электронная коммерция
                    </div>
                    <div class="s-listing__item-description">
                      Изучите Маркетинг в E-commerce, SMM стратегию, CRM менеджмент и управление закупками. Будете
                      анализировать бизнес-модели e-commerce, управлять контентом, продуктами и командой. Сможете
                      работать менеджером маркетплейсов, руководителем интернет-магазина, CRM менеджером, E-commerce
                      директором.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета электронной коммерции"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Стоматология
                    </div>
                    <div class="s-listing__item-description">
                      Получите одну из самых востребованных и высокооплачиваемых профессий. Пройдите практику в клиниках
                      Москвы и станьте зубным техником, ортодонтом или хирургом.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета стоматологии"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Управление проектами
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь сопровождать проекты на всех этапах — от коммуникации с заказчиком до реализации и
                      дальнейшей поддержки. Сможете запускать проекты и управлять ими в различных сферах бизнеса.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета управления проектами"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Цифровая трансформация
                    </div>
                    <div class="s-listing__item-description">
                      Вы получите знания в сфере электронной коммерции и цифровых рынков, изучите социальные основы
                      цифрового государства и систему государственного и муниципального управления в Российской
                      Федерации. Получите все компетенции, необходимые для успешной карьеры.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета цифровой трансформации"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Экономическая безопасность
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь выявлять и анализировать риски и угрозы в сфере экономической безопасности,
                      разрабатывать мероприятия по их устранению, организовывать проверку различных финансовых
                      процессов.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета экономической безопасности"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Педиатрия
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь не только эффективно бороться с детскими болезнями, но и предупреждать их. Получите
                      необходимые теоретические знания и сможете применять их на практике. По окончании обучения будете
                      востребованы как в государственных, так и частных клиниках.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета педиатрии"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Менеджмент в строительстве
                    </div>
                    <div class="s-listing__item-description">
                      Программа готовит профессионалов в области управления современным строительным бизнесом. Вы
                      научитесь принимать эффективные решения на всех уровнях управления строительной организацией — от
                      подбора команды, исследования рынка, маркетинга до проектирования, строительства, финансирования,
                      учёта и управления имуществом.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета менеджмента в строительстве"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Информационный менеджмент
                    </div>
                    <div class="s-listing__item-description">
                      Станете квалифицированным IT-специалистом, способным эффективно решать стратегические задачи в
                      сфере управления информационными технологиями; экспертом в области создания корпоративных
                      информационных систем.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета информационного менеджмента"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Full-stack разработка
                    </div>
                    <div class="s-listing__item-description">
                      Ты получишь уникальную специальность, глубокие знания языков программирования. Научишься работать
                      с базами данных и компьютерными сетями.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета Full-stack разработки"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Технологическое предпринимательство
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь превращать идеи и инновационные технологии в гаджеты, услуги и сервисы. Сможете
                      привлекать инвестиции, управлять командой и запустить свой первый стартап.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета технологического предпринимательства"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Педагог по вокалу
                    </div>
                    <div class="s-listing__item-description">
                      Станьте педагогом по вокалу, изучив вокальные техники, методику постановки голоса и музыкальных
                      номеров. Работайте в общеобразовательных и музыкальных школах или давайте частные уроки.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета педагога по вокалу"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Учитель английского языка
                    </div>
                    <div class="s-listing__item-description">
                      Будете углубленно изучать лексику, фонетику, грамматику, особенности англоговорящих стран. Освоите
                      подходы к изучению языка и сможете работать в частных и государственных учреждениях.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета учителя английского языка"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Учитель информатики
                    </div>
                    <div class="s-listing__item-description">
                      Изучите основы программирования, получите навыки пользования информационно-вычислительными
                      системами, программным обеспечением. Сможете преподавать в школах, заниматься частной практикой.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета учителя информатики"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Комьюнити менеджмент
                    </div>
                    <div class="s-listing__item-description">
                      Факультет создан демо-вузом совместно с Community University и готовит специалистов
                      по социальным и организационным технологиям, современным коммуникациям.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета комьюнити менеджмента"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Факультет комиксов
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь рисовать обложки и иллюстрации для книг и журналов, кадры и страницы манги, комиксов,
                      принты для одежды, создавать персонажей для брендов, чат-ботов и приложений, оформлять
                      онлайн-публикации, ну и, конечно, рисовать веб-комиксы и мангу.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета комиксов"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Спортивный тренер
                    </div>
                    <div class="s-listing__item-description">
                      Вы научитесь проводить тренировки для взрослых и детей по самым актуальным направлениям
                      оздоровительного спорта и фитнеса.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета спортивного тренера"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Проектирование и строительство автомобильных дорог
                    </div>
                    <div class="s-listing__item-description">
                      Изучите современные технологии строительства, начертательную геометрию, виды дорожно-строительных
                      материалов. Сможете работать инженером, проектировщиком, руководить строительными организациями.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета проектирования и строительства автомобильных дорог"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Менеджмент игровых видов спорта
                    </div>
                    <div class="s-listing__item-description">
                      Изучите спортивный маркетинг, PR и спонсорство. Научитесь управлять спортивными клубами,
                      организовывать мероприятия. По окончании обучения сможете построить карьеру в индустрии спорта.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета менеджмента игровых видов спорта"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Эксплуатация и обслуживание беспилотных робототехнических авиационных систем
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь эксплуатировать и обслуживать беспилотные авиационные системы различного класса и
                      назначения, осуществлять их диагностику и настройку.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета эксплуатации и обслуживания беспилотных робототехнических авиационных систем"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Управление городскими инновациями
                    </div>
                    <div class="s-listing__item-description">
                      Программа разработана для подготовки высококвалифицированных специалистов по управлению городскими
                      инновациями, способных отвечать за внедрение и развитие проектов умных городских решений как на
                      уровне государства, так и в бизнес-секторе.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета управления городскими инновациями"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Зеленые цифровые технологии в городском хозяйстве
                    </div>
                    <div class="s-listing__item-description">
                      Программа подготовки высококвалифицированных специалистов, которые будут управлять проектами
                      цифровой трансформации городской и жилищной инфраструктуры и внедрять передовые технологии для
                      повышения эффективности работы городского хозяйства.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета зеленых цифровых технологий в городском хозяйстве"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Учитель истории и обществознания
                    </div>
                    <div class="s-listing__item-description">
                      Студенты научатся анализировать исторические и социальные процессы, готовить уроки по
                      обществознанию и истории. Они изучат ключевые темы и периоды истории, а также основные концепции и
                      методы обучения обществознанию, чтобы успешно работать в образовательной сфере.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета учителя истории и обществознания"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Бухгалтерский учет, анализ и аудит
                    </div>
                    <div class="s-listing__item-description">
                      Данная программа обеспечит студентов глубокими знаниями о финансовом учете, анализа и аудита, а
                      также поможет освоить навыки финансового планирования и анализа бизнес-процессов. В рамках
                      обучения студенты изучают стандарты учета, налоговое и бюджетное законодательство для успешной
                      подготовки к карьере в области бухгалтерского учета и аудита.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета бухгалтерского учета, анализа и аудита"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Архитектурный дизайн
                    </div>
                    <div class="s-listing__item-description">
                      На программе «Архитектурный дизайн» студенты приобретают углубленные знания в области дизайна
                      зданий, градостроительства и экостроительства. Они изучают различные архитектурные стили, получают
                      навыки моделирования на компьютере и глубоко погружаются в тему проектирования с учетом эстетики и
                      функциональности.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета архитектурного дизайна"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Ландшафтный дизайн
                    </div>
                    <div class="s-listing__item-description">
                      Студенты данной программы изучают теоретические и практические аспекты формирования городской и
                      загородной среды. В рамках курса они осваивают принципы озеленения, планирования общественных
                      пространств, овладевают навыками проектирования ландшафта с использованием актуальных технологий и
                      трендов в дизайне. Также их знакомят с экологически устойчивыми подходами к созданию комфортных
                      для жизни пространств.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета ландшафтного дизайна"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Лингвистика (английский и испанский языки)
                    </div>
                    <div class="s-listing__item-description">
                      Программа знакомит с лингвистическими особенностями английского и испанского языков. Студенты
                      изучают историю и культуру англо- и испаноязычных стран, получают знания в области фонетики,
                      морфологии, синтаксиса и семантики. Также у них есть возможность применить свои знания на практике
                      в рамках профессионального и личного общения с носителями языка.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета лингвистики (английского и испанского языков)"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Лингвистика (английский и немецкий языки)
                    </div>
                    <div class="s-listing__item-description">
                      Программа предполагает изучение обширного спектра лингвистических тем. Студенты получают глубокие
                      знания в области фонетики, морфологии, синтаксиса и семантики английского и немецкого языков, а
                      также изучают историю и культуру англо- и немецкоязычных стран. Программа также предоставляет
                      возможности для практического применения языковых навыков в контекстах профессионального и
                      культурного обмена.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета лингвистики (английского и немецкого языков)"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Стартапы и инвестиции
                    </div>
                    <div class="s-listing__item-description">
                      Выпускники программы «Стартапы и инвестиции» обладают всеми знаниями и навыками, необходимыми для
                      успешного запуска и управления стартапом, а также привлечения инвестиций. На занятиях студенты
                      изучают стратегии бизнес-планирования, финансовые модели и маркетинговые инструменты, готовясь к
                      карьере в предпринимательстве и инвестиционной сфере.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета стартапов и инвестиций"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Блокчейн-разработчик
                    </div>
                    <div class="s-listing__item-description">
                      Блокчейн-разработчик — это специалист, способный создавать децентрализованные приложения,
                      смарт-контракты и другие решения на базе технологии блокчейн. Для обучения в этой области
                      необходимы навыки программирования, понимание работы блокчейн-систем, а также знание языков
                      программирования, в частности JavaScript. Программа по блокчейн-разработке дает практические
                      навыки и знания для создания инновационных блокчейн-решений.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета блокчейн-разработчика"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Управление и технологии интернет-продаж на маркетплейсах
                    </div>
                    <div class="s-listing__item-description">
                      Программа предназначена для студентов, желающих освоить навыки управления в сфере e-commerce и
                      онлайн-продаж. Студентам предстоит изучить стратегии управления маркетплейсами, технологии
                      цифрового маркетинга, аналитику данных и особенности интернет-торговли. Программа предоставляет
                      практические инструменты и знания, необходимые для успешного управления интернет-продажами на
                      маркетплейсах.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета управления и технологий интернет-продаж на маркетплейсах"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Клиническая психология
                    </div>
                    <div class="s-listing__item-description">
                      Изучение клинической психологии позволит студентам приобрести теоретические знания, получить
                      практический опыт и развить навыки работы с клиентами разных возрастов и психологических
                      расстройств.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета клинической психологии"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Продакт-менеджмент
                    </div>
                    <div class="s-listing__item-description">
                      Вы изучите основы стратегического планирования, анализа данных, управления проектами и разработки
                      продукта, получите практические навыки работы с командами разработчиков и маркетологов и станете
                      высококвалифицированным специалистом, способным создавать коммерчески успешные продукты.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета продакт-менеджмента"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Текстильный дизайн
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь создавать уникальные текстильные принты, следить за тенденциями в моде, домашнем декоре
                      и других соответствующих отраслях. Поймете, как работать с текстурой и фактурой, проектировать
                      одежду и использовать нейросети. После выпуска сможете работать дизайнером, арт-директором или
                      модельером.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета текстильного дизайна"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Дизайн костюма и аксессуаров
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь разбираться в материалах, методах работы с ними и дизайне одежды. Узнайте о проектной
                      работе, разработке концепций и согласовании деталей с заказчиком. Сможете работать дизайнером,
                      модельером или художником.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета дизайна костюма и аксессуаров"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Дизайн украшений и фурнитуры
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь моделировать, проектировать и создавать уникальные украшения и фурнитуру. Узнайте о
                      проектной работе, разработке концепций и согласовании деталей с заказчиком. После обучения вы
                      сможете найти работу в сфере моды, дизайна или искусства.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета дизайна украшений и фурнитуры"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Инженер искусственного интеллекта
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь собирать базы данных, программировать и создавать нейросети, интегрировать их в бизнес и
                      визуализировать результаты. После обучения можно как развиваться в сфере ИИ, так и уйти в
                      аналитику, помогая компаниям отслеживать и визуализировать данные.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета инженера искусственного интеллекта"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Блокчейн-разработчик
                    </div>
                    <div class="s-listing__item-description">
                      Станьте экспертом по 1С и изучите основы 4 самых востребованных языков программирования – Java,
                      Python, C# и C++. Это позволит начать и развивать карьеру в blockchain-разработке или создавать
                      собственные проекты.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета блокчейн-разработчика"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Архитектура
                    </div>
                    <div class="s-listing__item-description">
                      Изучите творческую и техническую составляющие архитектуры, чтобы реализовывать собственные проекты
                      или брать заказы. От классических техник и приемов до нейросетей и digital art. Образование
                      позволит как работать в компании, так и брать краткосрочные проекты.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета архитектуры"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Тренерская деятельность в спорте и фитнесе
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь проводить тренировки для взрослых и детей по самым актуальным направлениям
                      оздоровительного спорта и фитнеса. Узнайте больше о педагогике и менеджменте, чтобы получить
                      возможность работать как в секциях и спортивных залах, так и с профессиональными спортсменами.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета тренерской деятельности в спорте и фитнесе"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Эксплуатация и обслуживание беспилотных систем
                    </div>
                    <div class="s-listing__item-description">
                      Узнайте, как диагностировать, настраивать и обслуживать беспилотники, а также работать с ИИ и
                      базами данных. Это даст возможность работать оператором беспилотных летающих аппаратов, инженером
                      или специалистом по системам инженерно-технической защиты.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета эксплуатации и обслуживания беспилотных систем"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Учитель истории
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь понятно и увлекательно доносить информацию до взрослых и детей, превращая уроки истории
                      в по-настоящему увлекательный процесс. Помимо преподавания, вы сможете заняться музейной
                      деятельностью, работой в архивах или СМИ.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета учителя истории"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Физическая культура
                    </div>
                    <div class="s-listing__item-description">
                      Изучите все, что нужно для преподавания физической культуры – педагогику и психологию, медицину и
                      образовательное право. Это позволит работать фитнес-инструктором, педагогом по физической культуре
                      или методистом по организации спортивно-физкультурной работы.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета физической культуры"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Продюсер кино и телевидения
                    </div>
                    <div class="s-listing__item-description">
                      Изучите режиссуру, маркетинг и менеджмент в сфере СМИ. Познакомьтесь с основами монтажа, графики и
                      работы над идеями, чтобы получить возможность работать продюсером, медиабайером или менеджером
                      проектов.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета продюсера кино и телевидения"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Дантист
                    </div>
                    <div class="s-listing__item-description">
                      Изучите все, что нужно для работы дантистом, и даже больше — биохимию, хирургические и
                      терапевтические дисциплины. Это поможет или сразу найти работу по профилю, или продолжить развитие
                      в более узкой специальности.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета дантиста"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item bachelor ">
                    <div class="s-listing__item-tooltip">
                      Бакалавриат
                    </div>
                    <div class="s-listing__item-title">
                      Зубной врач
                    </div>
                    <div class="s-listing__item-description">
                      Получите нужные и актуальные знания от опытных специалистов — от азов и основ стоматологии до
                      современных технологий. Развивайте навыки дальше или сразу устройтесь работать в клинику.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета зубного врача"
                      data-program-title="Бакалавриат"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="magistr"
          class="s-listing"
        >
          <div class="l-default">
            <div class="s-listing__container">
              <div class="s-listing__title">
                <h3 class="h3--title">
                  Магистратура / Второе высшее <span>51</span>
                </h3>
                <div class="s-listing__subtitles">
                  <div class="s-listing__subtitle">
                    <div class="s-listing__subtitle-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.46738 12.5291C1.7764 12.843 2.15236 13 2.59526 13H11.4026C11.8483 13 12.2266 12.843 12.5376 12.5291C12.8485 12.215 13.004 11.8329 13.004 11.3828V2.62756C13.004 2.17455 12.8485 1.79004 12.5376 1.47402C12.2266 1.15801 11.8483 1 11.4026 1H2.59526C2.15236 1 1.7764 1.15801 1.46738 1.47402C1.15846 1.79004 1.00401 2.17455 1.00401 2.62756V11.3828C1.00401 11.8329 1.15846 12.215 1.46738 12.5291ZM9.30308 4.50968L6.22683 7.74578L5.24106 6.81542C5.04507 6.60999 4.80371 6.50727 4.517 6.50727C4.23029 6.50727 3.9872 6.60691 3.78773 6.80618C3.58825 7.00533 3.4907 7.23774 3.49509 7.50344C3.49934 7.76901 3.60243 7.98738 3.80435 8.15855L5.50529 9.81611C5.69419 10.005 5.93233 10.0995 6.21968 10.0995C6.50704 10.0995 6.74994 10.005 6.94838 9.81611L10.7205 5.90216C10.9309 5.70992 11.0361 5.47658 11.0361 5.20213C11.0361 4.92769 10.9316 4.69644 10.7226 4.50839C10.5135 4.33266 10.2738 4.24479 10.0036 4.24479C9.73321 4.24479 9.49972 4.33309 9.30308 4.50968Z"
                          fill="#1C1C1C"
                        />
                      </svg>
                    </div>
                    <div class="s-listing__subtitle-title">
                      Гибкий график.
                    </div>
                  </div>
                  <div class="s-listing__subtitle">
                    <div class="s-listing__subtitle-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M6.43908 2.15624C6.66888 1.68592 7.33917 1.68592 7.56897 2.15624L8.76106 4.59601C8.84993 4.77791 9.02096 4.90589 9.22054 4.93985L11.8452 5.38642C12.3404 5.47068 12.5417 6.07293 12.1968 6.43808L10.2855 8.46124C10.1532 8.60125 10.0924 8.79416 10.1205 8.98471L10.5309 11.7694C10.6061 12.2795 10.0691 12.6583 9.6138 12.4164L7.29905 11.1865C7.11458 11.0885 6.89348 11.0885 6.709 11.1865L4.39425 12.4164C3.93894 12.6583 3.402 12.2795 3.47717 11.7694L3.88756 8.98471C3.91564 8.79416 3.85484 8.60125 3.72257 8.46124L1.81127 6.43808C1.46631 6.07293 1.66766 5.47068 2.16287 5.38642L4.78752 4.93985C4.9871 4.90589 5.15812 4.77791 5.247 4.59602L6.43908 2.15624Z"
                          fill="#1C1C1C"
                        />
                      </svg>
                    </div>
                    <div class="s-listing__subtitle-title">
                      Расписание занятий позволяет совмещать обучение с работой.
                    </div>
                  </div>
                  <div class="s-listing__subtitle">
                    <div class="s-listing__subtitle-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M5.11191 13C4.68842 13 4.39303 12.5424 4.53614 12.1081L5.41322 9.44597C5.48477 9.2288 5.33707 9 5.12533 9H2.61696C2.09282 9 1.81138 8.32864 2.15453 7.89688L7.26993 1.46043C7.50233 1.16801 7.83982 1 8.1948 1H8.43362C8.84304 1 9.13691 1.42976 9.01984 1.8573L8.12458 5.12673C8.06604 5.3405 8.21298 5.55538 8.41769 5.55538H11.391C11.9407 5.55538 12.2115 6.28392 11.8168 6.70078L6.2082 12.6241C5.97995 12.8652 5.67456 13 5.3567 13H5.11191Z"
                          fill="#1C1C1C"
                        />
                      </svg>
                    </div>
                    <div class="s-listing__subtitle-title">
                      Отсрочка от армии
                    </div>
                  </div>
                </div>
              </div>
              <div class="s-listing__content">
                <div class="s-listing__preview">
                  <button class="s-listing__preview-name magistr active">
                    Психолого-педагогическое образование
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Лингвистика
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Государственное и муниципальное управление
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Управление
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Экономика
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Маркетинг
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Прикладная информатика
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Реклама и связи с общественностью
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Менеджмент в образовании
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Предпринимательство
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Анимация
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Банковское дело
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Дизайн городской среды
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Управление цифровыми проектами
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Управление спортивной организацией
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Корпоративный юрист
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Интернет-маркетинг
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Международный менеджмент премиум-сегмента
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Бренд-стратегия в цифровых коммуникациях
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Межъязыковые и межкультурные коммуникации
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Жилищное хозяйство
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Управление продуктом на конкурентном рынке
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Юридический факультет
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Коучинг и психологическое консультирование
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Дизайн
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Организационная психология
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Бизнес
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Управление IT-проектами
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Бухгалтерский учет, анализ и аудит
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Менеджмент
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Спортивный менеджмент
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Спорт и система подготовки спортсменов
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Цифровой дизайн
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Финансы
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Гостеприимство
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Гостиничный и ресторанный бизнес
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Управление информационными технологиями в организации
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Стратегический менеджмент
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Менеджмент в гостиничном и ресторанном бизнесе
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Управление правовыми рисками
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Актерское мастерство
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Брендинг территорий и дизайн среды
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Технологическое предпринимательство
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Управление проектами в сфере искусства и культуры
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Управление проектами городской трансформации
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    ESG-трансформация городского хозяйства
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Коммунальная инфраструктура
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Цифровая экономика и искусственный интеллект
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    HR-менеджмент
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Кризисная психология
                  </button>
                  <button class="s-listing__preview-name magistr ">
                    Экономика недропользования
                  </button>
                </div>
                <div class="s-listing__list">
                  <div class="s-listing__item magistr active">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Психолого-педагогическое образование
                    </div>
                    <div class="s-listing__item-description">
                      Сформируете навыки, которые помогут задавать направление развития системы образования,
                      проектировать и реализовывать проекты в этой области, освоите методику сопровождения личности в
                      процессе её индивидуального движения, содействии её самоопределению и самореализации.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Психолого-педагогического образования"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет лингвистики
                    </div>
                    <div class="s-listing__item-description">
                      Изучайте иностранные языки, проходите практику в зарубежных организациях, учитесь свободно
                      общаться с носителями языка и приобретайте знания, необходимые для работы в международных
                      компаниях и на дипломатической службе.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Лингвистики"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет государственного и муниципального управления
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь организовывать работу органов государственной и муниципальной власти, разрабатывать
                      проекты различных нормативно-правовых актов, налаживать связи между властью, СМИ, общественными
                      институтами, гражданами.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Государственного и муниципального управления"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет управления
                    </div>
                    <div class="s-listing__item-description">
                      Изучите основы менеджмента, экономики, стратегического планирования и работы с персоналом.
                      Узнайте, как управлять проектами любых масштабов и выводить организации на пик эффективности.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Управления"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет экономики
                    </div>
                    <div class="s-listing__item-description">
                      Получите отличную теоретическую подготовку в области экономики, пройдите практику в крупнейших
                      банках страны и станьте высокооплачиваемым специалистом по управлению финансовыми ресурсами
                      компании.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Экономики"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Маркетинг
                    </div>
                    <div class="s-listing__item-description">
                      Вы научитесь выявлять потребности аудитории, анализировать рынок и конкурентов, освоите методы
                      эффективного продвижения товаров и услуг с целью увеличения прибыли.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Маркетинга"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Прикладная информатика
                    </div>
                    <div class="s-listing__item-description">
                      Получите знания и практические навыки в области реализации информационных процессов и построения
                      информационных систем.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Прикладной информатики"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет рекламы и связей с общественностью
                    </div>
                    <div class="s-listing__item-description">
                      Изучите планирование и модели реализации рекламных кампаний, проектирование визуальных
                      коммуникаций и медиастратегии.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Рекламы и связей с общественностью"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет менеджмента в образовании
                    </div>
                    <div class="s-listing__item-description">
                      Изучите методы исследования в менеджменте, экономику образования, менеджмент образовательного
                      учреждения и организацию делопроизводства в образовании, приобретете навыки применения
                      информационных технологий в деятельности руководителя образовательного учреждения, получите навыки
                      в области современных образовательных технологий.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Менеджмента в образовании"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет предпринимательства
                    </div>
                    <div class="s-listing__item-description">
                      Изучите основы экономики, финансов, маркетинга и деловых отношений, научитесь генерировать
                      перспективные идеи и превращать их в конкретные бизнес-планы, начните свое дело уже во время
                      обучения.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Предпринимательства"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет анимации
                    </div>
                    <div class="s-listing__item-description">
                      Овладеете углубленными навыками 2D- и 3D-моделирования, саунд-дизайна, композитинга, монтажа,
                      пройдете путь от разработки идеи проекта до производства анимационного фильма с использованием
                      наиболее актуальных инструментов, презентации и продвижения.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Анимации"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет банковского дела
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь выстраивать стратегию развития банка, освоите схему реализации банковских продуктов,
                      узнаете, как планировать бюджет и взаимодействовать с потребителями, и получите все компетенции
                      для занятия руководящей должности в одном из ведущих банков.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Банковского дела"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет дизайна городской среды
                    </div>
                    <div class="s-listing__item-description">
                      Познакомитесь с международным и российским опытом разработки концепций и стратегий
                      территориального развития, регионального и городского мастер-планирования, освоите кейсы и
                      конкретные практики брендинга и творческого преображения городской среды, овладеете навыками
                      бизнес-планирования, инструментарием и технологией социокультурного проектирования.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Дизайна городской среды"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Управление цифровыми проектами
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь анализировать клиентский опыт и метрики, проверять продуктовые гипотезы, разбираться в
                      интернет-маркетинге, настраивать работу офлайн- и онлайн-команды, что позволит запускать успешные
                      digital-проекты.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Управления цифровыми проектами"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет управления спортивной организацией
                    </div>
                    <div class="s-listing__item-description">
                      Изучите систему современного спорта, международный спортивный менеджмент и маркетинг, экономику
                      спорта, управление человеческим капиталом в спортивной индустрии, современную теорию и методику
                      физической культуры и спорта.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Управления спортивной организацией"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Корпоративный юрист
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь сопровождать сделки, составлять документы, будете участвовать в бизнес-процессах
                      компании и переговорах. Сможете работать юристом по делам о банкротстве, юрисконсультом,
                      начальником юридического отдела.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Корпоративного юриста"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Интернет-маркетинг
                    </div>
                    <div class="s-listing__item-description">
                      Факультет готовит специалистов, обладающих навыками разработки digital-стратегии для продвижения
                      коммерческого проекта. Вы научитесь использовать различные маркетинговые инструменты и грамотно
                      ставить технические задания специалистам смежных направлений. Сможете запускать рекламные кампании
                      и управлять ими.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Интернет-маркетинга"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Международный менеджмент премиум-сегмента
                    </div>
                    <div class="s-listing__item-description">
                      Познакомитесь с деловой коммуникацией и маркетингом в luxury-индустрии, изучите коммерческую
                      деятельность в премиум-сегменте, освоите навыки управления проектами и процессами обслуживания,
                      изучите ключевые дисциплины для этой бизнес-сферы.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Международного менеджмента премиум-сегмента"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Бренд-стратегия в цифровых коммуникациях
                    </div>
                    <div class="s-listing__item-description">
                      Вы научитесь организовывать масштабные кампании в цифровой среде, разрабатывать рекламные
                      стратегии. Сможете выводить новые проекты на лидирующие позиции рынка. Станете востребованным
                      специалистом в различных отраслях экономики.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Бренд-стратегии в цифровых коммуникациях"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Межъязыковые и межкультурные коммуникации
                    </div>
                    <div class="s-listing__item-description">
                      Изучите психолингвистику, типологию языков и культур. Пройдете практический курс иностранного
                      языка и специального перевода.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Межъязыковых и межкультурных коммуникаций"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Жилищное хозяйство
                    </div>
                    <div class="s-listing__item-description">
                      Сфера жилищного хозяйства включает в себя различные аспекты управления многоквартирными домами,
                      вопросы обслуживания и эксплуатации жилых помещений. Специалисты в этой области обеспечивают
                      управление ресурсами, планирование ремонтных работ и заботятся о комфорте жильцов. Обучение в
                      данной сфере предполагает изучение правовых норм, технических аспектов и управленческих практик, а
                      также проверку знаний нормативных документов.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Жилищного хозяйства"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Управление продуктом на конкурентном рынке
                    </div>
                    <div class="s-listing__item-description">
                      Развивайте аналитическое мышление, разрабатывайте стратегию управления продуктом, учитесь
                      принимать решения на основе данных и статистики и повышайте конкурентную способность для
                      достижения лидерства на рынке.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Управления продуктом на конкурентном рынке"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Юридический факультет
                    </div>
                    <div class="s-listing__item-description">
                      Выберите интересную вам область права, научитесь ориентироваться в современном законодательстве и
                      пройдите практику в органах власти и судопроизводства для получения всех компетенций
                      профессионального юриста.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Юридического факультета"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Коучинг и психологическое консультирование
                    </div>
                    <div class="s-listing__item-description">
                      Освоите современные техники психологического консультирования и сможете эффективно решать любые
                      задачи клиента, получите навыки публичных выступлений и управления карьерой. Вы сможете работать
                      психологом-консультантом, корпоративным тренером, коучем или HR-специалистом.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Коучинга и психологического консультирования"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет дизайна
                    </div>
                    <div class="s-listing__item-description">
                      Изучите основы рекламных и цифровых технологий, освойте современные инструменты разработки дизайна
                      и станьте высокооплачиваемым специалистом в области создания веб-сайтов, мобильных приложений и
                      проектирования среды.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Дизайна"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет организационной психологии
                    </div>
                    <div class="s-listing__item-description">
                      Освоите социально-психологические методы работы организационного психолога, психологические основы
                      оценки персонала и ряд других дисциплин, изучите психологические практики и службы, психологию
                      деловых отношений, управленческую психологию, психологию развития и возрастную психологию,
                      психологию личности, психодиагностику.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Организационной психологии"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет бизнеса
                    </div>
                    <div class="s-listing__item-description">
                      Изучите основы экономики, финансов, маркетинга и деловых отношений, научитесь генерировать
                      перспективные идеи и превращать их в конкретные бизнес-планы, начните свое дело уже во время
                      обучения.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Бизнеса"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Управление IT-проектами
                    </div>
                    <div class="s-listing__item-description">
                      После обучения вы сможете руководить проектной командой: ставить задачи, контролировать ход
                      выполнения, оценивать результат. Благодаря полученным знаниям вы будете говорить с разработчиками
                      на одном языке.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Управления IT-проектами"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет бухгалтерского учета, анализа и аудита
                    </div>
                    <div class="s-listing__item-description">
                      После обучения вы сможете руководить проектной командой: ставить задачи, контролировать ход
                      выполнения, оценивать результат. Благодаря полученным знаниям вы будете говорить с разработчиками
                      на одном языке.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Бухгалтерского учета, анализа и аудита"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет менеджмента
                    </div>
                    <div class="s-listing__item-description">
                      Освоите навыки для определения и постановки целей, их достижения при помощи людей и ресурсов,
                      координации и контроля, обеспечения прибыли при эффективном использовании этих ресурсов.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Менеджмента"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет спортивного менеджмента
                    </div>
                    <div class="s-listing__item-description">
                      Получите знания в области спортивного менеджмента и маркетинга. Пройдите практику в спортивных
                      организациях, примите участие в организации и проведении спортивных мероприятий и начните работать
                      в индустрии спорта.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Спортивного менеджмента"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет спорта и системы подготовки спортсменов
                    </div>
                    <div class="s-listing__item-description">
                      Освоите навыки ведения культурно-просветительских проектов на базе образовательно-спортивных
                      учреждений и руководства ими, сможете управлять подготовкой спортивного резерва и спортсменов
                      высокой квалификации.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Спорта и системы подготовки спортсменов"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет цифрового дизайна
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь пользоваться Figma для создания дизайна, работать с масками и эффектами, создадите свой
                      первый дизайн в Adobe Illustrator, сделаете рекламные макеты и принты с помощью инструментов
                      Photoshop, узнаете основы UX- и UI-дизайна и создадите дизайн с учетом пользовательского опыта.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Цифрового дизайна"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет финансов
                    </div>
                    <div class="s-listing__item-description">
                      Изучите финансовые рынки и финансово-кредитные институты, научитесь методам финансового и
                      денежно-кредитного регулирования экономики, углубите знания в банковской инфраструктуре,
                      банковских продуктах и современных технологиях, поведенческих финансах.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Финансов"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет гостеприимства
                    </div>
                    <div class="s-listing__item-description">
                      Получите все необходимые компетенции для работы в индустрии HoReCa. Вас ждет практика в известных
                      сетевых отелях и ресторанах, мастер-классы ведущих экспертов и посещение отраслевых мероприятий.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Гостеприимства"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Гостиничный и ресторанный бизнес
                    </div>
                    <div class="s-listing__item-description">
                      Программа предусматривает изучение иностранных языков, финансового планирования, менеджмента,
                      маркетинга и социологии. Вы получите практический опыт прямо во время обучения. Выпускники смогут
                      стать директорами отелей или ресторанов, занять руководящие должности в сфере HoReCa.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Гостиничного и ресторанного бизнеса"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Управление информационными технологиями в организации
                    </div>
                    <div class="s-listing__item-description">
                      Сможете создать собственное приложение, настроить самое современное программное обеспечение под
                      нужды бизнеса и научитесь эффективно управлять командой. Вы сможете работать в крупных
                      IT-компаниях на позиции системного аналитика, стать руководителем отдела программных разработок
                      или проектов.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Управления информационными технологиями в организации"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет стратегического менеджмента
                    </div>
                    <div class="s-listing__item-description">
                      Освоите навыки долгосрочного планирования и организации жизнеспособного бизнеса в условиях кризиса
                      и рисков, овладеете анализом среды, выбором стратегии и ее реализации, системами оценки и контроля
                      выполнения.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Стратегического менеджмента"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Менеджмент в гостиничном и ресторанном бизнесе
                    </div>
                    <div class="s-listing__item-description">
                      Сможете разработать стратегию развития гостиничного и ресторанного бизнеса, мотивировать
                      сотрудников, занятых в обслуживании, и открыть свой ресторан или отель. Работайте супервайзером
                      отеля или ресторана, станьте управляющим или руководителем департамента HoReCa.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Менеджмента в гостиничном и ресторанном бизнесе"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Управление правовыми рисками
                    </div>
                    <div class="s-listing__item-description">
                      Вы изучите причины возникновения правовых рисков и научитесь их устранять, сможете минимизировать
                      убытки компании. По окончании обучения станете востребованным специалистом в органах власти,
                      государственных и коммерческих организациях.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Управления правовыми рисками"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Факультет актерского мастерства
                    </div>
                    <div class="s-listing__item-description">
                      Изучите психологию художественного творчества, экономику и социологию в сфере искусства,
                      театральный костюм, сценическую технику и технологии, освоите методологию преподавания мастерства
                      актера, узнаете об истории развития сценического пространства и использовании компьютерных
                      технологий в театральном образовании.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Актерского мастерства"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Брендинг территорий и дизайн среды
                    </div>
                    <div class="s-listing__item-description">
                      Овладеете теорией и практикой проектирования городских общественных пространств, инструментами
                      территориального брендинга, а также разберетесь в современных тенденциях дизайна городской среды.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Брендинга территорий и дизайна среды"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Технологическое предпринимательство
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь превращать идеи и инновационные технологии в гаджеты, услуги и сервисы. Сможете
                      привлекать инвестиции, управлять командой и запустить свой первый стартап.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Технологического предпринимательства"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Управление проектами в сфере искусства и культуры
                    </div>
                    <div class="s-listing__item-description">
                      Изучите тренды современного искусства, бренд-менеджмент и маркетинг. Сможете запускать, продвигать
                      и управлять креативным кластером и пространством.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Управления проектами в сфере искусства и культуры"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Управление проектами городской трансформации
                    </div>
                    <div class="s-listing__item-description">
                      Программа разработана для подготовки высококвалифицированных управленцев, способных внедрять
                      передовые инновационные решения в области развития городов и городских сервисов.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Управления проектами городской трансформации"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      ESG-трансформация городского хозяйства
                    </div>
                    <div class="s-listing__item-description">
                      Программа готовит высококлассных управленцев, которые будут решать стратегические задачи
                      устойчивого развития городов, трансформации городского и жилищного хозяйства. Вы сможете создавать
                      проекты по ESG-трансформации и внедрять новые технологии в региональном городском управлении,
                      оказывая прямое влияние на качество жизни горожан.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="ESG-трансформации городского хозяйства"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Коммунальная инфраструктура
                    </div>
                    <div class="s-listing__item-description">
                      Специалисты коммунальной инфраструктуры занимаются управлением и обеспечением нормального
                      функционирования коммунальных систем, таких как водоснабжение, газоснабжение, теплоснабжение, а
                      также уборка и благоустройство городской территории. Обучение включает в себя изучение инженерных
                      наук, строительства и эксплуатации систем инфраструктуры, а также управленческие навыки в области
                      коммунального хозяйства.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Коммунальной инфраструктуры"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Цифровая экономика и искусственный интеллект
                    </div>
                    <div class="s-listing__item-description">
                      Овладеете знаниями в области экономики и информационных технологий, сможете построить карьеру в
                      условиях цифровой действительности.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Цифровой экономики и искусственного интеллекта"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      HR-менеджмент
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь организовывать работу кадровой службы, консультировать предпринимателей и подбирать
                      подходящих сотрудников, от линейных работников до топ-менеджеров.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="HR-менеджмента"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Кризисная психология
                    </div>
                    <div class="s-listing__item-description">
                      Узнайте, как помогать людям в стрессовых ситуациях и после них, прорабатывать психологические
                      травмы и купировать их последствия. Сможете работать как в частных, так и государственных
                      больницах, или же вести частную практику.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Кризисной психологии"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item magistr ">
                    <div class="s-listing__item-tooltip">
                      Магистратура / Второе высшее
                    </div>
                    <div class="s-listing__item-title">
                      Экономика недропользования
                    </div>
                    <div class="s-listing__item-description">
                      В программу обучения входит: экономика недропользования, корпоративное управление и оценка
                      месторождений. Программа сочетает фундаментальные знания в области корпоративной экономики,
                      финансов, стратегического и инвестиционного анализа, а также учитывает практические навыки работы
                      с реальными бизнес-кейсами предприятий минерально-сырьевого комплекса.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Экономики недропользования"
                      data-program-title="Магистратура / Второе высшее"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="postgraduate"
          class="s-listing"
        >
          <div class="l-default">
            <div class="s-listing__container">
              <div class="s-listing__title">
                <h3 class="h3--title">
                  Аспирантура <span>19</span>
                </h3>
                <div class="s-listing__subtitles">
                  <div class="s-listing__subtitle">
                    <div class="s-listing__subtitle-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.46738 12.5291C1.7764 12.843 2.15236 13 2.59526 13H11.4026C11.8483 13 12.2266 12.843 12.5376 12.5291C12.8485 12.215 13.004 11.8329 13.004 11.3828V2.62756C13.004 2.17455 12.8485 1.79004 12.5376 1.47402C12.2266 1.15801 11.8483 1 11.4026 1H2.59526C2.15236 1 1.7764 1.15801 1.46738 1.47402C1.15846 1.79004 1.00401 2.17455 1.00401 2.62756V11.3828C1.00401 11.8329 1.15846 12.215 1.46738 12.5291ZM9.30308 4.50968L6.22683 7.74578L5.24106 6.81542C5.04507 6.60999 4.80371 6.50727 4.517 6.50727C4.23029 6.50727 3.9872 6.60691 3.78773 6.80618C3.58825 7.00533 3.4907 7.23774 3.49509 7.50344C3.49934 7.76901 3.60243 7.98738 3.80435 8.15855L5.50529 9.81611C5.69419 10.005 5.93233 10.0995 6.21968 10.0995C6.50704 10.0995 6.74994 10.005 6.94838 9.81611L10.7205 5.90216C10.9309 5.70992 11.0361 5.47658 11.0361 5.20213C11.0361 4.92769 10.9316 4.69644 10.7226 4.50839C10.5135 4.33266 10.2738 4.24479 10.0036 4.24479C9.73321 4.24479 9.49972 4.33309 9.30308 4.50968Z"
                          fill="#1C1C1C"
                        />
                      </svg>
                    </div>
                    <div class="s-listing__subtitle-title">
                      Гибкий график.
                    </div>
                  </div>
                  <div class="s-listing__subtitle">
                    <div class="s-listing__subtitle-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M6.43908 2.15624C6.66888 1.68592 7.33917 1.68592 7.56897 2.15624L8.76106 4.59601C8.84993 4.77791 9.02096 4.90589 9.22054 4.93985L11.8452 5.38642C12.3404 5.47068 12.5417 6.07293 12.1968 6.43808L10.2855 8.46124C10.1532 8.60125 10.0924 8.79416 10.1205 8.98471L10.5309 11.7694C10.6061 12.2795 10.0691 12.6583 9.6138 12.4164L7.29905 11.1865C7.11458 11.0885 6.89348 11.0885 6.709 11.1865L4.39425 12.4164C3.93894 12.6583 3.402 12.2795 3.47717 11.7694L3.88756 8.98471C3.91564 8.79416 3.85484 8.60125 3.72257 8.46124L1.81127 6.43808C1.46631 6.07293 1.66766 5.47068 2.16287 5.38642L4.78752 4.93985C4.9871 4.90589 5.15812 4.77791 5.247 4.59602L6.43908 2.15624Z"
                          fill="#1C1C1C"
                        />
                      </svg>
                    </div>
                    <div class="s-listing__subtitle-title">
                      Расписание занятий позволяет совмещать обучение с работой.
                    </div>
                  </div>
                  <div class="s-listing__subtitle">
                    <div class="s-listing__subtitle-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M5.11191 13C4.68842 13 4.39303 12.5424 4.53614 12.1081L5.41322 9.44597C5.48477 9.2288 5.33707 9 5.12533 9H2.61696C2.09282 9 1.81138 8.32864 2.15453 7.89688L7.26993 1.46043C7.50233 1.16801 7.83982 1 8.1948 1H8.43362C8.84304 1 9.13691 1.42976 9.01984 1.8573L8.12458 5.12673C8.06604 5.3405 8.21298 5.55538 8.41769 5.55538H11.391C11.9407 5.55538 12.2115 6.28392 11.8168 6.70078L6.2082 12.6241C5.97995 12.8652 5.67456 13 5.3567 13H5.11191Z"
                          fill="#1C1C1C"
                        />
                      </svg>
                    </div>
                    <div class="s-listing__subtitle-title">
                      Отсрочка от армии
                    </div>
                  </div>
                </div>
              </div>
              <div class="s-listing__content">
                <div class="s-listing__preview">
                  <button class="s-listing__preview-name postgraduate active">
                    Юридический факультет
                  </button>
                  <button class="s-listing__preview-name postgraduate ">
                    Факультет управления
                  </button>
                  <button class="s-listing__preview-name postgraduate ">
                    Факультет экономики
                  </button>
                  <button class="s-listing__preview-name postgraduate ">
                    Педагогика
                  </button>
                  <button class="s-listing__preview-name postgraduate ">
                    Факультет бизнеса
                  </button>
                  <button class="s-listing__preview-name postgraduate ">
                    Факультет спорта
                  </button>
                  <button class="s-listing__preview-name postgraduate ">
                    Финансы
                  </button>
                  <button class="s-listing__preview-name postgraduate ">
                    Менеджмент
                  </button>
                  <button class="s-listing__preview-name postgraduate ">
                    Региональная и отраслевая экономика
                  </button>
                  <button class="s-listing__preview-name postgraduate ">
                    Предпринимательство
                  </button>
                  <button class="s-listing__preview-name postgraduate ">
                    Коммерция в спорте
                  </button>
                  <button class="s-listing__preview-name postgraduate ">
                    Информационные технологии
                  </button>
                  <button class="s-listing__preview-name postgraduate ">
                    Факультет дизайна
                  </button>
                  <button class="s-listing__preview-name postgraduate ">
                    Архитектура
                  </button>
                  <button class="s-listing__preview-name postgraduate ">
                    Факультет рекламы
                  </button>
                  <button class="s-listing__preview-name postgraduate ">
                    Журналистика
                  </button>
                  <button class="s-listing__preview-name postgraduate ">
                    Факультет робототехники
                  </button>
                  <button class="s-listing__preview-name postgraduate ">
                    Государственное и муниципальное управление
                  </button>
                  <button class="s-listing__preview-name postgraduate ">
                    Стоматология
                  </button>
                </div>
                <div class="s-listing__list">
                  <div class="s-listing__item postgraduate active">
                    <div class="s-listing__item-tooltip">
                      Аспирантура
                    </div>
                    <div class="s-listing__item-title">
                      Юридический факультет
                    </div>
                    <div class="s-listing__item-description">
                      Вы изучите предмет, методы, принципы и функции гражданско-правового регулирования, углубите свои
                      знания по всем юридическим дисциплинам и сможете принимать участие в разработке и
                      усовершенствовании законопроектов
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Юридического факультета"
                      data-program-title="Аспирантура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item postgraduate ">
                    <div class="s-listing__item-tooltip">
                      Аспирантура
                    </div>
                    <div class="s-listing__item-title">
                      Факультет управления
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь разрабатывать регламенты, овладеете методами распределения ресурсов. Углубите знания в
                      сфере управления и подготовитесь к сдаче кандидатских экзаменов.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета управления"
                      data-program-title="Аспирантура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item postgraduate ">
                    <div class="s-listing__item-tooltip">
                      Аспирантура
                    </div>
                    <div class="s-listing__item-title">
                      Факультет экономики
                    </div>
                    <div class="s-listing__item-description">
                      Получите знания по национальной экономике, научитесь строить финансовые стратегии, освоите
                      тонкости налогообложения. Будете востребованы во властных структурах и крупных организациях.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета экономики"
                      data-program-title="Аспирантура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item postgraduate ">
                    <div class="s-listing__item-tooltip">
                      Аспирантура
                    </div>
                    <div class="s-listing__item-title">
                      Педагогика
                    </div>
                    <div class="s-listing__item-description">
                      Изучите дисциплины: проектирование траектории профессионального роста, психология и педагогика
                      высшего образования, методическое сопровождение учебного процесса. Сможете работать в сфере
                      образования и науки на руководящих должностях.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Педагогики"
                      data-program-title="Аспирантура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item postgraduate ">
                    <div class="s-listing__item-tooltip">
                      Аспирантура
                    </div>
                    <div class="s-listing__item-title">
                      Факультет бизнеса
                    </div>
                    <div class="s-listing__item-description">
                      Получите углубленные знания в сфере управления, финансов, экономики, а также будете работать над
                      собственным проектом. После обучения вы сможете участвовать в инновационных исследованиях в
                      различных отраслях бизнеса.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета бизнеса"
                      data-program-title="Аспирантура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item postgraduate ">
                    <div class="s-listing__item-tooltip">
                      Аспирантура
                    </div>
                    <div class="s-listing__item-title">
                      Факультет спорта
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь разрабатывать новые и совершенствовать действующие программы по физической культуре.
                      Проведете научное исследование, отработаете навыки ведения лекций, семинаров, практических
                      занятий.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета спорта"
                      data-program-title="Аспирантура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item postgraduate ">
                    <div class="s-listing__item-tooltip">
                      Аспирантура
                    </div>
                    <div class="s-listing__item-title">
                      Финансы
                    </div>
                    <div class="s-listing__item-description">
                      Изучите национальные и международные стандарты финансовой деятельности, научитесь использовать
                      аналитические подходы, прогнозировать движение денежного капитала. Сможете построить карьеру в
                      сфере кредитных отношений, биржевой торговли, страхования и банковской деятельности.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Финансов"
                      data-program-title="Аспирантура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item postgraduate ">
                    <div class="s-listing__item-tooltip">
                      Аспирантура
                    </div>
                    <div class="s-listing__item-title">
                      Менеджмент
                    </div>
                    <div class="s-listing__item-description">
                      Сможете осуществлять научно-исследовательскую деятельность в области менеджмента и
                      преподавательскую деятельность в рамках образовательных программ высшего образования. Закончив
                      обучение, построите карьеру в бизнесе, на государственной службе или в высшем учебном заведении.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Менеджмента"
                      data-program-title="Аспирантура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item postgraduate ">
                    <div class="s-listing__item-tooltip">
                      Аспирантура
                    </div>
                    <div class="s-listing__item-title">
                      Региональная и отраслевая экономика
                    </div>
                    <div class="s-listing__item-description">
                      Получите комплексный взгляд на экономические процессы и явления, овладеете навыками системного
                      мышления в решении экономических задач. Сможете сдать кандидатские экзамены и станете
                      востребованным специалистом.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Региональной и отраслевой экономики"
                      data-program-title="Аспирантура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item postgraduate ">
                    <div class="s-listing__item-tooltip">
                      Аспирантура
                    </div>
                    <div class="s-listing__item-title">
                      Предпринимательство
                    </div>
                    <div class="s-listing__item-description">
                      Углубите знания по экономике, финансам, маркетингу и деловым отношениям. Получите компетенции,
                      необходимые для открытия собственного дела.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Предпринимательства"
                      data-program-title="Аспирантура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item postgraduate ">
                    <div class="s-listing__item-tooltip">
                      Аспирантура
                    </div>
                    <div class="s-listing__item-title">
                      Коммерция в спорте
                    </div>
                    <div class="s-listing__item-description">
                      Получите знания в области менеджмента, маркетинга и спортивного права, научитесь руководить
                      крупными проектами, пройдите практику в спортивном клубе и станете управленцем, востребованным в
                      любой организации индустрии спорта.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Коммерции в спорте"
                      data-program-title="Аспирантура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item postgraduate ">
                    <div class="s-listing__item-tooltip">
                      Аспирантура
                    </div>
                    <div class="s-listing__item-title">
                      Информационные технологии
                    </div>
                    <div class="s-listing__item-description">
                      Изучите программные платформы, процесс создания программного обеспечения и работы с Big Data,
                      получите навыки в области разработки приложений и облачных технологий. После выпуска сможете
                      претендовать на руководящие должности в сфере IT, кибербезопасности, разработки ПО или анализа
                      данных.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Информационных технологий"
                      data-program-title="Аспирантура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item postgraduate ">
                    <div class="s-listing__item-tooltip">
                      Аспирантура
                    </div>
                    <div class="s-listing__item-title">
                      Факультет дизайна
                    </div>
                    <div class="s-listing__item-description">
                      Узнаете современные тенденции в дизайне, изучите новейшие методы творческого процесса, цифровые
                      инструменты, а также теорию искусства и дизайна. По завершении программы сможете работать на
                      руководящих позициях в сфере графического дизайна, веб-дизайна, полиграфии, создавать рекламные и
                      маркетинговые материалы.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета дизайна"
                      data-program-title="Аспирантура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item postgraduate ">
                    <div class="s-listing__item-tooltip">
                      Аспирантура
                    </div>
                    <div class="s-listing__item-title">
                      Архитектура
                    </div>
                    <div class="s-listing__item-description">
                      Изучите архитектурное проектирование, историю и теорию архитектуры, архитектурные технологии,
                      основа устойчивого дизайна и градостроительства. Вы узнаете всё об архитектурных тенденциях и
                      технологических инновациях и станете востребованными специалистами в области архитектуры, дизайна
                      городской среды, планирования и руководства проектами.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Архитектуры"
                      data-program-title="Аспирантура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item postgraduate ">
                    <div class="s-listing__item-tooltip">
                      Аспирантура
                    </div>
                    <div class="s-listing__item-title">
                      Факультет рекламы
                    </div>
                    <div class="s-listing__item-description">
                      Получите глубокие знания о маркетинге, психологии потребления, креативных стратегиях и цифровых
                      медиа. Научитесь проводить исследования рынка и анализировать тенденции в рекламной индустрии. По
                      окончании программы сможете занять руководящую должность в сфере рекламы, маркетинга, PR и
                      брендинга.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета рекламы"
                      data-program-title="Аспирантура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item postgraduate ">
                    <div class="s-listing__item-tooltip">
                      Аспирантура
                    </div>
                    <div class="s-listing__item-title">
                      Журналистика
                    </div>
                    <div class="s-listing__item-description">
                      Изучите особенности работы в медиаиндустрии, принципы журналистской этики, медиамаркетинг и
                      коммуникационные технологии. Программа включает практические занятия, исследования и стажировки в
                      ведущих медиакомпаниях. Выпускники могут рассчитывать на карьеру в сфере журналистики, PR,
                      медиаменеджмента и коммуникаций.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Журналистики"
                      data-program-title="Аспирантура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item postgraduate ">
                    <div class="s-listing__item-tooltip">
                      Аспирантура
                    </div>
                    <div class="s-listing__item-title">
                      Факультет робототехники
                    </div>
                    <div class="s-listing__item-description">
                      Изучите передовые разработки в области создания и управления робототехническими системами,
                      механику, электронику, программное обеспечение и технологии искусственного интеллекта. В
                      дальнейшем сможете работать в компаниях, специализирующихся на инновационных технологиях и
                      робототехнике.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Факультета робототехники"
                      data-program-title="Аспирантура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item postgraduate ">
                    <div class="s-listing__item-tooltip">
                      Аспирантура
                    </div>
                    <div class="s-listing__item-title">
                      Государственное и муниципальное управление
                    </div>
                    <div class="s-listing__item-description">
                      Программа предназначена для тех, кто хочет знать всё об управлении в государственной и
                      муниципальной сферах. Вы изучите политическую экономию, теорию государства и права, а также методы
                      урегулирования различных общественных процессов. После выпуска сможете занять руководящую позицию
                      в госучреждениях, НКО или частном секторе.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Государственного и муниципального управления"
                      data-program-title="Аспирантура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item postgraduate ">
                    <div class="s-listing__item-tooltip">
                      Аспирантура
                    </div>
                    <div class="s-listing__item-title">
                      Стоматология
                    </div>
                    <div class="s-listing__item-description">
                      Изучите анатомию, биохимию и физиологию человека, а также челюстно-лицевую стоматологию,
                      травматологию и ортодонтию, чтобы получить возможность работать в частных и государственных
                      клиниках.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Стоматологии"
                      data-program-title="Аспирантура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="residency"
          class="s-listing"
        >
          <div class="l-default">
            <div class="s-listing__container">
              <div class="s-listing__title">
                <h3 class="h3--title">
                  Ординатура <span>4</span>
                </h3>
                <div class="s-listing__subtitles">
                  <div class="s-listing__subtitle">
                    <div class="s-listing__subtitle-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.46738 12.5291C1.7764 12.843 2.15236 13 2.59526 13H11.4026C11.8483 13 12.2266 12.843 12.5376 12.5291C12.8485 12.215 13.004 11.8329 13.004 11.3828V2.62756C13.004 2.17455 12.8485 1.79004 12.5376 1.47402C12.2266 1.15801 11.8483 1 11.4026 1H2.59526C2.15236 1 1.7764 1.15801 1.46738 1.47402C1.15846 1.79004 1.00401 2.17455 1.00401 2.62756V11.3828C1.00401 11.8329 1.15846 12.215 1.46738 12.5291ZM9.30308 4.50968L6.22683 7.74578L5.24106 6.81542C5.04507 6.60999 4.80371 6.50727 4.517 6.50727C4.23029 6.50727 3.9872 6.60691 3.78773 6.80618C3.58825 7.00533 3.4907 7.23774 3.49509 7.50344C3.49934 7.76901 3.60243 7.98738 3.80435 8.15855L5.50529 9.81611C5.69419 10.005 5.93233 10.0995 6.21968 10.0995C6.50704 10.0995 6.74994 10.005 6.94838 9.81611L10.7205 5.90216C10.9309 5.70992 11.0361 5.47658 11.0361 5.20213C11.0361 4.92769 10.9316 4.69644 10.7226 4.50839C10.5135 4.33266 10.2738 4.24479 10.0036 4.24479C9.73321 4.24479 9.49972 4.33309 9.30308 4.50968Z"
                          fill="#1C1C1C"
                        />
                      </svg>
                    </div>
                    <div class="s-listing__subtitle-title">
                      Гибкий график.
                    </div>
                  </div>
                  <div class="s-listing__subtitle">
                    <div class="s-listing__subtitle-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M6.43908 2.15624C6.66888 1.68592 7.33917 1.68592 7.56897 2.15624L8.76106 4.59601C8.84993 4.77791 9.02096 4.90589 9.22054 4.93985L11.8452 5.38642C12.3404 5.47068 12.5417 6.07293 12.1968 6.43808L10.2855 8.46124C10.1532 8.60125 10.0924 8.79416 10.1205 8.98471L10.5309 11.7694C10.6061 12.2795 10.0691 12.6583 9.6138 12.4164L7.29905 11.1865C7.11458 11.0885 6.89348 11.0885 6.709 11.1865L4.39425 12.4164C3.93894 12.6583 3.402 12.2795 3.47717 11.7694L3.88756 8.98471C3.91564 8.79416 3.85484 8.60125 3.72257 8.46124L1.81127 6.43808C1.46631 6.07293 1.66766 5.47068 2.16287 5.38642L4.78752 4.93985C4.9871 4.90589 5.15812 4.77791 5.247 4.59602L6.43908 2.15624Z"
                          fill="#1C1C1C"
                        />
                      </svg>
                    </div>
                    <div class="s-listing__subtitle-title">
                      Расписание занятий позволяет совмещать обучение с работой.
                    </div>
                  </div>
                  <div class="s-listing__subtitle">
                    <div class="s-listing__subtitle-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M5.11191 13C4.68842 13 4.39303 12.5424 4.53614 12.1081L5.41322 9.44597C5.48477 9.2288 5.33707 9 5.12533 9H2.61696C2.09282 9 1.81138 8.32864 2.15453 7.89688L7.26993 1.46043C7.50233 1.16801 7.83982 1 8.1948 1H8.43362C8.84304 1 9.13691 1.42976 9.01984 1.8573L8.12458 5.12673C8.06604 5.3405 8.21298 5.55538 8.41769 5.55538H11.391C11.9407 5.55538 12.2115 6.28392 11.8168 6.70078L6.2082 12.6241C5.97995 12.8652 5.67456 13 5.3567 13H5.11191Z"
                          fill="#1C1C1C"
                        />
                      </svg>
                    </div>
                    <div class="s-listing__subtitle-title">
                      Отсрочка от армии
                    </div>
                  </div>
                </div>
              </div>
              <div class="s-listing__content">
                <div class="s-listing__preview">
                  <button class="s-listing__preview-name residency active">
                    Кардиология
                  </button>
                  <button class="s-listing__preview-name residency ">
                    Лечебная физкультура и спортивная медицина
                  </button>
                  <button class="s-listing__preview-name residency ">
                    Неврология
                  </button>
                  <button class="s-listing__preview-name residency ">
                    Травматология и ортопедия
                  </button>
                </div>
                <div class="s-listing__list">
                  <div class="s-listing__item residency active">
                    <div class="s-listing__item-tooltip">
                      Ординатура
                    </div>
                    <div class="s-listing__item-title">
                      Кардиология
                    </div>
                    <div class="s-listing__item-description">
                      Изучите все необходимое для проведения лечения, диагностики и профилактики заболеваний
                      сердечно-сосудистой системы.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Кардиология"
                      data-program-title="Ординатура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item residency ">
                    <div class="s-listing__item-tooltip">
                      Ординатура
                    </div>
                    <div class="s-listing__item-title">
                      Лечебная физкультура и спортивная медицина
                    </div>
                    <div class="s-listing__item-description">
                      Получите все необходимые навыки, чтобы помогать людям восстанавливаться после заболеваний и травм,
                      работать над конкретными проблемами и развивать свое тело. Знания позволят работать в больницах,
                      фитнес-центрах или открыть собственное дело.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Лечебная физкультура и спортивная медицина"
                      data-program-title="Ординатура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item residency ">
                    <div class="s-listing__item-tooltip">
                      Ординатура
                    </div>
                    <div class="s-listing__item-title">
                      Неврология
                    </div>
                    <div class="s-listing__item-description">
                      Изучите строение, функционирование и заболевания головного и спинного мозга, нервов и мышц
                      человека. Получите право работать как в частных, так и в государственных клиниках.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Неврология"
                      data-program-title="Ординатура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item residency ">
                    <div class="s-listing__item-tooltip">
                      Ординатура
                    </div>
                    <div class="s-listing__item-title">
                      Травматология и ортопедия
                    </div>
                    <div class="s-listing__item-description">
                      Изучите все, необходимое для диагностики, лечения и профилактики травм и заболеваний
                      опорно-двигательной системы, от базовой теории до современных методов анализа. Сможете работать в
                      клиниках, исследовательских центрах и частных компаниях.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Травматология и ортопедия"
                      data-program-title="Ординатура"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="mba"
          class="s-listing"
        >
          <div class="l-default">
            <div class="s-listing__container">
              <div class="s-listing__title">
                <h3 class="h3--title">
                  MBA <span>10</span>
                </h3>
                <div class="s-listing__subtitles">
                  <div class="s-listing__subtitle mba">
                    <div class="s-listing__subtitle-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.46738 12.5291C1.7764 12.843 2.15236 13 2.59526 13H11.4026C11.8483 13 12.2266 12.843 12.5376 12.5291C12.8485 12.215 13.004 11.8329 13.004 11.3828V2.62756C13.004 2.17455 12.8485 1.79004 12.5376 1.47402C12.2266 1.15801 11.8483 1 11.4026 1H2.59526C2.15236 1 1.7764 1.15801 1.46738 1.47402C1.15846 1.79004 1.00401 2.17455 1.00401 2.62756V11.3828C1.00401 11.8329 1.15846 12.215 1.46738 12.5291ZM9.30308 4.50968L6.22683 7.74578L5.24106 6.81542C5.04507 6.60999 4.80371 6.50727 4.517 6.50727C4.23029 6.50727 3.9872 6.60691 3.78773 6.80618C3.58825 7.00533 3.4907 7.23774 3.49509 7.50344C3.49934 7.76901 3.60243 7.98738 3.80435 8.15855L5.50529 9.81611C5.69419 10.005 5.93233 10.0995 6.21968 10.0995C6.50704 10.0995 6.74994 10.005 6.94838 9.81611L10.7205 5.90216C10.9309 5.70992 11.0361 5.47658 11.0361 5.20213C11.0361 4.92769 10.9316 4.69644 10.7226 4.50839C10.5135 4.33266 10.2738 4.24479 10.0036 4.24479C9.73321 4.24479 9.49972 4.33309 9.30308 4.50968Z"
                          fill="#1C1C1C"
                        />
                      </svg>
                    </div>
                    <div class="s-listing__subtitle-title">
                      Обучение управлению, маркетингу и финансам. Очно или Онлайн
                    </div>
                  </div>
                  <div class="s-listing__subtitle mba">
                    <div class="s-listing__subtitle-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M6.43908 2.15624C6.66888 1.68592 7.33917 1.68592 7.56897 2.15624L8.76106 4.59601C8.84993 4.77791 9.02096 4.90589 9.22054 4.93985L11.8452 5.38642C12.3404 5.47068 12.5417 6.07293 12.1968 6.43808L10.2855 8.46124C10.1532 8.60125 10.0924 8.79416 10.1205 8.98471L10.5309 11.7694C10.6061 12.2795 10.0691 12.6583 9.6138 12.4164L7.29905 11.1865C7.11458 11.0885 6.89348 11.0885 6.709 11.1865L4.39425 12.4164C3.93894 12.6583 3.402 12.2795 3.47717 11.7694L3.88756 8.98471C3.91564 8.79416 3.85484 8.60125 3.72257 8.46124L1.81127 6.43808C1.46631 6.07293 1.66766 5.47068 2.16287 5.38642L4.78752 4.93985C4.9871 4.90589 5.15812 4.77791 5.247 4.59602L6.43908 2.15624Z"
                          fill="#1C1C1C"
                        />
                      </svg>
                    </div>
                    <div class="s-listing__subtitle-title">
                      Программы для руководителей и предпринимателей
                    </div>
                  </div>
                </div>
              </div>
              <div class="s-listing__content">
                <div class="s-listing__preview">
                  <button class="s-listing__preview-name mba active">
                    Управление человеческими ресурсами
                  </button>
                  <button class="s-listing__preview-name mba ">
                    Операционное управление
                  </button>
                  <button class="s-listing__preview-name mba ">
                    Управление продажами
                  </button>
                  <button class="s-listing__preview-name mba ">
                    Управление инвестициями
                  </button>
                  <button class="s-listing__preview-name mba ">
                    Стратегический менеджмент
                  </button>
                  <button class="s-listing__preview-name mba ">
                    Менеджмент организации
                  </button>
                  <button class="s-listing__preview-name mba ">
                    Управление финансами
                  </button>
                  <button class="s-listing__preview-name mba ">
                    Менеджмент в логистике
                  </button>
                  <button class="s-listing__preview-name mba ">
                    Менеджмент в фитнес-индустрии
                  </button>
                  <button class="s-listing__preview-name mba ">
                    Управление маркетингом
                  </button>
                </div>
                <div class="s-listing__list">
                  <div class="s-listing__item mba active">
                    <div class="s-listing__item-tooltip">
                      MBA
                    </div>
                    <div class="s-listing__item-title">
                      Управление человеческими ресурсами
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь подбору, адаптации, оценке, мотивации и аттестации персонала. Усильте управленческие
                      компетенции. Программа будет полезна руководителям компаний, директорам по персоналу, менеджерам
                      по подбору и развитию персонала.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Управления человеческими ресурсами"
                      data-program-title="MBA"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item mba ">
                    <div class="s-listing__item-tooltip">
                      MBA
                    </div>
                    <div class="s-listing__item-title">
                      Операционное управление
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь эффективно управлять технологическими процессами в сфере маркетинга, финансов, HR,
                      продаж, системно подходить к оптимизации основных направлений деятельности фирмы. Программа
                      рекомендуется директорам и их заместителям, руководителям функциональных подразделений, а также
                      всем менеджерам, заинтересованным в повышении управленческой квалификации.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Операционного управления"
                      data-program-title="MBA"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item mba ">
                    <div class="s-listing__item-tooltip">
                      MBA
                    </div>
                    <div class="s-listing__item-title">
                      Управление продажами
                    </div>
                    <div class="s-listing__item-description">
                      Программа способствует овладению принципами правильного планирования и прогнозирования продаж.
                      Пройдя курс, вы сможете повысить конверсию заявок от потенциальных клиентов в реальные оплаты, а
                      также обновите и систематизируете свои знания в области управления продажами с учетом текущей
                      экономической ситуации.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Управления продажами"
                      data-program-title="MBA"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item mba ">
                    <div class="s-listing__item-tooltip">
                      MBA
                    </div>
                    <div class="s-listing__item-title">
                      Управление инвестициями
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь выбирать и оценивать инвестиционные проекты. Изучите инструменты, необходимые для
                      эффективного развития бизнеса с опорой на инвестиции. Программа рекомендована сотрудникам
                      инвестиционных компаний, собственникам, наемным руководителям и сотрудникам компаний, планирующих
                      поиск и работу с инвесторами.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Управления инвестициями"
                      data-program-title="MBA"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item mba ">
                    <div class="s-listing__item-tooltip">
                      MBA
                    </div>
                    <div class="s-listing__item-title">
                      Стратегический менеджмент
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь разрабатывать и реализовывать стратегию развития компании, управлять финансовыми
                      рисками, осуществлять конкурентный анализ и составлять маркетинг-план привлечения новых клиентов.
                      Программа будет полезна собственникам малого и среднего бизнеса, руководителям структурных
                      подразделений, специалистам офисных и линейных подразделений, претендующим на занятие руководящих
                      должностей.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Стратегического менеджмента"
                      data-program-title="MBA"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item mba ">
                    <div class="s-listing__item-tooltip">
                      MBA
                    </div>
                    <div class="s-listing__item-title">
                      Менеджмент организации
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь эффективно управлять ключевыми аспектами бизнеса, включая управление персоналом,
                      маркетинг, финансы и управление рисками. Освойте особенности управления проектами на всех стадиях
                      — от планирования до реализации. Программа будет полезна собственникам малого и среднего бизнеса,
                      руководителям структурных подразделений, специалистам офисных и линейных подразделений,
                      претендующим на занятие руководящих должностей.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Менеджмента организации"
                      data-program-title="MBA"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item mba ">
                    <div class="s-listing__item-tooltip">
                      MBA
                    </div>
                    <div class="s-listing__item-title">
                      Управление финансами
                    </div>
                    <div class="s-listing__item-description">
                      Получите знания, умения и навыки построения комплексной и эффективной системы управления финансами
                      в соответствии со стратегией и задачами вашей компании. Повысьте свою личную эффективность как
                      руководителя и постройте профессиональную финансовую службу компании. Программа будет полезна
                      финансовым директорам, главным бухгалтерам, финансовым менеджерам и экономистам, менеджерам,
                      планирующим переход в управление финансами.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Управления финансами"
                      data-program-title="MBA"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item mba ">
                    <div class="s-listing__item-tooltip">
                      MBA
                    </div>
                    <div class="s-listing__item-title">
                      Менеджмент в логистике
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь методам сокращения издержек в логистике, отладке каналов эффективного сообщения с
                      поставщиками, оптимизации складской работы, повышению эффективности поставок. Программа будет
                      полезна руководителям логистических подразделений, собственникам логистических компаний,
                      менеджерам и руководителям, планирующим дальнейшее развитие карьеры в области управления
                      логистикой.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Менеджмента в логистике"
                      data-program-title="MBA"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item mba ">
                    <div class="s-listing__item-tooltip">
                      MBA
                    </div>
                    <div class="s-listing__item-title">
                      Менеджмент в фитнес-индустрии
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь управлять ключевыми показателями эффективности фитнес-центра, освойте принципы
                      управления спортивными организациями, подготовки и проведения соревнований и тренировочного
                      процесса. Программа будет полезна собственникам и наемным руководителям фитнес-клубов, а также
                      всем, кто хочет расти по карьерной лестнице в этом направлении.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Менеджмента в фитнес-индустрии"
                      data-program-title="MBA"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="s-listing__item mba ">
                    <div class="s-listing__item-tooltip">
                      MBA
                    </div>
                    <div class="s-listing__item-title">
                      Управление маркетингом
                    </div>
                    <div class="s-listing__item-description">
                      Научитесь управлять маркетингом — оценивать эффективность рекламы, рентабельность инвестиций,
                      составлять отчеты и делать прогнозы. Вы на практике освоите SMM, таргетированную и контекстную
                      рекламу, получите навыки работы с основными аналитическими системами. Программа рекомендуется
                      всем, кто работает в сфере маркетинга и хочет стать руководителем отдела/департамента маркетинга.
                      Также будет полезна тем, кто хочет расширить кругозор в области маркетинга.
                    </div>
                    <a
                      href="#popup__form_redesign"
                      data-type="program"
                      class="s-listing__item-btn"
                      data_formtype="get_program"
                      data-program-name="Управления маркетингом"
                      data-program-title="MBA"
                    >
                      Хочу поступить </a>
                    <div class="s-listing__item-arrow">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="57"
                        height="108"
                        src="/img/listing/arrow-e84ed11077.svg"
                        alt=""
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="course"
          class="s-listing"
        >
          <div class="l-default">
            <div class="s-listing__container">
              <div class="s-listing__title">
                <h3 class="h3--title">
                  Курсы <span>11</span>
                </h3>
                <div class="s-listing__themes">
                  <div
                    class="s-listing__theme"
                    data-id="marketing"
                  >
                    <div class="s-listing__theme-title">
                      Интернет-маркетинг
                    </div>
                    <div class="s-listing__theme-icon">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="36"
                        height="36"
                        src="/img/listing/logo_1-4732799aba.svg"
                        alt="Интернет-маркетинг"
                      >
                    </div>
                  </div>
                  <div
                    class="s-listing__theme"
                    data-id="web"
                  >
                    <div class="s-listing__theme-title">
                      Веб-разработка
                    </div>
                    <div class="s-listing__theme-icon">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="36"
                        height="36"
                        src="/img/listing/logo_2-b023b774f2.svg"
                        alt="Веб-разработка"
                      >
                    </div>
                  </div>
                  <div
                    class="s-listing__theme"
                    data-id="prog"
                  >
                    <div class="s-listing__theme-title">
                      Программирование
                    </div>
                    <div class="s-listing__theme-icon">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="36"
                        height="36"
                        src="/img/listing/logo_3-aac28da120.svg"
                        alt="Программирование"
                      >
                    </div>
                  </div>
                  <div
                    class="s-listing__theme"
                    data-id="design"
                  >
                    <div class="s-listing__theme-title">
                      Дизайн
                    </div>
                    <div class="s-listing__theme-icon">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="36"
                        height="36"
                        src="/img/listing/logo_4-bde8a0ac60.svg"
                        alt="Дизайн"
                      >
                    </div>
                  </div>
                  <div
                    class="s-listing__theme"
                    data-id="game"
                  >
                    <div class="s-listing__theme-title">
                      Курсы геймдизайна
                    </div>
                    <div class="s-listing__theme-icon">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="36"
                        height="36"
                        src="/img/listing/logo_5-0243a2a791.svg"
                        alt="Курсы геймдизайна"
                      >
                    </div>
                  </div>
                  <div
                    class="s-listing__theme"
                    data-id="control"
                  >
                    <div class="s-listing__theme-title">
                      Курсы управления
                    </div>
                    <div class="s-listing__theme-icon">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="36"
                        height="36"
                        src="/img/listing/logo_6-367e6aa4c3.svg"
                        alt="Курсы управления"
                      >
                    </div>
                  </div>
                  <div
                    class="s-listing__theme"
                    data-id="commerce"
                  >
                    <div class="s-listing__theme-title">
                      Курсы E-commerce
                    </div>
                    <div class="s-listing__theme-icon">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="36"
                        height="36"
                        src="/img/listing/logo_7-6a2b813167.svg"
                        alt="Курсы E-commerce"
                      >
                    </div>
                  </div>
                  <div
                    class="s-listing__theme"
                    data-id="analitiki"
                  >
                    <div class="s-listing__theme-title">
                      Курсы аналитики
                    </div>
                    <div class="s-listing__theme-icon">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="36"
                        height="36"
                        src="/img/listing/logo_8-3913b30fff.svg"
                        alt="Курсы аналитики"
                      >
                    </div>
                  </div>
                  <div
                    class="s-listing__theme"
                    data-id="lang"
                  >
                    <div class="s-listing__theme-title">
                      Курсы лингвистики
                    </div>
                    <div class="s-listing__theme-icon">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="36"
                        height="36"
                        src="/img/listing/logo_9-cb68efc646.svg"
                        alt="Курсы лингвистики"
                      >
                    </div>
                  </div>
                  <div
                    class="s-listing__theme"
                    data-id="psyho"
                  >
                    <div class="s-listing__theme-title">
                      Курсы психологии
                    </div>
                    <div class="s-listing__theme-icon">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="36"
                        height="36"
                        src="/img/listing/logo_10-6f3be37744.svg"
                        alt="Курсы психологии"
                      >
                    </div>
                  </div>
                  <div
                    class="s-listing__theme"
                    data-id="boost"
                  >
                    <div class="s-listing__theme-title">
                      Курсы саморазвития
                    </div>
                    <div class="s-listing__theme-icon">
                      <img
                        decoding="async"
                        loading="lazy"
                        width="36"
                        height="36"
                        src="/img/listing/logo_11-1c8aac2520.svg"
                        alt="Курсы саморазвития"
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="s-listing__wrappers">
                <div
                  id="marketing"
                  class="s-listing__wrapper"
                >
                  <div class="s-listing__program-title">
                    Интернет-маркетинг <span>16</span>
                  </div>
                  <div class="s-listing__content">
                    <div class="s-listing__preview">
                      <button class="s-listing__preview-name marketing active">
                        Организация продаж на Wildberries
                      </button>
                      <button class="s-listing__preview-name marketing ">
                        SMM-специалист
                      </button>
                      <button class="s-listing__preview-name marketing ">
                        Копирайтер
                      </button>
                      <button class="s-listing__preview-name marketing ">
                        Бренд-менеджер
                      </button>
                      <button class="s-listing__preview-name marketing ">
                        Интернет-маркетолог
                      </button>
                      <button class="s-listing__preview-name marketing ">
                        Менеджер по интернет-маркетингу во ВКонтакте
                      </button>
                      <button class="s-listing__preview-name marketing ">
                        Интернет-маркетолог PRO
                      </button>
                      <button class="s-listing__preview-name marketing ">
                        Как продавать на маркетплейсах
                      </button>
                      <button class="s-listing__preview-name marketing ">
                        Контекстная реклама
                      </button>
                      <button class="s-listing__preview-name marketing ">
                        SMM-маркетолог
                      </button>
                      <button class="s-listing__preview-name marketing ">
                        Интернет-маркетинг
                      </button>
                      <button class="s-listing__preview-name marketing ">
                        Контент-менеджер
                      </button>
                      <button class="s-listing__preview-name marketing ">
                        SEO-специалист
                      </button>
                      <button class="s-listing__preview-name marketing ">
                        Таргетолог
                      </button>
                      <button class="s-listing__preview-name marketing ">
                        Запуск интернет-магазина с нуля до прибыли
                      </button>
                      <button class="s-listing__preview-name marketing ">
                        Воронки продаж и чат-боты
                      </button>
                    </div>
                    <div class="s-listing__list">
                      <div class="s-listing__item course marketing active">
                        <div class="s-listing__item-tooltip">
                          Курсы интернет-маркетинга
                        </div>
                        <div class="s-listing__item-title">
                          Организация продаж на Wildberries
                        </div>
                        <div class="s-listing__item-description">
                          Научитесь добавлять товар на Wildberries, работать с контентом, продвигать товары,
                          анализировать цены конкурентов, выбирать поставщиков, управлять товарными остатками, оформлять
                          документы для отгрузки товаров и т.д.
                        </div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Организация продаж на Wildberries"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course marketing ">
                        <div class="s-listing__item-tooltip">
                          Курсы интернет-маркетинга
                        </div>
                        <div class="s-listing__item-title">
                          SMM-специалист
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="SMM-специалист"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course marketing ">
                        <div class="s-listing__item-tooltip">
                          Курсы интернет-маркетинга
                        </div>
                        <div class="s-listing__item-title">
                          Копирайтер
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Копирайтер"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course marketing ">
                        <div class="s-listing__item-tooltip">
                          Курсы интернет-маркетинга
                        </div>
                        <div class="s-listing__item-title">
                          Бренд-менеджер
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Бренд-менеджер"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course marketing ">
                        <div class="s-listing__item-tooltip">
                          Курсы интернет-маркетинга
                        </div>
                        <div class="s-listing__item-title">
                          Интернет-маркетолог
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Интернет-маркетолог"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course marketing ">
                        <div class="s-listing__item-tooltip">
                          Курсы интернет-маркетинга
                        </div>
                        <div class="s-listing__item-title">
                          Менеджер по интернет-маркетингу во ВКонтакте
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Менеджер по интернет-маркетингу во ВКонтакте"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course marketing ">
                        <div class="s-listing__item-tooltip">
                          Курсы интернет-маркетинга
                        </div>
                        <div class="s-listing__item-title">
                          Интернет-маркетолог PRO
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Интернет-маркетолог PRO"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course marketing ">
                        <div class="s-listing__item-tooltip">
                          Курсы интернет-маркетинга
                        </div>
                        <div class="s-listing__item-title">
                          Как продавать на маркетплейсах
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Как продавать на маркетплейсах"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course marketing ">
                        <div class="s-listing__item-tooltip">
                          Курсы интернет-маркетинга
                        </div>
                        <div class="s-listing__item-title">
                          Контекстная реклама
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Контекстная реклама"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course marketing ">
                        <div class="s-listing__item-tooltip">
                          Курсы интернет-маркетинга
                        </div>
                        <div class="s-listing__item-title">
                          SMM-маркетолог
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="SMM-маркетолог"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course marketing ">
                        <div class="s-listing__item-tooltip">
                          Курсы интернет-маркетинга
                        </div>
                        <div class="s-listing__item-title">
                          Интернет-маркетинг
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Интернет-маркетинг"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course marketing ">
                        <div class="s-listing__item-tooltip">
                          Курсы интернет-маркетинга
                        </div>
                        <div class="s-listing__item-title">
                          Контент-менеджер
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Контент-менеджер"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course marketing ">
                        <div class="s-listing__item-tooltip">
                          Курсы интернет-маркетинга
                        </div>
                        <div class="s-listing__item-title">
                          SEO-специалист
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="SEO-специалист"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course marketing ">
                        <div class="s-listing__item-tooltip">
                          Курсы интернет-маркетинга
                        </div>
                        <div class="s-listing__item-title">
                          Таргетолог
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Таргетолог"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course marketing ">
                        <div class="s-listing__item-tooltip">
                          Курсы интернет-маркетинга
                        </div>
                        <div class="s-listing__item-title">
                          Запуск интернет-магазина с нуля до прибыли
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Запуск интернет-магазина с нуля до прибыли"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course marketing ">
                        <div class="s-listing__item-tooltip">
                          Курсы интернет-маркетинга
                        </div>
                        <div class="s-listing__item-title">
                          Воронки продаж и чат-боты
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Воронки продаж и чат-боты"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="web"
                  class="s-listing__wrapper"
                >
                  <div class="s-listing__program-title">
                    Веб-разработка <span>5</span>
                  </div>
                  <div class="s-listing__content">
                    <div class="s-listing__preview">
                      <button class="s-listing__preview-name web active">
                        Backend-разработчик
                      </button>
                      <button class="s-listing__preview-name web ">
                        IOS-разработчик
                      </button>
                      <button class="s-listing__preview-name web ">
                        Android-разработчик
                      </button>
                      <button class="s-listing__preview-name web ">
                        Frontend-разработчик
                      </button>
                      <button class="s-listing__preview-name web ">
                        PHP для начинающих
                      </button>
                    </div>
                    <div class="s-listing__list">
                      <div class="s-listing__item course web active">
                        <div class="s-listing__item-tooltip">
                          Курсы веб-разработки
                        </div>
                        <div class="s-listing__item-title">
                          Backend-разработчик
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Backend-разработчик"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course web ">
                        <div class="s-listing__item-tooltip">
                          Курсы веб-разработки
                        </div>
                        <div class="s-listing__item-title">
                          IOS-разработчик
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="IOS-разработчик"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course web ">
                        <div class="s-listing__item-tooltip">
                          Курсы веб-разработки
                        </div>
                        <div class="s-listing__item-title">
                          Android-разработчик
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Android-разработчик"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course web ">
                        <div class="s-listing__item-tooltip">
                          Курсы веб-разработки
                        </div>
                        <div class="s-listing__item-title">
                          Frontend-разработчик
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Frontend-разработчик"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course web ">
                        <div class="s-listing__item-tooltip">
                          Курсы веб-разработки
                        </div>
                        <div class="s-listing__item-title">
                          PHP для начинающих
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="PHP для начинающих"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="prog"
                  class="s-listing__wrapper"
                >
                  <div class="s-listing__program-title">
                    Программирование <span>13</span>
                  </div>
                  <div class="s-listing__content">
                    <div class="s-listing__preview">
                      <button class="s-listing__preview-name prog active">
                        Java для начинающих
                      </button>
                      <button class="s-listing__preview-name prog ">
                        Java-разработчик
                      </button>
                      <button class="s-listing__preview-name prog ">
                        Python-разработчик
                      </button>
                      <button class="s-listing__preview-name prog ">
                        Основы верстки HTML и CSS
                      </button>
                      <button class="s-listing__preview-name prog ">
                        Разработчик на C++
                      </button>
                      <button class="s-listing__preview-name prog ">
                        JavaScript для начинающих
                      </button>
                      <button class="s-listing__preview-name prog ">
                        C++ для начинающих
                      </button>
                      <button class="s-listing__preview-name prog ">
                        PHP-разработчик
                      </button>
                      <button class="s-listing__preview-name prog ">
                        Разработка на C#
                      </button>
                      <button class="s-listing__preview-name prog ">
                        Основы баз данных и SQL
                      </button>
                      <button class="s-listing__preview-name prog ">
                        Python для начинающих
                      </button>
                      <button class="s-listing__preview-name prog ">
                        Программа двух дипломов. Разработка и применение прикладных программных решений
                      </button>
                      <button class="s-listing__preview-name prog ">
                        Fullstack-разработчик
                      </button>
                    </div>
                    <div class="s-listing__list">
                      <div class="s-listing__item course prog active">
                        <div class="s-listing__item-tooltip">
                          Курсы программирования
                        </div>
                        <div class="s-listing__item-title">
                          Java для начинающих
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Java для начинающих"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course prog ">
                        <div class="s-listing__item-tooltip">
                          Курсы программирования
                        </div>
                        <div class="s-listing__item-title">
                          Java-разработчик
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Java-разработчик"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course prog ">
                        <div class="s-listing__item-tooltip">
                          Курсы программирования
                        </div>
                        <div class="s-listing__item-title">
                          Python-разработчик
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Python-разработчик"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course prog ">
                        <div class="s-listing__item-tooltip">
                          Курсы программирования
                        </div>
                        <div class="s-listing__item-title">
                          Основы верстки HTML и CSS
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Основы верстки HTML и CSS"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course prog ">
                        <div class="s-listing__item-tooltip">
                          Курсы программирования
                        </div>
                        <div class="s-listing__item-title">
                          Разработчик на C++
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Разработчик на C++"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course prog ">
                        <div class="s-listing__item-tooltip">
                          Курсы программирования
                        </div>
                        <div class="s-listing__item-title">
                          JavaScript для начинающих
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="JavaScript для начинающих"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course prog ">
                        <div class="s-listing__item-tooltip">
                          Курсы программирования
                        </div>
                        <div class="s-listing__item-title">
                          C++ для начинающих
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="C++ для начинающих"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course prog ">
                        <div class="s-listing__item-tooltip">
                          Курсы программирования
                        </div>
                        <div class="s-listing__item-title">
                          PHP-разработчик
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="PHP-разработчик"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course prog ">
                        <div class="s-listing__item-tooltip">
                          Курсы программирования
                        </div>
                        <div class="s-listing__item-title">
                          Разработка на C#
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Разработка на C#"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course prog ">
                        <div class="s-listing__item-tooltip">
                          Курсы программирования
                        </div>
                        <div class="s-listing__item-title">
                          Основы баз данных и SQL
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Основы баз данных и SQL"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course prog ">
                        <div class="s-listing__item-tooltip">
                          Курсы программирования
                        </div>
                        <div class="s-listing__item-title">
                          Python для начинающих
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Python для начинающих"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course prog ">
                        <div class="s-listing__item-tooltip">
                          Курсы программирования
                        </div>
                        <div class="s-listing__item-title">
                          Программа двух дипломов. Разработка и применение прикладных программных решений
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Программа двух дипломов. Разработка и применение прикладных программных решений"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course prog ">
                        <div class="s-listing__item-tooltip">
                          Курсы программирования
                        </div>
                        <div class="s-listing__item-title">
                          Fullstack-разработчик
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Fullstack-разработчик"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="design"
                  class="s-listing__wrapper"
                >
                  <div class="s-listing__program-title">
                    Дизайн <span>12</span>
                  </div>
                  <div class="s-listing__content">
                    <div class="s-listing__preview">
                      <button class="s-listing__preview-name design active">
                        Ландшафтный дизайн
                      </button>
                      <button class="s-listing__preview-name design ">
                        Графический дизайнер
                      </button>
                      <button class="s-listing__preview-name design ">
                        Веб-дизайнер
                      </button>
                      <button class="s-listing__preview-name design ">
                        Дизайн интерьера. Профессиональный курс
                      </button>
                      <button class="s-listing__preview-name design ">
                        UX-дизайн с 0 до PRO
                      </button>
                      <button class="s-listing__preview-name design ">
                        Web-дизайн с 0 до PRO
                      </button>
                      <button class="s-listing__preview-name design ">
                        UX/UI-дизайнер
                      </button>
                      <button class="s-listing__preview-name design ">
                        Дизайнер интерьеров
                      </button>
                      <button class="s-listing__preview-name design ">
                        Авторский курс по дизайну интерьера
                      </button>
                      <button class="s-listing__preview-name design ">
                        Дизайнер интерьеров с 0 до PRO
                      </button>
                      <button class="s-listing__preview-name design ">
                        Графический дизайн с 0 до PRO
                      </button>
                      <button class="s-listing__preview-name design ">
                        Программа двух дипломов. Графический дизайн
                      </button>
                    </div>
                    <div class="s-listing__list">
                      <div class="s-listing__item course design active">
                        <div class="s-listing__item-tooltip">
                          Курсы дизайна
                        </div>
                        <div class="s-listing__item-title">
                          Ландшафтный дизайн
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Ландшафтный дизайн"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course design ">
                        <div class="s-listing__item-tooltip">
                          Курсы дизайна
                        </div>
                        <div class="s-listing__item-title">
                          Графический дизайнер
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Графический дизайнер"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course design ">
                        <div class="s-listing__item-tooltip">
                          Курсы дизайна
                        </div>
                        <div class="s-listing__item-title">
                          Веб-дизайнер
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Веб-дизайнер"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course design ">
                        <div class="s-listing__item-tooltip">
                          Курсы дизайна
                        </div>
                        <div class="s-listing__item-title">
                          Дизайн интерьера. Профессиональный курс
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Дизайн интерьера. Профессиональный курс"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course design ">
                        <div class="s-listing__item-tooltip">
                          Курсы дизайна
                        </div>
                        <div class="s-listing__item-title">
                          UX-дизайн с 0 до PRO
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="UX-дизайн с 0 до PRO"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course design ">
                        <div class="s-listing__item-tooltip">
                          Курсы дизайна
                        </div>
                        <div class="s-listing__item-title">
                          Web-дизайн с 0 до PRO
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Web-дизайн с 0 до PRO"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course design ">
                        <div class="s-listing__item-tooltip">
                          Курсы дизайна
                        </div>
                        <div class="s-listing__item-title">
                          UX/UI-дизайнер
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="UX/UI-дизайнер"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course design ">
                        <div class="s-listing__item-tooltip">
                          Курсы дизайна
                        </div>
                        <div class="s-listing__item-title">
                          Дизайнер интерьеров
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Дизайнер интерьеров"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course design ">
                        <div class="s-listing__item-tooltip">
                          Курсы дизайна
                        </div>
                        <div class="s-listing__item-title">
                          Авторский курс по дизайну интерьера
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Авторский курс по дизайну интерьера"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course design ">
                        <div class="s-listing__item-tooltip">
                          Курсы дизайна
                        </div>
                        <div class="s-listing__item-title">
                          Дизайнер интерьеров с 0 до PRO
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Дизайнер интерьеров с 0 до PRO"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course design ">
                        <div class="s-listing__item-tooltip">
                          Курсы дизайна
                        </div>
                        <div class="s-listing__item-title">
                          Графический дизайн с 0 до PRO
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Графический дизайн с 0 до PRO"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course design ">
                        <div class="s-listing__item-tooltip">
                          Курсы дизайна
                        </div>
                        <div class="s-listing__item-title">
                          Программа двух дипломов. Графический дизайн
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Программа двух дипломов. Графический дизайн"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="game"
                  class="s-listing__wrapper"
                >
                  <div class="s-listing__program-title">
                    Курсы геймдизайна <span>16</span>
                  </div>
                  <div class="s-listing__content">
                    <div class="s-listing__preview">
                      <button class="s-listing__preview-name game active">
                        3D-моделлер
                      </button>
                      <button class="s-listing__preview-name game ">
                        Геймдизайнер
                      </button>
                      <button class="s-listing__preview-name game ">
                        Ableton Live с 0 до PRO
                      </button>
                      <button class="s-listing__preview-name game ">
                        Мобильные игры с 0 до PRO
                      </button>
                      <button class="s-listing__preview-name game ">
                        Разработчик мобильных игр на Unity
                      </button>
                      <button class="s-listing__preview-name game ">
                        Геймдизайнер в Unity
                      </button>
                      <button class="s-listing__preview-name game ">
                        Мобильная игра за 24 часа
                      </button>
                      <button class="s-listing__preview-name game ">
                        Unity разработка с 0 до PRO
                      </button>
                      <button class="s-listing__preview-name game ">
                        Дизайнер персонажей
                      </button>
                      <button class="s-listing__preview-name game ">
                        Разработчик игр на Unity
                      </button>
                      <button class="s-listing__preview-name game ">
                        Разработчик на C#
                      </button>
                      <button class="s-listing__preview-name game ">
                        Геймдизайнер в Unreal Engine 5
                      </button>
                      <button class="s-listing__preview-name game ">
                        3D-моделирование с 0 до PRO
                      </button>
                      <button class="s-listing__preview-name game ">
                        Геймдизайн с 0 до PRO
                      </button>
                      <button class="s-listing__preview-name game ">
                        Дизайн персонажей с 0 до PRO
                      </button>
                      <button class="s-listing__preview-name game ">
                        Разработчик настольных игр PRO
                      </button>
                    </div>
                    <div class="s-listing__list">
                      <div class="s-listing__item course game active">
                        <div class="s-listing__item-tooltip">
                          Курсы геймдизайна
                        </div>
                        <div class="s-listing__item-title">
                          3D-моделлер
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="3D-моделлер"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course game ">
                        <div class="s-listing__item-tooltip">
                          Курсы геймдизайна
                        </div>
                        <div class="s-listing__item-title">
                          Геймдизайнер
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Геймдизайнер"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course game ">
                        <div class="s-listing__item-tooltip">
                          Курсы геймдизайна
                        </div>
                        <div class="s-listing__item-title">
                          Ableton Live с 0 до PRO
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Ableton Live с 0 до PRO"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course game ">
                        <div class="s-listing__item-tooltip">
                          Курсы геймдизайна
                        </div>
                        <div class="s-listing__item-title">
                          Мобильные игры с 0 до PRO
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Мобильные игры с 0 до PRO"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course game ">
                        <div class="s-listing__item-tooltip">
                          Курсы геймдизайна
                        </div>
                        <div class="s-listing__item-title">
                          Разработчик мобильных игр на Unity
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Разработчик мобильных игр на Unity"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course game ">
                        <div class="s-listing__item-tooltip">
                          Курсы геймдизайна
                        </div>
                        <div class="s-listing__item-title">
                          Геймдизайнер в Unity
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Геймдизайнер в Unity"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course game ">
                        <div class="s-listing__item-tooltip">
                          Курсы геймдизайна
                        </div>
                        <div class="s-listing__item-title">
                          Мобильная игра за 24 часа
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Мобильная игра за 24 часа"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course game ">
                        <div class="s-listing__item-tooltip">
                          Курсы геймдизайна
                        </div>
                        <div class="s-listing__item-title">
                          Unity разработка с 0 до PRO
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Unity разработка с 0 до PRO"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course game ">
                        <div class="s-listing__item-tooltip">
                          Курсы геймдизайна
                        </div>
                        <div class="s-listing__item-title">
                          Дизайнер персонажей
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Дизайнер персонажей"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course game ">
                        <div class="s-listing__item-tooltip">
                          Курсы геймдизайна
                        </div>
                        <div class="s-listing__item-title">
                          Разработчик игр на Unity
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Разработчик игр на Unity"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course game ">
                        <div class="s-listing__item-tooltip">
                          Курсы геймдизайна
                        </div>
                        <div class="s-listing__item-title">
                          Разработчик на C#
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Разработчик на C#"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course game ">
                        <div class="s-listing__item-tooltip">
                          Курсы геймдизайна
                        </div>
                        <div class="s-listing__item-title">
                          Геймдизайнер в Unreal Engine 5
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Геймдизайнер в Unreal Engine 5"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course game ">
                        <div class="s-listing__item-tooltip">
                          Курсы геймдизайна
                        </div>
                        <div class="s-listing__item-title">
                          3D-моделирование с 0 до PRO
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="3D-моделирование с 0 до PRO"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course game ">
                        <div class="s-listing__item-tooltip">
                          Курсы геймдизайна
                        </div>
                        <div class="s-listing__item-title">
                          Геймдизайн с 0 до PRO
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Геймдизайн с 0 до PRO"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course game ">
                        <div class="s-listing__item-tooltip">
                          Курсы геймдизайна
                        </div>
                        <div class="s-listing__item-title">
                          Дизайн персонажей с 0 до PRO
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Дизайн персонажей с 0 до PRO"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course game ">
                        <div class="s-listing__item-tooltip">
                          Курсы геймдизайна
                        </div>
                        <div class="s-listing__item-title">
                          Разработчик настольных игр PRO
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Разработчик настольных игр PRO"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="control"
                  class="s-listing__wrapper"
                >
                  <div class="s-listing__program-title">
                    Курсы управления <span>6</span>
                  </div>
                  <div class="s-listing__content">
                    <div class="s-listing__preview">
                      <button class="s-listing__preview-name control active">
                        Финансовый директор
                      </button>
                      <button class="s-listing__preview-name control ">
                        Управляющий онлайн-школой
                      </button>
                      <button class="s-listing__preview-name control ">
                        Start-up в ресторанном бизнесе
                      </button>
                      <button class="s-listing__preview-name control ">
                        Менеджер по управлению персоналом
                      </button>
                      <button class="s-listing__preview-name control ">
                        Менеджмент в гостиничном и ресторанном бизнесе
                      </button>
                      <button class="s-listing__preview-name control ">
                        Программа двух дипломов. Инструменты менеджмента в ресторанном и гостиничном бизнесе
                      </button>
                    </div>
                    <div class="s-listing__list">
                      <div class="s-listing__item course control active">
                        <div class="s-listing__item-tooltip">
                          Курсы управления
                        </div>
                        <div class="s-listing__item-title">
                          Финансовый директор
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Финансовый директор"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course control ">
                        <div class="s-listing__item-tooltip">
                          Курсы управления
                        </div>
                        <div class="s-listing__item-title">
                          Управляющий онлайн-школой
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Управляющий онлайн-школой"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course control ">
                        <div class="s-listing__item-tooltip">
                          Курсы управления
                        </div>
                        <div class="s-listing__item-title">
                          Start-up в ресторанном бизнесе
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Start-up в ресторанном бизнесе"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course control ">
                        <div class="s-listing__item-tooltip">
                          Курсы управления
                        </div>
                        <div class="s-listing__item-title">
                          Менеджер по управлению персоналом
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Менеджер по управлению персоналом"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course control ">
                        <div class="s-listing__item-tooltip">
                          Курсы управления
                        </div>
                        <div class="s-listing__item-title">
                          Менеджмент в гостиничном и ресторанном бизнесе
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Менеджмент в гостиничном и ресторанном бизнесе"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course control ">
                        <div class="s-listing__item-tooltip">
                          Курсы управления
                        </div>
                        <div class="s-listing__item-title">
                          Программа двух дипломов. Инструменты менеджмента в ресторанном и гостиничном бизнесе
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Программа двух дипломов. Инструменты менеджмента в ресторанном и гостиничном бизнесе"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="commerce"
                  class="s-listing__wrapper"
                >
                  <div class="s-listing__program-title">
                    Курсы E-commerce <span>6</span>
                  </div>
                  <div class="s-listing__content">
                    <div class="s-listing__preview">
                      <button class="s-listing__preview-name commerce active">
                        E-commerce-директор
                      </button>
                      <button class="s-listing__preview-name commerce ">
                        Интернет-маркетолог в e-commerce
                      </button>
                      <button class="s-listing__preview-name commerce ">
                        Руководитель направления e-commerce
                      </button>
                      <button class="s-listing__preview-name commerce ">
                        Менеджер по работе с маркетплейсами
                      </button>
                      <button class="s-listing__preview-name commerce ">
                        Руководитель интернет-магазина
                      </button>
                      <button class="s-listing__preview-name commerce ">
                        Внедрение ERP-системы в e-commerce
                      </button>
                    </div>
                    <div class="s-listing__list">
                      <div class="s-listing__item course commerce active">
                        <div class="s-listing__item-tooltip">
                          Курсы E-commerce
                        </div>
                        <div class="s-listing__item-title">
                          E-commerce-директор
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="E-commerce-директор"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course commerce ">
                        <div class="s-listing__item-tooltip">
                          Курсы E-commerce
                        </div>
                        <div class="s-listing__item-title">
                          Интернет-маркетолог в e-commerce
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Интернет-маркетолог в e-commerce"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course commerce ">
                        <div class="s-listing__item-tooltip">
                          Курсы E-commerce
                        </div>
                        <div class="s-listing__item-title">
                          Руководитель направления e-commerce
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Руководитель направления e-commerce"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course commerce ">
                        <div class="s-listing__item-tooltip">
                          Курсы E-commerce
                        </div>
                        <div class="s-listing__item-title">
                          Менеджер по работе с маркетплейсами
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Менеджер по работе с маркетплейсами"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course commerce ">
                        <div class="s-listing__item-tooltip">
                          Курсы E-commerce
                        </div>
                        <div class="s-listing__item-title">
                          Руководитель интернет-магазина
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Руководитель интернет-магазина"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course commerce ">
                        <div class="s-listing__item-tooltip">
                          Курсы E-commerce
                        </div>
                        <div class="s-listing__item-title">
                          Внедрение ERP-системы в e-commerce
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Внедрение ERP-системы в e-commerce"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="analitiki"
                  class="s-listing__wrapper"
                >
                  <div class="s-listing__program-title">
                    Курсы аналитики <span>2</span>
                  </div>
                  <div class="s-listing__content">
                    <div class="s-listing__preview">
                      <button class="s-listing__preview-name analitiki active">
                        Аналитик данных
                      </button>
                      <button class="s-listing__preview-name analitiki ">
                        Финансовый аналитик
                      </button>
                    </div>
                    <div class="s-listing__list">
                      <div class="s-listing__item course analitiki active">
                        <div class="s-listing__item-tooltip">
                          Курсы аналитики
                        </div>
                        <div class="s-listing__item-title">
                          Аналитик данных
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Аналитик данных"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course analitiki ">
                        <div class="s-listing__item-tooltip">
                          Курсы аналитики
                        </div>
                        <div class="s-listing__item-title">
                          Финансовый аналитик
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Финансовый аналитик"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="lang"
                  class="s-listing__wrapper"
                >
                  <div class="s-listing__program-title">
                    Курсы лингвистики <span>5</span>
                  </div>
                  <div class="s-listing__content">
                    <div class="s-listing__preview">
                      <button class="s-listing__preview-name lang active">
                        Переводчик в сфере профессиональной коммуникации (английский язык)
                      </button>
                      <button class="s-listing__preview-name lang ">
                        Преподавание иностранного языка в образовательных организациях (английский язык)
                      </button>
                      <button class="s-listing__preview-name lang ">
                        Преподаватель иностранного языка (английский язык) в образовательных организациях
                      </button>
                      <button class="s-listing__preview-name lang ">
                        Переводчик в сфере профессиональной коммуникации (китайский язык)
                      </button>
                      <button class="s-listing__preview-name lang ">
                        Подготовка к HSK (китайский язык)
                      </button>
                    </div>
                    <div class="s-listing__list">
                      <div class="s-listing__item course lang active">
                        <div class="s-listing__item-tooltip">
                          Курсы лингвистики
                        </div>
                        <div class="s-listing__item-title">
                          Переводчик в сфере профессиональной коммуникации (английский язык)
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Переводчик в сфере профессиональной коммуникации (английский язык)"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course lang ">
                        <div class="s-listing__item-tooltip">
                          Курсы лингвистики
                        </div>
                        <div class="s-listing__item-title">
                          Преподавание иностранного языка в образовательных организациях (английский язык)
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Преподавание иностранного языка в образовательных организациях (английский язык)"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course lang ">
                        <div class="s-listing__item-tooltip">
                          Курсы лингвистики
                        </div>
                        <div class="s-listing__item-title">
                          Преподаватель иностранного языка (английский язык) в образовательных организациях
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Преподаватель иностранного языка (английский язык) в образовательных организациях"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course lang ">
                        <div class="s-listing__item-tooltip">
                          Курсы лингвистики
                        </div>
                        <div class="s-listing__item-title">
                          Переводчик в сфере профессиональной коммуникации (китайский язык)
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Переводчик в сфере профессиональной коммуникации (китайский язык)"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course lang ">
                        <div class="s-listing__item-tooltip">
                          Курсы лингвистики
                        </div>
                        <div class="s-listing__item-title">
                          Подготовка к HSK (китайский язык)
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Подготовка к HSK (китайский язык)"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="psyho"
                  class="s-listing__wrapper"
                >
                  <div class="s-listing__program-title">
                    Курсы психологии <span>6</span>
                  </div>
                  <div class="s-listing__content">
                    <div class="s-listing__preview">
                      <button class="s-listing__preview-name psyho active">
                        Коучинг: от новичка до профессионала
                      </button>
                      <button class="s-listing__preview-name psyho ">
                        Психология детекции лжи
                      </button>
                      <button class="s-listing__preview-name psyho ">
                        Психология детекции лжи с личным сопровождением автора
                      </button>
                      <button class="s-listing__preview-name psyho ">
                        Бизнес-коучинг
                      </button>
                      <button class="s-listing__preview-name psyho ">
                        Осознанный родитель (с личным сопровождением автора)
                      </button>
                      <button class="s-listing__preview-name psyho ">
                        Семейная психология
                      </button>
                    </div>
                    <div class="s-listing__list">
                      <div class="s-listing__item course psyho active">
                        <div class="s-listing__item-tooltip">
                          Курсы психологии
                        </div>
                        <div class="s-listing__item-title">
                          Коучинг: от новичка до профессионала
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Коучинг: от новичка до профессионала"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course psyho ">
                        <div class="s-listing__item-tooltip">
                          Курсы психологии
                        </div>
                        <div class="s-listing__item-title">
                          Психология детекции лжи
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Психология детекции лжи"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course psyho ">
                        <div class="s-listing__item-tooltip">
                          Курсы психологии
                        </div>
                        <div class="s-listing__item-title">
                          Психология детекции лжи с личным сопровождением автора
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Психология детекции лжи с личным сопровождением автора"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course psyho ">
                        <div class="s-listing__item-tooltip">
                          Курсы психологии
                        </div>
                        <div class="s-listing__item-title">
                          Бизнес-коучинг
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Бизнес-коучинг"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course psyho ">
                        <div class="s-listing__item-tooltip">
                          Курсы психологии
                        </div>
                        <div class="s-listing__item-title">
                          Осознанный родитель (с личным сопровождением автора)
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Осознанный родитель (с личным сопровождением автора)"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course psyho ">
                        <div class="s-listing__item-tooltip">
                          Курсы психологии
                        </div>
                        <div class="s-listing__item-title">
                          Семейная психология
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Семейная психология"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="boost"
                  class="s-listing__wrapper"
                >
                  <div class="s-listing__program-title">
                    Курсы саморазвития <span>3</span>
                  </div>
                  <div class="s-listing__content">
                    <div class="s-listing__preview">
                      <button class="s-listing__preview-name boost active">
                        Актерское мастерство
                      </button>
                      <button class="s-listing__preview-name boost ">
                        Продюсирование
                      </button>
                      <button class="s-listing__preview-name boost ">
                        Менеджмент музыкальной индустрии
                      </button>
                    </div>
                    <div class="s-listing__list">
                      <div class="s-listing__item course boost active">
                        <div class="s-listing__item-tooltip">
                          Курсы саморазвития
                        </div>
                        <div class="s-listing__item-title">
                          Актерское мастерство
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Актерское мастерство"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course boost ">
                        <div class="s-listing__item-tooltip">
                          Курсы саморазвития
                        </div>
                        <div class="s-listing__item-title">
                          Продюсирование
                        </div>
                        <div class="s-listing__item-description">&nbsp;</div>
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Продюсирование"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                      <div class="s-listing__item course boost ">
                        <div class="s-listing__item-tooltip">
                          Курсы саморазвития
                        </div>
                        <div class="s-listing__item-title">
                          Менеджмент музыкальной индустрии
                        </div>
                        <div class="s-listing__item-description" />
                        <a
                          href="#popup__form_redesign-course"
                          data-type="course"
                          class="s-listing__item-btn"
                          data_formtype="get_program"
                          data-program-name="Менеджмент музыкальной индустрии"
                          data-program-title="Курсы"
                        >
                          Хочу поступить </a>
                        <div class="s-listing__item-arrow">
                          <img
                            decoding="async"
                            loading="lazy"
                            width="57"
                            height="108"
                            src="/img/listing/arrow-e84ed11077.svg"
                            alt=""
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="s-main">
        <div class="l-default">
          <div class="s-main__conatainer consule">
            <div class="s-main__wrapper">
              <h2 class="s-main__title title--h1 consule">
                <span>
                  Получите консультацию
                </span>
                <br>
                по факультетам, проходным баллам и&nbsp;возможным скидкам
              </h2>
              <p class="s-main__subtitle consule">
                Вы узнаете список факультетов, проходные баллы, перечень изучаемых дисциплин, информацию по
                трудоустройству и прохождению практики
              </p>
            </div>
            <form
              action="https://example.com/lander.php?r=land/index&type=univer&graccount=demo&land=example.com&form=get_consultation&unit=demo&version=priemnaya_komissiya_v2&alias=priemnaya_komissiya"
              class="s-main__form"
              novalidate="novalidate"
            >
              <input
                class="s-main__input"
                type="text"
                name="phone"
                placeholder="Ваш телефон"
                inputmode="tel"
                data-inputmask="'mask': '+9 999 999 99 99[9]', 'showMaskOnHover': false, 'showMaskOnFocus': false"
              >
              <button
                class="s-main__submit btn"
                type="submit"
              >
                Отправить заявку
              </button>
              <label for="checked-main-v2">
                <input
                  id="checked-main-v2"
                  type="checkbox"
                  checked=""
                >
                <span>
                  Даю согласие на обработку персональных данных и соглашаюсь <a
                    :href="PRIVACY"
                    target="_blank"
                  > с политикой
                    конфиденциальности</a>.
                </span>
              </label>
            </form>
          </div>
        </div>
      </section>

      <section class="s-synergy l-default">
        <div class="s-synergy__container">
          <div class="s-synergy__img">
            <picture>
              <source
                srcset="/img/demo-section/back-lg-58cafa35fe.webp"
                media="(min-width: 1200px)"
              >
              <source
                srcset="/img/demo-section/back-md-ad424a9d80.webp"
                media="(min-width: 768px)"
              >
              <img
                decoding="async"
                loading="lazy"
                width="344"
                height="240"
                src="/img/demo-section/back-sm-262ab98379.webp"
                alt="demo"
              >
            </picture>
          </div>
          <h2 class="s-synergy__title h2--title">
            Демо-вуз — это
          </h2>
          <div class="s-synergy__content">
            <div class="s-synergy__item">
              <p class="s-synergy__text">
                Государственная <br>аккредитация
              </p>
              <img
                decoding="async"
                loading="lazy"
                width="29"
                height="29"
                src="/img/demo-section/1-42ad141a15.svg"
                alt=""
                class="s-synergy__logo"
              >
            </div>
            <div class="s-synergy__item">
              <p class="s-synergy__text">
                Поступление <br>круглый год
              </p>
              <img
                decoding="async"
                loading="lazy"
                width="29"
                height="29"
                src="/img/demo-section/2-176c60d8a7.svg"
                alt=""
                class="s-synergy__logo"
              >
            </div>
            <div class="s-synergy__item">
              <p class="s-synergy__text">
                Отсрочка <br>от армии
              </p>
              <img
                decoding="async"
                loading="lazy"
                width="29"
                height="29"
                src="/img/demo-section/3-57cd353a70.svg"
                alt=""
                class="s-synergy__logo"
              >
            </div>
            <div class="s-synergy__item">
              <p class="s-synergy__text">
                Прием после 9 и 11 <br>классов
              </p>
              <img
                decoding="async"
                loading="lazy"
                width="29"
                height="29"
                src="/img/demo-section/4-6c2be705b9.svg"
                alt=""
                class="s-synergy__logo"
              >
            </div>
            <div class="s-synergy__item span">
              <p class="s-synergy__text">
                Колледж, бакалавриат, магистратура,<br> аспирантура
              </p>
              <img
                decoding="async"
                loading="lazy"
                width="29"
                height="29"
                src="/img/demo-section/5-fa5dc80c8d.svg"
                alt=""
                class="s-synergy__logo"
              >
            </div>
            <div class="s-synergy__item">
              <p class="s-synergy__text">
                Очно, заочно, <br>дистанционно
              </p>
              <img
                decoding="async"
                loading="lazy"
                width="29"
                height="29"
                src="/img/demo-section/6-3832a947e2.svg"
                alt=""
                class="s-synergy__logo"
              >
            </div>
            <div class="s-synergy__item">
              <p class="s-synergy__text">
                Общежитие
              </p>
              <img
                decoding="async"
                loading="lazy"
                width="29"
                height="29"
                src="/img/demo-section/7-ebf42d151a.svg"
                alt=""
                class="s-synergy__logo"
              >
            </div>
            <div class="s-synergy__item md">
              <p class="s-synergy__text">
                Гранты <br> на обучение
              </p>
              <img
                decoding="async"
                loading="lazy"
                width="29"
                height="29"
                src="/img/demo-section/9-41a0c0948d.svg"
                alt=""
                class="s-synergy__logo"
              >
            </div>
            <div class="s-synergy__item md">
              <p class="s-synergy__text">
                Перевод из других<br> вузов без потери<br> курса
              </p>
              <img
                decoding="async"
                loading="lazy"
                width="29"
                height="29"
                src="/img/demo-section/10-15f30045b2.svg"
                alt=""
                class="s-synergy__logo"
              >
            </div>
            <div class="s-synergy__item span">
              <p class="s-synergy__text">
                Трудоустройство <br>студентов и <br>выпускников
              </p>
              <img
                decoding="async"
                loading="lazy"
                width="29"
                height="29"
                src="/img/demo-section/8-399a538f32.svg"
                alt=""
                class="s-synergy__logo"
              >
            </div>
            <div class="s-synergy__item sm">
              <p class="s-synergy__text">
                Гранты <br> на обучение
              </p>
              <img
                decoding="async"
                loading="lazy"
                width="29"
                height="29"
                src="/img/demo-section/9-41a0c0948d.svg"
                alt=""
                class="s-synergy__logo"
              >
            </div>
            <div class="s-synergy__item sm">
              <p class="s-synergy__text">
                Перевод из других<br> вузов без потери<br> курса
              </p>
              <img
                decoding="async"
                loading="lazy"
                width="29"
                height="29"
                src="/img/demo-section/10-15f30045b2.svg"
                alt=""
                class="s-synergy__logo"
              >
            </div>
            <div class="s-synergy__item sm">
              <p class="s-synergy__text">
                Прием <br>иностранных<br> граждан
              </p>
              <img
                decoding="async"
                loading="lazy"
                width="29"
                height="29"
                src="/img/demo-section/11-b6b0f7dfaf.svg"
                alt=""
                class="s-synergy__logo"
              >
            </div>
            <div class="s-synergy__item sm">
              <p class="s-synergy__text">
                Совмещение<br> работы и учебы
              </p>
              <img
                decoding="async"
                loading="lazy"
                width="29"
                height="29"
                src="/img/demo-section/12-47f143aa54.svg"
                alt=""
                class="s-synergy__logo"
              >
            </div>
            <div class="s-synergy__item span">
              <p class="s-synergy__text">
                Входит в топ-3 лучших вузов России<br> по версии hh.ru
              </p>
              <img
                decoding="async"
                loading="lazy"
                width="29"
                height="29"
                src="/img/demo-section/13-4185bcaaed.svg"
                alt=""
                class="s-synergy__logo"
              >
            </div>
            <div class="s-synergy__item md">
              <p class="s-synergy__text">
                Прием <br>иностранных<br> граждан
              </p>
              <img
                decoding="async"
                loading="lazy"
                width="29"
                height="29"
                src="/img/demo-section/11-b6b0f7dfaf.svg"
                alt=""
                class="s-synergy__logo"
              >
            </div>
            <div class="s-synergy__item md">
              <p class="s-synergy__text">
                Совмещение<br> работы и учебы
              </p>
              <img
                decoding="async"
                loading="lazy"
                width="29"
                height="29"
                src="/img/demo-section/12-47f143aa54.svg"
                alt=""
                class="s-synergy__logo"
              >
            </div>
          </div>
        </div>
      </section>

      <section class="s-main">
        <div class="l-default">
          <div class="s-main__conatainer center">
            <div class="s-main__wrapper">
              <h2 class="s-main__title title--h1 center">
                Центр
                <br>
                <span>
                  трудоустройства
                </span>
                <br>
                студентов.
              </h2>
              <p class="s-main__subtitle center">
                С 2004 года в нашем Университете работает Центр трудоустройства, который помогает студентам и
                выпускникам правильно составить резюме, пройти собеседование и получить престижную работу в крупных
                компаниях.
                <br>
                <br>
                Наши компании-партнеры принимают участие в разработке учебных планов образовательных программ,
                организуют стажировки и практику для студентов
              </p>
            </div>
            <form
              action="https://example.com/lander.php?r=land/index&type=univer&graccount=demo&land=example.com&form=employment_center&unit=demo&version=priemnaya_komissiya_v2&alias=priemnaya_komissiya"
              class="s-main__form"
              novalidate="novalidate"
            >
              <input
                class="s-main__input"
                type="text"
                name="phone"
                placeholder="Ваш телефон"
                inputmode="tel"
                data-inputmask="'mask': '+9 999 999 99 99[9]', 'showMaskOnHover': false, 'showMaskOnFocus': false"
              >
              <button
                class="s-main__submit btn"
                type="submit"
              >
                Отправить заявку
              </button>
              <label for="checked-main-v3">
                <input
                  id="checked-main-v3"
                  type="checkbox"
                  checked=""
                  name="personalDataAgree"
                >
                <span>
                  Я даю согласие на обработку персональных данных, согласен на получение информационных рассылок от
                  демо-вуза и соглашаюсь c политикой конфиденциальности
                </span>
              </label>
              <div class="widget-form-privacy">
                <div class="widget-form-privacy__content">
                  <input
                    type="checkbox"
                    name="personalDataAgree"
                    checked=""
                    class="widget-form-privacy__checkbox"
                  ><label class="widget-form-privacy__label">Я&nbsp;даю согласие
                    на&nbsp;обработку персональных данных, согласен на&nbsp;получение информационных рассылок
                    от&nbsp;демо-вуза и&nbsp;соглашаюсь c&nbsp;<a
                      :href="PRIVACY"
                      target="_blank"
                      class="widget-form-privacy__link"
                    >политикой конфиденциальности</a>.</label>
                </div>
                <div class="widget-form-privacy__content">
                  <input
                    type="checkbox"
                    name="publicOffer"
                    checked=""
                    class="widget-form-privacy__checkbox"
                  ><label class="widget-form-privacy__label">Оплачивая, вы
                    соглашаетесь с условиями публичной оферты</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>


      <section class="s-main --main-frame">
        <div class="l-default">
          <div class="s-main__conatainer">
            <div class="s-main__wrapper">
              <h2 class="s-main__title title--h1">
                Демо-вуз
                <br>
                <span>
                  Приёмная комиссия
                </span>
                <br>
                Поступи прямо сейчас
              </h2>
              <p class="s-main__subtitle small">
                Узнай минимальный проходной балл <br>в 2025 году, оставив заявку
              </p>
            </div>
            <form
              action="https://example.com/lander.php?r=land/index&type=univer&graccount=demo&land=example.com&form=main_form_bottom&unit=demo&version=priemnaya_komissiya_v2&alias=priemnaya_komissiya"
              class="s-main__form"
              novalidate="novalidate"
            >
              <input
                class="s-main__input"
                type="text"
                name="phone"
                placeholder="Ваш телефон"
                inputmode="tel"
                data-inputmask="'mask': '+9 999 999 99 99[9]', 'showMaskOnHover': false, 'showMaskOnFocus': false"
              >
              <button
                class="s-main__submit btn"
                type="submit"
              >
                Отправить заявку
              </button>
              <label for="checked-main">
                <input
                  id="checked-main"
                  type="checkbox"
                  checked=""
                  name="personalDataAgree"
                >
                <span>
                  Даю согласие на обработку персональных данных и соглашаюсь<a
                    :href="PRIVACY"
                    target="_blank"
                  > с политикой
                    конфиденциальности</a>.
                </span>
              </label>
            </form>
          </div>
        </div>
      </section>
    </main>

    <div class="popup">
      <SPriemnayaKomissiyaModal />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SPriemnayaKomissiyaTest.scss';
</style>
