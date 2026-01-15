import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@styles": path.resolve(__dirname, "./src"),
      "@hoc": path.resolve(__dirname, "./src/hoc"),
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
  },

  // Build optimizations
  build: {
    // Output directory
    outDir: "dist",

    // Generate sourcemaps for production debugging (optional)
    sourcemap: false,

    // Minification
    minify: "terser",
    terserOptions: {
      compress: {
        // Remove console.logs in production
        drop_console: true,
        drop_debugger: true,
      },
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 1000,

    // Rollup options for code splitting
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // React core libraries
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // Three.js and 3D libraries
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"],
          // Animation libraries
          animation: ["framer-motion"],
          // Utilities
          utils: ["prop-types", "@emailjs/browser"],
        },
        // Asset file naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          let extType = info[info.length - 1];

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "images";
          } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            extType = "fonts";
          }

          return `assets/${extType}/[name]-[hash][extname]`;
        },
        // Chunk file naming
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },

    // Enable CSS code splitting
    cssCodeSplit: true,

    // Optimize dependencies
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  // Development server configuration
  server: {
    port: 5173,
    open: true,
    cors: true,
    // Enable HMR
    hmr: {
      overlay: true,
    },
  },

  // Preview server configuration
  preview: {
    port: 4173,
    open: true,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },
});
