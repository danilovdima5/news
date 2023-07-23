import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ICarsNewsItemPreview } from '../cars-news-list.model';

@Component({
  selector: 'app-cars-news-list-item',
  templateUrl: './cars-news-list-item.component.html',
  styleUrls: ['./cars-news-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarsNewsListItemComponent {
  @Input({ required: true }) item!: ICarsNewsItemPreview;
  @Input({ required: true }) isLast!: boolean;

  @Output() intersected = new EventEmitter<void>();
}
