import {BackendFakeService} from "./backend.fake.service";
import {Pasaporte} from "../entities/pasaporte";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {BackendService} from "./backend.service";

@Injectable({
    providedIn: 'root'
})
export class PasaporteService {

    constructor(private backend: BackendService) {}

    obtenerPasaportes(): Observable<Pasaporte[]> {
        return this.backend.getPasaportes();
    }

    obtenerPasaporte(id: number): Observable<Pasaporte> {
        return this.backend.getPasaporte(id);
    }

    aniadirPasaporte(pasaporte: Pasaporte): Observable<Pasaporte> {
        return this.backend.postPasaporte(pasaporte);
    }

    modificarPasaporte(pasaporte: Pasaporte): Observable<Pasaporte> {
        return this.backend.putPasaporte(pasaporte);
    }

    eliminarPasaporte(id: number): Observable<void> {
        return this.backend.deletePasaporte(id);
    }

}