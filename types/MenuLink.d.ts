export type MenuLinkColor = 'default' | 'red';

export interface MenuLink {
  title: string,
  to: string,
  textColor?: MenuLinkColor,
  bgColor?: MenuLinkColor,
  active?: boolean,
  attributes?: object,
};
