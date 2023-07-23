import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  inject,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[intersectionObservable]',
  standalone: true,
})
export class IntersectionObservableDirective implements OnInit {
  @Input() oneTime = false;

  @Output() intersected = new EventEmitter<void>();

  private readonly element = inject(ElementRef).nativeElement;

  ngOnInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.intersected.emit();

          if (this.oneTime) observer.unobserve(this.element);
        }
      });
    }, {
      'rootMargin': '50px'
   });

    observer.observe(this.element);
  }
}
