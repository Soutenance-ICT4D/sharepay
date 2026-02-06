import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/core/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/v1/:path(.*)',
                destination: 'http://localhost:8080/api/v1/:path*',
            },
        ];
    },
};

export default withNextIntl(nextConfig);
