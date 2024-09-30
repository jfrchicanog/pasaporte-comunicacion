import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withFetch,
    withInterceptors,
    withInterceptorsFromDi
} from '@angular/common/http';

import { routes } from './app.routes';
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {AuthInterceptor} from "./services/http.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
};

