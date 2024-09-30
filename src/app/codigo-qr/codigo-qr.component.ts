import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { QrCodeModule } from 'ng-qrcode';

@Component({
    selector: 'codigo-qr',
    templateUrl: './codigo-qr.component.html',
    styleUrls: ['./codigo-qr.component.css'],
    imports: [
        FormsModule,
        NgIf,
        QrCodeModule
    ],
    standalone: true
})
export class CodigoQRComponent {
    url?: string;

    constructor(public modal: NgbActiveModal) {}

    descargarQR(): void {
        // TODO
    }

}