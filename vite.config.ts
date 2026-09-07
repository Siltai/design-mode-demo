import designMode from 'silt-design-mode/vite';
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [designMode(), react()],
  define: {
    // A browser cannot work out where this repo lives on disk, and design mode
    // needs it to find the service that edits this tree (several projects can
    // run listeners at once). Build time is the only place that knows.
    __REPO_ROOT__: JSON.stringify(process.cwd()),
  },
})
