import { Fancybox } from '@fancyapps/ui';
import { FANCYBOX_RU } from '~/utils/fancybox.ru';

export default defineNuxtPlugin(() => {
  window.Fancybox = Fancybox;

  const fancyboxOpts = {
    l10n: FANCYBOX_RU,
    autoFocus: false,
    hideScrollbar: false,
    placeFocusBack: false,
    closeButton: true,
    Html : {
      iframeAttr : {
        autoplay: true,
        allow: 'autoplay; fullscreen',
      },
    },
    on: {
      reveal: (fancybox, slide) => {
        if (slide.$trigger?.dataset?.fancyboxMainclass) {
          fancybox.$container.className =
            fancybox.$container.className +
            ' ' +
            slide.$trigger?.dataset?.fancyboxMainclass;
        }
        if( slide.src.includes('rutube.ru/play/embed') ) {
          slide.el.classList.add('has-rutube');
        }
      },
      done: (fancybox, slide) => {
        if( slide.src.includes('rutube.ru/play/embed') ) {
          const iframe = slide.iframeEl;
          if (iframe) iframe.contentWindow.postMessage( JSON.stringify({ type:'player:play', data:{} }), '*');
        }
      },
    },
  };

  Object.assign(window.Fancybox.defaults, fancyboxOpts);

  Fancybox.bind('[data-fancybox]', fancyboxOpts);
});
