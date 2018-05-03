const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const common = require('./webpack.common.config.js');

const prodEnv = {
  NODE_ENV: JSON.stringify('production'),
  PLATFORM_ENV: JSON.stringify('web'),
  SERVER_URL: JSON.stringify('https://server.com/api'),
};

const stagingEnv = {
  NODE_ENV: JSON.stringify('staging'),
  PLATFORM_ENV: JSON.stringify('web'),
  SERVER_URL: JSON.stringify('https://staging-server.com/api'),
};

const cssFilename = 'static/css/[name].[hash:8].css';
const extractCSS = new ExtractTextPlugin('static/css/[name]-[hash:8].css');
module.exports = merge(common, {
  cache: false,
  devServer: {
    historyApiFallback: true, //always true
    contentBase: '../dist',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: 'static/js/[name]-[hash:8].bundle.js',
    filename: 'static/js/[name].[hash:8].js',
    publicPath: '/',
  },
  devtool: 'cheap-module-eval-source-map',
  stats: {
    //need it
    entrypoints: false,
    children: false,
  },
  module: {
    strictExportPresence: true, //need this
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: path.join(__dirname, 'src'),
      },
      {
        oneOf: [
          {
            test: /\.(png|svg|jpg|gif)$/,
            include: path.join(__dirname, 'src'),
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: '[name].[hash:8].[ext]',
              publicPath: '/static/media',
              outputPath: 'static/media',
            },
          },
          {
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, 'src'),
            loader: require.resolve('babel-loader'),
            exclude: /node_modules/,
            options: {
              plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
              compact: true,
            },
          },
          {
            test: /\.css$/,
            use: extractCSS.extract({
              fallback: 'style-loader',
              use: [{ loader: 'css-loader' }, { loader: 'postcss-loader' }],
            }),
          },
          {
            test: /\.(scss)$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract(
              Object.assign({
                fallback: require.resolve('style-loader'),
                use: [
                  {
                    loader: require.resolve('css-loader'),
                    options: {
                      importLoaders: 1,
                      minimize: true,
                      sourceMap: true,
                      publicPath: path.resolve(__dirname, 'dist'),
                    },
                  },
                  {
                    loader: require.resolve('postcss-loader'),
                    options: {
                      ident: 'postcss',
                      plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        autoprefixer({
                          browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9', // React doesn't support IE8 anyway
                          ],
                          flexbox: 'no-2009',
                        }),
                      ],
                    },
                  },
                  {
                    loader: require.resolve('sass-loader'),
                  },
                ],
                publicPath: path.resolve(__dirname, 'dist'),
              })
            ),
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(path.join(__dirname, 'dist')),
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, 'public/favicon.png'),
      prefix: 'static/media/icon[hash:8]/',
      icons: { favicons: true },
    }),
    new HtmlWebpackPlugin({
      sinject: true,
      template: path.join(__dirname, 'public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifySCSS: true,
        minifyURLs: true,
      },
    }),
    extractCSS,
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
    new webpack.DefinePlugin({
      'process.env': process.env.NODE_ENV === 'production' ? prodEnv : stagingEnv,
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
