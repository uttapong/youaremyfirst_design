const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
// const svgSprite = require("gulp-svg-sprite")
// const svg2png = require('gulp-svg2png')
const livereload = require("gulp-livereload");
const wpPot = require("gulp-wp-pot");
var config = {
  scripts: [
    // Bootstrap
    "./js/vendor/bootstrap.js",
    // Modernizr
    // "./js/vendor/modernizr/modernizr.shiv.js",
    // SVG Fallback
    // './js/vendor/svg/svg-fallback.js',
    // Any Custom Scripts
    "./js/app/**/*.js"
  ]
};
gulp.task("scripts", function () {
  return gulp
    .src(config.scripts)
    .pipe(concat("./js/scripts.js"))
    .pipe(gulp.dest("./js/"))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js"
      })
    )
    .pipe(livereload())
    .pipe(gulp.dest("./js/"));
});
gulp.task("sass", function () {
  return gulp
    .src("./sass/style.scss")
    .pipe(
      sass
      .sync({
        outputStyle: "compressed"
      })
      .on("error", sass.logError)
    )
    .pipe(gulp.dest("./"));
});

gulp.task("pot", function () {
  return gulp
    .src("**/*.php")
    .pipe(
      wpPot({
        // domain: "motorhomes-and-caravans",
        package: "Motorhomes and Caravans Theme"
      })
    )
    .pipe(gulp.dest("languages/motorhomescaravans.pot"));
});
// gulp.task('sprites', function () {
//     return gulp.src('**/*.svg', {
//             cwd: './svg/individual'
//         })
//         .pipe(svgSprite({
//             shape: {
//                 transform: ['svgo']
//             },
//             mode: {
//                 defs: {
//                     dest: '.'
//                 }
//             }
//         }))
//         .pipe(gulp.dest('./svg/'));
// });
// gulp.task('svg2png', function () {
//     return gulp.src('./svg/individual/**/*.svg')
//         .pipe(svg2png())
//         .pipe(gulp.dest('./svg/pngs/'));
// });
gulp.task("sass", function () {
  return gulp
    .src("./sass/**/*.scss")
    .pipe(
      sass
      .sync({
        outputStyle: "compressed"
      })
      .on("error", sass.logError)
    )
    .pipe(livereload())
    .pipe(gulp.dest("./css"));
});
gulp.task("watch", function () {
  livereload.listen(35729);
  gulp.watch("**/*.html").on("change", function (file) {
    livereload.changed(file.path);
  });
  gulp.watch("./**/*.css").on("change", function (file) {
    livereload.changed(file.path);
  });
  gulp.watch("./sass/**/*.scss", ["sass"]);
  gulp.watch("./js/**/*.js", ["scripts"]);
});

// gulp.task('icons', ['sprites', 'svg2png']);
gulp.task("default", ["sass", "scripts", "watch"]);
// gulp.task("default", ["sass", "scripts", "pot", "watch"]);