// middleware.ts
import { NextResponse, type NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // Si no hay token y quiere entrar a una ruta protegida → login
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Si hay token pero no es admin y quiere entrar a /admin → fuera
  if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/no-permiso", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"], // agrega "/admin/:path*" si querés
}