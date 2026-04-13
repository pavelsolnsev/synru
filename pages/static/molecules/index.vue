<template>
  <div>
    <MSection>
      <h1>Molecules</h1>
    </MSection>

    <MSection
      title="MArticleCard"
      nums="1"
    >
      <div class="simple-wrapper">
        <MArticleCard
          to="/"
          :image="synergyApi('uploads/content/events/event2.webp')"
          tag="Мероприятия"
          text="Факультет дизайна и&nbsp;рекламы проведет научные дискуссии по&nbsp;креативной экономике на&nbsp;«Финатлон форуме»"
          date=" 25 сентября 2024"
          style="width: 400px;"
          title="Заголовок"
        />
      </div>
    </MSection>

    <MSection
      title="MAccordion"
      nums="2"
    >
      <div
        class="simple-wrapper"
        style="width: 50%"
      >
        <h4 style="margin: 24px 0;">Single Open</h4>
        <MAccordion :items="accordionItems" />
      </div>

      <div
        class="simple-wrapper"
        style="width: 50%"
      >
        <h4 style="margin: 24px 0;">Multiple Open</h4>
        <MAccordion
          :items="accordionItemsMultiple"
          :multiple-open="true"
        />
      </div>
    </MSection>

    <MSection
      title="MAppLinks"
      nums="3"
    >
      <div
        class="simple-wrapper"
        style="width: 50%"
      >
        <MAppLinks
          :title="`App links title`"
          :app-links
        />
      </div>
    </MSection>

    <MSection
      title="MArticlesSlider"
      nums="4"
    >
      <MArticlesSlider
        :articles="[
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
        ]"
        title-class="a-font_xl"
      />
    </MSection>

    <MSection
      title="MBannerCard"
      nums="5"
    >
      <div
        class="simple-wrapper"
        style="width: 50%"
      >
        <MBannerCard
          title="Заголовок Баннера"
          :img="MBannerCardImage"
          :img-lg="MBannerCardImageLg"
          :img-md="MBannerCardImageMd"
          title-class-name="a-font_h5"
          subtitle="Подзаголовок"
          :tags="['Тег 1', 'Тег 2']"
        />
      </div>
      <div
        id="quiz-popup"
        style="display: none;"
      >
        <AImg
          :src="MBannerCardImage"
          alt=""
        />
      </div>
    </MSection>

    <MSection
      title="MBreadcrumbs"
      nums="6"
    >
      <div
        class="simple-wrapper"
        style="width: 50%"
      >
        <MBreadcrumbs :breadcrumbs />
      </div>
    </MSection>

    <MSection
      title="MCardList"
      nums="7"
    >
      <div class="responsive-width">
        <MCardList
          title="Строение человеческого организма"
          subtitle="Подзаголовок"
          :list="`<ul>
            <li>Анатомия человека</li>
            <li>Нормальная физиология'</li>
            <li>Биохимия'</li>
            </ul>
          `"
          title-class="a-font_xl"
        />
      </div>
    </MSection>

    <MSection
      title="MCardTagTitle"
      nums="8"
    >
      <div style="display: flex; gap:10px">
        <MCardTagTitle
          tag="Колледж"
          title="от 150"
        />
        <MCardTagTitle
          tag="Оффлайн"
          show-bg-image
        />
      </div>
    </MSection>

    <MSection
      title="MCardText"
      nums="9"
    >
      <div class="responsive-width">
        <MCardText
          title="О курсах"
          text="Программы переподготовки подойдут тем, кто уже получил специальность, но&nbsp;хочет поменять род деятельности и&nbsp;получить помощь в&nbsp;трудоустройстве. Их&nbsp;продолжительность&nbsp;— от&nbsp;6 месяцев "
          :icons="['clock']"
          :tags="['Переподготовка — от 6 месяцев']"
        >
          slot
        </MCardText>
      </div>
    </MSection>

    <MSection
      title="MCookie"
      nums="10"
    >
      <div style="margin-bottom: 24px;">
        <AButton
          size="sm"
          bg-color="white"
          @click="acceptCookie = 'false'"
        >
          Reset cookie accept
        </AButton>
      </div>
      <MCookie />
    </MSection>

    <MSection
      title="MCreditBanner"
      nums="11"
    >
      <div
        class="responsive-width"
        style="height: 450px;"
      >
        <MCreditBanner
          title="Заголовок Кредитного Баннера"
          :img="MBannerCardImage"
          :img-lg="MBannerCardImageLg"
          :img-md="MBannerCardImageMd"
          btn-text="Оставить заявку"
          subtitle="Подзаголовок Кредитного Баннера"
          :tags="[{ tag: 'Тег 1' }, { tag: 'Тег 2' }]"
        />
      </div>
    </MSection>

    <MSection
      title="MGraduateCard"
      nums="12"
    >
      <MGraduateCard
        name="Заргарян Арсен Сержевич"
        info="Выпуск 2008, магистратура"
        :text="mGraduateCardText"
        :img="synergyRu('content/otzivi/1_kopiya.webp')"
      />
    </MSection>

    <MSection
      title="MMore"
      nums="13"
    >
      <MMore
        href="https://ya.ru"
        text="Узнать больше"
      />
    </MSection>

    <MSection
      title="MDocumentsSlider"
      nums="14"
    >
      <MDocumentsSlider
        :documents="[
          {
            title: 'Лицензия',
            text: 'осуществление образовательной деятельности',
            link: 'https://example.com/assets/upload/official_documents/pdf/reestrovaya_vyipiska.pdf',
            isDocs: true
          },
          {
            title: 'Свидетельство ',
            text: 'о государственной <br>аккредитации',
            link: 'https://example.com/assets/template/v5/new2/images/diplomas/vypiska_iz_reestra_akkreditacii.pdf'
          },
          {
            title: 'Аккредитация',
            text: 'Международной ассоциации MBA',
            link: 'https://example.com/assets/template/v5/new2/images/diplomas/07B.jpg',
            isDocs: true
          },
        ]
        "
      />
    </MSection>

    <MSection
      title="MFaculty"
      nums="15"
    >
      <div class="responsive-width">
        <MFaculty
          title="Медицина"
          count="15 специальностей"
          :image="MFacultyMedicineImage"
          :image-sm="MFacultyMedicineImageSm"
        />
      </div>
    </MSection>

    <MSection
      title="MFilterTab"
      nums="16"
    >
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <MFilterTab
          title="Технические"
          icon="faculty_1"
        />
        <MFilterTab
          title="Гуманитарные"
          icon="faculty_2"
          active
        />
      </div>
    </MSection>

    <MSection
      title="MFiltersTabsSlider"
      nums="17"
    >
      <MFiltersTabsSlider
        :tabs="[
          { title: 'Технические', value: 'Технические', icon: 'faculty_1' },
          { title: 'Гуманитарные', value: 'Гуманитарные', icon: 'faculty_2' },
          { title: 'Медицинские', value: 'Медицинские', icon: 'faculty_3' },
          { title: 'Творческие', value: 'Творческие', icon: 'faculty_4' },
          { title: 'Экономические', value: 'Экономические', icon: 'faculty_5' },
        ]"
      />
    </MSection>

    <MSection
      title="MFiltersTabsSliderNav"
      nums="18"
    >
      <MFiltersTabsSliderNav
        :tabs="[
          { title: 'Психология', value: 'Психология' },
          { title: 'Программирование', value: 'Программирование' },
          { title: 'Дизайн', value: 'Дизайн' },
          { title: 'Лингвистика', value: 'Лингвистика' },
          { title: 'E-commerce', value: 'E-commerce' },
          { title: 'Управление', value: 'Управление' },
          { title: 'Интернет-маркетинг', value: 'Интернет-маркетинг' },
          { title: 'Геймдизайн', value: 'Геймдизайн' },
          { title: 'Искусственный интеллект', value: 'Искусственный интеллект' },
          { title: 'Анимация', value: 'Анимация' },
        ]"
      />
    </MSection>

    <MSection
      title="MMenuToggled"
      nums="19"
    >
      <MMenuToggled
        title="Заголовок меню (смотреть на < 768px)"
        href=""
        :items="MMenuToggledItems"
      />
    </MSection>

    <MSection
      title="MPhones"
      nums="20"
    >
      <div
        class="simple-wrapper"
        style="width: 50%"
      >
        <MPhones :phones="['+7 495 800-10-01', '8 800 100-00-11']" />
      </div>
      <div
        class="simple-wrapper"
        style="width: 50%"
      >
        <h6 style="margin: 32px 0;">Только кнопка на мобильном (смотреть на 991px и менее)</h6>
        <MPhones
          :show-btn="true"
          :phones="['+7 495 800-10-01', '8 800 100-00-11']"
        />
      </div>
    </MSection>

    <MSection
      title="MSocialLinks"
      nums="21"
    >
      <div
        class="simple-wrapper"
        style="width: 50%"
      >
        <h6 style="margin: 32px 0;">С заголовоком</h6>
        <MSocialLinks />
      </div>
      <div
        class="simple-wrapper"
        style="width: 50%"
      >
        <h6 style="margin: 32px 0;">Без заголовка</h6>
        <MSocialLinks :show-title="false" />
      </div>
    </MSection>

    <MSection
      title="MLevelNav"
      nums="22"
    >
      <MLevelNav
        :items="[
          {
            title: 'Приёмная комиссия 2024',
            to: '/abiturientam/priemnaya_komissiya',
            textColor: 'red',
          },
          {
            title: 'Колледж',
            to: '/abiturientam/college',
          },
          {
            title: 'Бакалавриат',
            to: '/abiturientam/pervoe_vysshee',
          },
          {
            title: 'Магистратура',
            to: '/abiturientam/magistracy',
          },
          {
            title: 'Второе высшее',
            to: '/abiturientam/second_highest',
          },
          {
            title: 'Специалитет',
            to: '/abiturientam/speczialitet',
          },
          {
            title: 'Аспирантура',
            to: '/abiturientam/postgraduate_study',
          },
          {
            title: 'MBA',
            to: '/mba',
          },
          {
            title: 'Профессии',
            to: '/professions',
          },
          {
            title: 'Курсы',
            to: '/abiturientam/additional_education',
          },
          {
            title: 'Школа',
            to: '/school',
          },
        ]"
      />
    </MSection>

    <MSection
      title="MReview"
      nums="23"
    >
      <MReview
        :image="MReviewImage"
        name="Дарья Житинская"
        info="Профессия «Python-разработчик»"
        text="Я&nbsp;учусь в&nbsp;колледже демо-вуза по&nbsp;программе «Гостиничное дело». Очень люблю свой ВУЗ, потому что здесь есть возможность трудоустройства, что помогает мне совмещать практику"
      />
    </MSection>

    <MSection
      title="MSearch"
      nums="24"
    >
      <div class="responsive-width">
        <MSearch />
      </div>
    </MSection>

    <MSection
      title="MNavContacts"
      nums="25"
    >
      <MNavContacts
        :address="[
          { metro: 'Сокол', city: 'г. Москва', address: 'Ленинградский пр-т, д.&nbsp;80Б корпус&nbsp;5' },
        ]"
        :schedules="[
          { days: 'Пн — Пт:', times: '09:00–20:00' },
          { days: 'Сб:', times: '10:00–19:00' },
          { days: 'Вс:', times: '10:00–17:00' },
        ]"
        :common-phones="[
          '+7 495 800–10–01',
          '8 800 100–00–11'
        ]"
        :students-phones="['8 800 350–00–60']"
      />
    </MSection>

    <MSection
      title="MTeacherCard"
      nums="26"
    >
      <MTeacherCard
        v-bind="MTeachersCards[0]"
        style="max-width: 600px;"
      />
    </MSection>

    <MSection
      title="MTeachersSlider"
      nums="27"
    >
      <MTeachersSlider :teachers="MTeachersCards" />
    </MSection>

    <MSection
      title="MForm"
      nums="28"
    >
      <div class="responsive-width">
        <MForm />
      </div>

      <div
        class="responsive-width"
        style="margin-top: 60px;"
      >
        <MForm
          title="Заголовок формы"
          subtitle="Подзаголовок формы"
          :form-mail="true"
        />
      </div>
    </MSection>

    <MSection
      title="MFormMin"
      nums="29"
    >
      <div>
        <MFormMin />
      </div>

      <div style="margin-top: 60px;">
        <MFormMin
          title="Заголовок формы"
          subtitle="Подзаголовок формы"
          :form-mail="true"
          bg-color="red"
        />
      </div>

      <div style="margin-top: 60px;">
        <MFormMin
          title="Форма с лого"
          subtitle="Заполните форму и наш менеджер свяжется с вами"
          bg-color="red"
          :show-logo="true"
        />
      </div>
    </MSection>

    <MSection
      title="MFormPay"
      nums="30"
    >
      <div class="responsive-width">
        <MFormPay />
      </div>
    </MSection>

    <MSection
      title="MModalForm"
      nums="31"
    >
      <div class="responsive-width-x2">
        <MModalForm style="display: block;" />
      </div>
    </MSection>

    <MSection
      title="MUpButton - scroll needed"
      nums="32"
    />

    <MSection
      title="MSpecialtyCard"
      nums="33"
    >
      <div class="responsive-width">
        <h5 style="margin-bottom: 10px;">Карточка специальности:</h5>
        <MSpecialtyCard
          id="14"
          level="Бакалавриат"
          faculty="Программирование"
          is-new
          name="Fullstack-разработчик"
          link="/"
          place="Место"
          is-partner
          is-show-enroll
          price="300р"
          @enroll="showSpecialtyPopup"
        />

        <h5 style="margin-bottom: 10px; margin-top: 30px;">Карточка с презентацией</h5>
        <MSpecialtyCard
          id="12"
          level="Колледж"
          faculty="Информационные технологии"
          name="Специалист по&nbsp;информационным системам"
          link="https://example.com/abiturientam/programmyi_obucheniya/isit_college"
          :presentation-link="synergyRu('presentations/it.pdf')"
        />
      </div>
    </MSection>

    <MSection
      title="MSwitcher"
      nums="34"
    >
      <div class="responsive-width">
        <MSwitcher :items="[{ label: 'От 6 месяцев' }, { label: 'До 6 месяцев' }]" />
      </div>
    </MSection>

    <MSection
      title="MTabs"
      nums="35"
    >
      <div class="responsive-width">
        <MTabs :items="[{ label: 'Ректорат' }, { label: 'Совет президента' }, { label: 'Почётные профессора' }]" />
      </div>
    </MSection>

    <MSection
      title="MVideoCard"
      nums="36"
    >
      <div
        class="responsive-width"
        style="height: 300px;"
      >
        <MVideoCard v-bind="mVideoCardProps" />
      </div>
    </MSection>

    <MSection
      title="MVideoCardVertical"
      nums="37"
    >
      <div style="width: 282px; height: 468px;">
        <MVideoCardVertical v-bind="mVideoCardVerticalProps" />
      </div>
    </MSection>

    <MSection
      title="MProgramsTags"
      nums="38"
    >
      <MProgramsTags
        :tags="[
          { text: 'Популярные', value: 100 },
          { text: 'IT', value: 101 },
          { text: 'Международные', value: 102 },
          { text: 'Медицина', value: 103 },
          { text: 'Профессии с 0', value: 104 },
        ]"
      />
    </MSection>

    <MSection
      title="MQuiz"
      nums="39"
      style="
        background: url('https://example.com/assets/template/v5/new3/images/s_quiz/abiturientam-lg.webp');
        color: white;
        "
    >
      <MQuiz
        @close="closeMQuiz"
        @submit="submitMQuiz"
      />
    </MSection>

    <MSection
      title="MUniversityTarget"
      nums="40"
    >
      <MUniversityTarget
        title="<span class='red'>Наша цель</span>&nbsp;— качественное образование для&nbsp;вашей успешной карьеры"
        text="
        <p>У&nbsp;нас готовят высококлассных специалистов, востребованных в&nbsp;России и&nbsp;за&nbsp;рубежом. Начните строить своё профессиональное будущее вместе с&nbsp;нами.</p>
        <p>Более 25&nbsp;лет у&nbsp;нас обучают актуальным и&nbsp;востребованным профессиям. У&nbsp;нас вы получите знания, которые помогут развить свой бизнес или&nbsp;устроиться на&nbsp;работу в&nbsp;крупную компанию.</p>
        "
        :icons="['simple-25', 'simple-bag']"
        image="https://example.com/assets/template/v5/new3/images/s_university/video/video.webp"
        image-lg="https://example.com/assets/template/v5/new3/images/s_university/video/video_lg.webp"
        image-md="https://example.com/assets/template/v5/new3/images/s_university/video/video_md.webp"
        tag="Смотрите видео о&nbsp;демо-вузе"
        :video="synergyRu('video/otzyvprouniversitetsinergya.mp4')"
        :priorities="[
          {
            title: 'Приоритет',
            text: 'Требования крупнейших компаний-работодателей',
            image: 'https://example.com/assets/template/v5/new3/images/s_university/priorities/1.webp'
          },
          {
            title: 'Актуальные знания',
            text: 'Преподавание от практиков в своей сфере',
            image: 'https://example.com/assets/template/v5/new3/images/s_university/priorities/2.webp'
          },
          {
            title: 'Высокий результат',
            text: 'Выпускники — новая профессиональная элита',
            image: 'https://example.com/assets/template/v5/new3/images/s_university/priorities/3.webp'
          }
        ]"
        :achievements="[
          {
            title: '1995',
            text: 'год основания демо-портала',
            icon: 'simple-calendar',
          },
          {
            title: '> 1000',
            text: 'образовательных программ',
            icon: 'simple-papers',
          },
          {
            title: '> 200 000',
            text: 'обучающихся на платформе',
            icon: 'simple-group',
          },
          {
            title: '> 500 000',
            text: 'выпускников',
            icon: 'simple-hat',
          },
        ]"
      />
    </MSection>
    <MSection
      title="MLevelFilterSlider"
      nums="39"
    >
      <MLevelFilterSlider
        :levels="mLevelFilterSlides"
      />
    </MSection>
    <MSection
      title="MRatingCard"
    >
      <MRatingCard />
    </MSection>
  </div>
  <div class="s-fixed-bottom">
    <MUpButton />
  </div>
</template>

<script setup lang="ts">
import { synergyApi, synergyRu } from '~/utils/mediaCdn';
import type { AccordionItem, TeacherCard } from '~/types';
import MBannerCardImage from '~/assets/images/s-university/talisman-sm.webp';
import MBannerCardImageLg from '@/assets/images/s-university/talisman-lg.webp';
import MBannerCardImageMd from '@/assets/images/s-university/talisman-md.webp';
import MFacultyMedicineImage from '~/assets/images/m_faculty/mediczina.svg?url';
import MFacultyMedicineImageSm from '~/assets/images/m_faculty/mediczina2.svg?url';
import MReviewImage from '~/assets/images/m_review/kapustina.webp';
import MTeacherCardImage from '~/assets/images/m_teacher_card/teacher_card_test.webp';
import MTeacherCard2Image from '~/assets/images/m_teacher_card/teacher_card_test2.webp';
import MTeacherCard3Image from '~/assets/images/m_teacher_card/teacher_card_test3.webp';

const accordionItems = generateAccordeonItems();
const accordionItemsMultiple = generateAccordeonItems();

const appLinks = [
  {
    name: 'App Store',
    link: 'https://apps.apple.com/ru/app/megacampus/id1059060742',
    image: 'https://example.com/assets/template/v5/new3/images/download_app/apple.svg',
  },
  {
    name: 'Google Play',
    link: 'https://play.google.com/store/apps/details?id=com.example.demoapp',
    image: 'https://example.com/assets/template/v5/new3/images/download_app/google.svg',
  },
];

const breadcrumbs = [
  {
    title: 'Главная',
    link: '/',
  },
  {
    title: 'Абитуриентам',
    link: '/abiturientam',
  },
  {
    title: 'Программы обучения',
    link: '/abiturientam/programs',
  },
];

const acceptCookie = useCookie('cookieAccepted', {
  'maxAge': 2592000,
  'path': '/',
},
);

const mGraduateCardText = `<p class="a-font_m"><strong>Должность: </strong>Руководитель проектов</p><p class="a-font_m"><strong>Место работы: </strong>PM&nbsp;Excellence&nbsp;— PMC-подрядчик, оказывающий услуги управления крупными и&nbsp;мегапроектами (нефтегазовая, нефтехимическая, строительная, горнорудная промышленность, инфраструктура, энергетика, морские и&nbsp;речные порты и&nbsp;др.). </p><p class="a-font_m"><strong>Специальность: </strong>«Менеджмент», профиль «Менеджмент в&nbsp;организации»</p>`;

const MMenuToggledItems = [
  {
    title: 'Item 1',
    href: 'https://ya.ru/1',
  },
  {
    title: 'Item 2',
    href: 'https://ya.ru/2',
  },
  {
    title: 'Item 3',
    href: 'https://ya.ru/3',
  },
  {
    title: 'Item 4',
    href: 'https://ya.ru/4',
  },
  {
    title: 'Item 5',
    href: 'https://ya.ru/5',
    attributes: {
      'data-attr': 'text val',
      id: 'item-5',
    },
  },
];

const MTeachersCards: TeacherCard[] = [
  {
    teacherId: 0,
    image: MTeacherCardImage,
    name: 'Кухаренко Олеся Геннадьевна',
    position: '<ul><li>Декан факультета Экономики</li><li>Декан факультета Менеджмента</li><li>Кандидат экономических наук, доцент, магистр по направлению подготовки «Менеджмент»</li><li>Стажировки по программам Taft University (Бостон, США), «Corporate Strategy» VYSOKA SKOLA TECHICKA A ECONOMICKA (Чешская Республика), «Financial Management» The University of Economics in Bratislava (Словацкая Республика)</li><li>Автор более 90 научных и учебно-методических трудов</li></ul>',
    text: '<ul><li>Декан факультета Экономики</li><li>Декан факультета Менеджмента</li><li>Кандидат экономических наук, доцент, магистр по направлению подготовки «Менеджмент»</li><li>Стажировки по программам Taft University (Бостон, США), «Corporate Strategy» VYSOKA SKOLA TECHICKA A ECONOMICKA (Чешская Республика), «Financial Management» The University of Economics in Bratislava (Словацкая Республика)</li><li>Автор более 90 научных и учебно-методических трудов</li></ul>',
  },
  {
    teacherId: 1,
    image: MTeacherCard2Image,
    name: 'Малыгин Андрей Вадимович',
    position: '<ul><li>Заведующий кафедрой спортивного маркетинга</li><li>Кандидат экономических наук, доцент</li><li>Руководитель Школы спортивного маркетинга</li></ul>',
    text: '<ul><li>Заведующий кафедрой спортивного маркетинга</li><li>Кандидат экономических наук, доцент</li><li>Руководитель Школы спортивного маркетинга</li></ul>',
  },
  {
    teacherId: 2,
    image: MTeacherCard3Image,
    name: 'Позина Марина Борисовна',
    position: '<ul><li>Заведующая кафедрой психологии</li><li>Кандидат психологических наук, доцент</li><li>Сертифицированный профконсультант</li><li>Почетный работник сферы образования Российской Федерации</li>',
    text: '<ul><li>Заведующая кафедрой психологии</li><li>Кандидат психологических наук, доцент</li><li>Сертифицированный профконсультант</li><li>Почетный работник сферы образования Российской Федерации</li>',
  },
];

const mVideoCardProps = {
  video: synergyRu('video/otzyvprouniversitetsinergya.mp4'),
  image: synergyApi('uploads/content/video-bg/video.webp'),
  title: 'Заголовок карточки видео',
  text: 'Подзаголовок карточки видео',
  imageLg: synergyApi('uploads/content/video-bg/video_lg.webp'),
  imageMd: synergyApi('uploads/content/video-bg/video_md.webp'),
  videoBg: '',
  tag: 'Смотрите видео о демо-вузе',
};

const mVideoCardVerticalProps = {
  video: 'https://www.youtube.com/embed/lgFeQZMcMDo',
  image: synergyRu('content/otzivi/vertikal/arina_polishhuk.webp'),
  title: 'Арина Полищук',
  text: 'Факультет гостиничного и ресторанного бизнеса',
  imageLg: synergyRu('content/otzivi/vertikal/arina_polishhuk.webp'),
  imageMd: synergyRu('content/otzivi/vertikal/arina_polishhuk.webp'),
};


const mLevelFilterSlides = {
  1: {
    value: 1,
    text: 'Колледж',
    rank: 50,
    count: 10,
  },
  2: {
    value: 2,
    text: 'Бакалавриат',
    rank: 100,
    count: 20,
  },
  3: {
    value: 3,
    text: 'Второе высшее',
    rank: 300,
    count: 15,
  },
  4: {
    value: 4,
    text: 'Магистратура',
    rank: 400,
    count: 7,
  },
  5: {
    value: 5,
    text: 'Специалитет',
    rank: 150,
    count: 34,
  },
  6: {
    value: 6,
    text: 'Аспирантура',
    rank: 600,
    count: 47,
  },
  7: {
    value: 7,
    text: 'Ординатура',
    rank: 700,
    count: 22,
  },
  1000: {
    text: 'Курсы',
    value: 1000,
    rank: 1000,
    count: 99,
  },
};

function generateAccordeonItems(length: number = 5): AccordionItem[] {
  if (length < 0) length = 5;

  return (new Array(length)).fill('').reduce((acc, _, i) => {
    acc.push({
      title: {
        text: `Title for accordion multiple ${i}`,
      },
      content: {
        text: `Content for accordion multiple ${i}`,
      },
      itemKey: `key_${i}`,
    });
    return acc;
  }, []);
}

function showSpecialtyPopup() {
  alert('Попап в разработке');
}

function closeMQuiz() {
  alert('Сработало событие MQuiz -> @close');
}

function submitMQuiz() {
  alert('Сработало событие MQuiz -> @submit');
}
</script>

<style lang="scss" scoped>
.simple-wrapper {
  display: inline-block;
  margin: 0 10px 10px 0;
}

hr {
  margin: 20px 0;
}

.responsive-width {
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }

  @media (min-width: 1200px) {
    width: 30%;
  }
}

.responsive-width-x2 {
  width: 100%;

  @media (min-width: 768px) {
    width: 75%;
  }

  @media (min-width: 1200px) {
    width: 60%;
  }
}

.s-fixed-bottom {
  position: fixed;
  z-index: 9000;
  overflow: hidden;
  width: 100%;
  left: 0;
  top: auto;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
}
</style>
