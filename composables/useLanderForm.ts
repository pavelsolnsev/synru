import { type z } from 'zod/v4';
import { FetchError } from 'ofetch';
import { Fancybox } from '@fancyapps/ui';
import type { FormData, FormErrors } from '~~/utils/validators';
import type { BaseLanderData } from '~~/utils/generateLanderData';

interface useFormOptions<T = FormData> {
  initialFormData: T;
  formSchema: z.Schema<T>;
  baseLanderData?: BaseLanderData;
  onSuccess?: () => void;
  onError?: (error: FetchError | unknown) => void;
}

export function useLanderForm<T extends object = FormData>(options: useFormOptions<T>) {
  const REQUIRED_LANDER_SERVICE_FIELDS = [
    'form',
    'version',
    'alias',
  ] as const;

  const {
    initialFormData,
    formSchema,
    baseLanderData = {} as BaseLanderData,
    onSuccess = () => void 0,
    onError = onErrorDefaultHander,
  } = options;

  const yaCounterId = computed(() => Number(useRuntimeConfig().public.yaMetrikaId) || 0);

  if ('name' in initialFormData) {
    const storedName = window?.localStorage.getItem('name');
    const testStoredName = storedName && storedName !== 'empty';

    initialFormData.name = testStoredName ? storedName : (initialFormData.name === 'empty' ? 'empty' : '');
  }

  if ('phone' in initialFormData) {
    initialFormData.phone = window?.localStorage.getItem('phone') || '';
  }

  if ('email' in initialFormData) {
    initialFormData.email = window?.localStorage.getItem('email') || '';
  }

  checkAggreement(initialFormData as Record<string, unknown>);

  const formErrors = ref<Partial<Record<keyof T, string>>>({});
  const formData = ref<T>({ ...initialFormData as T });
  const isPending = ref<boolean>(false);

  let landerData: Ref<Record<string, string>> = shallowRef({});

  if ('personalDataAgree' in initialFormData && initialFormData.personalDataAgree === false) {
    if ('name' in initialFormData) {
      watch(() => formData.value.name, () => {
        formData.value.personalDataAgree = true;
      }, { once: true });
    }

    if ('phone' in initialFormData) {
      watch(() => formData.value.phone, () => {
        formData.value.personalDataAgree = true;
      }, { once: true })
    }

    if ('email' in initialFormData) {
      watch(() => formData.value.email, () => {
        formData.value.personalDataAgree = true;
      }, { once: true })
    }
  }

  async function onSubmit() {
    if (!validateFormData(formSchema)) return;

    saveDataToStorage<typeof formData>(formData);

    try {
      generate(baseLanderData);

      const missingRequiredFields: string[] = [];

      REQUIRED_LANDER_SERVICE_FIELDS.forEach((fieldName) => {
        if (!landerData.value[fieldName]) {
          missingRequiredFields.push(fieldName);
        }
      });

      if (missingRequiredFields.length) {
        console.error(`Required lander fields is missing: ${missingRequiredFields.join(', ')}`);
      }

      isPending.value = true;

      const response = await $fetch<Promise<{ success: boolean, result: unknown }>>('/api/send-lander', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...formData.value, ...landerData.value}),
      });

      if (response?.success) {
        Fancybox.close();
        sendGoals(yaCounterId, landerData);

        onSuccess();
      }
    }
    catch (error) {
      onError(error);
    }
    finally {
      isPending.value = false;
    }
  }

  function validateFormData(formSchema = options.formSchema): boolean {
    const result = formSchema.safeParse(formData.value);

    if (!result.success) {
      formErrors.value = result.error.issues.reduce(
        (acc: FormErrors, error: z.core.$ZodIssue) => {
          const key = error.path[0] as keyof FormData;
          acc[key] = error.message;
          return acc;
        },
        {} as FormErrors,
      );

      return false;
    }

    formErrors.value = {};
    return true;
  }

  function onErrorDefaultHander(error: unknown) {
    if (!(error instanceof FetchError)) {
      console.error(error);
      return;
    }

    formErrors.value = error.data?.data;
  }

  function generate(baseLanderData: BaseLanderData) {
    landerData.value = generateLanderData(baseLanderData as BaseLanderData)
  }

  const { openModal } = useModalStore();

  const keys = useMagicKeys();
  const shiftCtrl = keys['Shift+Ctrl'];

  function onClick(event: Event) {
    if (shiftCtrl.value && event.target instanceof HTMLInputElement && event.target?.tagName === 'INPUT') {
      generate(baseLanderData);
      
      openModal('SLanderInfo', {
        data: landerData.value,
      });
    }
  }

  return {
    formData,
    formErrors,
    onSubmit,
    isPending,
    landerData: readonly(landerData),
    generate,
    onFormClick: onClick,
  };
}

interface SendGoalToYaCounterOptions {
  yaCounterId: MaybeRefOrGetter<number>;
  landerData: Ref<Record<string, string>>;
  goalName?: string;
}

type SendGoalsOptions = Omit<SendGoalToYaCounterOptions, 'goalName'>

function sendGoals(yaCounterId: SendGoalsOptions['yaCounterId'], landerData: SendGoalsOptions['landerData']) {
  if (!toValue(yaCounterId)) return;

  const goalName = getGoalName(landerData);

  if (import.meta.env.DEV) {
    console.log({ goalName, version: landerData.value.version, form: landerData.value.form, alias: landerData.value.alias });
  }

  if (goalName) {
    sendGoalToYaCounter({
      yaCounterId,
      landerData,
      goalName,
    });
  }

  if (landerData.value.form !== 'form-feedback') {
    sendGoalToYaCounter({ yaCounterId, landerData });
  }
}

function sendGoalToYaCounter(options: SendGoalToYaCounterOptions) {
  const yaCounterId = toValue(options.yaCounterId);
  const { landerData, goalName = 'lead' } = options;

  window?.ym(yaCounterId, 'reachGoal', goalName, {
    URL: landerData.value.url_location,
    version: landerData.value.version,
    form: landerData.value.form,
    alias: landerData.value.alias,
  });
}

function getGoalName(landerData: Ref<Record<string, string>>) {
  const goalsMap = {
    index09092022: 'ab_main',
    designnew: 'ab_main',
    abiturientam: 'ab_abiturientam',
    abiturnew: 'ab_abiturientam',
    abiturnew_new: 'ab_abiturientam',
    priemnaya_komissiya: 'ab_priemnaya_komissiya',
    priemnaya_komissiya_solo: 'ab_priemnaya_komissiya',
    priemnaya_komissiya_widget: 'ab_priemnaya_komissiya',
    priemnaya_komissiya_v2: 'ab_priemnaya_komissiya',
    college: 'ab_college',
    new: 'ab_college',
    abiturientam_newdesign: 'ab_abiturientam',
    abiturientam_olddesign: 'ab_abiturientam',
    faculties_widget: 'ab_faculties',
    upravleniya_widget: 'ab_upravleniya',
    psixologiia_widget: 'ab_psixologiia',
    college_widget: 'ab_college',
    programmyi_obucheniya_widget: 'ab_programmyi_obucheniya',
    cybersport_widget: 'ab_cybersport',
    sestrinskoe_delo_college_widget: 'ab_sestrinskoe_delo_college',
    pedagogika_widget: 'ab_pedagogika',
    magistracy_widget: 'ab_magistracy',
    faculties_solo: 'ab_faculties',
    upravleniya_solo: 'ab_upravleniya',
    psixologiia_solo: 'ab_psixologiia',
    college_solo: 'ab_college',
    programmyi_obucheniya_solo: 'ab_programmyi_obucheniya',
    cybersport_solo: 'ab_cybersport',
    sestrinskoe_delo_college_solo: 'ab_sestrinskoe_delo_college',
    pedagogika_solo: 'ab_pedagogika',
    magistracy_solo: 'ab_magistracy',
  };

  const key = `${landerData.value.alias}_${landerData.value.version}` in goalsMap ? `${landerData.value.alias}_${landerData.value.version}` : landerData.value.version;

  const goalName = key in goalsMap ? goalsMap[key as keyof typeof goalsMap] : landerData.value?.target_name

  return goalName || '';
}

function checkAggreement(initialFormData: Record<string, unknown>) {
  if (!('personalDataAgree' in initialFormData)) return;

  const hasName = Boolean(toValue(initialFormData.name));
  const hasPhone = Boolean(toValue(initialFormData.phone));
  const hasEmail = Boolean(toValue(initialFormData.email));

  if (hasName && hasEmail || hasName && hasPhone) {
    initialFormData.personalDataAgree = true;
  }
}

function saveDataToStorage<T extends Ref = Ref<FormData>>(formData: T) {
  if (formData.value.name !== 'empty') {
    window?.localStorage.setItem('name', formData.value.name);
  }

  if (formData.value.phone) {
    window?.localStorage.setItem('phone', formData.value.phone);
  }

  if (formData.value.email) {
    window?.localStorage.setItem('email', formData.value.email);
  }
}
