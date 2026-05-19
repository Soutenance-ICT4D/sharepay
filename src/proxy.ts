import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const merchantAuthPages = [
    '/merchant/login', '/merchant/register', '/merchant/forgot-password',
    '/merchant/verify-email', '/merchant/verify-reset-code', '/merchant/reset-password',
];

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionCookie = request.cookies.get('sharepay_session');
    const isAuthenticated = !!sessionCookie;

    const isMerchantAuthRoute = merchantAuthPages.some(page => pathname.includes(page));
    const isAdminAuthRoute = pathname.includes('/admin/login');
    const isSupportAuthRoute = pathname.includes('/support/login');

    const isProtectedMerchantRoute = pathname.includes('/merchant/') && !isMerchantAuthRoute;
    const isProtectedAdminRoute = pathname.includes('/admin/') && !isAdminAuthRoute;
    const isProtectedSupportRoute = pathname.includes('/support/') && !isSupportAuthRoute;

    // Redirect authenticated merchant users away from merchant auth pages
    if (isAuthenticated && isMerchantAuthRoute) {
        return NextResponse.redirect(new URL('/merchant/dashboard', request.url));
    }

    // Redirect unauthenticated users from protected routes to the relevant login page
    if (!isAuthenticated && isProtectedMerchantRoute) {
        return NextResponse.redirect(new URL('/merchant/login', request.url));
    }
    if (!isAuthenticated && isProtectedAdminRoute) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    if (!isAuthenticated && isProtectedSupportRoute) {
        return NextResponse.redirect(new URL('/support/login', request.url));
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: [
        '/',
        '/(fr|en)/:path*',
        '/((?!_next|_vercel|.*\\..*).*)'
    ]
};