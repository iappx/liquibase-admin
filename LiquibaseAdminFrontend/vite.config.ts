import { defineConfig } from 'vite'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig(() => {
    return {
        plugins: [vue()],
        base: '',
        server: {
            port: 9912,
        },
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: path.resolve(__dirname, 'src'),
                },
            ],
        },
        build: {
            chunkSizeWarningLimit: 1024,
            cssCodeSplit: false,
            outDir: './dist',
            assetsDir: 'assets',
            emptyOutDir: true,
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                },
            },
        },
    }
})
