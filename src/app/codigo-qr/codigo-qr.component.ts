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

import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { QrCodeModule, QrCodeDirective } from 'ng-qrcode';

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
    url!: string;
    @ViewChild('qrCodeImage') canvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('printFrame') printFrame!: ElementRef<HTMLIFrameElement>;

    constructor(public modal: NgbActiveModal) {}

    descargarQR(): void {
        const canvasElement = this.canvas.nativeElement;
        const image = canvasElement.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = image;
        link.download = 'pasaporte-qr.png';
        link.click();

        // TODO
    }

    imprimirQR(): void {
        const canvasElement = this.canvas.nativeElement;
        const image = canvasElement.toDataURL('image/png');

        const iframe = this.printFrame.nativeElement;
        const doc = iframe.contentWindow?.document;

        if (doc) {
            doc.open();
            doc.write(`
        <html>
          <head><title>Imprimir QR de Pasaporte</title></head>
          <body>
            <img src="${image}" style="width:100%;"/>
            <script>
              window.onload = function() {
                window.print();
              };
            </script>
          </body>
        </html>
      `);
            doc.close();
        }
    }

}