// const debug = process.env.NODE_ENV !== "production"
const webpack = require('webpack')
const path = require('path')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')
module.exports = {
  context: __dirname,
  entry: './src/jsx/main.jsx',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: [
            'react', 'es2015'
          ],
          plugins: ['react-html-attrs', ['import', {
            "libraryName": "antd",
            "style": 'css',   // or 'css'
          }]]
        }
      },
      //下面是使用 ant-design 的配置文件
      {
        test: /\.css$/,
        use: extractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.styl$/,
        use: extractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-loader']
        })
      },
      {
        test: /\.less$/,
        use: extractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'src/images/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.styl'],
    alias: {
      'stylus': path.resolve(__dirname, 'src/stylus'),
      'asset': path.resolve(__dirname, 'src/asset'),
      'pc': path.resolve(__dirname, 'src/jsx/components/pc'),
      'mobile': path.resolve(__dirname, 'src/jsx/components/mobile'),
      'common': path.resolve(__dirname, 'src/jsx/components/common'),
      'images': path.resolve(__dirname, 'src/images'),
    }
  },
  output: {
    path: __dirname,
    filename: "./src/bundle.js",
    publicPath: 'https://raw.githubusercontent.com/liaoyinglong/react-news/master/src/images/'
    // publicPath: '/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new extractTextWebpackPlugin('./src/style.css')
  ]
}
