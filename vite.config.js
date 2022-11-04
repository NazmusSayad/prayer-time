import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import vitePWA from 'vite-pwa'
import react from '@vitejs/plugin-react'
import svgr from '@honkhonk/vite-plugin-svgr'
import intelliPath from './intellipath.js'

const isDevMode = process.env.NODE_ENV !== 'production'
const srcDir = path.resolve('./src')
const config = {
  static: 'static',
  assets: 'assets',
}

const plugins = [react(), svgr.default(), vitePWA()]

const css = {
  modules: {
    generateScopedName: isDevMode
      ? '[local]___[name]--[hash:base64:5]'
      : '[hash:base64]',
  },
  preprocessorOptions: {
    scss: {
      additionalData: `@use '$styles/core' as *;\n`,
    },
  },
}

const resolve = {
  alias: {
    $src: srcDir,
    ...Object.fromEntries(
      fs
        .readdirSync(srcDir)
        .filter((t) => fs.lstatSync(path.join(srcDir, t)).isDirectory())
        .map((t) => [`$${t}`, path.join(srcDir, t)])
    ),
  },
}

const server = {
  host: 'localhost',
  port: 3000,
}

const build = {
  rollupOptions: {
    output: {
      assetFileNames: (file) => {
        const ext = file.name.split('.').at(-1)
        const outputFolder =
          ext === 'css' || ext === 'js' ? '' : config.assets + '/'
        return `${config.static}/${outputFolder}[name]-[hash][extname]`
      },
      entryFileNames: `${config.static}/[name]-[hash].js`,
      chunkFileNames: `${config.static}/chunk-[name]-[hash].js`,
    },
  },
}

intelliPath(resolve.alias)
export default defineConfig({ plugins, css, resolve, server, build })
