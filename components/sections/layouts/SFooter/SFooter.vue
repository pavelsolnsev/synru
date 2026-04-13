<script setup>
import { footerNavigation, contacts } from './FooterNavigationData';
import { APP_LINKS, ROUTES } from '~/constants';
import AppleStoreIcon from '~/assets/images/m_app_links/apple.svg?query';
import GooglePlayIcon from '~/assets/images/m_app_links/google.svg?query';
import { PRIVACY } from '~/constants/documents';

const levelNavItems = [
  { to: ROUTES.ADMISSION_COMMITTEE, title: 'Приёмная комиссия', textColor: 'red' },
  { to: ROUTES.COLLEGE, title: 'Колледж' },
  { to: ROUTES.BACCALAUREATE, title: 'Бакалавриат' },
  { to: ROUTES.SPECIALTY, title: 'Специалитет' },
  { to: ROUTES.MAGISTRACY, title: 'Магистратура' },
  { to: ROUTES.SECOND_HIGHEST, title: 'Второе высшее' },
  { to: ROUTES.COURSES, title: 'Курсы' },
  { to: ROUTES.POSTGRADUATE_STUDY, title: 'Аспирантура' },
  { to: ROUTES.ORDINATURA, title: 'Ординатура' },
  { to: ROUTES.BUSINESS_EDUCATION, title: 'MBA' },
  { to: ROUTES.SCHOOL, title: 'Школа' },
];

const { width: windowWidth } = useWindowSize();

const isMobile = ref(windowWidth.value < 768);

watchEffect(() => {
  isMobile.value = windowWidth.value < 768;
});


const { faculties, about, applicants, students } = toRefs(reactive(footerNavigation));

const appLinks = [
  {
    name: 'App Store',
    link: APP_LINKS.APP_STORE,
    image: AppleStoreIcon,
  },
  {
    name: 'Google Play',
    link: APP_LINKS.GOOGLE_PLAY,
    image: GooglePlayIcon,
  },
];


const commission = ref({
  title: {
    text: 'Приёмная комиссия',
    href: '',
    className: 'a-font_h6',
  },
  itemKey: "'Приёмная комиссия'",
  isOpen: false,
});

const footerInfoLinks = [
  {
    title: 'Политика конфиденциальности',
    to: PRIVACY,
  },
];

const { openModal } = useModalStore();

function openFeedback() {
  openModal('SFormFeedback');
}
</script>

<template>
  <footer id="footer">
    <MSection class="s-footer">
      <div class="s-footer__top">
        <ALogo class="a-logo" />

        <MLevelNav
          :items="levelNavItems"
          class="s-footer__levels"
        />
      </div>

      <div class="s-footer__main">
        <div
          class="s-footer__col"
          itemscope
          itemtype="https://schema.org/SiteNavigationElement"
        >
          <MAccordionItem
            v-bind="faculties"
            :item-key="faculties.title.text"
            schema="list"
            @triggered="faculties.isOpen = !faculties.isOpen"
          >
            <NuxtLink
              v-for="link in faculties.children"
              :key="link.title"
              :to="link.href"
              :target="link.target"
              class="a-font_m"
              itemprop="url"
              v-bind="link.attr"
            >
              <span
                itemprop="name"
                v-html="link.title"
              />
            </NuxtLink>
          </MAccordionItem>
        </div>

        <div
          class="s-footer__col"
          itemscope
          itemtype="https://schema.org/SiteNavigationElement"
        >
          <MAccordionItem
            v-bind="about"
            :item-key="faculties.title.text"
            class="s-footer__col"
            schema="list"
            @triggered="about.isOpen = !about.isOpen"
          >
            <NuxtLink
              v-for="link in about.children"
              :key="link.title"
              :to="link.href"
              :target="link.target"
              :external="link.external"
              itemprop="url"
              class="a-font_m"
              v-bind="link.attr"
            >
              <span
                itemprop="name"
                v-html="link.title"
              />
            </NuxtLink>
          </MAccordionItem>
        </div>

        <div
          class="s-footer__col"
          itemscope
          itemtype="https://schema.org/SiteNavigationElement"
        >
          <MAccordionItem
            v-bind="applicants"
            :item-key="faculties.title.text"
            class="s-footer__col"
            schema="list"
            @triggered="applicants.isOpen = !applicants.isOpen"
          >
            <NuxtLink
              v-for="link in applicants.children"
              :key="link.href"
              :to="link.href"
              :target="link.target"
              :external="link.external"
              itemprop="url"
              class="a-font_m"
            >
              <span
                itemprop="name"
                v-html="link.title"
              />
            </NuxtLink>
          </MAccordionItem>
        </div>

        <div
          class="s-footer__col"
          itemscope
          itemtype="https://schema.org/SiteNavigationElement"
        >
          <MAccordionItem
            v-bind="students"
            :item-key="faculties.title.text"
            class="s-footer__col"
            schema="list"
            @triggered="students.isOpen = !students.isOpen"
          >
            <NuxtLink
              v-for="link in students.children"
              :key="link.href"
              :to="link.href"
              :target="link.target"
              :external="link.external"
              itemprop="url"
              class="a-font_m"
              v-bind="link.attr"
            >
              <span
                itemprop="name"
                v-html="link.title"
              />
            </NuxtLink>
          </MAccordionItem>
        </div>

        <MAccordionItem
          v-bind="commission"
          :item-key="faculties.title.text"
          class="s-footer__col s-footer__contacts"
          itemscope
          itemtype="https://schema.org/LocalBusiness"
          @triggered="commission.isOpen = !commission.isOpen"
        >
          <meta
            itemprop="name"
            :content="commission.title.text"
          >
          <MNavContacts v-bind="contacts" />
        </MAccordionItem>

        <div class="s-footer__links">
          <AButton
            size="md"
            @click="openFeedback()"
          >
            <span>Обратная связь</span>
          </AButton>

          <AButton
            v-if="isMobile"
            size="md"
            bg-color="black"
            target="_blank"
            :to="ROUTES.LK_REGISTRATION"
            :external="true"
          >
            <span>Зарегистрироваться в&nbsp;личном кабинете</span>
          </AButton>

          <MSocialLinks :show-title="false" />

          <MAppLinks :app-links="appLinks" />
        </div>

        <div class="s-footer__info a-font_s-m">
          <p>© {{ new Date().getFullYear() }} Synergy. Все права защищены</p>

          <NuxtLink
            v-for="link in footerInfoLinks"
            :key="link.to"
            :to="link.to"
            target="_blank"
            rel="noreferrer"
          >
            {{ link.title }}
          </NuxtLink>

          <p class="disclaimer">
            <span>Демонстрационный сайт для портфолио; юридические формулировки и владелец заменены на нейтральные.
            </span>
            <NuxtLink
              :to="ROUTES.DISCLAIMER"
              target="_blank"
            >
              Подробнее
            </NuxtLink>
          </p>
        </div>
      </div>
    </MSection>
    <SQuizPopup />
  </footer>
</template>

<style lang="scss">
@import './SFooter.scss';
</style>
