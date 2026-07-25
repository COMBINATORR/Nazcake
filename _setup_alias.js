const fs = require("fs");
const path = require("path");

fs.writeFileSync(
  "jsconfig.json",
  JSON.stringify(
    {
      compilerOptions: {
        baseUrl: ".",
        paths: {
          "@/*": ["./src/*"],
        },
      },
    },
    null,
    2
  ) + "\n"
);

const viteContent = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    globals: true,
  },
})
`;
fs.writeFileSync("vite.config.js", viteContent);
console.log("ok");
console.log(fs.readFileSync("jsconfig.json", "utf8"));