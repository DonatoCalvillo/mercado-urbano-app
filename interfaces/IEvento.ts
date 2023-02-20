export interface IEvento {
  usuario_evento_inscrito:         number;
  usuario_evento_fechaInscripcion: string;
  evento_nombre:                   string;
  evento_semana:                   string;
  evento_hora:                     string;
  evento_fechaInicio:              Date;
  evento_fechaFin:                 Date;
  lugar_numero:                    string | null;
  plaza_nombre:                    string;
}