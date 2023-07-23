import { ICarsNewsItemPreview } from "../../cars-news/list/cars-news-list.model";

export type INewNewsForm = Pick<
  ICarsNewsItemPreview, 'title' | 'description'
>