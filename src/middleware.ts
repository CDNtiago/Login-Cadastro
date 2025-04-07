import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Rotas públicas que não precisam de autenticação
const publicRoutes = ["/", "/login", "/register", "/api/auth"];

// Rotas que devem ser acessíveis apenas para usuários não autenticados
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const path = request.nextUrl.pathname;

  // Verifica se a rota atual está na lista de rotas públicas
  const isPublicRoute = publicRoutes.some(route => 
    path === route || path.startsWith(`${route}/`)
  );

  // Verifica se a rota atual está na lista de rotas de autenticação
  const isAuthRoute = authRoutes.some(route => 
    path === route || path.startsWith(`${route}/`)
  );

  // Se o usuário está tentando acessar uma rota de autenticação, mas já está autenticado,
  // redireciona para o dashboard
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Se a rota não é pública e o usuário não está autenticado,
  // redireciona para a página de login
  if (!isPublicRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}; 