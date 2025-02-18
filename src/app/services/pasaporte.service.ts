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

import {BackendFakeService} from "./backend.fake.service";
import {Pasaporte} from "../entities/pasaporte";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {BackendService} from "./backend.service";

@Injectable({
    providedIn: 'root'
})
export class PasaporteService {

    constructor(private backend: BackendService) {}

    obtenerPasaportes(): Observable<Pasaporte[]> {
        return this.backend.getPasaportes();
    }

    obtenerPasaporte(id: number): Observable<Pasaporte> {
        return this.backend.getPasaporte(id);
    }

    aniadirPasaporte(pasaporte: Pasaporte): Observable<Pasaporte> {
        return this.backend.postPasaporte(pasaporte);
    }

    modificarPasaporte(pasaporte: Pasaporte): Observable<Pasaporte> {
        return this.backend.putPasaporte(pasaporte);
    }

    eliminarPasaporte(id: number): Observable<void> {
        return this.backend.deletePasaporte(id);
    }

}