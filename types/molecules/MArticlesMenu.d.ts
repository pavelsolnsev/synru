export interface MArticlesMenu {
  title: string;
  icon: string;
  to: string;
  child?: {
    title: string;
    to: string;
  }[]
}
