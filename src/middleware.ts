import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './core/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionCookie = request.cookies.get('sharepay_session');
    const isAuthenticated = !!sessionCookie;

    // List of public auth pages
    const publicAuthPages = ['/login', '/register', '/forgot-password', '/verify-email', '/verify-reset-code', '/reset-password'];
    
    // Check if the current path is a protected dashboard route
    const isDashboardRoute = pathname.includes('/dashboard');
    
    // Check if the current path is a public auth route
    const isPublicAuthRoute = publicAuthPages.some(page => pathname.includes(page));

    // 1. Redirect authenticated users away from /login etc. to /dashboard
    if (isAuthenticated && isPublicAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // 2. Redirect unauthenticated users from /dashboard to /login
    if (!isAuthenticated && isDashboardRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Apply i18n middleware for all cases
    return intlMiddleware(request);
}

export const config = {
    matcher: [
        '/',
        '/(fr|en)/:path*',
        '/((?!_next|_vercel|.*\\..*).*)'
    ]
};