var gulp			= require('gulp');

var autoprefixer	= require('autoprefixer'),
    copy			= require('gulp-contrib-copy'),
    cssnano			= require('cssnano'),
    htmlmin			= require('gulp-htmlmin'),
    postcss			= require('gulp-postcss'),
    sass			= require('gulp-sass'),
    uglify			= require('gulp-uglify'),
    watch			= require('gulp-watch');

gulp.task('copyAssets', function () {
	return gulp.src('src/assets/**/*')
		.pipe( copy() )
		.pipe( gulp.dest('dist/assets/') );
});

gulp.task('copyHTML', function() {
	gulp.src('src/*.html')
		.pipe( htmlmin( {collapseWhitespace: true} ) )
		.pipe( gulp.dest('dist') );

	gulp.src('src/*.php')
		.pipe( gulp.dest('dist') );
});

gulp.task('js', function () {
	gulp.src('src/res/js/*.js'),
		uglify(),
		gulp.dest('dist/res/js/')
});

gulp.task('sass', function () {
	var processors = [
			autoprefixer({browsers: ['last 2 versions']}),
			cssnano()
		];

	return gulp.src('src/res/css/*.scss')
			.pipe(sass().on('error', sass.logError))
			.pipe( postcss( processors ) )
			.pipe( gulp.dest('dist/res/css/') );
});

gulp.task('watch', function () {
	gulp.watch('src/res/css/*.scss', ['sass']);
	gulp.watch('src/*.html', ['copyHTML']);
	gulp.watch('src/assets/**/*', ['copyAssets']);
	gulp.watch('src/res/js/*.js', ['js']);
});

gulp.task('watchers', ['sass:watch', 'html:watch', 'assets:watch']);

gulp.task('default', [ 'copyAssets', 'copyHTML', 'sass', 'js', 'watch' ]);
