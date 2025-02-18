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

import { Component, Input } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  password: string = '';
  repeatedPassword: string = '';
  error: boolean = false;
  mensaje?: string;

  @Input()
  token: string = '';

  constructor(private usuarioService: UsuariosService) {}

  get usuario() {
    return this.usuarioService.getUsuarioSesion();
  }

  cambiarContrasenia() {
    if (!this.password) {
      this.mensaje = 'La contraseña no puede estar vacía';
      this.error = true;
      return;
    }
    if (this.password !== this.repeatedPassword) {
      this.mensaje = 'Las contraseñas no coinciden';
      this.error = true;
      return;
    }
    this.mensaje = '';
    this.error = false;

    console.log('Token:'+this.token)
    this.usuarioService.doCambiarContrasenia(this.password, this.token).then(() => {
      this.mensaje = 'Contraseña cambiada correctamente';
      this.error = false;
    }).catch((e) => {
      this.mensaje = 'Error al cambiar la contraseña: '+e;
      this.error = true;
    });
  }


}
