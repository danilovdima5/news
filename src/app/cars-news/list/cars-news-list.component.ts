import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { CarsNewsListService } from './cars-news-list.service';

@Component({
  selector: 'app-cars-news-list',
  templateUrl: './cars-news-list.component.html',
  styleUrls: ['./cars-news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CarsNewsListService]
})
export class CarsNewsListComponent {
  private readonly __service = inject(CarsNewsListService);

  public readonly list = toSignal(this.__service.list$, {
    initialValue: []
  });

  public readonly isLoading = toSignal(this.__service.isLoading$);

  goToNextPage() {
    this.__service.goToNextPage();
  }
}
