var gulp = require('gulp');
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var browserSync = require("browser-sync");
var sassGlob = require( 'gulp-sass-glob' );

//sass compile
gulp.task( 'sass', function() {
	return gulp
		.src( './sass/**/*.scss' )
		.pipe( plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) }) )
		.pipe( sassGlob() )
		.pipe( sass({ outputStyle: 'expanded' }) )
		.pipe(autoprefixer())
		.pipe( gulp.dest( './css' ) );
});

gulp.task( 'watch', function() {
	gulp.watch( './sass/**/*.scss', [ 'sass' ]);
});

gulp.task( 'browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './',
			index: 'index.html'
		}
	});
});

gulp.task( 'bs-reload', function() {
	browserSync.reload();
});

gulp.task( 'default', [ 'browser-sync', 'watch' ], function() {
	gulp.watch( './*.html', [ 'bs-reload' ]);
	gulp.watch( './css/*.css', [ 'bs-reload' ]);
	gulp.watch( './js/*.js', [ 'bs-reload' ]);
});
