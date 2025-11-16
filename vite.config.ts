import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { VueMcp } from 'vite-plugin-vue-mcp'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VueMcp(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dirs: ['./src/composables/**'],
    }),
    Components({
      dts: true,
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
      globalNamespaces: ['shadcn'],
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
      resolvers: [
        IconsResolver({
          prefix: false,
        }),
      ],
    }),
    Icons({
      compiler: 'vue3',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
