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
import { Usuario, UsuarioImpl } from '../entities/usuario';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Rol} from "../entities/login";

@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-usuario.component.html',
  styleUrl: './formulario-usuario.component.css'
})
export class FormularioUsuarioComponent {
  accion?: "Añadir" | "Editar";
  _usuario: Usuario = new UsuarioImpl();
  rpassword: string = '';
  error: string = '';


  constructor(public modal: NgbActiveModal) { }

  get usuario () {
    return this._usuario;
  }

  set usuario(u: Usuario) {
    this._usuario = u;
    this._usuario.password='';
  }

  get admin(): boolean {
    return this.getRole(Rol.ADMINISTRADOR)
  }

  set admin(val: boolean) {
    this.setRole(Rol.ADMINISTRADOR, val);
  }

  get editor(): boolean {
    return this.getRole(Rol.EDITOR)
  }

  set editor(val: boolean) {
    this.setRole(Rol.EDITOR, val);
  }

  private getRole(rol: Rol): boolean {
    return this.usuario.roles.includes(rol);
  }

  private setRole(rol: Rol, val: boolean): void {
    if (this.getRole(rol) != val) {
      if (val) {
        this.usuario.roles.push(rol);
      } else {
        this.usuario.roles = this.usuario.roles.filter(r => r!=rol);
      }
    }
  }


  guardarUsuario(): void {
    if (this._usuario.password != this.rpassword) {
      this.error="Las contraseñas no coinciden";
      return;
    }

    this.modal.close(this.usuario);
  }
}
