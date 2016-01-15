var path = require('path')

module.exports = {

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }
    ]
  },

  entry: './src/index.jsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },

  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.jsx']
  }
}
