import { phoneToLinkFunc } from './handlers/phoneToLink';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      phoneToLink: phoneToLinkFunc,
    },
  };
});
