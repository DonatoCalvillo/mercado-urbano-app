import { IUsuario } from 'interfaces';
import { FC, ReactNode, useReducer } from 'react'
import { AuthContext, authReducer } from './'

import Cookies from 'js-cookie'
import mercadoUrbanoApi from '../../api/mercadoUrbanoApi';

interface Props {
  children: ReactNode
}

export interface AuthState{
  isLoggedIn: boolean;
  user?: IUsuario;
}

const AUTH_INITIAL_STATE : AuthState = {
  isLoggedIn: false,
  user: undefined
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE)

  const login = async (matricula: string, contrasenia: string) : Promise<boolean> => {
    try {
      const { data } = await mercadoUrbanoApi.post('/auth/login', { matricula, contrasenia })
      const { token, usuario } = data
      Cookies.set('token', token)
      dispatch({type:'[Auth] - Login', payload: usuario})
      return true

    } catch (error) {
      return false
    }
  } 

  return (
    <AuthContext.Provider value={{
      ...state,

      login,
    }}>
      {children}
    </AuthContext.Provider>
  )
}