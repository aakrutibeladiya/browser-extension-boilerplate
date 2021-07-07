var uglifyjs = require("uglify-es"); // can be a git checkout
var gulp = require("gulp");
var csso = require("gulp-csso");
var htmlmin = require("gulp-htmlmin");
var composer = require("gulp-uglify/composer");
var pump = require("pump");

var minify = composer(uglifyjs, console);

gulp.task("build", function (cb) {
  var options = {};
  pump([gulp.src(["extension/manifest.json"]), gulp.dest("dist")], cb);
  pump([gulp.src(["extension/_locales/*/*"]), gulp.dest("dist/_locales")], cb);
  pump(
    [gulp.src(["extension/css/main.css"]), csso(), gulp.dest("dist/css")],
    cb
  );
  pump([gulp.src(["extension/css/main.css.map"]), gulp.dest("dist/css")], cb);
  pump([gulp.src(["extension/icons/*"]), gulp.dest("dist/icons")], cb);
  pump([gulp.src(["extension/lib/*/*"]), gulp.dest("dist/lib")], cb);
  pump(
    [
      gulp.src(["extension/resources/images/*"]),
      gulp.dest("dist/resources/images"),
    ],
    cb
  );
  pump(
    [
      gulp.src(["extension/src/browser_action/browser_action.html"]),
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      }),
      gulp.dest("dist/src/browser_action"),
    ],
    cb
  );
  pump(
    [
      gulp.src(["extension/src/browser_action/sidebar.js"]),
      gulp.dest("dist/src/browser_action"),
    ],
    cb
  );
  pump(
    [gulp.src("extension/src/bg/*"), minify(options), gulp.dest("dist/src/bg")],
    cb
  );
  pump(
    [
      gulp.src("extension/src/commonJS/*"),
      minify(options),
      gulp.dest("dist/src/commonJS"),
    ],
    cb
  );
  pump(
    [
      gulp.src("extension/src/contentScripts/*"),
      minify(options),
      gulp.dest("dist/src/contentScripts"),
    ],
    cb
  );
  pump(
    [
      gulp.src("extension/src/partials/*"),
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      }),
      gulp.dest("dist/src/partials"),
    ],
    cb
  );
  pump(
    [
      gulp.src("extension/src/config.js"),
      minify(options),
      gulp.dest("dist/src"),
    ],
    cb
  );
});
