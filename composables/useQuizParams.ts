// useQuizParams.ts
const baseParams: Ref<{ param: string }[]> = shallowRef([
  { param:'grcampaign=e_mail_chain_vpo' },
  { param:'form=kviz_podval' },
]);

const key = shallowRef(0);

export function useQuizParams() {
  return {
    params: readonly(baseParams),
    key,
    setQuizParams,
  }
}

function setQuizParams(params: MaybeRef<{ param: string }[]> = [
  { param:'grcampaign=e_mail_chain_vpo' },
  { param:'form=kviz_podval' },
]) {
  baseParams.value = toValue(params);
  key.value++;
}

