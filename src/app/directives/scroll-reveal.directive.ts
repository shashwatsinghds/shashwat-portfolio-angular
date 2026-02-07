import { Directive, ElementRef, Input, OnInit, OnDestroy, NgZone } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;
  @Input() revealThreshold = 0.15;
  @Input() revealStagger = false;

  private observer!: IntersectionObserver;

  constructor(
    private el: ElementRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    const element = this.el.nativeElement as HTMLElement;

    // Add the base reveal class
    element.classList.add('reveal');

    // Set stagger delay if provided
    if (this.revealDelay > 0) {
      element.style.transitionDelay = `${this.revealDelay}ms`;
    }

    // Run outside Angular zone for performance
    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              // Once revealed, stop observing (one-time animation)
              this.observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: this.revealThreshold,
          rootMargin: '0px 0px -40px 0px'
        }
      );

      this.observer.observe(element);
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
