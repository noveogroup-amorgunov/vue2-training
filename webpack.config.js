const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const Dotenv = require('dotenv-webpack');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
require('dotenv-extended').load();

const publicFolder = resolve(__dirname, 'dist');
const srcFolder = resolve(__dirname, 'src');
const projectFolder = resolve(__dirname);

module.exports = {
  entry: [
    'babel-polyfill',
    './src/entry-client.js',
    './src/stylesheets/app.scss',
  ],
  output: {
    filename: 'bundle.js',
    path: publicFolder,
    publicPath: '/',
  },
  module: {
    rules: [
      /*{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [srcFolder],
        options: {
          formatter: eslintFriendlyFormatter,
        },
      },*/
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
            'css': 'vue-style-loader!css-loader',
          },
          // other vue-loader options go here
        },
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader' }, { loader: 'sass-loader', options: { sourceMap: true } }],
        }),
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.vue', '.js', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': srcFolder,
    },
  },
  devServer: {
    contentBase: publicFolder,
    historyApiFallback: true,
    disableHostCheck: true,
    noInfo: true,
  },
  performance: {
    hints: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve(srcFolder, 'index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_URL: JSON.stringify(process.env.API_URL),
        APP_KEY: JSON.stringify(process.env.APP_KEY),
      },
    }),
    new ExtractTextPlugin({
      filename: process.env.NODE_ENV !== 'production' ? '[hash].styles.css' : '[hash].style.min.css',
      allChunks: true,
      disable: process.env.NODE_ENV === 'development',
    }),
  ],
  devtool: '#eval-source-map',
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
}
