import { Injectable } from "@angular/core";
import { Login, UsuarioSesion, Rol} from "../entities/login";
import { Observable, of, forkJoin, concatMap, lastValueFrom } from "rxjs";
import {map} from 'rxjs/operators';
import * as jose from 'jose';

import { Usuario } from "../entities/usuario";
import { BackendFakeService } from "./backend.fake.service";
import { BackendService } from "./backend.service";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(private backend: BackendService) {}

  doLogin(login: Login): Observable<UsuarioSesion> {
    localStorage.removeItem("jwt");
    let jwtObs = this.backend.login(login.email, login.password);
    jwtObs = jwtObs.pipe(map(jwt=>{localStorage.setItem("jwt", jwt); return jwt}))
    let usuarioObs = jwtObs.pipe(concatMap(jwt=>this.backend.getUsuario(this.getUsuarioIdFromJwt(jwt))));
    let join = forkJoin({jwt: jwtObs, usuario: usuarioObs});
    let usuarioSesion = join.pipe(map(obj => {
      return {
        id: obj.usuario.id,
        nombre: obj.usuario.nombre,
        apellido1: obj.usuario.apellido1,
        apellido2: obj.usuario.apellido2,
        email: obj.usuario.email,
        roles: obj.usuario.roles,
        jwt: obj.jwt
      };
    }));
    return usuarioSesion
    .pipe(map(usuarioSesion=>{
      localStorage.setItem('usuario', JSON.stringify(usuarioSesion));
      return usuarioSesion;
    }));

  }

  private getUsuarioIdFromJwt(jwt: string): number {
    let payload = jose.decodeJwt(jwt);
    console.log("Payload: "+JSON.stringify(payload));
    let id = payload.sub;
    if (id == undefined) {
      return 0;
    } else {
      return parseInt(id);
    }
  }

  getUsuarioSesion(): UsuarioSesion | undefined {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : undefined;
  }

  isEditor(): boolean {
    if (this.getUsuarioSesion()) {
      return this.getUsuarioSesion()!.roles.includes(Rol.EDITOR);
    }
    return false;
  }

  isAdministrador(): boolean {
    if (this.getUsuarioSesion()) {
      return this.getUsuarioSesion()!.roles.includes(Rol.ADMINISTRADOR);
    }
    return false;
  }

  doLogout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem("jwt");
  }

  doForgottenPassword(email: string): Observable<void> {
    return this.backend.forgottenPassword(email);
  }

  doCambiarContrasenia(password: string, token: string): Promise<void> {
    return lastValueFrom(this.backend.resetPassword(token, password),{defaultValue:undefined});
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.backend.getUsuarios();
  }

  editarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.backend.putUsuario(usuario);
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.backend.deleteUsuario(id);
  }

  aniadirUsuario(usuario: Usuario): Observable<Usuario> {
    return this.backend.postUsuario(usuario);
  }



}
