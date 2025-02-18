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

import {UsuarioSesion, Rol, MapaCentros} from '../entities/login';

export const usuarios: UsuarioSesion [] = [
  {
    id: 1,
    nombre: 'J. Francisco',
    apellido1: 'Chicano',
    apellido2: 'García',
    email: 'chicano@uma.es',
    jwt: 'eyJhbGci',
    roles: [
      {rol: Rol.ADMINISTRADOR},
      {rol: Rol.EDITOR, centro: 1, nombreCentro: 'Málaga'},
      {rol: Rol.EDITOR, centro: 2, nombreCentro: 'Cádiz'},
    ]
  }
]

export const passwords: Map<string, string> = new Map([
  ['chicano@uma.es', '1234'],
]);
