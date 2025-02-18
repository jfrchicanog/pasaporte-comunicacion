
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

export interface Login {
  email: string;
  password: string;
}

export interface JwtResponse {
  jwt: string;
}

export enum Rol {
  ADMINISTRADOR = 'ADMINISTRADOR',
  EDITOR = 'EDITOR'
}


export interface UsuarioSesion {
  id: number;
  nombre: string;
  apellido1: string;
  apellido2: string;
  email: string;
  jwt: string;
  roles: Rol[];
}

export type MapaCentros = Map<number, string>;


