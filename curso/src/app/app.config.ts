import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
registerLocaleData(localeEs, 'es', localeEsExtra);

import { ApplicationConfig, provideBrowserGlobalErrorListeners, LOCALE_ID } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { ERROR_LEVEL /*, LoggerService*/ } from '../lib/my-library';
import { environment } from '../environments/environment';
import { provideHttpClient, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';
import { ajaxWaitInterceptor } from './main';

export const appConfig: ApplicationConfig = {
  providers: [
    // LoggerService,
    { provide: ERROR_LEVEL, useValue: environment.ERROR_LEVEL},
    { provide: LOCALE_ID, useValue: 'es-ES'},
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi(), withInterceptors([ajaxWaitInterceptor])),
  ]
};
