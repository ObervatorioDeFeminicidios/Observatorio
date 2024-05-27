/** @type {import('next').NextConfig} */
import TerserPlugin from 'terser-webpack-plugin';

const nextConfig = {
  webpack: (config) => {
    config.optimization = {
      minimizer: [new TerserPlugin({ terserOptions: { mangle: false } })], // mangle false else mysql blow ups with "PROTOCOL_INCORRECT_PACKET_SEQUENCE"
    };
    return config;
  },
};

export default nextConfig;
