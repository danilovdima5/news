import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { CarsNewsListService } from './cars-news-list.service';
import { CardNewsPageComponent } from '../cars-news-page.abstract';

@Component({
  selector: 'app-cars-news-list',
  templateUrl: './cars-news-list.component.html',
  styleUrls: ['./cars-news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CarsNewsListService]
})
export class CarsNewsListComponent extends CardNewsPageComponent {
  private readonly __service = inject(CarsNewsListService);

  public readonly mainList = toSignal(this.__service.mainList$, {
    initialValue: []
  });

  public readonly selfMadeList = toSignal(this.__service.selfMadeList$, {
    initialValue: []
  });

  public readonly isLoading = toSignal(this.__service.isLoading$);

  public goToNextPage() {
    this.__service.goToNextPage();
  }
}
