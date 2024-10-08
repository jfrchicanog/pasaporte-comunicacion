export interface Seccion {
    id?: number,
    nombre: string,
    contenido: string
}

export interface Pasaporte {
    id?: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
    foto?: string;
    fechaNacimiento: Date;
    secciones: Seccion[];
}


export class PasaporteImpl implements Pasaporte {
    id?: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
    foto?: string;
    fechaNacimiento: Date;
    secciones: Seccion[];

    constructor() {
        this.nombre = '';
        this.apellido1 = '';
        this.apellido2 = '';
        this.fechaNacimiento = new Date();
        this.secciones = [];
    }
}

export class SeccionImpl implements Seccion {
    id?: number;
    nombre: string;
    contenido: string;

    constructor() {
        this.nombre = '';
        this.contenido = '';
    }
}