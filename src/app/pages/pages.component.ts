import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, Event } from '@angular/router';
import { HeaderComponent } from '../core/header/header.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'pages',
  templateUrl: 'pages.component.html',
  styleUrl: 'pages.component.scss',
  imports: [
    RouterOutlet,
    HeaderComponent
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
