module.exports = {
  entry: './src/client/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public'
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
