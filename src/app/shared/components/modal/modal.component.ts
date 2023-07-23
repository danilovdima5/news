import { Component, ChangeDetectionStrategy, Input, inject } from '@angular/core';
import { ModalsService } from '../../../core/modal-container/modals.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ModalComponent {
  @Input({ required: true }) title!: string;

  private readonly modalsService = inject(ModalsService);

  dismiss(): void {
    this.modalsService.dismiss();
  }
}
