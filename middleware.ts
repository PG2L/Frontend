import type { NextRequest } from 'next/server'
import { getCookie } from 'cookies-next'
import {cookies} from 'next/headers'

export function middleware(request: NextRequest): Response | undefined {

    const currentUser: string | undefined = getCookie('currentUser', {cookies})

    if (!currentUser && !request.nextUrl.pathname.startsWith('/login') && request.nextUrl.pathname !== '/') {
        return Response.redirect(new URL('/login', request.url))
    }

    console.log(currentUser);
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
}