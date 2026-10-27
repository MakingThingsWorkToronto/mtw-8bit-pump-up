import {defineConfig} from 'astro/config';
export default defineConfig({site:'https://8bit.makingthings.work',output:'static',trailingSlash:'always',server:{host:'127.0.0.1',port:8791},vite:{server:{strictPort:true}}});
