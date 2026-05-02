import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionCookie = request.cookies.get('sharepay_session');
    const isAuthenticated = !!sessionCookie;

    // List of public auth pages
    const publicAuthPages = [
        '/merchant/login', '/merchant/register', '/merchant/forgot-password',
        '/merchant/verify-email', '/merchant/verify-reset-code', '/merchant/reset-password',
        '/admin/login', '/super-admin/login', '/support/login',
    ];
    
    // Check if the current path is a public auth route
    const isPublicAuthRoute = publicAuthPages.some(page => pathname.includes(page));

    // Routes marchands protégées : tout ce qui commence par /merchant/ sauf les pages d'auth
    const isProtectedMerchantRoute = pathname.includes('/merchant/') && !isPublicAuthRoute;

    // 1. Redirect authenticated users away from auth pages to the merchant dashboard
    if (isAuthenticated && isPublicAuthRoute) {
        return NextResponse.redirect(new URL('/merchant/dashboard', request.url));
    }

    // 2. Redirect unauthenticated users trying to access protected routes
    if (!isAuthenticated && isProtectedMerchantRoute) {
        return NextResponse.redirect(new URL('/merchant/login', request.url));
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