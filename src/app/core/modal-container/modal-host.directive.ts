import { Directive, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[modalHost]',
  standalone: true
})
export class ModalHostDirective {
  public readonly viewContainerRef = inject(ViewContainerRef);
}