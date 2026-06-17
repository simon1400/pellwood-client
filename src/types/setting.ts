import type { BlocksContent } from '@strapi/blocks-react-renderer';

export interface Setting {
  title?: string;
  description: string;
  footer?: Footer[];
  metaCatalog?: {
    title: string,
    description: string
  };
  [key: string]: any;
}

export interface Footer {
  title?: string;
  content: BlocksContent;
}