export interface IUsuario {
  matricula: string;
  puntos: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  rol_nombre: string;
  token: string;
}

export interface IUsuarioListado {
  nombre:           string;
  apellido_paterno: string;
  apellido_materno: string;
  matricula:        string;
  puntos:           number;
  correo:           string;
  telefono:         string;
}
