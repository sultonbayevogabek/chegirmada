import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideIcons } from './config/icons/icons.provider';
import { HttpClientModule } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideIcons(),
    importProvidersFrom(
      HttpClientModule
    ),
    { provide: LOCALE_ID, useValue: 'ru-RU' }
  ]
};
