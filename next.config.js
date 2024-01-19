/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        esmExternals: "loose",
    },
    reactStrictMode: false,
    webpack: (config) => {
        // config.externals = {
        //     ...config.externals,
        //     aeternity: "@aeternity/aepp-sdk",
        // };

        config.module = {
            ...config.module,
            rules: [
                ...config.module.rules,
                { test: /\.node$/, use: "node-loader" },
            ],
        };

        return config;
    },
};

module.exports = nextConfig;
