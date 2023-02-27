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

export interface IUsuarioRegistro {
  nombre:           string;
  apellido_paterno: string;
  apellido_materno: string;
  correo:           string;
  contrasenia:      string;
  telefono:         string;
  area:             string;
}

export interface IUsuarioNuevo {
  nombre:           string;
  apellido_paterno: string;
  apellido_materno: string;
  matricula:        string;
  correo:           string;
  telefono:         string;
  area:             string;
}

export interface IUserHistory {
  puntos:number;
  dia: string;
  nombreEvento: string;
  nombrePlaza: string;
  numeroLugar: string;
  fechaInicio: string;
  fechaFin: string;
}