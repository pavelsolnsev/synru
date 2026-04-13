export default function showFeedBackPopup() {
  const { openModal } = useModalStore();

  openModal('SFormFeedback');
}
