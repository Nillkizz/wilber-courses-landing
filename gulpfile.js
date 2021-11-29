const gulp = require("gulp"),
  gulpif = require("gulp-if"),
  plumber = require("gulp-plumber"),
  notify = require("gulp-notify"),
  sourcemaps = require("gulp-sourcemaps"),
  pug = require("gulp-pug"),
  sass = require("gulp-sass")(require("sass")),
  postcss = require("gulp-postcss"),
  gcmq = require("gulp-group-css-media-queries"),
  del = require("del"),
  bs = require("browser-sync"),
  gulpWebpack = require("webpack-stream"),
  webpack = require("webpack"),
  { path, configs } = require("./config.js");

function clear() {
  return del(path.clear);
}
function clearAssets() {
  return del(path.build.assets);
}

class Tasks {
  static assets() {
    return gulp
      .src(path.src.assets)
      .pipe(plumber())
      .pipe(gulp.dest(path.build.assets))
      .pipe(bs.stream({ once: true }));
  }
  static pug() {
    return gulp
      .src(path.src.pug)
      .pipe(plumber())
      .pipe(pug())
      .on(
        "error",
        notify.onError({
          message: "<%= error.message %>",
          title: "Pug Error!",
        })
      )
      .pipe(gulp.dest(path.build.html))
      .pipe(bs.stream({ once: true }));
  }
  static sass() {
    return gulp
      .src(path.src.sass)
      .pipe(plumber())
      .pipe(gulpif(configs.global.isDev, sourcemaps.init()))
      .pipe(sass())
      .pipe(postcss(configs.postcss.plugins("postcss-import", "tailwindcss")))
      .pipe(gulpif(configs.global.isProd, gcmq()))
      .pipe(
        gulpif(
          configs.global.isProd,
          postcss(configs.postcss.plugins("postcss-csso", "autoprefixer"))
        )
      )
      .on(
        "error",
        notify.onError({
          message: "<%= error.message %>",
          title: "Sass Error!",
        })
      )
      .pipe(gulpif(configs.global.isDev, sourcemaps.write()))
      .pipe(gulp.dest(path.build.css))
      .pipe(bs.stream({ once: true }));
  }
  static js() {
    return gulp
      .src(path.src.js)
      .pipe(plumber())
      .pipe(gulpWebpack(require("./webpack.config.js"), webpack))
      .on(
        "error",
        notify.onError({
          message: "<%= error.message %>",
          title: "JS Error!",
        })
      )
      .pipe(gulp.dest(path.build.js))
      .pipe(bs.stream({ once: true }));
  }
}

function browserSync() {
  bs.init({
    server: path.distFolder,
    host: "0.0.0.0",
    port: 3000,
    notify: false,
  });
}

function watchFiles() {
  gulp.watch(path.watch.pug, gulp.series(Tasks.pug, Tasks.sass));
  gulp.watch(path.watch.styles, Tasks.sass);
  gulp.watch(path.watch.js, Tasks.js);
  gulp.watch(path.watch.assets, gulp.series(clearAssets, Tasks.assets));
}
const build = gulp.series(clear, Tasks.pug, Tasks.sass, Tasks.js, Tasks.assets);
const serve = gulp.parallel(watchFiles, browserSync);

exports.build = build;
exports.serve = gulp.series(build, serve);
exports.clear = clear;
