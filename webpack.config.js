const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : false;

module.exports = {
  stats: {
    errorDetails: true,
  },
  mode,
  target,
  devtool,
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    watchFiles: ['./**'],
    hot: true,
    compress: true,
    historyApiFallback: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  entry: [path.resolve(__dirname, 'src', 'index.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: process.env.NODE_ENV === 'production',
    filename: 'index.js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      // inject: 'body',
      scriptLoading: 'defer',
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        include: path.resolve(__dirname, 'src'),
        use: [
          // Creates `style` nodes from JS strings
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')],
              },
            },
          },
          // Compiles Sass to CSS
          // 'sass-loader',
        ],
      },
      {
        test: /\.woff2?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.(jpe?g|png|webp|gif)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
              // svgo: {
              //   plugins: [
              //     'cleanupAttrs',
              //     'removeDoctype',
              //     'removeXMLProcInst',
              //     'removeComments',
              //     'removeMetadata',
              //     'removeTitle',
              //     'removeDesc',
              //     'removeUselessDefs',
              //     'removeEditorsNSData',
              //     'removeEmptyAttrs',
              //     'removeHiddenElems',
              //     'removeEmptyText',
              //     'removeEmptyContainers',
              //     'cleanupEnableBackground',
              //     'convertStyleToAttrs',
              //     'convertColors',
              //     'convertPathData',
              //     'convertTransform',
              //     'removeUnknownsAndDefaults',
              //     'removeNonInheritableGroupAttrs',
              //     'removeUselessStrokeAndFill',
              //     'removeUnusedNS',
              //     'cleanupIDs',
              //     'cleanupNumericValues',
              //     'moveElemsAttrsToGroup',
              //     'moveGroupAttrsToElems',
              //     'collapseGroups',
              //     'mergePaths',
              //     'convertShapeToPath',
              //     'convertEllipseToCircle',
              //     'sortAttrs',
              //     'sortDefsChildren',
              //     'removeDimensions',
              //     {
              //       name: 'removeAttrs',
              //       params: {
              //         attrs: '(fill|stroke)',
              //       },
              //     },
              //   ],
              // },
            },
          },
        ],
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
      },
      {
        test: /\.svg$/,
        use: [
          'svg-sprite-loader',
          {
            loader: 'svgo-loader',
            options: {
              configFile: '../../svgo.config.js',
            },
          },
        ],
      },
      {
        test: /\.m?jsx?$/i,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: 'defaults',
                  debug: true,
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
};
