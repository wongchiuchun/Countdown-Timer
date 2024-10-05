import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/countdownWidget.ts',
      name: 'CountdownWidget',
      fileName: 'countdown-widget',
    },
  },
})