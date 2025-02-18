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

import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import {
    Bold,
    ClassicEditor,
    Essentials,
    Heading,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    MediaEmbed,
    Paragraph,
    Table,
    Undo
} from 'ckeditor5';
import {
    NgbAccordionBody,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionDirective, NgbAccordionHeader, NgbAccordionItem
} from "@ng-bootstrap/ng-bootstrap";

import {Pasaporte, PasaporteImpl, SeccionImpl, Seccion} from "../entities/pasaporte";
import {NgForOf} from "@angular/common";
import { EditorPasaporteService } from '../services/editor-pasaporte.service';
import {Router} from "@angular/router";
import {PasaporteService} from "../services/pasaporte.service";
import {DndDirective} from "../directives/dnd.directive";

@Component( {
    selector: 'editor-pasaporte',
    templateUrl: './editor-pasaporte.component.html',
    styleUrls: [ './editor-pasaporte.component.css', '../../../node_modules/ckeditor5/dist/ckeditor5.css' ],
    imports: [CKEditorModule, NgbAccordionBody, NgbAccordionButton, NgbAccordionCollapse, NgbAccordionDirective,
        NgbAccordionHeader, NgbAccordionItem, NgForOf, FormsModule, DndDirective],
    encapsulation: ViewEncapsulation.None,
    standalone: true
} )
export class EditorPasaportecomponent {
    title = 'Editor de pasaporte';
    public Editor = ClassicEditor;
    public config = {
        toolbar: [
            'undo', 'redo', '|',
            'heading', '|', 'bold', 'italic', '|',
            'link', 'insertTable', 'mediaEmbed', '|',
            'bulletedList', 'numberedList', 'indent', 'outdent'
        ],
        plugins: [
            Bold,
            Essentials,
            Heading,
            Indent,
            IndentBlock,
            Italic,
            Link,
            List,
            MediaEmbed,
            Paragraph,
            Table,
            Undo
        ]
    }

    public pasaporte: Pasaporte = new PasaporteImpl();
    private readonly fotoDefecto = 'assets/boy.webp';

    constructor(private pasaporteService: PasaporteService,
                private editorService: EditorPasaporteService,
                private router: Router) {
        this.pasaporte = editorService.pasaporte;
    }

    public aniadirSeccion(): void {
        let seccion: Seccion = new SeccionImpl();
        seccion.nombre='Nueva sección';
        seccion.contenido='<p>Contenido de nueva sección</p>';
        this.pasaporte.secciones.push(seccion);
    }

    public cancelarOperacion(): void {
        this.router.navigate(['/pasaportes']);
    }

    public get operacion (): string {
        if (this.editorService.modo == 'Editar') {
            return "edición";
        } else {
            return "inserción"
        }
    }

    public confirmarOperacion(): void {
        if (this.editorService.modo == 'Editar') {
            this.pasaporteService.modificarPasaporte(this.pasaporte).subscribe(() => {
                this.router.navigate(['/pasaportes']);
            });
        } else {
            this.pasaporteService.aniadirPasaporte(this.pasaporte).subscribe(() => {
                this.router.navigate(['/pasaportes']);
            });
        }
    }

    public ficherosArrastrados(ficheros: FileList): void  {
        const fichero = ficheros.item(0);
        if (fichero) {
            this.ponerFicheroComoImagen(fichero);
        }
    }

    public ficherosBuscados(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            this.ponerFicheroComoImagen(input.files[0]);
        }
    }

    private ponerFicheroComoImagen(selectedFile: File): void {
            // Leer archivo y convertir a Base64
            const reader = new FileReader();
            reader.onload = () => {
                this.foto = reader.result as string; // La imagen en formato base64
            };
            reader.readAsDataURL(selectedFile);
    }


    get foto (): string {
        if (this.pasaporte.foto) {
            return this.pasaporte.foto;
        } else {
            return this.fotoDefecto;
        }
    }
    set foto (str: string) {
        this.pasaporte.foto = str;
    }


}
