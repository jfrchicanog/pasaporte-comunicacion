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

import { UsuarioSesion } from './../entities/login';
import { Component } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Usuario, UsuarioImpl } from '../entities/usuario';
import { Rol } from '../entities/login';
import { FormularioUsuarioComponent } from '../formulario-usuario/formulario-usuario.component';

@Component({
  selector: 'app-listado-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-usuario.component.html',
  styleUrl: './listado-usuario.component.css'
})
export class ListadoUsuarioComponent {
  usuarios: Usuario [] = [];

  constructor(private usuariosService: UsuariosService, private modalService: NgbModal) {
    this.actualizarUsuarios();
   }

  isAdministrador(): boolean {
    return this.usuariosService.isAdministrador();
  }

  ngOnInit(): void {
    this.actualizarUsuarios();
  }

  actualizarUsuarios() {
    this.usuariosService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  aniadirUsuario(): void {
    let ref = this.modalService.open(FormularioUsuarioComponent);
    ref.componentInstance.accion = "Añadir";
    ref.componentInstance.usuario = new UsuarioImpl();
    ref.result.then((usuario: Usuario) => {
      this.usuariosService.aniadirUsuario(usuario).subscribe(usuario => {
        this.actualizarUsuarios();
      });
    }, (reason) => {});

  }
  private usuarioEditado(usuario: Usuario): void {
    this.usuariosService.editarUsuario(usuario).subscribe(() => {
      this.actualizarUsuarios();
    });
  }

  eliminarUsuario(id: number): void {
    this.usuariosService.eliminarUsuario(id).subscribe(() => {
      this.actualizarUsuarios();
    });
  }

  editarUsuario(usuario: Usuario): void {
    let ref = this.modalService.open(FormularioUsuarioComponent);
    ref.componentInstance.accion = "Editar";
    ref.componentInstance.usuario = {...usuario};
    ref.result.then((usuario: Usuario) => {
      this.usuarioEditado(usuario);
    }, (reason) => {});
  }
}
