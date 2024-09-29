import {Injectable} from "@angular/core";
import {Pasaporte, PasaporteImpl} from "../entities/pasaporte";

@Injectable({
    providedIn: 'root'
})
export class EditorPasaporteService {
    private _modo: "Añadir" | "Editar" | undefined;
    private _pasaporte: Pasaporte = new PasaporteImpl();

    constructor() {
    }

    public reset(): void {
        this._modo = undefined;
    }

    get modo(): "Añadir" | "Editar" | undefined {
        return this._modo;
    }

    get pasaporte(): Pasaporte {
        return this._pasaporte;
    }

    editarPaspaorte(pasporte: Pasaporte) {
        this._pasaporte = pasporte;
        this._modo = "Editar";
    }

    aniadirPasaporte() {
        this._pasaporte = new PasaporteImpl();
        this._modo = "Añadir";
    }





}