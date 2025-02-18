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

import {Injectable} from "@angular/core";
import {Pasaporte, PasaporteImpl} from "../entities/pasaporte";

@Injectable({
    providedIn: 'root'
})
export class EditorPasaporteService {
    private _modo: "Añadir" | "Editar" | undefined;
    private _pasaporte: Pasaporte = new PasaporteImpl();

    constructor() {
    }

    public reset(): void {
        this._modo = undefined;
    }

    get modo(): "Añadir" | "Editar" | undefined {
        return this._modo;
    }

    get pasaporte(): Pasaporte {
        return this._pasaporte;
    }

    editarPaspaorte(pasporte: Pasaporte) {
        this._pasaporte = pasporte;
        this._modo = "Editar";
    }

    aniadirPasaporte() {
        this._pasaporte = new PasaporteImpl();
        this._modo = "Añadir";
    }





}