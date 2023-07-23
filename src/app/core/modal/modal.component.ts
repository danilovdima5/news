import { Component, ViewChild, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { map, skip } from 'rxjs';

import { ModalHostDirective } from './modal-host.directive';

import { ModalService } from './modal.service';

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
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalContainerComponent {
  @ViewChild(ModalHostDirective) modalHost!: ModalHostDirective;

  @HostBinding('class.active') get isActive() {
    return this.modalService.hasActiveModal;
  }

  public readonly hasActiveModal = toSignal(
    this.modalService.currentModal$.pipe(map(value => !!value))
  );

  constructor(
    public readonly modalService: ModalService
  ) {
    this.modalService.currentModal$.pipe(
      skip(1),
      takeUntilDestroyed()
    )
    .subscribe(modalToShow => {
      if (!modalToShow) {
        this.modalHost.viewContainerRef.clear();
        document.body.classList.remove('overflow-hidden');
      } else {
        const componentRef = this.modalHost.viewContainerRef.createComponent(modalToShow.class);

        (componentRef.instance as any).data = modalToShow.data;
        document.body.classList.add('overflow-hidden');
      }
    });
  }

  dismiss(): void {
    this.modalService.dismiss();
  }
}
