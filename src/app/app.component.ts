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
