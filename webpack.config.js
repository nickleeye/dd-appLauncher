const path = require('path');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fileRegEx = /\.(png|woff|woff2|eot|ttf|svg|gif|jpe?g|png)(\?[a-z0-9=.]\+)?$/;

module.exports = {
  entry: [
    require.resolve('@patternfly/patternfly/patternfly-base.css'),
    require.resolve('@patternfly/patternfly/components/AppLauncher/app-launcher.css'),
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
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'node_modules/@patternfly/patternfly'),
        ],
        use: ['style-loader','css-loader']
      },
      {
        test: fileRegEx,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin(
        {
          template: './src/components/app-launcher/index.html',
          filename: 'index.html'
        }),
    new MiniCssExtractPlugin(
        {
          filename: '[name].css',
          chunkFilename: '[id].css',
        }),
    new CopyWebPackPlugin([
      {
        from: 'node_modules/@patternfly/patternfly/patternfly-base.css',
        to: '@patternfly/patternfly'
      },
      {
        from: 'node_modules/@patternfly/patternfly/components/AppLauncher/app-launcher.css',
        to: '@patternfly/patternfly/components/AppLauncher'
      }
    ])
  ]
};
