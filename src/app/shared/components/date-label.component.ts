import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { DAY_MONTH_YEAR_FORMAT } from '../../core/models';

@Component({
  selector: 'app-date-label',
  template: `
    {{ date | date : DAY_MONTH_YEAR_FORMAT }}
  `,
  styles: [`
    :host {
      background: var(--black-05);
      border-radius: 1.5625rem;
      padding: 0.5rem 0.75rem;
      width: fit-content;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DatePipe]
})
export class DateLabelComponent {
  @Input({required: true}) date!: string;

  public readonly DAY_MONTH_YEAR_FORMAT = DAY_MONTH_YEAR_FORMAT;
}
