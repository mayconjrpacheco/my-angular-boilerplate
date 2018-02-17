const gulp = require('gulp');
const stubby = require('gulp-stubby-server');



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
  