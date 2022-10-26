/** @type {import('next').NextConfig} */

//Todo
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  style-src 'self';
  font-src 'self' https://fonts.google.com/*;
  img-src '*';
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
];

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
