import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideIcons } from './config/icons/icons.provider';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';
import { languageInterceptor } from './core/interceptors/language.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeRu);

// Yandex Map Config
const mapConfig: YaConfig = {
  apikey: '5efdc5ef-2250-4c92-906f-a6e559a412c4',
  lang: 'ru_RU'
};

// Translation Config
function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const I18N_CONFIG = {
  defaultLanguage: localStorage.getItem('lang') === 'ru' ? 'ru': 'uz',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [ HttpClient ]
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideIcons(),
    importProvidersFrom(
      HttpClientModule
    ),
    { provide: LOCALE_ID, useValue: 'ru' },
    importProvidersFrom(AngularYandexMapsModule.forRoot(mapConfig)),
    importProvidersFrom(TranslateModule.forRoot(I18N_CONFIG)),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        loggingInterceptor,
        languageInterceptor,
        errorInterceptor
      ])
    )
  ]
};


