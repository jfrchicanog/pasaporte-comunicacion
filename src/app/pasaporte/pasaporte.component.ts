import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import {Pasaporte} from "../entities/pasaporte";
import {BackendFakeService} from "../services/backend.fake.service";

@Component({
    selector: 'app-pasaporte',
    standalone: true,
    imports: [RouterLink, NgbAccordionModule],
    templateUrl: './pasaporte.component.html',
    styleUrl: './pasaporte.component.css'
})
export class PasaporteComponent {
    pasaporte?: Pasaporte;

    constructor(private route: ActivatedRoute, private backendService: BackendFakeService) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            const idPasaporte = params['id'] as number;
            this.backendService.getPasaporte(idPasaporte).subscribe(pasaporte => {
                this.pasaporte=pasaporte;
                }
            );
            console.log('ID pasaporte: '+ idPasaporte);
        });
    }

}