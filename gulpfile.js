'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var path = require('path');

var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
//var watchify = require('watchify');

var watchify = {};
var gutil = require('gulp-util');

var browserify = require('browserify');
var babelify = require('babelify');
var tsify = require("tsify");

var tsProject = ts.createProject("tsconfig.json");

var logger = require('tracer').colorConsole(); 

var base_dir = "./src";

var options = Object.assign(
	{},  
	{
		entries:path.join(base_dir, "main.ts"),
		debug:true,
		extensions:['*.js','*.jsx','.ts']
	}
	, watchify.args
);
logger.info("Using options:[%j]",options);

var br_fy =  browserify(options).transform(
	babelify.configure(
		{presets:['es2015','react']}
	)
);

var br = br_fy;
//var br = watchify(br_fy);

gulp.task('js', bundler);

br.on('update', bundler);

br.on('log',gutil.log);

function bundler(func){

   //console.log('-->',func.toString());

   return br.bundle()
		.on('error', gutil.log.bind(gutil, 'Browserfy Error'))
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe( sourcemaps.write('./'))
		.pipe( gulp.dest(base_dir));
}

gulp.task('sass:srcmap', function () {

  var auto_prefixer_options = {
    browsers: ['last 2 versions'],
    add: true,
    remove: true,
    flexbox: true
  };

  return gulp.src(base_dir+"/scss/*.{sass,scss}")
    .pipe( sourcemaps.init() )      /* use source maps*/
    .pipe(sass( undefined ).on('error', sass.logError))  /* no scss options specified */
    .pipe(autoprefixer(auto_prefixer_options))
    .pipe(sourcemaps.write('./'))    /* write source maps to same directory as destination css */
    .pipe(gulp.dest("css"));
});
//
//
gulp.task('watch', function () {
  gulp.watch(base_dir+"/**/*.scss", ['sass:srcmap']);
});

gulp.task('ts-files', function(){
	return tsProject.src()
		.pipe(tsProject())
		.js.pipe(gulp.dest("dist"));
});


gulp.task('ts',['ts-files'], function(){
	let rc = browserify({
		debug:true,
		entries:"src/main.tsx",
		})
		.plugin(tsify)
		.bundle()
		.on('error', gutil.log.bind(gutil, 'Browserfy Error'))
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps:true}))
		.pipe( sourcemaps.write('./'))
		.pipe(gulp.dest('dist'));
       return rc;
});

gulp.task('default', ['sass:srcmap',  'js','watch' ]);
