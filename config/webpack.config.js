const app = require('./app.json');
const { port } = app;

// Plugins
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLint = require('stylelint-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

// Paths
const path = require('path');

const sourcePath = path.resolve(process.cwd(), 'src');
const buildPath = path.resolve(process.cwd());
const configPath = path.resolve(process.cwd(), 'config');

// Main config
const config = {
  context: sourcePath,

  // General config
  entry: {
    app: ['babel-polyfill', 'index.js'],
    vendor: [
      'prop-types',
      'react',
      'react-dom'
    ]
  },

  output: {
    filename: 'static/js/[chunkhash:8].[name].js',
    path: buildPath
  },

  // DevServer config
  devServer: {
    contentBase: sourcePath,
    compress: true,
    port
  },


  // Files alias and extendions
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      components: `${sourcePath}/components`,
      styles: path.resolve(__dirname, `${sourcePath}/assets/scss`),
      scripts: `${sourcePath}/assets/js`,
      assets: `${sourcePath}/assets`
    },
    modules: [
      'node_modules',
      sourcePath
    ]
  },

  // Rules config
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer]
              }
            },
            'sass-loader'
          ]
        })
      },

      { // babel config
        test: /\.jsx?$/,
        include: sourcePath,
        use: [
          'babel-loader'
        ]
      },

      { // eslint config
        test: /\.jsx?$/,
        enforce: 'pre',
        include: sourcePath,
        loader: 'eslint-loader',
        options: {
          configFile: `${configPath}/.eslintrc`
          // fix: true // autofix eslint errors
        }
      },
    ]
  },

  // plugins config
  plugins: [
    // Extract CSS
    new ExtractTextPlugin('static/css/style.css'),

    // Style Lint
    new StyleLint({
      configFile: `${configPath}/.stylelintrc/`,
      context: sourcePath,
      syntax: 'scss'
    }),

    // Generate HTML file
    new HtmlPlugin({
      template: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),

    // Add global object config
    new webpack.DefinePlugin({
      app: JSON.stringify(app)
    })
  ]

};

module.exports = config;
