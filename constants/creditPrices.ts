import Rub from '~/assets/icons/svg-mono/rub.svg?url';

interface Cost {
  tag: string;
  title: string;
  value: string;
  text: string;
  minPrice: number;
}

export const CREDIT_PRICES: Cost[] = [
  {
    tag: 'Колледж',
    minPrice: 150,
    title: `от 150<img src="${Rub}" class="ico-rub" alt="rub" itemprop="image">/мес.`,
    value: 'college',
    text: `Кредит с&nbsp;господдержкой от&nbsp;«Сбера» или&nbsp;<span class="nobr">«Т-Банка»</span> позволяет начать учиться на&nbsp;программах колледжа бесплатно, а&nbsp;далее платить всего от&nbsp;150&nbsp;<img src="${Rub}" class="ico-rub" alt="rub" itemprop="image"> в&nbsp;месяц`,
  },
  {
    tag: 'Бакалавриат',
    minPrice: 300,
    title: `от 300<img src="${Rub}" class="ico-rub" alt="rub" itemprop="image">/мес.`,
    value: 'pervoe_vysshee',
    text: `Кредит с&nbsp;господдержкой от&nbsp;«Сбера» или&nbsp;<span class="nobr">«Т-Банка»</span> позволяет начать учиться на&nbsp;программах бакалавриата бесплатно, а&nbsp;далее платить всего от&nbsp;300&nbsp;<img src="${Rub}" class="ico-rub" alt="rub" itemprop="image"> в&nbsp;месяц`,
  },
  {
    tag: 'Специалитет',
    minPrice: 300,
    title: `от 300<img src="${Rub}" class="ico-rub" alt="rub" itemprop="image">/мес.`,
    value: 'speczialitet',
    text: `Кредит с&nbsp;господдержкой от&nbsp;«Сбера» или&nbsp;<span class="nobr">«Т-Банка»</span> позволяет начать учиться на&nbsp;программах специалитета бесплатно, а&nbsp;далее платить всего от&nbsp;300&nbsp;<img src="${Rub}" class="ico-rub" alt="rub" itemprop="image"> в&nbsp;месяц`,
  },
  {
    tag: 'Магистратура',
    minPrice: 350,
    title: `от 350<img src="${Rub}" class="ico-rub" alt="rub" itemprop="image">/мес.`,
    value: 'magistracy',
    text: `Кредит с&nbsp;господдержкой от&nbsp;«Сбера» или&nbsp;<span class="nobr">«Т-Банка»</span> позволяет начать учиться на&nbsp;программах магистратуры бесплатно, а&nbsp;далее платить всего от&nbsp;350&nbsp;<img src="${Rub}" class="ico-rub" alt="rub" itemprop="image"> в&nbsp;месяц`,
  },
  {
    tag: 'Аспирантура',
    minPrice: 500,
    title: `от 500<img src="${Rub}" class="ico-rub" alt="rub" itemprop="image">/мес.`,
    value: 'postgraduate_study',
    text: `Кредит с&nbsp;господдержкой от&nbsp;«Сбера» или&nbsp;<span class="nobr">«Т-Банка»</span> позволяет начать учиться на&nbsp;программах аспирантуры бесплатно, а&nbsp;далее платить всего от&nbsp;500&nbsp;<img src="${Rub}" class="ico-rub" alt="rub" itemprop="image"> в&nbsp;месяц`,
  },
  {
    tag: 'Ординатура',
    minPrice: 500,
    title: `от 500<img src="${Rub}" class="ico-rub" alt="rub" itemprop="image">/мес.`,
    value: 'ordinatura',
    text: `Кредит с&nbsp;господдержкой от&nbsp;«Сбера» или&nbsp;<span class="nobr">«Т-Банка»</span> позволяет начать учиться на&nbsp;программах ординатуры бесплатно, а&nbsp;далее платить всего от&nbsp;500&nbsp;<img src="${Rub}" class="ico-rub" alt="rub" itemprop="image"> в&nbsp;месяц`,
  },
  {
    tag: 'Второе высшее',
    minPrice: 300,
    title: `от 300<img src="${Rub}" class="ico-rub" alt="rub" itemprop="image">/мес.`,
    value: 'second_highest',
    text: `Кредит с&nbsp;господдержкой от&nbsp;«Сбера» или&nbsp;<span class="nobr">«Т-Банка»</span> позволяет начать учиться на&nbsp;программах второго высшего бесплатно, а&nbsp;далее платить всего от&nbsp;300&nbsp;<img src="${Rub}" class="ico-rub" alt="rub" itemprop="image"> в&nbsp;месяц`,
  },
  {
    tag: 'Курсы',
    minPrice: 100,
    title: `от 100<img src="${Rub}" class="ico-rub" alt="rub" itemprop="image">/мес.`,
    value: 'professions',
    text: `Кредит с&nbsp;господдержкой от&nbsp;«Сбера» или&nbsp;<span class="nobr">«Т-Банка»</span> позволяет проходить курсы и&nbsp;платить всего от&nbsp;100&nbsp;<img src="${Rub}" class="ico-rub" alt="rub" itemprop="image"> в&nbsp;месяц`,
  },
];
