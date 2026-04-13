import { synergyApi } from '~/utils/mediaCdn';
<script setup lang="ts">
const title = 'Официальная <br>информация <br>о&nbsp;приёме <br><span class="s-form-info__grey a-font_h5">на 2025/26 год</span>';

interface Props {
  actionParams?: { param: string }[]
}

const {
  actionParams = [{ param: 'form=priemnaya_komissiya_info' }],
} = defineProps<Props>();
</script>

<template>
  <SForm
    class="s-form-info"
    image-lg=synergyApi('uploads/content/s-form/12_lg.webp')
    image-md=synergyApi('uploads/content/s-form/12_md.webp')
    image-sm=synergyApi('uploads/content/s-form/12_sm.webp')
    form-title="Узнайте о свободных местах в&nbsp;2025/26&nbsp;году"
    btn-text="Подать заявку"
    :title
    :action-params
  />
</template>

<style lang="scss" scoped>
@import './SAdmissionCommitteeForm.scss';
</style>
