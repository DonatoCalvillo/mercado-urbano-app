export interface IEventListResponse {
  success: boolean;
  message: string;
  data: IEventList[];
}

export interface IEventList {
  id: string;
  nombre: string;
  semana: string;
  fechaInicio: string;
  fechaFin: string;
  plaza: string;
  estado: string;
}
