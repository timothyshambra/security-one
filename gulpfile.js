const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const browserSync = require("browser-sync").create();

function compileSass() {
  return gulp
    .src("src/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest("_site/css"))
    .pipe(browserSync.stream());
}

function copyHtml() {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("_site"));
}

function copyImages() {
  return gulp.src("src/images/*").pipe(gulp.dest("_site/images"));
}

function optimizeScripts() {
  return gulp.src("src/scripts/*")
    .pipe(uglify())
    .pipe(gulp.dest("_site/scripts"));
}

function copyData() {
  return gulp.src("src/data/*").pipe(gulp.dest("_site/data"));
}

function reload(done) {
  browserSync.reload();
  done();
}

function misc() {
  return gulp.src("src/favicon.*").pipe(gulp.dest("_site/"));
}

function serve(done) {
  browserSync.init({
    server: {
      baseDir: "./_site",
    },
  });

  gulp.watch("src/scss/**/*.scss", gulp.series(compileSass, reload));
  gulp.watch("src/*.html", gulp.series(copyHtml, reload));
  gulp.watch("src/images/*", gulp.series(copyImages, reload));
  gulp.watch("src/scripts/*", gulp.series(optimizeScripts, reload));
  gulp.watch("src/data/*", gulp.series(copyData, reload));

  done();
}


exports.compileSass = compileSass;
exports.copyHtml = copyHtml;
exports.serve = serve;
exports.default = gulp.series(
  gulp.parallel(compileSass, copyHtml, copyImages, optimizeScripts, copyData, misc),
  serve
);

exports.build = gulp.series(
  gulp.parallel(compileSass, copyHtml, copyImages, optimizeScripts, copyData, misc),
);
