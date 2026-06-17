export interface FeedParameter {
  title: string;
  value: string;
}

export interface FeedItem {
  id: string;
  title: string;
  description: string;
  link: string;
  image_link: string;
  mpn: string;
  availability: string;
  price: string;
  parametrs?: FeedParameter[];
  titleHead?: string;
  text?: string;
  category?: string;
  orientedImage?: string;
}
