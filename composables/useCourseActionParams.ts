import { FREE_COURSE_DIRECTION_NAME } from '~/constants/common';
import { THANKS } from '~/constants/routes';
import type { Nullable } from '~/types';

interface useCourseActionParamsOptions {
  defaultParams?: { 'param': string }[];
  directionName: MaybeRef<Nullable<string>>;
  courseSlug: MaybeRef<string>;
}

export function useCourseActionParams(options: useCourseActionParamsOptions) {
  const {
    defaultParams = [
      { param: 'grcampaign=e_mail_chain_vpo' },
      { param: 'form=foreign_entrant' },
      { param: 'level=Профессии сайт' },
    ],
    directionName,
    courseSlug,
  } = options;

  const actionParams = computed(() => {
    const params = [...defaultParams];

    const isFree = isRef(directionName) ? directionName.value === FREE_COURSE_DIRECTION_NAME : directionName === FREE_COURSE_DIRECTION_NAME;

    if (isFree) {
      const hostname = import.meta.server
        ? useNuxtApp().ssrContext?.event.node.req.headers.host
        : new URL(window.location.href).hostname;

      const path = `${THANKS}?free_${isRef(courseSlug) ? courseSlug.value : courseSlug}`;

      const returnUrl = new URL(path, `https://${hostname}`).href;

      params.push({
        param: `link=${returnUrl}`,
      }, {
        param: `ignore-thanksall=true`,
      });
    }

    return params;
  });

  return actionParams;
}
