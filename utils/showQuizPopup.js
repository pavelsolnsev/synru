import { useQuizParams } from '~/composables/useQuizParams';

export default function showQuizPopup(params = []) {
  const defaultParams = [
    { param:'grcampaign=e_mail_chain_vpo' },
    { param:'form=kviz_podval' },
  ];

  const { setQuizParams } = useQuizParams();

  const { openModal } = useModalStore();

  setQuizParams(Array.isArray(params) ? params : defaultParams);

  openModal('SQuizPopup');
}
