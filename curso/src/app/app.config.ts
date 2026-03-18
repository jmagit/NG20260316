import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { ERROR_LEVEL /*, LoggerService*/ } from '../lib/my-library';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    // LoggerService,
    { provide: ERROR_LEVEL, useValue: environment.ERROR_LEVEL},
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
  ]
};
