const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const stubby = require('gulp-stubby-server');
const webpack = require('webpack');
const browserSync = require('browser-sync');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const historyApiFallback = require('connect-history-api-fallback');

const root = 'src';

const entries = {
  "main": [
    path.join(__dirname, root, 'main.ts')
  ],
  "polyfills": [
    path.join(__dirname, root, 'polyfills.ts')
  ]
}

gulp.task('stubby', (cb) => {
    var options = {
      stubs: 8080,
      location: '0.0.0.0',
      mute: false,
      files: [
        'src/**/*.stub.json'
      ]
    };
    stubby(options, cb);
});

gulp.task('build', (cb) => {
  const config = require('./webpack.config');
  config.entry = entries;

  webpack(config, (err, stats) => {
    if (err) {
      throw new gutil.PluginError("webpack", err);
    }

    gutil.log("[webpack]", stats.toString({
      colors: true,
      chunks: false,
      errorDetails: true
    }));

    cb();
  });
});
  
gulp.task('serve', () => {

  const config = require('./webpack.config');
  config.entry = entries;

  const compiler = webpack(config);

  browserSync({
    port: process.env.PORT || 8080,
    open: false,
    server: {
      baseDir: root
    },
    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(compiler, {
        stats: {
          colors: true,
          chunks: true,
          modules: true
        },
        publicPath: config.output.publicPath
      }),
      webpackHotMiddleware(compiler)
    ]
  });
});
