import { IUsuario } from 'interfaces';
import { FC, ReactNode, useEffect, useReducer } from 'react'
import { AuthContext, authReducer } from './'

import Cookies from 'js-cookie'
import mercadoUrbanoApi from '../../api/mercadoUrbanoApi';
import { config } from 'process';
import { useRouter } from 'next/router';

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
  const router = useRouter()

  useEffect (() => {
    checkToken()
  }, [])

  const checkToken = async () => {
    const currentToken = Cookies.get('token')

    if( !currentToken )
      return
    
    try{  
      const { data } = await mercadoUrbanoApi.get('/auth/validateToken', {
        headers: { 'Authorization' : `bearer ${currentToken}` }
      })

      const { token, usuario } = data
    
      Cookies.set('token', token)
      dispatch({ type: '[Auth] - Login', payload: usuario })

    } catch (error) {
      console.log(error)
    }

  }

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

  const loginAdmin = async (matricula: string, contrasenia: string) : Promise<boolean> => {
    try {
      const { data } = await mercadoUrbanoApi.post('/auth/loginAdmin', { matricula, contrasenia })
      const { token, usuario } = data
      Cookies.set('token', token)
      dispatch({type:'[Auth] - Login', payload: usuario})
      return true

    } catch (error) {
      return false
    }
  } 


  const registerUser = async ( 
    nombre: string, 
    apellido_paterno: string, 
    apellido_materno: string,
    contrasenia: string,
    correo?: string,
    telefono?: string
    ) => {
    try {
      const { data } = await mercadoUrbanoApi.post('/auth/register', {
        nombre,
        apellido_paterno,
        apellido_materno,
        contrasenia,
        correo,
        telefono,
      })
    } catch (error) {
      
    }
  }

  const logout = () => {
    Cookies.remove('token')
    router.reload()
  }

  return (
    <AuthContext.Provider value={{
      ...state,

      login,
      logout,
      loginAdmin
    }}>
      {children}
    </AuthContext.Provider>
  )
}