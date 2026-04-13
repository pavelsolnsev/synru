<script setup lang="ts">
const FONT_CLASS = 'a-font_h6';
const ICON = 'plus';
const CONTENT_CLASS_NAME = 's-payment-options__item-content';

const accordionItems = ref({
  firstAccordion: {
    title: {
      text: 'Оплата в&nbsp;операционной кассе ООО «Demo Capital»',
      className: FONT_CLASS,
    },
    content: {
      className: CONTENT_CLASS_NAME,
    },
    isOpen: true,
    icon: ICON,
  },
  secondAccordion: {
    title: {
      text: 'Банковским переводом',
      className: FONT_CLASS,
    },
    content: {
      className: CONTENT_CLASS_NAME + ' --col-2',
    },
    isOpen: false,
    icon: ICON,
  },
  thirdAccordion: {
    title: {
      text: 'Оплата обучения в&nbsp;кредит',
      className: FONT_CLASS,
    },
    isOpen: false,
    icon: ICON,
  },
  fourthAccordion: {
    title: {
      text: 'Субсидированное кредитование',
      className: FONT_CLASS,
    },
    isOpen: false,
    icon: ICON,
  },
  fifthAccordion: {
    title: {
      text: 'Нострификация',
      className: FONT_CLASS,
    },
    isOpen: false,
    icon: ICON,
  },
  sixthAccordion: {
    title: {
      text: 'Налоговый вычет',
      className: FONT_CLASS,
    },
    isOpen: false,
    icon: ICON,
  },
  seventhAccordion: {
    title: {
      text: 'Оплата токенами',
      className: FONT_CLASS,
    },
    isOpen: false,
    icon: ICON,
  },
});

type accordionItemName = keyof typeof accordionItems.value;

const toggleOpen = (name: accordionItemName) => {
  accordionItems.value[name].isOpen = !accordionItems.value[name].isOpen;
};
</script>


<template>
  <MSection
    title="Другие варианты оплаты"
    class="s-payment-options"
  >
    <template
      v-for="(item, key) in accordionItems"
      :key
    >
      <MAccordionItem
        v-if="key === 'firstAccordion'"
        :item-key="key"
        v-bind="item"
        @triggered="toggleOpen(key)"
      >
        <p class="a-font_l">
          При&nbsp;осуществлении платежей в&nbsp;счет оплаты образовательных услуг в&nbsp;кассе ООО
          «Demo Capital» взимается комиссия 2% от&nbsp;суммы перевода более 2 000 рублей, при&nbsp;осуществлении
          платежа на&nbsp;сумму менее 2 500 рублей взимается минимальный размер комиссии&nbsp;— 50 рублей
        </p>
        <p class="a-font_l-m">Операционные кассы:</p>
        <p class="a-font_l">
          — ст. м. «Сокол», ул. Ленинградский <span class="nobr">пр-т,</span> д. 80, корпус Г. (1 этаж) <br>— ст.
          м. «Семёновская», Измайловский вал, дом&nbsp;2
        </p>
      </MAccordionItem>

      <MAccordionItem
        v-else-if="key === 'secondAccordion'"
        :item-key="key"
        v-bind="item"
        @triggered="toggleOpen(key)"
      >
        <div class="s-payment-options__item-text a-font_l">
          <p class="a-font_l-m">Банковские реквизиты демо-вуза:</p>
          <p>ПАО «СберБанк России» г. Москва</p>
          <p>р/с 40703810038000004715</p>
          <p>БИК 044525225</p>
          <p>К/С 30101810400000000225</p>
        </div>
        <div class="s-payment-options__item-infoBlock">
          <div class="a-font_h6 red">ВНИМАНИЕ!</div>
          <p />
          <p class="a-font_l">
            При&nbsp;оплате обучения через&nbsp;<span class="nobr">СберБанк-онлайн</span> студентам
          </p>
          <p class="a-font_l">
            <span class="nobr">(ф-л</span> Москва) необходимо указать код подразделения&nbsp;—&nbsp;01.
          </p>
          <p />
        </div>
      </MAccordionItem>

      <MAccordionItem
        v-else-if="key === 'thirdAccordion'"
        :item-key="key"
        v-bind="item"
        @triggered="toggleOpen(key)"
      >
        <MFormMin
          bg-color="red"
          title-class="a-font_h6"
          title="Возьмите выгодный кредит на&nbsp;оплату образовательных услуг в&nbsp;демо-вузе и&nbsp;обеспечьте себя достойным образованием!"
          btn="Отправить заявку"
          :action-params="[
            {param: 'grcampaign=e_mail_chain_vpo'},
            {param: 'form=credit-consult'},
          ]"
        />
      </MAccordionItem>

      <MAccordionItem
        v-else-if="key === 'fourthAccordion'"
        :item-key="key"
        v-bind="item"
        @triggered="toggleOpen(key)"
      >
        <div class="s-payment-options__item-content">
          <div class="s-payment-options__item-cards">
            <div class="s-payment-options__item-card">
              <p class="a-font_l-m">
                В&nbsp;каком банке можно оформить кредит с&nbsp;государственной
                поддержкой?
              </p>
              <div class="a-font_s">
                На&nbsp;текущий момент участником программы является банк ПАО
                «СберБанк»
              </div>
            </div>
            <div class="s-payment-options__item-card">
              <p class="a-font_l-m">Кому может быть предоставлен кредит?</p>
              <div class="a-font_s">
                Кредит предоставляется студентам/абитуриентам ВУЗа&nbsp;—
                гражданам РФ, в&nbsp;возрасте от&nbsp;14 лет, при&nbsp;условии
                получения образования по&nbsp;основным образовательным программам
                бакалавриата, специалитета и&nbsp;магистратуры.
              </div>
            </div>
            <div class="s-payment-options__item-card">
              <p class="a-font_l-m">
                Льготные условия получения образовательного кредита
              </p>
              <div class="a-font_s">
                <ul>
                  <li>
                    сниженная процентная ставка с&nbsp;учётом поддержи
                    государства&nbsp;—&nbsp;3%;
                  </li>
                  <li>
                    в&nbsp;течение всего срока обучения в&nbsp;ВУЗе и&nbsp;9
                    месяцев после его окончания основной долг по&nbsp;кредиту
                    не&nbsp;выплачивается;
                  </li>
                  <li>
                    срок, в&nbsp;течение которого возвращается кредит после
                    завершения обучения в&nbsp;ВУЗе, составляет 15&nbsp;лет;
                  </li>
                  <li>
                    предоставление обеспечения по&nbsp;кредиту (залога
                    или&nbsp;поручительства) не&nbsp;требуется.;
                  </li>
                </ul>
              </div>
            </div>
            <div class="s-payment-options__item-card">
              <p class="a-font_l-m">
                Какие документы необходимы для&nbsp;оформления кредита?
              </p>
              <div class="a-font_s">
                <ul>
                  <li>
                    паспорт РФ с&nbsp;отметкой о&nbsp;постоянной регистрации;
                  </li>
                  <li>
                    договор с&nbsp;демо-вузом о&nbsp;предоставлении
                    платных образовательных услуг;
                  </li>
                  <li>
                    счёт на&nbsp;оплату обучения (его необходимо заказать
                    и&nbsp;получить в&nbsp;Студенческом финансовом офисе)
                  </li>
                  <li>заполненная анкета</li>
                  <li>
                    если проживаете не&nbsp;по&nbsp;месту регистрации: справка
                    о&nbsp;временной регистрации;
                  </li>
                  <li>
                    несовершеннолетним под&nbsp;опекой кредит не&nbsp;выдаётся
                    согласно
                    <a
                      href="http://pravo.gov.ru/proxy/ips/?docbody=&amp;firstDoc=1&amp;lastDoc=1&amp;nd=102121401"
                      target="_blank"
                    >закону</a>.
                  </li>
                </ul>
              </div>
            </div>
            <div class="s-payment-options__item-card">
              <p class="a-font_l-m">
                В&nbsp;какое отделение СберБанка обращаться для&nbsp;оформления
                кредита?
              </p>
              <div class="a-font_s">
                Кредит может быть предоставлен по&nbsp;месту постоянной/временной
                регистрации заёмщика
              </div>
            </div>
          </div>
          <MFormMin
            bg-color="red"
            title-class="a-font_h6"
            title="Узнать условия кредита"
            btn="Отправить заявку"
            :action-params="[
              {param: 'grcampaign=e_mail_chain_vpo'},
              {param: 'form=credit_sber'},
            ]"
          />
        </div>
      </MAccordionItem>

      <MAccordionItem
        v-else-if="key === 'fifthAccordion'"
        :item-key="key"
        v-bind="item"
        @triggered="toggleOpen(key)"
      >
        <MFormMin
          bg-color="red"
          title-class="a-font_h6"
          title="Узнайте больше о нострификации"
          btn="Отправить заявку"
          :action-params="[
            {param: 'grcampaign=e_mail_chain_vpo'},
            {param: 'form=nostrification'},
          ]"
        />
      </MAccordionItem>

      <MAccordionItem
        v-else-if="key === 'sixthAccordion'"
        :item-key="key"
        v-bind="item"
        @triggered="toggleOpen(key)"
      >
        <div class="s-payment-options__item-content">
          <div class="s-payment-options__item-text">
            <p class="a-font_l-m">
              Согласно законодательству РФ (<a
                href="https://www.consultant.ru/document/cons_doc_LAW_28165/946cbfc58c05e1392615a251973beb32dc79f94e/"
                target="_blank" rel="noopener noreferrer nofollow">ст. 219 НК РФ</a>), при&nbsp;оплате образовательных услуг Вы можете рассчитывать
              на&nbsp;налоговый вычет, то есть вернуть часть потраченных
              на&nbsp;обучение денег.
            </p>
            <p class="a-font_l">
              Налоговый вычет&nbsp;— это часть дохода, которая не&nbsp;облагается
              налогом. Поэтому вы можете вернуть себе уплаченный налог
              с&nbsp;расходов, понесённых на&nbsp;образование. Если вы официально
              работаете и&nbsp;платите подоходный налог, оплатили своё обучение
              или&nbsp;обучение своих детей/братьев/сестёр, то вы можете вернуть
              себе часть денег в&nbsp;размере до&nbsp;13% от&nbsp;стоимости
              обучения.
            </p>
          </div>
          <div class="s-payment-options__item-links">
            <AButtonThird
              to="https://example.com/assets/upload/pay_education/dogovor-oferty.pdf"
              size="lg"
              target="_blank"
            >
              <span>Договор оферты</span>
              <ASvgMono name="arrow_outward" />
            </AButtonThird>
            <AButtonThird
              to="https://example.com/assets/upload/pay_education/usloviya-polucheniya-vycheta-ot-gosudarstva-min.pdf"
              size="lg"
              target="_blank"
            >
              <span>Условия получения вычета</span>
              <ASvgMono name="arrow_outward" />
            </AButtonThird>
            <AButtonThird
              to="https://example.com/assets/upload/pay_education/prikaz-na-predostavlenie.pdf"
              size="lg"
              target="_blank"
            >
              <span>Приказ на предоставление услуги</span>
              <ASvgMono name="arrow_outward" />
            </AButtonThird>
          </div>
          <MFormMin
            bg-color="red"
            title-class="a-font_h6"
            title="Узнайте больше о налоговом вычете"
            btn="Отправить заявку"
            :action-params="[
              {param: 'grcampaign=e_mail_chain_vpo'},
              {param: 'form=pay_education__ndfl'},
            ]"
          />
        </div>
      </MAccordionItem>

      <MAccordionItem
        v-else-if="key === 'seventhAccordion'"
        :item-key="key"
        v-bind="item"
        @triggered="toggleOpen(key)"
      >
        <div class="s-payment-options__item-content">
          <div class="s-payment-options__item-text">
            <p class="a-font_l-m">
              Оплачивайте образовательные услуги токенами&nbsp;— виртуальной
              валютой демо-вуза. Благодаря программе лояльности
              Synergy Friends заработать токены может каждый&nbsp;— достаточно
              лишь приглашать друзей поступать в&nbsp;Университет
              или&nbsp;Колледж.
            </p>
            <p class="a-font_l">
              Управлять токенами можно в&nbsp;Личном кабинете программы,
              а&nbsp;копить и&nbsp;тратить&nbsp;— с&nbsp;помощью карты лояльности.
            </p>
            <p class="a-font_l">Получить карту и&nbsp;зарегистрироваться: friends.example.com</p>
            <MFormMin
              bg-color="red"
              title-class="a-font_h6"
              title="Получить консультацию менеджера"
              btn="Отправить заявку"
              :action-params="[
                {param: 'grcampaign=e_mail_chain_vpo'},
                {param: 'form=pay_education__ndfl'},
              ]"
            />
          </div>
        </div>
      </MAccordionItem>
    </template>
  </MSection>
</template>


<style lang="scss">
@import './SPaymentsOptions.scss';
</style>
