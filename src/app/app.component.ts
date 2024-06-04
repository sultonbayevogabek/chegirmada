import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { MobileMenuComponent } from './core/components/mobile-menu/mobile-menu.component';

export interface ILanguageOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
   imports: [
      RouterOutlet,
      MobileMenuComponent
   ],
  standalone: true
})

export class AppComponent implements OnInit {
  private _availableLanguages = [ 'uz', 'ru' ];
  private _translateService = inject(TranslateService);
  languageOptions: ILanguageOption[] = [];
  screenWidth = document.documentElement.clientWidth;

  ngOnInit(): void {
    this._translateService.addLangs(this._availableLanguages);
    this._buildLanguageOptions();

    const lang = localStorage.getItem('lang');
    this._translateService.setDefaultLang(this._availableLanguages.includes(lang) ? lang : 'uz');
  }

  private _buildLanguageOptions() {
    forkJoin(this._availableLanguages.map(lang => {
      return this._translateService.get(lang.toUpperCase())
    })).subscribe(
      _response => {
        this._availableLanguages.forEach((lang, index) => {
          this.languageOptions.push({
            value: lang,
            label: _response[index]
          });
        })
      }
    );
  }
}
