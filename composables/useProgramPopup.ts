import { NOT_FREE_FACULTY_ID, FREE_COURSE_DIRECTION_ID } from '~/constants/common';
import type { ProgramCard } from '~/types/ProgramCard';

interface PopupData {
  name: string;
  slug: string;
  level: string;
  faculty: string;
  routeName: string;
  freeStart: boolean;
  triggers: Array<{ title: string; content?: string | string[] }>;
  learningProgram: Array<{ title: string; description?: string; text?: string }>;
  whatLearn: Array<{ title: string; description?: string; text?: string }>;
  isFree?: boolean;
}

type PopupResponseData = {
  attributes?: {
    custom_field_values?: Record<string, unknown>[];
  };
};

type PopupInstance = { open: () => void; close: () => void };

export function useProgramPopup(routeName: string) {
  const programPopup = useTemplateRef<PopupInstance>('programPopup');
  const coursePopup = useTemplateRef<PopupInstance>('coursePopup');
  const popupData = shallowRef<PopupData>({} as PopupData);

  const cachedPopupData = new Map<string, { fields: unknown[]; directionId?: string }>();

  async function fetchPopupData(type: string, id: string) {
    const key = `${type}-${id}`;
    if (cachedPopupData.has(key)) return cachedPopupData.get(key)!;

    const { data } = await useFetch(`/api/filter-popup/${type}/${id}`, {
      key: `filter-popup-${key}`,
      watch: false,
      deep: false,
    });

    const responseData = data.value?.data as PopupResponseData | PopupResponseData[] | undefined;
    const normalizedData = Array.isArray(responseData) ? responseData[0] : responseData;

    const result = {
      fields: normalizedData?.attributes?.custom_field_values || [],
      directionId: data.value?.included?.find((i) => i.type === 'directions')?.id,
    };

    cachedPopupData.set(key, result);
    return result;
  }

  function buildTriggers(program: ProgramCard, triggersData: ReturnType<typeof mapCustomFields>['program_triggers']) {
    const formValues = Object.values(program.forms).map((f) => f.text);

    if (program.type === 'programs') {
      return [
        { title: 'Срок обучения', content: triggersData?.at(0)?.duration },
        { title: 'Уровень', content: program.level.text },
        { title: 'Формат', content: formValues },
        { title: 'Результат', content: triggersData?.at(0)?.result },
        { title: 'Карьера', content: triggersData?.at(0)?.career },
      ];
    }

    return [
      { title: 'Срок обучения', content: triggersData?.at(0)?.duration_months },
      { title: 'Уровень', content: program.level.text },
      { title: 'Длительность', content: triggersData?.at(0)?.duration_hours },
      { title: 'Формат', content: formValues },
    ];
  }

  async function showPopup(program: ProgramCard) {
    const { fields, directionId } = await fetchPopupData(program.type, program.id);
    const { course_triggers, program_triggers, learning_program, what_learn } = mapCustomFields(fields);

    const triggersSource = program.type === 'programs' ? program_triggers : course_triggers;

    popupData.value = {
      name: program.name,
      slug: program.link,
      level: program.level.text,
      faculty: program.faculty.text,
      routeName,
      freeStart: String(program.faculty.value) !== NOT_FREE_FACULTY_ID,
      triggers: buildTriggers(program, triggersSource),
      learningProgram: learning_program,
      whatLearn: what_learn,
      ...(program.type === 'courses' && { isFree: directionId === FREE_COURSE_DIRECTION_ID }),
    };

    if (program.type === 'programs') {
      programPopup.value?.open();
    } else {
      coursePopup.value?.open();
    }
  }

  return { popupData, showPopup };
}
