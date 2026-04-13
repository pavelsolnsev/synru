interface AccordionTitle {
  text: string;
  href?: string;
  className?: string;
}

interface AccordionContent {
  text?: string;
  className?: string;
}

export interface AccordionItem {
  title: AccordionTitle;
  content?: AccordionContent;
  customContent?: unknown;
  icon?: string;
  isOpen?: boolean;
  itemKey: string;
  external?: boolean;
}

export interface AccordionItemWithSchema extends AccordionItem {
  schema?: 'faq' | 'list' | '';
}
