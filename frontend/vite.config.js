import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import fs from "fs";
import path from "path";

// A plugin to clean TS types from routeTree.gen.js on disk so it remains valid JS.
function cleanRouteTreePlugin() {
  const routeTreePath = path.resolve("src/routeTree.gen.js");

  const cleanFile = () => {
    try {
      if (fs.existsSync(routeTreePath)) {
        const content = fs.readFileSync(routeTreePath, "utf-8");
        if (content.includes("import type") || content.includes("declare module")) {
          const index = content.indexOf("import type");
          if (index !== -1) {
            const cleanContent = content.substring(0, index).trim() + "\n";
            fs.writeFileSync(routeTreePath, cleanContent, "utf-8");
          }
        }
      }
    } catch (e) {
      console.error("Error cleaning routeTree.gen.js:", e);
    }
  };

  // Perform clean synchronously during plugin construction (when vite starts/loads config)
  cleanFile();

  // Watch the file directly via standard node fs to clean it instantly when modified
  let watcher;
  try {
    const dir = path.dirname(routeTreePath);
    if (fs.existsSync(dir)) {
      watcher = fs.watch(dir, (eventType, filename) => {
        if (filename === "routeTree.gen.js") {
          cleanFile();
        }
      });
    }
  } catch (e) {
    // Fail silently if watch fails
  }

  return {
    name: "clean-route-tree",
    buildStart() {
      cleanFile();
    },
    transform(code, id) {
      if (id.replace(/\\/g, "/").endsWith("src/routeTree.gen.js")) {
        cleanFile();
        // Return cleaned code if it's currently being loaded
        if (code.includes("import type")) {
          const index = code.indexOf("import type");
          if (index !== -1) {
            return {
              code: code.substring(0, index).trim() + "\n",
              map: null,
            };
          }
        }
      }
      return null;
    },
    closeBundle() {
      if (watcher) {
        watcher.close();
      }
    }
  };
}

export default defineConfig(({ command }) => ({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.js (our SSR error wrapper).
      // nitro/vite builds from this
      server: { entry: "server" },
      router: {
        disableTypes: true,
        generatedRouteTree: "routeTree.gen.js",
      },
    }),
    cleanRouteTreePlugin(),
    react(),
    command === "build" ? nitro() : null,
  ].filter(Boolean),
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
      },
    },
  },
}));
