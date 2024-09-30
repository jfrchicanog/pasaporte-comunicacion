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

    protected readonly Editor = ClassicEditor;
}