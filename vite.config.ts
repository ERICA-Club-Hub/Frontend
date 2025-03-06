import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    // 시스템 기본 브라우저 설정에 따라 오픈 (ex. Chrome)
    server: {
        open: true,
    },
    plugins: [
        react(),
        svgr(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: [
                'favicon.ico',
                'apple-touch-icon.png',
                'mask-icon.svg',
            ],
            manifest: {
                name: '한자리',
                short_name: '한자리',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'maskable_icon_x48.png',
                        sizes: '48x48',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: 'maskable_icon_x72.png',
                        sizes: '72x72',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: 'maskable_icon_x96.png',
                        sizes: '96x96',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: 'maskable_icon_x128.png',
                        sizes: '128x128',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: 'maskable_icon_x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: 'maskable_icon_x384.png',
                        sizes: '384x384',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: 'maskable_icon_x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
