export interface SmartCaptchaOptions {
  sitekey: string;
  invisible: boolean;
  callback: (_token: string) => void;
  shieldPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  hideShield?: boolean;
}
