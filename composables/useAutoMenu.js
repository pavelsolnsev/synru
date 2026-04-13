// автогенерация меню: возвращает список с заголовками со ссылками на разделы
export function useAutoMenu(containerSelector, menuItemTags = 'h2, h3, h4') {
  const headings = ref([]);

  onMounted(() => {
    let mainContent = document.querySelector(containerSelector);

    if (mainContent) {
      let hs = mainContent.querySelectorAll(menuItemTags);
      headings.value = [];

      try {
        for (let i = 0; i < hs.length; i++) {
          let text = hs[i].innerText,
            href = `h_caption_${i}`;

          hs[i].setAttribute('id', href);

          const link = window.location.protocol + '//' + window.location.host + window.location.pathname + '#' + href;

          headings.value.push({ text, link });
        }
      } catch(e) {
        console.error(e);
      }
    }
  });

  return headings;
}
