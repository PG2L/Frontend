import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest): Response | undefined {
    const currentUser: string | undefined = request.cookies.get('currentUser')?.value

    if (currentUser && !request.nextUrl.pathname.startsWith('/home') && request.nextUrl.pathname !== '/') {
        return Response.redirect(new URL('/home', request.url))
    }

    if (!currentUser && !request.nextUrl.pathname.startsWith('/login') && request.nextUrl.pathname !== '/') {
        return Response.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
}