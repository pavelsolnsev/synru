<script setup lang="ts">
import { ROUTES } from '~/constants';
import WidgetImg from '~/assets/images/widget/widjet_icon.webp';
import WidgetClose from '~/assets/images/widget/widget_close.svg';
import WidgetSvg1 from '~/assets/images/widget/widget_svg1.svg';
import WidgetSvg2 from '~/assets/images/widget/widget_svg2.svg';

interface Props {
  isVisibleUpButton?: boolean;
}

const route = useRoute();

const baseParams = [
  { param: 'grcampaign=e_mail_chain_vpo' },
  { param: 'form=widjet_form' },
];

// TODO: Проверка роута для А/Б теста приемной комиссии

const actionParams: ComputedRef<{ param: string }[]> = computed(() => getAbTestActionParams(baseParams, route.path));

const {
  isVisibleUpButton = false,
} = defineProps<Props>();

const TITLE_TEXT = 'Добро пожаловать';
const TITLE_TEXT_FORM = 'Узнайте минимальный проходной балл и&nbsp;получите <span class="--free-white">бесплатный</span> доступ к&nbsp;началу обучения';

const isMounted = ref(false);
const title = ref('');

const widgetBlockRef = templateRef('widgetBlockRef');
const btnsBlockRef = templateRef('btnsBlockRef');
const openButtonBlockRef = templateRef('openButtonBlockRef');

const { reachGoal } = sendYandexMetricaGoal();

let form: null | HTMLFormElement = null;
let jivo: null | HTMLDivElement = null;

const router = useRouter();

router.beforeEach(() => {
  widgetBlockRef.value.classList.remove('_active');
  openButtonBlockRef.value.classList.remove('_active');
  closeJivoWidget();
});

onMounted(() => {
  const findForm = document.querySelector('#widjet-form') as HTMLFormElement;
  if (findForm) form = findForm;

  const findJivoDiv = document.querySelector('.jv-desktop') as HTMLDivElement;
  if (findJivoDiv) jivo = findJivoDiv;

  window.jivo_onClose = closeJivoWidget;

  isMounted.value = true;
});

function sendReachGoal(phone: string) {
  reachGoal('click_call_button', {
    'button': 'nomera_telefonov_v_stranitse',
    'telephone_number': phone,
  });
}

function toggleWidget() {
  if (!isMounted.value) return;
  widgetBlockRef.value.classList.toggle('_active');
  openButtonBlockRef.value.classList.toggle('_active');
  btnsBlockRef.value.style.display = '';

  if (form) form.style.display = '';

  title.value = TITLE_TEXT;
}

function onOpenFormButtonClick() {
  btnsBlockRef.value.style.display = 'none';

  if (form) form.style.display = 'block';
  title.value = TITLE_TEXT_FORM;
}

function onOpenChatButtonClick() {
  const findJivoDiv = jivo || (document.querySelector('.jv-desktop') as HTMLDivElement);

  if (findJivoDiv) {
    findJivoDiv.style.setProperty('visibility', 'visible', 'important');
    jivo = jivo || findJivoDiv;
  }

  if (window.jivo_api) {
    toggleWidget();
    window.jivo_api.open();
  }
}

function closeJivoWidget() {
  setTimeout(() => {
    if (!jivo) return;
    jivo.style.setProperty('visibility', 'hidden', 'important');
  }, 250);
}
</script>

<template>
  <div v-show="![ROUTES.ABITURIENTAM, ROUTES.FACULTIES, ROUTES.SPECIALTY].includes(route.path)">
    <div
      ref="openButtonBlockRef"
      class="s-widjet-btn"
      :class="{'_showUpBtn': isVisibleUpButton}"
      @click.stop="toggleWidget"
    >
      <WidgetSvg1 />
      <WidgetSvg2 />
      <AImg
        class="icon3"
        alt="widget"
        decoding="async"
        loading="lazy"
        width="100"
        height="100"
        :src="WidgetImg"
      />
    </div>
    <div
      ref="widgetBlockRef"
      class="s-widjet"
    >
      <div class="s-widjet__content">
        <div class="s-widjet__head">
          <div class="s-widjet__logo">
            <AImg
              alt="widget"
              decoding="async"
              loading="lazy"
              width="100"
              height="100"
              :src="WidgetImg"
            />
          </div>

          <div
            class="s-widjet__head-title a-font_h5"
            v-html="title"
          />
          <div
            class="s-widjet__close"
            @click.stop="toggleWidget"
          >
            <WidgetClose />
          </div>
        </div>

        <div class="s-widjet__wrap">
          <div class="s-widjet__title a-font_l">
            Мы готовы ответить на Ваши вопросы
          </div>

          <MForm
            id="widjet-form"
            title=""
            bg-color="white"
            btn="Отправить"
            btn-bg-color="black"
            :action-params
          />

          <div
            ref="btnsBlockRef"
            class="s-widjet__btns"
          >
            <button
              class="s-widjet__chat"
              @click="onOpenChatButtonClick"
            >
              <ASvgMono name="slider-arr-right" />
              <span class="a-font_xl-m">
                Написать сообщение
              </span>
              <span class="a-font_m">
                Открыть онлайн-консультанта
              </span>
            </button>

            <AButtonThird
              bg-color="bordered"
              to="tel:88001000011"
              @click="sendReachGoal('88001000011')"
            >
              <span>Позвонить</span>
              <ASvgMono name="big-phone" />
            </AButtonThird>

            <AButtonThird
              bg-color="bordered"
              class="s-widjet__open-form"
              @click="onOpenFormButtonClick"
            >
              <span>Заказать звонок</span>
            </AButtonThird>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SWidget.scss';
</style>

<style>
.__jivoMobileButton,
#jvLabelWrap {
  display: none !important;
}

.jv-desktop {
  visibility: hidden !important;
}
</style>
