const { CONFIG } = require("./webpack.common")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

CONFIG.mode = "production"
CONFIG.output.clean = true

CONFIG.module.rules.push({
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
    },
  },
})

CONFIG.plugins.push(
  new MiniCssExtractPlugin({
    filename: "[name].css",
  })
)

const cssLoaders = [
  MiniCssExtractPlugin.loader,
  "css-loader",
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: ["postcss-preset-env"],
      },
    },
  },
]
CONFIG.module.rules[0].use = cssLoaders
CONFIG.module.rules[1].use = [...cssLoaders, "sass-loader"]

module.exports = CONFIG
