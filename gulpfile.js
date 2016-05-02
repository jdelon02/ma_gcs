'use strict';

var gulp = require('gulp');
var phplint = require('phplint').lint;
var phpcs = require('gulp-phpcs');
var shell = require('gulp-shell'),
pdependDocs = 'docs/pdepend';



gulp.task('phplint', function (cb) {
    phplint(['./**/*.php', './**/*.module', './**/*.inc', '!node_modules/**/*', '!vendor/**/*'],  { limit: 10 }, function (err, stdout, stderr) {
        if (err) {
            cb(err);
        } else {
            cb();
        }
    });
});

gulp.task('phpcs', function () {
    return gulp.src(['./**/*.php', './**/*.module', './**/*.inc', '!node_modules/', '!vendor/**/*'])
        .pipe(phpcs({
            bin: 'vendor/bin/phpcs',
            standard: 'Drupal',
            warningSeverity: 0
        }))
        .pipe(phpcs.reporter('log'));
});

gulp.task('phpcbf', 
		shell.task(
				['vendor/bin/phpcbf --standard=Drupal --ignore=vendor/,node_modules/ views/ templates/ ./'
		]));

gulp.task('phpdoc', 
		shell.task(
				['vendor/bin/phpdoc -d . -t docs/phpdoc -i vendor/,node_modules/'
		]));

gulp.task('pdepend', 
		shell.task(
				['mkdir -p ' + pdependDocs,
				 'vendor/bin/pdepend --summary-xml=' + pdependDocs + '/summary.xml --jdepend-chart=' + pdependDocs + '/chart.svg --overview-pyramid=' + pdependDocs + '/pyramid.svg --ignore=vendor,node_modules --suffix=php --suffix=inc --suffix=modules.'
		]));

gulp.task('phpmd', 
		shell.task(
				['vendor/bin/phpmd . codesize,unusedcode,naming,design,cleancode,controversial --reportfile docs/phpmd.html --exclude vendor/,node_modules/ --suffixes php modules inc'
		]));


gulp.task('watch', function () {
    gulp.watch(['composer.json', './**/*.php', './**/*.modules', './**/*.inc', '!vendor/**/*', '!node_modules/**/*'], function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    //gulp.watch('composer.json', ['dump-autoload']);
    gulp.watch(['./**/*.php', './**/*.modules', './**/*.inc', '!vendor/**/*', '!node_modules/**/*'], ['phplint', 'phpcs']);
});


gulp.task('default', ['phplint', 'phpcs', 'watch']);




