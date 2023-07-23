import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { CarsNewsListService } from './cars-news-list.service';
import { DateLabelComponent } from '../core/date-label/date-label.component';
import { IntersectionObservableDirective } from '../core/intersection-observer/intersection-observable.directive';

@Component({
  selector: 'app-cars-news-list',
  templateUrl: './cars-news-list.component.html',
  styleUrls: ['./cars-news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CarsNewsListService],
  imports: [NgFor, NgIf, DateLabelComponent, IntersectionObservableDirective],
  standalone: true
})
export class CarsNewsListComponent {
  public readonly list = toSignal(this.service.list$, {
    initialValue: []
  });

  constructor(
    private readonly service: CarsNewsListService
  ) {}

  goToNextPage() {
    this.service.goToNextPage();
  }
}
