import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src/*" },
      { find: "@pages", replacement: "/src/pages" },
      {find: "@service", replacement: "/src/service"},
      {find: "@types", replacement: "/src/types"},
      {find: "@token-service", replacement: "/src/utils/token-service"},
      {find: "@components", replacement: "/src/components"},
      {find: "@modals", replacement: "/src/components/modal"},
      {find: "@notification", replacement: "/src/utils/notification"}
    ]
  }
})
