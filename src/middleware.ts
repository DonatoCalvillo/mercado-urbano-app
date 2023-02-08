import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware (req:NextRequest, ev:NextFetchEvent){
  const currentToken = req.cookies.get('token')?.value

  if(!currentToken)
    return NextResponse.redirect(new URL('/auth', req.url))

  return NextResponse.next()
}

export const config = {
  matcher:['/user-dashboard', '/admin-dashboard/:path*']
}