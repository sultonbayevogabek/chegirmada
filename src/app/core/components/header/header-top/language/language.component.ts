import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NgOptimizedImage } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { language } from '../../../../models/language.model';

@Component({
  selector: 'language',
  templateUrl: 'language.component.html',
  styleUrl: 'language.component.scss',
  imports: [
    MatIconModule,
    MatDividerModule,
    NgOptimizedImage,
    TranslateModule
  ],
  standalone: true
})

export class LanguageComponent implements OnInit {
  activeLanguage: language = 'uz';
  private _translateService = inject(TranslateService);

  ngOnInit(): void {
    if (localStorage.getItem('lang') === 'ru') {
      this.activeLanguage = 'ru';
      this.changeLanguage('ru');
    }
  }

  changeLanguage(lang: language): void {
    this.activeLanguage = lang;
    this._translateService.use(lang);
    localStorage.setItem('lang', lang);
  }
}
