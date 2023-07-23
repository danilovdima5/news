export const DAY_MONTH_YEAR_FORMAT = 'dd:MM:YYYY';

export interface IPagedItems<T> {
  [page: number]: T[];
}
