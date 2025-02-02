const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/rua.js',
  output: {
    filename: 'rua.js',
    path: path.resolve(__dirname, 'dist/js')
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              'env',
              {
                modules: false,
                targets: {
                  browsers: ['> 2%'],
                  uglify: true
                }
              }
            ]
          ],
          plugins: [
            'transform-object-rest-spread',
            [
              'transform-runtime',
              {
                polyfill: false,
                helpers: false
              }
            ]
          ]
        }
      }
    }]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        minify(file, sourceMap) {
          // https://github.com/mishoo/UglifyJS2#minify-options
          const uglifyJsOptions = { /* your `uglify-js` package options */ }

          if (sourceMap) {
            uglifyJsOptions.sourceMap = {
              content: sourceMap,
            };
          }

          return require('uglify-js').minify(file, uglifyJsOptions)
        }
      })
    ]
  }
};
