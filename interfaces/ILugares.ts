export interface ILugares {
  lugar_id:     string;
  lugar_numero: number;
  area_nombre:  string;
}

export interface ILugarSeleccionado {
  status:  string;
  message: string;
  lugar:   string;
}

export interface ILugar {
  id:      string;
  numero:  number;
  ocupado: number;
  plaza:   IPlaza;
  area:    IArea;
}

export interface IArea {
  id:            string;
  nombre:        string;
  modificado_en: Date;
}

export interface IPlaza {
  id:            string;
  nombre:        string;
  direccion:     string;
  creado_en:     Date;
  modificado_en: Date;
}

