import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  ...(process.env.NODE_ENV !== "production" && {
    experimental: {
      serverActions: {
        // Allows Server Actions (login, booking, admin forms) to work when the
        // dev server is accessed through a VS Code port-forwarding / dev tunnel
        // URL instead of localhost directly. VS Code's tunnel relay rewrites the
        // `Origin` header back to "localhost:3000" (while `x-forwarded-host` keeps
        // the public tunnel host), so "localhost:3000" is what Next.js actually
        // checks here — not the tunnel hostname itself.
        allowedOrigins: ["localhost:3000", "**.devtunnels.ms"],
      },
    },
  }),
};

export default nextConfig;
