import { setup } from '@storybook/vue3';
import '../components/atoms/AButton/AButton.scss';
import '../components/atoms/AInput/AInput.scss';
import '../components/atoms/ALinkSocial/ALinkSocial.scss';
import '../components/atoms/ASelect/ASelect.scss';
import '../components/molecules/MSection/MSection.scss';
import '../components/sections/SForm/SForm.scss';
import 'swiper/swiper-bundle.css';
import { h } from 'vue';
import * as components from './components';
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm';
import { FANCYBOX_RU } from '../utils/fancybox.ru';
import * as jest from 'jest-mock';
import { clickOutsideDirective } from '../plugins/handlers/clickOutsideDirective';
import { phoneToLinkFunc } from '../plugins/handlers/phoneToLink';

window.jest = jest;

window.Fancybox = Fancybox;

const fancyboxOpts = {
  l10n: FANCYBOX_RU,
  autoFocus: false,
  hideScrollbar: false,
};

Object.assign(window.Fancybox.defaults, fancyboxOpts);

Fancybox.bind('[data-fancybox]', fancyboxOpts);

setup((app) => {
  for (const prop in components) {
    const component = components[prop];
    if (component) {
      app.component(component.name || component.__name || prop, component);
    }
  }
  app.directive('click-outside', clickOutsideDirective);
  app.config.globalProperties.$phoneToLink = phoneToLinkFunc;
  app.component('NuxtLink', (props, children) => {
    return h('a', { ...props, href: props.to }, children.slots.default());
  });
});

