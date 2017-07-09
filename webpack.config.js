var path = require('path')
var webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HtmlResWebpackPlugin = require('html-res-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const WebpackMd5Hash = require('webpack-md5-hash')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    build: './src/main.js',
    lib: ['./src/assets/js/lib/rem.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './',
    filename: 'js/[name]_[hash].js',
    chunkFilename: 'js/[name]_[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
             less: ExtractTextPlugin.extract({
              use: 'css-loader!less-loader',
              fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
            })
          }
        }
      },
      {
        test: /\.less$/,
        loader: 'css-loader!less-loader',
        exclude: /node_modules/
      }, 
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader?name=img/[name]_[hash].[ext]',
          // 'url-loader'
          // {
          //   loader: 'img-loader',
          //   query: {
          //     progressive: true,
          //     pngquant: {
          //       floyd: .5,
          //       speed: 4
          //     }
          //   }
          // }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          root: path.resolve(__dirname, 'dist')
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new CleanWebpackPlugin('./dist/'),
    new WebpackMd5Hash(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('index_[chunkhash].css'),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new  webpack.optimize.CommonsChunkPlugin({
      name: 'lib',
      filename:'js/lib_[hash].js'
    })
    //  new CopyWebpackPlugin([{
    //   from: 'src/assets/img/**'
    // }]),
    // new ImageminPlugin({
    //   test: /\.(jpe?g|png|gif|svg)$/i,
    //   disable: process.env.NODE_ENV !== 'production', // Disable during development 
    //   pngquant: {
    //     quality: '95-100'
    //   },
    //   optipng: {
    //     optimizationLevel: 9
    //   }
    // })
  ],
  devServer: {
    historyApiFallback: true,
    // noInfo: true,
    publicPath: "/"
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
