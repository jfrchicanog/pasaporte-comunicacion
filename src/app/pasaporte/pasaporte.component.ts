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
import {ActivatedRoute, RouterLink} from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import {Pasaporte} from "../entities/pasaporte";
import {NgForOf, NgIf} from "@angular/common";
import {ClassicEditor} from "ckeditor5";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {FormsModule} from "@angular/forms";
import {PasaporteService} from "../services/pasaporte.service";

@Component({
    selector: 'app-pasaporte',
    standalone: true,
    imports: [RouterLink, NgbAccordionModule, NgIf, CKEditorModule, FormsModule, NgForOf],
    templateUrl: './pasaporte.component.html',
    styleUrl: './pasaporte.component.css'
})
export class PasaporteComponent {
    pasaporte?: Pasaporte;
    private readonly fotoDefecto = 'assets/boy.webp';

    constructor(private route: ActivatedRoute, private pasaporteService: PasaporteService) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            const idPasaporte = params['id'] as number;
            this.pasaporteService.obtenerPasaporte(idPasaporte).subscribe(pasaporte => {
                this.pasaporte=pasaporte;
                }
            );
            console.log('ID pasaporte: '+ idPasaporte);

        });
    }

    edad(pasaporte: Pasaporte): number {
        const hoy = new Date();
        const nacimiento = new Date(pasaporte.fechaNacimiento);
        if (hoy < nacimiento) {
            return 0;
        }
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        if (hoy.getMonth() < nacimiento.getMonth() || (hoy.getMonth() == nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        console.log('Edad: ' + edad);
        return edad;
    }

    get foto (): string {
        if (this.pasaporte && this.pasaporte.foto) {
            return this.pasaporte.foto;
        } else {
            return this.fotoDefecto;
        }
    }
}