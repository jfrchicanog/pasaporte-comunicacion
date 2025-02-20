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

import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { Usuario } from "../entities/usuario";
import { HttpClient } from "@angular/common/http";
import { BACKEND_URI } from "../config/config";
import { JwtResponse } from "../entities/login";
import {Pasaporte} from "../entities/pasaporte";

// Este servicio usa el backend real

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(BACKEND_URI + '/usuario');
  }

  postUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(BACKEND_URI + '/usuario', usuario);
  }

  putUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(BACKEND_URI + '/usuario/' + usuario.id, usuario);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.httpClient.delete<void>(BACKEND_URI + '/usuario/' + id);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(BACKEND_URI + '/usuario/' + id);
  }

  login(email: string, password: string): Observable<string> {
    return this.httpClient.post<JwtResponse>(BACKEND_URI + '/login', {email: email, password: password})
      .pipe(map(jwtResponse => jwtResponse.jwt));
  }

  forgottenPassword(email: string): Observable<void> {
    return this.httpClient.post<void>(BACKEND_URI + '/forgottenpassword', {email: email});
  }

  resetPassword(token: string, password: string): Observable<void> {
    return this.httpClient.post<void>(BACKEND_URI + '/passwordreset', {token: token, password: password});
  }

  getPasaportes(): Observable<Pasaporte[]> {
    return this.httpClient.get<Pasaporte[]>(BACKEND_URI + '/pasaporte');
  }

  getPasaporte(id: number): Observable<Pasaporte> {
    return this.httpClient.get<Pasaporte>(BACKEND_URI + '/pasaporte/' + id);
  }

  postPasaporte(pasaporte: Pasaporte): Observable<Pasaporte> {
    return this.httpClient.post<Pasaporte>(BACKEND_URI + '/pasaporte', pasaporte);
  }

  putPasaporte(pasaporte: Pasaporte): Observable<Pasaporte> {
    return this.httpClient.put<Pasaporte>(BACKEND_URI + '/pasaporte/' + pasaporte.id!, pasaporte);
  }

  deletePasaporte(id: number): Observable<void> {
    return this.httpClient.delete<void>(BACKEND_URI + '/pasaporte/' + id);
  }
}
