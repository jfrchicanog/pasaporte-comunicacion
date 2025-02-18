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

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ListadoUsuarioComponent } from './listado-usuario/listado-usuario.component';
import { PrincipalComponent } from './principal/principal.component';
import {PasaporteComponent} from "./pasaporte/pasaporte.component";
import {EditorPasaportecomponent} from "./editor-pasaporte/editor-pasaporte.component";
import {ListadoPasaporteComponent} from "./listado-pasaporte/listado-pasaporte.component";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgotten-password',
    component: ForgottenPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'usuarios',
    component: ListadoUsuarioComponent
  },
  {
    path: 'pasaporte',
    component: PasaporteComponent
  },
  {
    path: 'editor-pasaporte',
    component: EditorPasaportecomponent
  },
  {
    path: 'pasaportes',
    component: ListadoPasaporteComponent
  },

  {
    path: '',
    component: PrincipalComponent
  }
];
