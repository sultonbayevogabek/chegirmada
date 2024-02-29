import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';

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
    HeaderComponent
  ],
  standalone: true
})

export class AppComponent implements OnInit {
  private _availableLanguages = ['uz', 'ru'];
  private _translateService = inject(TranslateService);
  languageOptions: ILanguageOption[] = [];

  ngOnInit(): void {
    this._translateService.addLangs(this._availableLanguages);
    this._translateService.setDefaultLang('uz');
    this._buildLanguageOptions();
  }

  private _buildLanguageOptions() {
    const UZ =  this._translateService.get('UZ');
    const RU = this._translateService.get('RU');

    forkJoin([
      UZ,
      RU
    ]).subscribe(
      _response => {
        this.languageOptions = [{
          value: this._availableLanguages[0],
          label: _response[0],
        }, {
          value: this._availableLanguages[1],
          label: _response[1],
        }];
      }
    );
  }
}
