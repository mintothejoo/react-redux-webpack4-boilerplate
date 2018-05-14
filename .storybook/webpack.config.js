const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(eot|ttf|otf|woff|woff2)$/,
        use: 'file-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg/,
        use: 'svg-url-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              includePaths: [path.resolve(__dirname, '../src/styles')],
            },
          },
        ],
        include: path.resolve(),
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
  },
};
