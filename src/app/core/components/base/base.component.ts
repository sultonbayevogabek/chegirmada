import { Component, DestroyRef, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { language } from '../../models/language.model';

@Component({
  selector: 'base',
  standalone: true,
  template: ''
})

export class BaseComponent {
  private _activeLang: language = 'uz';
  private _destroyRef = inject(DestroyRef);
  private _translateService = inject(TranslateService);

  constructor() {
    this._translateService.onLangChange
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(({ lang }) => {
        this._activeLang = lang as language;
      });
  }
  get activeLang() {
    return this._activeLang;
  }

  get destroyRef() {
    return this._destroyRef;
  }
}
