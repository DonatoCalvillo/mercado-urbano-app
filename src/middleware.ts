import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { mercadoUrbanoApi } from 'api';
import { IEvento } from "interfaces/IEvento";
import { request } from "http";

interface IValidateToken {
  status: string;
}

export async function middleware (req:NextRequest, ev:NextFetchEvent){
  const currentToken = req.cookies.get('token')?.value

  if(!currentToken)
    return NextResponse.redirect(new URL('/auth', req.url))

  try {

    const data = await fetch('http://localhost:3001/api/auth/validateToken', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization' : `bearer ${currentToken}` 
      }
    })
    .then((data) => data.json())
    .catch((error) => console.log(error))

    const { token, usuario } = data
    const { rol_nombre } = usuario

    const url = req.nextUrl.clone()

    if( req.nextUrl.pathname.startsWith('/user-dashboard') ){
      if(rol_nombre === 'Usuario')  
        return NextResponse.rewrite(new URL('/user-dashboard', req.url))
      else{
        url.pathname = '/admin-dashboard'
        return NextResponse.redirect(url)
      }
    }

    if( req.nextUrl.pathname.startsWith('/admin-dashboard') ){
      if(rol_nombre === 'Administrador')  
      return NextResponse.rewrite(new URL('/admin-dashboard', req.url))
      else{
        console.log('Hola')
        url.pathname = '/user-dashboard'
        return NextResponse.redirect(url)
      }
    }

    return NextResponse.next()

  }catch(error){
    console.log(error)
    return NextResponse.redirect(new URL('/', req.url))
  }
}

export const config = {
  matcher:['/user-dashboard', '/admin-dashboard/:path*']
}