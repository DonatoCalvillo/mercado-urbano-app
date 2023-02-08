import { IUsuario } from "interfaces";
import { createContext } from "react";

interface ContextProps{
  isLoggedIn: boolean;
  user?: IUsuario;

  login: (matricula: string, contrasenia: string) => Promise<boolean>;
  loginAdmin: (matricula: string, contrasenia: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext({} as ContextProps)