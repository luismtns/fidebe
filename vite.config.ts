import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { EsLinter, linterPlugin } from 'vite-plugin-linter'
import tsConfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(configEnv => ({
  plugins: [
    react(),
    tsConfigPaths(),
    linterPlugin({
      include: ['./src/**/*.{ts,tsx}'],
      linters: [new EsLinter({ configEnv })],
    }),
    dts({
      include: ['lib/main.tsx'],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('/lib', ''),
        content,
      }),
    }),
  ],
  build: {
    lib: {
      entry: resolve('lib', 'main.tsx'),
      name: 'FidebeWidget',
      fileName: (format) => `fidebe-widget.${format}.js`,
    },
    rollupOptions: {
      external: ['react'],
    },
  },
}))
