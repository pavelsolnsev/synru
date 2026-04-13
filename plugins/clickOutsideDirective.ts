import { defineNuxtPlugin } from '#imports';
import { clickOutsideDirective } from './handlers/clickOutsideDirective';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', clickOutsideDirective);
});
