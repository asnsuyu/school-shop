import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import externalGlobals from 'rollup-plugin-external-globals'
// import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      // 自动导入插件
      AutoImport({
        resolvers: [ElementPlusResolver()],
        // imports: ["vue", "vue-index"], // 自动导入 Vue 和 Vue Router API
        // dts: true // 自动生成类型声明文件
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })], // 告知element-plus使用sass样式进行配色
        // dts: true // 自动生成类型声明文件
      }),

      // 打包可视化插件
      // visualizer({
      //   gzipSize: true,
      //   brotliSize: true,
      //   emitFile: false,
      //   filename: 'dist_vis.html', // 分析图生成的文件名
      //   open: true, // 如果存在本地服务端口，将在打包后自动展示
      // }),
    ],

    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          // 在生产环境中移除console.log
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        // external: [
        //   'vue',
        //   'vue-demi',
        //   'vue-router',
        //   'stores',
        //   'element-plus',
        //   'axios',
        // ],
        // plugins: [
        //   externalGlobals({
        //     'vue': 'Vue',
        //     'vue-demi': 'VueDemi',
        //     'vue-router': 'VueRouter',
        //     'stores': 'Pinia',
        //     'element-plus': 'ElementPlus',
        //     'axios': 'axios',
        //   }),
        // ],
        output: {
          entryFileNames: '[name]-[hash].js',
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: '[name]-[hash].[ext]',
        },
      },
    },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          // 配置自动导入scss文件
          additionalData: `
          @use "@/styles/var.scss" as *;
        `,
        },
      },
    },
  }
})
