export function useFitText(ref: string, minFontSize: number = 18) {
  const textElement = useTemplateRef(ref);

  onMounted(() => {
    fitText(textElement.value as HTMLElement, minFontSize);
  });
}
