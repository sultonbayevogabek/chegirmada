import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideIcons } from './config/icons/icons.provider';
import { HttpClientModule } from '@angular/common/http';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';

const mapConfig: YaConfig = {
  apikey: '5efdc5ef-2250-4c92-906f-a6e559a412c4',
  lang: 'ru_RU'
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideIcons(),
    importProvidersFrom(
      HttpClientModule
    ),
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    importProvidersFrom(AngularYandexMapsModule.forRoot(mapConfig))
  ]
};
