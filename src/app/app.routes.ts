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
