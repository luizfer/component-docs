/* @flow */

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

type Options = {
  root: string,
  entry: string,
  production: boolean,
  output: {
    path: string,
    bundle: string,
    style: string,
  },
};

const babelrc = {
  babelrc: false,
  cacheDirectory: false,
  presets: [
    [
      'env',
      {
        modules: false,
        targets: {
          browsers: ['last 2 versions', 'safari >= 7'],
        },
      },
    ],
    'react',
    'stage-2',
    'linaria/babel',
  ],
};

export default ({ root, entry, output, production }: Options) => ({
  context: root,
  devtool: 'source-map',
  entry: production ? entry : ['webpack-hot-middleware/client', entry],
  output: {
    path: output.path,
    filename: output.bundle,
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(production ? 'production' : 'development'),
      },
    }),
  ].concat(
    production
      ? [
          new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
          new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            sourceMap: true,
          }),
          new webpack.optimize.ModuleConcatenationPlugin(),
          new ExtractTextPlugin(output.style),
        ]
      : [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NamedModulesPlugin(),
          new webpack.NoEmitOnErrorsPlugin(),
        ]
  ),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: production
            ? babelrc
            : {
                ...babelrc,
                presets: [...babelrc.presets, 'react-hmre'],
              },
        },
      },
      {
        test: /\.css$/,
        use: production
          ? ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader',
            })
          : [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
});
