import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';

import { ModalComponent } from '../../../shared/components';
import { ModalsService } from '../../../core/modal-container/modals.service';

export interface ICarsNewsSuccessValue {
  image: string;
  description: string;
}

@Component({
  selector: 'app-cars-news-new-success',
  templateUrl: './cars-news-new-success.component.html',
  styleUrls: ['./cars-news-new-success.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ModalComponent]
})
export class CarsNewsNewSuccessComponent {
  @Input({ required: true }) value!: ICarsNewsSuccessValue;

  private readonly __modalsService = inject(ModalsService);

  onOkay() {
    this.__modalsService.dismiss();
  }
}
