
export interface Login {
  email: string;
  password: string;
}

export interface JwtResponse {
  jwt: string;
}

export enum Rol {
  ADMINISTRADOR = 'ADMINISTRADOR',
  EDITOR = 'EDITOR'
}


export interface UsuarioSesion {
  id: number;
  nombre: string;
  apellido1: string;
  apellido2: string;
  email: string;
  jwt: string;
  roles: Rol[];
}

export type MapaCentros = Map<number, string>;


