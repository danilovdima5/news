export interface ICarsNewsItem {
  categoryType: string;
  description: string;
  fullUrl: string;
  id: number;
  publishedDate: string;
  title: string;
  titleImageUrl: string;
  url: string;
}

export interface ICarsNewsListResponse {
  news: Array<ICarsNewsItem>;
  totalCount: number;
}

export const DAY_MONTH_YEAR_FORMAT = 'dd:MM:YYYY';