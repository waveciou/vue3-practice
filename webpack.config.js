const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/resources/js/main.js')
  },
  output: {
    filename: './resources/js/[name].js',
    path: path.resolve(__dirname, './dist')
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(scss|sass)$/i,
        include: path.resolve('./src/resources/scss'),
        exclude: path.resolve('./node_modules'),
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: { 
          //     publicPath: '../../',
          //   },
          // },
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer']
                ]
              }
            }
          },
          'sass-loader'
        ]
      },
      // {
      //   test: /\.(png|svg|jpg|jpge|gif)$/,
      //   include: path.resolve('./src/resources/img'),
      //   exclude: path.resolve('./node_modules'),
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: './resources/img',
      //       publicPath: '../img/'
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './resources/css/[name].css'
    }),
    // new IgnoreEmitPlugin(['reset.js']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      minify: true,
      inject: false
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: './src/resources/img/favicon',
    //       to: './resources/img/favicon'
    //     },
    //     {
    //       from: './src/resources/img/demo.gif',
    //       to: './resources/img/demo.gif'
    //     }
    //   ]
    // }),
  ],
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    compress: true,
    port: 3000,
    stats: {
      assets: true,
      cached: false,
      chunkModules: false,
      chunkOrigins: false,
      chunks: false,
      colors: true,
      hash: false,
      modules: false,
      reasons: false,
      source: false,
      version: false,
      warnings: false
    }
  }
};