export interface ICarsNewsListResponse {
  news: Array<ICarsNewsItemPreview>;
  totalCount: number;
}

export interface ICarsNewsItemPreview {
  categoryType: string;
  description: string;
  fullUrl: string;
  id: number;
  publishedDate: string;
  title: string;
  titleImageUrl: string;
  url: string;
}