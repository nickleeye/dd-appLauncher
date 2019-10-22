const path = require('path');

module.exports = {
  entry: [
      require.resolve('@patternfly/patternfly/components/AppLauncher/app-launcher.css'),
    './src/demo/index.js',
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
        test:/\.css$/,
        include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules/@patternfly/patternfly'),
        ],
        use:['style-loader','css-loader']
      }
    ]
  },
};
