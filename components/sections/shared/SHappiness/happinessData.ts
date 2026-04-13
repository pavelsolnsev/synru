import Circle from '~/assets/images/s_happiness/circle.svg?url';
import Star from '~/assets/images/s_happiness/star.svg?url';
import Polygon from '~/assets/images/s_happiness/polygon.svg?url';
import Square from '~/assets/images/s_happiness/square.svg?url';

const defaultLms = typeof import.meta !== 'undefined' && import.meta.env?.NUXT_PUBLIC_LMS_ORIGIN
  ? String(import.meta.env.NUXT_PUBLIC_LMS_ORIGIN).replace(/\/$/, '')
  : '';

const curatorCards = [{
  title: 'В&nbsp;личном кабинете LMS (демо)',
  link: defaultLms ? 'Перейти в кабинет' : 'Кабинет недоступен в демо',
  href: defaultLms ? `${defaultLms}/` : '#',
  img: Circle,
}, {
  title: 'Написав на&nbsp;почту персональному куратору',
  link: 'curator@university.example',
  href: 'mailto:curator@university.example',
  img: Star,
}, {
  title: 'Написав запрос на&nbsp;почту в&nbsp;службу поддержки',
  link: 'support@university.example',
  href: 'mailto:support@university.example',
  img: Polygon,
}, {
  title: 'Связавшись с&nbsp;диспетчером по&nbsp;общему номеру',
  link: '8 (800) 555-35-35',
  href: 'tel:88005553535',
  img: Square,
}];

const centerCards = [{
  title: 'г. Москва, ул. Примерная, д.&nbsp;1, офис 101',
  text: 'Демо-адрес А',
}, {
  title: 'г. Москва, пр-т Демонстрационный, д.&nbsp;10',
  text: 'Демо-адрес Б',
}, {
  title: 'г. Москва, наб. Учебная, д.&nbsp;5',
  text: 'Демо-адрес В',
}, {
  title: 'г. Москва, пер. Портфельный, д.&nbsp;2',
  text: 'Демо-адрес Г',
}];

export {
  centerCards,
  curatorCards,
};
