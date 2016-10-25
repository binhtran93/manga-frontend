var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer')
    sourcemaps = require('gulp-sourcemaps'),
    webpack = require('gulp-webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    plumber = require('gulp-plumber'),
    Server = require('karma').Server;



var dest = {
    destAdminJs: 'app/admin-site/js',
    destAdminCss: 'app/admin-site/css',
    destAdminFont: 'app/admin-site/fonts'
};

var src = {
    srcAdminSass: [
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/font-awesome/scss/font-awesome.scss',
        'resources/css/sb-admin.css',
        'node_modules/datatables.net-bs/css/dataTables.bootstrap.css',
        'node_modules/angular-datatables/dist/css/angular-datatables.min.css',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
        'node_modules/ui-select/dist/select.min.css',
        'resources/sass/**/*.scss'
    ],
    srcAdminJs: [
        'app/admin-site/scripts/app.js',
        'app/admin-site/scripts/config.js',
        'app/admin-site/scripts/**/*.js',
    ],
    srcLibJs: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/angular/angular.min.js',
        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/datatables.net/js/jquery.dataTables.js',
        'resources/js/extjs.js',
        'node_modules/datatables.net-bs/js/dataTables.bootstrap.js',
        'node_modules/angular-datatables/dist/angular-datatables.min.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-touch/angular-touch.min.js',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        'node_modules/ui-select/dist/select.min.js',
    ],
    srcFonts: [
        'node_modules/font-awesome/fonts/*',
        'node_modules/bootstrap/fonts/*',
    ]
};


//gulp.task('webpack', function () {
//   return gulp.src('public/js/scripts.js')
//       .pipe(webpack( require('./webpack.config.js') ))
//       .pipe(gulp.dest('public/'))
//});

// compile sass
gulp.task('sass', function () {
    gulp.src(src.srcAdminSass)
        .pipe(plumber())
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest.destAdminCss))
});

// compile js
gulp.task('js', function () {
    gulp.src(src.srcAdminJs)
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init()) 
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest.destAdminJs))
});

// compile lib js
gulp.task('libJs', function () {
    gulp.src(src.srcLibJs)
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init()) 
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest.destAdminJs)) 
});

gulp.task('fonts', function() {
  return gulp.src(src.srcFonts)
    .pipe(gulp.dest(dest.destAdminFont))
});

gulp.task('watch', function () {
    gulp.watch(src.srcAdminSass, ['sass']);
    gulp.watch(src.srcAdminJs, ['js']);
});

gulp.task('karma', function (done) {
    new Server({
        configFile: __dirname + '/karma.config.js',
        files: src.srcLibJs.concat(src.srcAdminJs, [
            'node_modules/angular-mocks/angular-mocks.js',
            'tests/**/*.js',
        ])
    }, done).start();
});


gulp.task('default', ['watch', 'sass', 'fonts', 'js', 'libJs', 'karma']);
