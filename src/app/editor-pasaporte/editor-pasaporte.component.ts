import {Component, ViewEncapsulation} from '@angular/core';
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

@Component( {
    selector: 'editor-pasaporte',
    templateUrl: './editor-pasaporte.component.html',
    styleUrls: [ './editor-pasaporte.component.css', '../../../node_modules/ckeditor5/dist/ckeditor5.css' ],
    imports: [CKEditorModule, NgbAccordionBody, NgbAccordionButton, NgbAccordionCollapse, NgbAccordionDirective,
        NgbAccordionHeader, NgbAccordionItem, NgForOf, FormsModule],
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

}
