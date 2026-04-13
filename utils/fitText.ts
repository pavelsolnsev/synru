export default function fitText(el: HTMLElement | null | undefined, minSize = 18) {
  if (!el) { return; }

  let fontSize = parseFloat(getComputedStyle(el).fontSize);

  while ((el.scrollWidth > el.clientWidth) && (fontSize > minSize)) {
    fontSize -= 2;

    if (fontSize < minSize) {
      fontSize = minSize;
    }

    el.style.fontSize = fontSize + 'px';
  }

  if (el.scrollWidth > el.clientWidth) {
    el.classList.add('wrap-text');
  }
}
