//Definir variáveis e chamar dependências
var gulp			= require('gulp'),
	plumber			= require('gulp-plumber'),
	browserSync		= require('browser-sync'),
	sass 			= require('gulp-sass'),
	uglify			= require('gulp-uglify'),
	concat			= require('gulp-concat'),
	imagemin		= require('gulp-imagemin'),
	cp          	= require('child_process');

var messages = {
	jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
 gulp.task('jekyll-build', function (done) {
 	browserSync.notify(messages.jekyllBuild);
 	return cp.spawn('jekyll.bat', ['build'], {stdio: 'inherit'})
 		.on('close', done);
 	});

 /**
 * Rebuild Jekyll & do page reload
 */
 gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
 	browserSync.reload();
 });

 /**
 * Wait for jekyll-build, then launch the Server using _site as root folder
 */
 gulp.task('browser-sync', ['jekyll-build'], function() {
 	browserSync({
 		server: {
 			baseDir: '_site'
 		}
 	});
 });

/**
 * SASS task
 */
gulp.task('sass', function() {
	gulp.src('src/sass/main.scss')
	.pipe(plumber())
	.pipe(sass())
	.pipe(gulp.dest('_site/assets/css/'))
	.pipe(browserSync.reload({stream:true}))
	.pipe(gulp.dest('assets/css'))
});

/**
 * Javascript task
 */
gulp.task('js', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(plumber())
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/js/'))
});

/**
 * Imagemin task
 */
gulp.task('imagemin', function() {
	return gulp.src('src/img/**/*')
		.pipe(plumber())
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('assets/img/'));
});

/**
 * Watch sass files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
 gulp.task('watch', function() {
 	gulp.watch('src/sass/**/*.scss', ['sass']);
 	gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/img/**/*.{jpg,png,gif}', ['imagemin']);
    gulp.watch(['index.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
 });

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['js', 'sass', 'imagemin', 'browser-sync', 'watch']);