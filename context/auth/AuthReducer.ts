import { IUsuario } from "interfaces";
import { AuthState } from "./";

type AuthActionType =
  | { type: '[Auth] - Login', payload: IUsuario }
  | { type: '[Auth] - Logout' }

export const authReducer = ( state: AuthState, action: AuthActionType ): AuthState => {
  switch (action.type) {
    case '[Auth] - Login':
      return{
        ...state,
        isLoggedIn: true,
        user: action.payload
      }
      break
    case "[Auth] - Logout": 
      return{
        ...state,
        isLoggedIn: false,
        user: undefined
      }
      break
    
    default:
      return state
  }
}