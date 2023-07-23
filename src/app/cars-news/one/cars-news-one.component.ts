import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { CarsNewsOneService } from './cars-news-one.service';
import { DateLabelComponent } from '../../shared/components/date-label/date-label.component';
import { CardNewsPageComponent } from '../cars-news-page.abstract';

@Component({
  selector: 'app-cars-news-one',
  templateUrl: './cars-news-one.component.html',
  styleUrls: ['./cars-news-one.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [CarsNewsOneService],
  imports: [NgIf, AsyncPipe, DateLabelComponent]
})
export class CarsNewsOneComponent extends CardNewsPageComponent {
  public readonly item = toSignal(inject(CarsNewsOneService).item$);
}
