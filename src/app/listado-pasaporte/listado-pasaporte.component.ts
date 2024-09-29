import {Component} from "@angular/core";
import {NgForOf, NgIf} from "@angular/common";
import {Pasaporte} from "../entities/pasaporte";
import {UsuariosService} from "../services/usuarios.service";
import {Rol} from "../entities/login";
import {BackendFakeService} from "../services/backend.fake.service";
import {EditorPasaporteService} from "../services/editor-pasaporte.service";
import {Router} from "@angular/router";
import {FRONTEND_URI} from "../config/config";

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

    constructor(private backendService: BackendFakeService,
                private usuarioService: UsuariosService,
                private editorService: EditorPasaporteService,
                private router: Router) {
        this.actualizarPasaportes();
    }

    ngOnInit(): void {
        this.actualizarPasaportes();
    }

    isAdministrador(): boolean {
        return this.usuarioService.getUsuarioSesion()?.roles.find(rol => rol.rol == Rol.ADMINISTRADOR) != undefined;
    }

    actualizarPasaportes() {
        this.backendService.getPasaportes().subscribe(pasaportes => {
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
        // TODO
    }

    verPasaporte(pasaporte: Pasaporte): void {
        const url=this.urlAbsolutaPasaporte(pasaporte);
        console.log('URL: '+url);
        window.open(this.urlAbsolutaPasaporte(pasaporte), "_blank");
    }

    eliminarPasaporte(id: number): void {
        this.backendService.deletePasaporte(id).subscribe(() => {
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