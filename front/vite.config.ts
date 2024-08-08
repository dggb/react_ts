import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/api",
        changeOrigin: true,
        secure: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      },
      "/imageApi": {
        target: "https://picsum.photos/v2/list?page=2&limit=100",
        changeOrigin: true,
        secure: true,
        rewrite: (path: string) => path.replace(/^\/imageApi/, ""),
      },
      "/treedApi": {
        target: "http://studio-dev.treed.ai:8080/api",
        changeOrigin: true,
        secure: true,
        rewrite: (path: string) => path.replace(/^\/treedApi/, ""),
        headers: {
          Authorization:
            "fd547ca8137b9906cce2d3972cf5b73131e7f61ed5826e754d8624f1bff30eef5bcf6869ca9995e09b59dc34168d646e0608e1d8ce4d5e64b2d71fa3a3103037",
        },
      },
    },
  },
});
