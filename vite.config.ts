import { defineConfig } from 'vite'
import { fileURLToPath, URL} from "node:url"
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import autoprefixer from 'autoprefixer'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    postcss: {
      plugins: [autoprefixer]
  },
},
  resolve: {
    alias: {
      '@' : fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
