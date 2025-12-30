import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateSession } from './lib/auth';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log('Middleware checking:', pathname);

    // Allow access to login page
    if (pathname === '/admin/login') {
        console.log('Allowing access to login page');
        return NextResponse.next();
    }

    // Protect all /admin routes
    if (pathname.startsWith('/admin')) {
        const sessionToken = request.cookies.get('admin_session')?.value;
        console.log('Session token:', sessionToken ? 'exists' : 'missing');

        if (!sessionToken || !validateSession(sessionToken)) {
            console.log('Redirecting to login - invalid/missing session');
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }

        console.log('Session valid, allowing access');
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
