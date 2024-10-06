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