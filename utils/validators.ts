import { z } from 'zod/v4';
import { isValidPhoneNumber } from 'libphonenumber-js/max';

const TEST_PHONE_NUMBERS = [
  '81009999999',
  '71009999999',
  '79009999999',
];

export const formSchema = z.object({
  name: z.string().trim().normalize().regex(/^[^\d]*$/, {
    message: 'Имя не должно содержать цифр',
  }).min(2, {
    error: 'Пожалуйста, введите не меньше 2 символов',
  }),
  phone: z.string({
    error: 'Обязательное поле.',
  }).refine((value) => {

    if (TEST_PHONE_NUMBERS.includes(value.replace(/\D/g, ''))) {
      return true;
    }

    return isValidPhoneNumber(value, 'RU');
  }, {
    error: 'Введите корректный телефон',
  }),
  personalDataAgree: z.boolean().refine((val) => val === true, {
    error: 'Примите Условия обработки персональных данных',
  }),
  comments: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;
export type FormErrors = Partial<Record<keyof FormData, string>>;

export const formSchemaEmailOnly = z.object({
  name: z.string().trim().normalize().regex(/^[^\d]*$/, {
    message: 'Имя не должно содержать цифр',
  }).min(2, {
    error: 'Пожалуйста, введите не меньше 2 символов',
  }),
  email: z.email({
    error: 'Введите корректную почту',
  }),
  personalDataAgree: z.boolean().refine((val) => val === true, {
    error: 'Примите Условия обработки персональных данных',
  }),
});

export type FormDataEmailOnly = z.infer<typeof formSchemaEmailOnly>;
export type FormErrorsEmailOnly = Partial<Record<keyof FormDataEmailOnly, string>>;

export const formSchemaWithEmail = formSchema.extend({
  email: z.email({
    error: 'Введите корректную почту',
  }),
});

export type FormDataWithEmail = z.infer<typeof formSchemaWithEmail>;
export type FormErrorsWithEmail = Partial<Record<keyof FormDataWithEmail, string>>;

export const formFeedbackSchema = formSchema.extend({
  'feedback-status': z.string().trim().normalize().refine((value) => value !== 'Статус', {
    error: 'Обязательное поле.',
  }),
  'feedback-filial': z.string().trim().normalize().refine((value) => value !== 'Филиал', {
    error: 'Обязательное поле.',
  }),
  'feedback-type': z.string().trim().normalize().refine((value) => value !== 'Тип обращения', {
    error: 'Обязательное поле.',
  }),
  'feedback-theme': z.string().trim().normalize().refine((value) => value !== 'Тема обращения', {
    error: 'Обязательное поле.',
  }),
  'feedback-text': z.string().nonempty({
    error: 'Обязательное поле.',
  }).trim().normalize(),
});

export type FormFeedbackData = z.infer<typeof formFeedbackSchema>;
export type FormFeedbackErrors = Partial<Record<keyof FormFeedbackData, string>>;

export const formAskQuestionSchema = formSchema.extend({
  comments: z.string().nonempty({
    error: 'Обязательное поле.',
  }),
});

export type FormAskQuestionData = z.infer<typeof formAskQuestionSchema>;
export type FormAskQuestionErrors = Partial<Record<keyof FormAskQuestionData, string>>;

export const formReviewSchema = z.object({
  name: z.string().trim().normalize().regex(/^[^\d]*$/, {
    message: 'Имя не должно содержать цифр',
  }).min(2, {
    error: 'Пожалуйста, введите не меньше 2 символов',
  }),
  email: z.email({
    error: 'Введите корректную почту',
  }),
  faculty: z.string().refine((value) => value !== 'Факультет').nonempty({
    error: 'Обязательное поле',
  }),
  comments: z.string().min(10),
  rating: z.number(),
  personalDataAgree: z.boolean().refine((val) => val === true, {
    error: 'Примите Условия обработки персональных данных',
  }),
});

export type FormReviewData = z.infer<typeof formReviewSchema>;
export type FormReviewErrors = Partial<Record<keyof FormReviewData, string>>;
