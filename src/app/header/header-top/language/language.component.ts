import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'language',
  templateUrl: 'language.component.html',
  styleUrls: [ 'language.component.scss' ],
  imports: [
    MatIconModule,
    MatDividerModule,
    NgOptimizedImage
  ],
  standalone: true
})

export class LanguageComponent {
  activeLang = 'ru';

  changeLanguage(lang: 'uz' | 'ru'): void {
    this.activeLang = lang;
  }
}
