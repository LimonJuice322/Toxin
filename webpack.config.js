const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: __dirname + "/source/pages/index/index.js",
    landing: __dirname + "/source/pages/landing/landing.js",
  }, // webpack entry point. Module to start building dependency graph
  output: {
    path: __dirname + '/dist', // Folder to store generated bundle
    filename: '[name].bundle.js',  // Name of generated bundle after build
    publicPath: '/' // public URL of the output directory when referenced in a browser
  },
  module: {  // where we defined file patterns and their loaders
      rules: [
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
          test: /\.(png|jpg)$/i,
          use: {
            loader: 'file-loader',
            query: {
              name: '[path][name].[ext]'
            }
          },
        },
        {
          test: /\.svg$/i,
          use: {
            loader: 'file-loader',
            query: {
              name: '[path][name].[ext]'
            }
          }
        },
        {
          test: /\.pug$/,
          use: ['pug-loader']
        }
      ]
  },
  plugins: [  // Array of plugins to apply to build chunk
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new HtmlWebpackPlugin({
          template: __dirname + "/source/pages/index/index.pug",
          chunks: ['index'],
          filename: './index.html',
          inject: 'body'
      }),
      new HtmlWebpackPlugin({
          template: __dirname + "/source/pages/landing/landing.pug",
          chunks: ['landing'],
          filename: './landing.html',
          inject: 'body'
      })
  ],
  devServer: {  // configuration for webpack-dev-server
      contentBase: './',  //source of static assets
      port: 7700, // port to run dev-server
      open: true, // Open browser
      index: 'index.html'
  }
};
