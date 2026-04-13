/**
 * Calculate version of faculty popup based on page path and faculty slug.
 * CD - Commercial Department
 *
 * @param {string} pagePath - path of the current page.
 * @param {string} facultySlug - slug of the faculty in popup.
 * @returns {string} version of the faculty popup.
 *
 * @example calculateFacultyPopupVersion('/about', 'psychology');
 *
 */
export function calculateFacultyPopupVersion(pagePath: string, facultySlug: string): string {
  const BASE_ROUTES = {
    '/': 'Главная',
    '/abiturientam': 'Абитуриентам',
    '/abiturientam/faculties': 'Факультеты',
    '/abiturientam/programmyi_obucheniya': 'Специальности',
    '/about': 'Об университете',
    '/abiturientam/college': 'Колледж',
    '/abiturientam/pervoe_vysshee': 'Бакалавриат',
    '/abiturientam/speczialitet': 'Специалитет',
    '/abiturientam/second_highest': 'Второе высшее',
    '/abiturientam/postgraduate_study': 'Аспирантура',
    '/abiturientam/ordinatura': 'Ординатура',
    '/abiturientam/priemnaya_komissiya': 'Приемная комиссия',
    '/abiturientam/magistracy': 'Магистратура',
  } as const;

  /** CD2 внутренний тикет ID-29906 */
  const ONLY_FACULTIES_CD2 = {
    medicine: 'Медицинский факультет',
    yuridicheskij: 'Юриспруденция',
    it: 'Информационные технологии',
    programmirovanie: 'Факультет программирования',
    upravleniya: 'Менеджмент',
    fakultet_blokchejna_i_kriptovalyut: 'Факультет искусственного интеллекта',
    fakultet_iskusstvennogo_intellekta: 'Факультет блокчейна и криптовалют',
    fakultet_kiberbezopasnosti: 'Факультет кибербезопасности',
  } as const;

  const ONLY_ROUTES_CD2 = { ...BASE_ROUTES } as const;

  /** CD3 внутренний тикет OP-5505 */
  const ONLY_FACULTIES_CD3 = {
    economic: 'Экономика',
    psychology: 'Психология',
    design: 'Дизайн',
    pedagogika: 'Педагогика',
    pr: 'Реклама',
    linguist: 'Лингвистика',
    artacademy: 'Арт-факультет',
    sportmanager: 'Факультет спорта',
  } as const;

  const ONLY_ROUTES_CD3 = { ...BASE_ROUTES } as const;

  const isSuitable = (
    pagePath in ONLY_ROUTES_CD2 && facultySlug in ONLY_FACULTIES_CD2
  ) || (
    pagePath in ONLY_ROUTES_CD3 && facultySlug in ONLY_FACULTIES_CD3
  );

  return isSuitable ? facultySlug : '';
}
