import { Component, ElementRef, HostListener, ViewChild, ViewChildren } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'scroll-to-top',
  templateUrl: 'scroll-to-top.component.html',
  styleUrl: 'scroll-to-top.component.scss',
  imports: [
    MatIcon,
    MatRipple
  ],
  standalone: true
})

export class ScrollToTopComponent {
  show = false;
  @ViewChild('scrollToTopBtn', { static: true }) scrollToTopButton: ElementRef;

  @HostListener('window:scroll', [ '$event' ]) onWindowScroll(): void {
    const pageYOffset = window.scrollY;

    this.show = pageYOffset > 100;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
