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
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterOutlet, RouterLink, Router, RouterLinkActive} from '@angular/router';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, FormsModule, TitleCasePipe, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private usuarioService: UsuariosService, private router: Router) {
  }

  get usuarioSesion() {
    return this.usuarioService.getUsuarioSesion();
  }

  get isEditor() {
    return this.usuarioService.isEditor();
  }

  get isAdministrador() {
    return this.usuarioService.isAdministrador();
  }

  logout() {
    this.usuarioService.doLogout();
    this.router.navigateByUrl('/login');
  }
}
