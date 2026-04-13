<script setup lang="ts">
import { BLANK_EGE, BLANK_OGE } from '~/constants/articles';

interface Props {
  routeName?: string;
}

const {
  routeName = '',
} = defineProps<Props>();

const OGE_ROUTE_NAME = 'edu_blanki_oge';

const IS_OGE_PAGE = routeName === OGE_ROUTE_NAME;
</script>

<template>
  <SEduWrapper :route-name>
    <template #top>
      <SDocumentShow
        v-if="IS_OGE_PAGE"
        :link="BLANK_OGE"
        title="Бланки ОГЭ в 2026 году"
      >
        <template #description>
          <p>
            <span style="background-color: yellow;">
              Обратите внимание, что эти бланки предназначены исключительно для ознакомительных целей и&nbsp;не&nbsp;могут использоваться во&nbsp;время экзамена!
            </span>
          </p>
          <p>
            Заполнение всех бланков ОГЭ необходимо производить с&nbsp;помощью гелевой или капиллярной ручки, содержащей черные чернила.
          </p>
          <hr>
          <p>
            Этот файл можно скачать
            <a
              :href="BLANK_OGE"
              target="_blank"
            >
              тут
            </a>
          </p>
        </template>
      </SDocumentShow>

      <SDocumentShow
        v-else
        :link="BLANK_EGE"
        title="Бланки ЕГЭ в 2026 году"
      >
        <template #description>
          <p>Официальные макеты бланков для Единого государственного экзамена 2026 года. Чтобы избежать потери времени во&nbsp;время экзамена, рекомендуется заранее ознакомиться с&nbsp;их&nbsp;структурой.</p>
          <p>В&nbsp;комплект входят: </p>
          <ul>
            <li>Бланк регистрации&nbsp;— для внесения личных данных.</li>
            <li>Бланк ответов №&nbsp;1&nbsp;— для заданий с&nbsp;коротким ответом.</li>
            <li>Бланк ответов №&nbsp;2 (лист 1 и&nbsp;лист 2)&nbsp;— для развернутых ответов.</li>
            <li>Дополнительный бланк ответов №&nbsp;2&nbsp;— предоставляется, если основного листа недостаточно для ответа.</li>
          </ul>
          <p>Основные правила заполнения: </p>
          <ol>
            <li>Используйте исключительно черную гелевую или капиллярную ручку.</li>
            <li>Пишите заглавными печатными буквами по&nbsp;образцу в&nbsp;верхней части бланка (кириллица, латиница, цифры).</li>
            <li>Следите за&nbsp;аккуратностью&nbsp;— каждая цифра и&nbsp;буква должны находиться строго в&nbsp;своем окне. </li>
            <li>В&nbsp;развернутых ответах на&nbsp;Бланке №&nbsp;2 обязательно указывайте номер задания (например, 31) перед ответом. </li>
            <li>Обратная сторона бланков не&nbsp;заполняется&nbsp;— все данные вносятся только на&nbsp;лицевой стороне.</li>
          </ol>
          <p>
            Этот файл можно скачать
            <a
              :href="BLANK_EGE"
              target="_blank"
            >
              тут
            </a>
          </p>
        </template>
      </SDocumentShow>
    </template>
    <template #bottom>
      <SEduWrapperBottom />
    </template>
  </SEduWrapper>
</template>
