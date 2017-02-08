/**
 * Gulpfile for pole voting app
 */

'use strict';

/* ************************************************************************** */

/* GULP CONFIG */

/* Dependencies */

// gulp itself
var gulp = require('gulp');

// css
var sass = require('gulp-sass');

// js
// var babel = require('gulp-babel');

// compilation utilities
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
// var concat = require('gulp-concat');

// command line
// var shell = require('gulp-shell');

// server
var spawn = require('child_process').spawn;

/* ************************************************************************** */

/* Variables */
var node;
var filePaths = {
	serverConfig: 'server/server.js'
}

/* ************************************************************************** */

/* CSS */

/**
 * Task to compile Sass
 */
gulp.task('sass', function() {
	return gulp.src('./app/css/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./app/css'));
});

/* ************************************************************************** */

/* JS */

// to add source maps

/*gulp.task("js", function () {
  return gulp.src("app/js/map.babel.js")
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(gulp.dest("app/js"));
});*/

/* ************************************************************************** */

/* PROCESSING */

/**
 * Task to watch for changes in files and trigger events
 */
gulp.task('watch', function() {

	// watch for css changes
	watch(['app/css/**/*.scss'], function() {
		gulp.start('sass');
	});

	// watch for js changes
	// watch(['app/js/**/*.babel.js'], function() {
	// 	gulp.start('js');
	// });

	// watch for server config changes
	watch(['server/server.js'], function() {
		gulp.start('server');
	});

	// start app server
	gulp.start('server');
});

/* ************************************************************************** */

/* SERVER */

gulp.task('server', ['kill-server'], function() {
	node = spawn('node', [filePaths.serverConfig], {stdio: 'inherit'});
	console.log('Starting app server...')
	node.on('close', function(code) {
		if (code === 8) {
			console.log('Error detected, waiting for changes...');
		}
	});
});

gulp.task('kill-server', function() {
	if (node) {
		node.kill();
		console.log('Shutting down app server...');
	}
});