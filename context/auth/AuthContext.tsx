import { IUsuario } from "interfaces";
import { createContext } from "react";

interface ContextProps{
  isLoggedIn: boolean;
  user?: IUsuario;

  login: (matricula: string, contrasenia: string) => Promise<boolean>
}

export const AuthContext = createContext({} as ContextProps)