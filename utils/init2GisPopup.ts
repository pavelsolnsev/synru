import type { RegionCityWithSlug } from '~/types';
import Logo from '~/assets/images/logo/logo.png';

export default function init2GisPopup(city: RegionCityWithSlug) {
  const regionsBase = typeof import.meta !== 'undefined' && import.meta.env?.NUXT_PUBLIC_REGION_IMAGES_BASE
    ? String(import.meta.env.NUXT_PUBLIC_REGION_IMAGES_BASE).replace(/\/$/, '')
    : '';
  const cityImgUrl = regionsBase ? `${regionsBase}/` : '';
  const cityKey = city.key;
  const cityName = city.value;
  const citySlug = city.slug;
  const cityPhoto = cityImgUrl ? `${cityImgUrl}${cityKey}.webp` : '/img/header/brand-logo.svg';

  const popup = [
    `<div class="m-map-popup">`,
    `<div class="m-map-popup__images"><img src="${cityPhoto}" alt="${cityName}" itemprop="image">`,
    `<img src="${Logo}" alt="" itemprop="image"></div>`,
    `<div class="s-regions__branch"><span class="s-regions__branch-name a-font_xl-m">${cityName}, ${city.region}</span><div class="s-regions__branch-params a-font_xs"><span class="s-regions__branch-param"><span class="s-regions__branch-address">${city.address}</span></span><span class="s-regions__branch-param"><span class="s-regions__branch-emails"><a href="mailto:info@university.example">info@university.example</a>${city.email ? `<a href="mailto:${city.email}">${city.email}</a>` : ''}</span></span>`,
    `<span class="s-regions__branch-param"><span class="s-regions__branch-phones">${city.phone_main ? `<a href="tel:${city.phone_main}">${city.phone_main}</a>` : ''}<a href="tel:88005553535">8 800 555-35-35</a></span></span></div><div class="s-regions__branch-btns"><button class="a-btn a-btn--primary a-btn--sm a-font_s-m a-btn--red s-regions__branch-modal" onclick="window.showRegionForm()">Поступить</button><a class="a-btn a-btn--third a-btn--sm a-font_s-m a-btn--rect a-btn--white s-regions__branch-link" href="/about/branches/${citySlug}/">Подробнее</a></div></div>`,
    `<span class='m-map-popup__close'></span>`,
    `</div>`,
  ].join('');

  return popup;
};
