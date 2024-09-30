import {Component} from "@angular/core";
import {NgForOf, NgIf} from "@angular/common";
import {Pasaporte} from "../entities/pasaporte";
import {UsuariosService} from "../services/usuarios.service";
import {Rol} from "../entities/login";
import {EditorPasaporteService} from "../services/editor-pasaporte.service";
import {Router} from "@angular/router";
import {FRONTEND_URI} from "../config/config";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CodigoQRComponent} from "../codigo-qr/codigo-qr.component";
import {PasaporteService} from "../services/pasaporte.service";

@Component({
    selector: 'listado-pasaporte',
    standalone: true,
    templateUrl: './listado-pasaporte.component.html',
    imports: [
        NgForOf,
        NgIf
    ],
    styleUrl: './listado-pasaporte.component.css'
})
export class ListadoPasaporteComponent {
    pasaportes: Pasaporte[] = [];

    constructor(private pasaporteService: PasaporteService,
                private usuarioService: UsuariosService,
                private editorService: EditorPasaporteService,
                private router: Router,
                private modalService: NgbModal) {
        this.actualizarPasaportes();
    }

    ngOnInit(): void {
        this.actualizarPasaportes();
    }

    isAdministrador(): boolean {
        return this.usuarioService.getUsuarioSesion()?.roles.find(rol => rol.rol == Rol.ADMINISTRADOR) != undefined;
    }

    actualizarPasaportes() {
        this.pasaporteService.obtenerPasaportes().subscribe(pasaportes => {
            this.pasaportes = pasaportes;
        });
    }

    aniadirPasaporte(): void {
        this.editorService.aniadirPasaporte()
        this.router.navigate(['/editor-pasaporte']);
    }

    editarPasaporte(pasaporte: Pasaporte): void {
        this.editorService.editarPaspaorte(pasaporte);
        this.router.navigate(['/editor-pasaporte']);
    }

    mostrarQR(pasaporte: Pasaporte): void {
        let ref = this.modalService.open(CodigoQRComponent);
        const url=FRONTEND_URI+this.urlAbsolutaPasaporte(pasaporte);
        console.log('URL: '+url);
        ref.componentInstance.url=url;
    }

    verPasaporte(pasaporte: Pasaporte): void {
        const url=FRONTEND_URI+this.urlAbsolutaPasaporte(pasaporte);
        console.log('URL: '+url);
        window.open(this.urlAbsolutaPasaporte(pasaporte), "_blank");
    }

    eliminarPasaporte(id: number): void {
        this.pasaporteService.eliminarPasaporte(id).subscribe(() => {
            this.actualizarPasaportes();
        });
    }

    private urlAbsolutaPasaporte(pasaporte: Pasaporte): string {
        const urlRelativa = '/pasaporte';
        return this.router.serializeUrl(
            this.router.createUrlTree([urlRelativa],
                {queryParams: {id: pasaporte.id}}));
    }
}