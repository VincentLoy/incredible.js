/**
 * Project : incredible
 * File : gulpfile
 * Date : 11/07/2015
 * Author : Vincent Loy <vincent.loy1@gmail.com>
 */
/*global window, document*/
/*jslint indent: 4, maxlen: 100, node: true, vars: true, nomen: true */

(function () {
    'use strict';

    var gulp = require('gulp'),
        gutil = require('gulp-util'),
        less = require('gulp-less'),
        minifyCSS = require('gulp-minify-css'),
        sourcemaps = require('gulp-sourcemaps'),
        plumber = require('gulp-plumber'),
        uglify = require('gulp-uglify'),
        rename = require('gulp-rename'),
        targetCSSDir = 'css',
        targetLESSDir = targetCSSDir + '/less',
        devJSDir = 'dev',
        distJSDir = 'dist';


    // Compile Less
    // and save to target CSS directory
    gulp.task('css', function () {
        return gulp.src(targetLESSDir + '/demo.less')
            .pipe(plumber())
            .pipe(less({style: 'compressed'})
                .on('error', gutil.log))
            .pipe(sourcemaps.init())
            .pipe(minifyCSS({compatibility: 'ie8'}))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(targetCSSDir));
    });

    gulp.task('compress', function () {
        return gulp.src(devJSDir + '/incredible.js')
            .pipe(sourcemaps.init())
            .pipe(uglify({
                preserveComments: 'some'
            }))
            .pipe(rename({
                extname: '.min.js'
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(distJSDir));
    });

    // Keep an eye on Less
    gulp.task('watch', function () {
        gulp.watch(targetLESSDir + '/**/*.less', ['css']);
    });

    // What tasks does running gulp trigger?
    gulp.task('default', ['css', 'watch']);

    //To uglify the new version of simplyCountdown run : gulp release or gulp compress
    gulp.task('release', ['compress']);
}());
