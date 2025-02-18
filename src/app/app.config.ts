/*
 * Copyright "2025" Francisco Chicano, Javier Ferrer, Marina Calleja
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

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

