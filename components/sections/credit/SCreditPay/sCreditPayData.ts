import Image1 from '~/assets/images/credit/credit_pay/icon-1.svg?url';
import Image2 from '~/assets/images/credit/credit_pay/icon-2.svg?url';
import Image3 from '~/assets/images/credit/credit_pay/icon-3.svg?url';

const creditPay1 = [
  {
    title: 'Ставка 3% годовых',
    text: 'Ставка&nbsp;— 3% годовых, остальное субсидирует государство',
    image: Image1,
  },
  {
    title: 'Срок кредитования 15&nbsp;лет',
    text: 'Кредит может оформить студент любой формы обучения старше 14&nbsp;лет',
    image: Image2,
  },
  {
    title: 'Платёж от&nbsp;200 ₽/мес.',
    text: 'Во&nbsp;время учёбы ты платишь только проценты, а&nbsp;основную часть кредита можно погашать в&nbsp;течение 15 лет после окончания обучения',
    image: Image3,
  },
];

const creditPay2 = [
  {
    title: 'Паспорт&nbsp;РФ',
    text: 'с&nbsp;отметкой о&nbsp;постоянной регистрации (а&nbsp;также справка о&nbsp;временной регистрации, если проживаете не&nbsp;по&nbsp;месту регистрации)',
    icon: 'passport',
  },
  {
    title: 'Договор на платное обучение в демо-вузе',
    text: 'оригинал или&nbsp;заверенная копия, с&nbsp;печатью и&nbsp;подписью представителя университета',
    icon: 'contract',
  },
  {
    title: 'Квитанция об&nbsp;оплате',
    text: 'или&nbsp;счёт с&nbsp;указанной в&nbsp;нём суммой оплаты за&nbsp;обучение',
    icon: 'receipt',
  },
];

const creditPay3 = [
  {
    title: 'Свидетельство о рождении',
  },
  {
    title: 'Паспорт родителя/законного представителя',
  },
  {
    title: 'Согласие родителя или&nbsp;законного представителя',
    text: 'на&nbsp;заключение кредитного договора, обработку персональных данных, получение информации в&nbsp;бюро кредитных историй и&nbsp;передачу сведений о&nbsp;несовершеннолетнем в&nbsp;Минобрнауки РФ или&nbsp;Минпросвещения&nbsp;РФ',
  },
];

export {
  creditPay1,
  creditPay2,
  creditPay3,
};
