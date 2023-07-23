import { Component, ViewChild, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { map, skip } from 'rxjs';

import { ModalHostDirective } from './modal-host.directive';

import { ModalsService } from './modals.service';

@Component({
  selector: 'app-modal-container',
  template: `
    <section
      class="modal-container__substrate"
      (click)="dismiss()"
    ></section>
  
    <div
      class="modal-container__modal-wrapper root-element"
      [@openClose]="hasActiveModal() ? 'open' : 'closed'"
    >
      <ng-template modalHost />
    </div>
  `,
  animations: [
    trigger('openClose', [
      state('closed', style({
        transform: 'translateY(300px)',
        opacity: 0
      })),
      state('open', style({
        transform: 'translateY(0px)',
        opacity: 1
      })),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
  ],
  styleUrls: ['./modal-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalContainerComponent {
  @ViewChild(ModalHostDirective) modalHost!: ModalHostDirective;

  @HostBinding('class.active') get isActive() {
    return this.modalsService.hasActiveModal;
  }

  public readonly hasActiveModal = toSignal(
    this.modalsService.currentModal$.pipe(map(value => !!value))
  );

  constructor(
    public readonly modalsService: ModalsService
  ) {
    this.modalsService.currentModal$.pipe(
      skip(1),
      takeUntilDestroyed()
    )
    .subscribe(modalToShow => {
      if (!modalToShow) {
        this.modalHost.viewContainerRef.clear();
        document.body.classList.remove('overflow-hidden');
      } else {
        const componentRef = this.modalHost.viewContainerRef.createComponent(modalToShow.class);

        (componentRef.instance as any).value = modalToShow.value;
        document.body.classList.add('overflow-hidden');
      }
    });
  }

  dismiss(): void {
    this.modalsService.dismiss();
  }
}
