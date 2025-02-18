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

import { Component } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { RouterLink  } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgotten-password',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './forgotten-password.component.html',
  styleUrl: './forgotten-password.component.css'
})
export class ForgottenPasswordComponent {
  mensaje?: string;
  email: string = '';
  error: boolean = false;

  constructor(private usuarioService: UsuariosService) {
  }

  get usuario() {
    return this.usuarioService.getUsuarioSesion();
  }

  recordar() {
    if (!this.email) {
      this.mensaje = "Debe introducir un email";
      this.error = true;
      return;
    }
    this.usuarioService.doForgottenPassword(this.email).subscribe(()=>{});
    this.mensaje = "Si la cuenta existe recibirá en su correo un  mensaje con instrucciones para recuperar la contraseña."
    this.error = false;
  }

}
