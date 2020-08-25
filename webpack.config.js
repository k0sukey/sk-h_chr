const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/background.ts'
  },
  output: {
    path: path.join(__dirname, 'extension'),
    filename: 'background.js',
  },
  module: {},
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['src', 'node_modules'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  mode: 'production',
  node: {
    global: true,
  },
};
