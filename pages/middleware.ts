import { NextRequest, NextResponse } from "next/server";

export enum ValidRoles {
  admin = "Administrador",
  superAdmin = "SuperAdministrador",
  user = "Usuario",
}

export async function middleware(req: NextRequest) {
  const currentToken: string | undefined = req.cookies.get("token")?.value;

  if (!currentToken) return NextResponse.redirect(new URL("/auth", req.url));

  try {
    const data = await fetch(
      "https://mercado-urbano-api-2.vercel.app/api/auth/validateToken",
      {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `bearer ${currentToken}`,
        },
      }
    )
      .then((data) => data.json())
      .catch((error) => {
        console.log(error);
      });

    const { usuario } = data;
    const { rol_nombre } = usuario;

    const url = req.nextUrl.clone();
    console.log(rol_nombre);
    if (req.nextUrl.pathname.startsWith("/change-password"))
      return NextResponse.rewrite(new URL("/change-password", req.url));

    if (req.nextUrl.pathname.startsWith("/user-dashboard")) {
      if (rol_nombre === ValidRoles.user)
        return NextResponse.rewrite(new URL("/user-dashboard", req.url));

      url.pathname = "/admin-dashboard";
      return NextResponse.redirect(url);
    }

    if (req.nextUrl.pathname.startsWith("/admin-dashboard")) {
      if (
        rol_nombre === ValidRoles.admin ||
        rol_nombre === ValidRoles.superAdmin
      )
        return NextResponse.next();

      url.pathname = "/user-dashboard";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/user-dashboard", "/admin-dashboard/:path*", "/change-password"],
};
