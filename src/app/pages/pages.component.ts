import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, Event } from '@angular/router';
import { HeaderComponent } from '../core/components/header/header.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ScrollToTopComponent } from '../core/components/scroll-to-top/scroll-to-top.component';
import { MobileMenuComponent } from '../core/components/mobile-menu/mobile-menu.component';
import { FooterComponent } from '../core/components/footer/footer.component';

@Component({
  selector: 'pages',
  templateUrl: 'pages.component.html',
  styleUrl: 'pages.component.scss',
  imports: [
    RouterOutlet,
    HeaderComponent,
    ScrollToTopComponent,
    MobileMenuComponent,
    FooterComponent
  ],
  standalone: true
})

export class PagesComponent implements OnInit {
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this._router.events
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: event => {
          this.scrollToTop(event);
        }
      });
  }

  scrollToTop(event: Event): void {
    if (event instanceof NavigationEnd) {
      window.scrollTo(0, 0);
    }
  }
}
