/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        images: {
            allowFutureImage: true,
        },
    },
    images: {
        domains: ["dd.b.pvp.net", "res.cloudinary.com"],
    },
};

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  style-src 'self' https://fonts.google.com/;
  font-src 'self';
`;

const securityHeaders = [
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "Referrer-Policy",
        value: "no-referrer",
    },
    {
        key: "Content-Security-Policy",
        value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
    },
];

module.exports = {
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: "/:path*",
                headers: securityHeaders,
            },
        ];
    },
};

module.exports = nextConfig;
