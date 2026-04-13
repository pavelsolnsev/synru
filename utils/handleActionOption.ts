import { Fancybox } from '@fancyapps/ui';
import { FACULTY_FILTER_OPTION_HELP_FORM } from '~/constants/common';

export default function handleActionOption<T>(data: { action: string, actionData?: T }) {
  const {
    action,
    actionData,
  } = data;

  if (typeof action !== 'string' || action.trim() === '') return;

  const actionMap: ActionMap<T> = {
    [FACULTY_FILTER_OPTION_HELP_FORM]: (data?: T) => {
      Fancybox.show([
        {
          src: data as string,
        },
      ],
      {
        hideScrollbar: true,
        dragToClose: false,
      },
      );
    },
  };

  const actionHandler = actionMap[action];

  if (!actionHandler) return;

  actionHandler(actionData);
}

interface ActionMap<U> {
  [key: string]: (data?: U) => void;
};
