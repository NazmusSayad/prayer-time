const { CONFIG, PATH } = require('./webpack.common')

CONFIG.mode = 'development'
CONFIG.stats = 'errors-warnings'
CONFIG.devtool = 'eval-source-map'

CONFIG.devServer = {
  watchFiles: ['src/*', 'public/*'],

  client: {
    logging: 'none',
    overlay: false,
    progress: false,
  },

  static: {
    directory: PATH.output,
  },

  // host: 'localhost',
  port: 3000,
  hot: true,
  compress: false,
}

module.exports = CONFIG
