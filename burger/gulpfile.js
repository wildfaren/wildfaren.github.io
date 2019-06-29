const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const {DIST_PATH, SRC_PATH, CSS_LIBS} = require('./gulp.config');

sass.compiler = require('node-sass');

task('clean', () => {
    return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

task('copy:html', () => {
    return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task('styles', () => {
    return src([...CSS_LIBS, 'src/css/style.scss'])
        .pipe(gulpif(env === "dev", sourcemaps.init()))
        .pipe(concat('style.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(env === "dev",
            autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        )
        .pipe(gulpif(env === "prod", cleanCSS()))
        .pipe(gulpif(env === "dev", sourcemaps.write()))
        .pipe(dest(`${DIST_PATH}/css`));
});

task('images', () => {
    return src(`${SRC_PATH}/img/**`)
        .pipe(gulpif(env === "dev", sourcemaps.init()))
        .pipe(gulpif(env === "dev", sourcemaps.write()))
        .pipe(dest(`${DIST_PATH}/img`));
});

task('fonts', () => {
    return src(`${SRC_PATH}/fonts/**`)
        .pipe(gulpif(env === "dev", sourcemaps.init()))
        .pipe(gulpif(env === "dev", sourcemaps.write()))
        .pipe(dest(`${DIST_PATH}/fonts`));
});

task('media', () => {
    return src(`${SRC_PATH}/media/**`)
        .pipe(gulpif(env === "dev", sourcemaps.init()))
        .pipe(gulpif(env === "dev", sourcemaps.write()))
        .pipe(dest(`${DIST_PATH}/media`));
})

task('scripts', () => {
    return src(`${SRC_PATH}/js/*.js`)
        .pipe(gulpif(env === "dev", sourcemaps.init()))
        .pipe(concat('menu.js'))
        .pipe(gulpif(env === "dev", sourcemaps.write()))
        .pipe(dest(`${DIST_PATH}/js`));
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});

task('watch', () => {
    watch('./src/css/**/*.style.scss', series('styles'));
    watch('src/*.html', series('copy:html'));
    watch('./src/js/*.js', series('scripts'));
    watch('./src/img/**', series('images'));
    watch('./src/fonts/**', series('fonts'));
    watch('./src/media/*.mp4', series('media'));
});



task(
    'default',
    series(
        'clean',
        parallel('copy:html', 'styles', 'images', 'fonts', 'images', 'media', 'scripts'),
        parallel('watch', 'server')
    )
);

task(
    'build',
    series(
        'clean',
        parallel('copy:html', 'styles', 'images', 'fonts', 'images', 'media', 'scripts')
    )
);
