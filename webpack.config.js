const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: [
      // require.resolve('@patternfly/patternfly/components/AppLauncher/app-launcher.css'),
    './src/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist'
  },
  module:{
    rules:[
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {minimize: true}
          }
        ],
        test: /\.css$/,
        // include: [
        //     path.resolve(__dirname, 'src/css'),
        //     path.resolve(__dirname, 'node_modules/@patternfly/patternfly'),
        // ],
        use:['style-loader','css-loader']
      }
    ]
  },
  plugins: [
      new HtmlWebPackPlugin({
        template: "./src/components/app-launcher/index.html",
        filename: "./index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      })
  ]
};
