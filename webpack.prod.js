const path = require('path')
const { CONFIG } = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

CONFIG.mode = 'production'
CONFIG.output.clean = true

CONFIG.module.rules.push({
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  },
})

CONFIG.plugins.push(
  new MiniCssExtractPlugin({
    filename: '[name].css',
  }),
  new WorkboxPlugin.GenerateSW({
    clientsClaim: true,
    skipWaiting: true,
  }),
  new WebpackPwaManifest({
    name: 'Salah Time',
    short_name: 'Salah-Time',
    description:
      'An app to get accurate time for Salah from all over the world',
    background_color: '#404040',
    'theme-color': '#5FA2BC',
    theme_color: '#5FA2BC',
    display: 'standalone',
    orientation: 'any',
    crossorigin: 'anonymous',
    publicPath: './',
    ios: true,
    icons: [
      {
        src: path.resolve('./src/assests/icon.png'),
        sizes: [36, 48, 72, 96, 144, 192, 512],
      },
      {
        src: path.resolve('./src/assests/icon.png'),
        sizes: [36, 48, 72, 96, 144, 192, 512],
        purpose: 'maskable',
      },
    ],
  })
)

const cssLoaders = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: ['postcss-preset-env'],
      },
    },
  },
]
CONFIG.module.rules[0].use = cssLoaders
CONFIG.module.rules[1].use = [...cssLoaders, 'sass-loader']

module.exports = CONFIG
