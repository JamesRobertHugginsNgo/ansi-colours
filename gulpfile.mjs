import { deleteAsync } from 'del';
import Gulp from 'gulp';
import gulpBabel from 'gulp-babel';
import gulpRename from 'gulp-rename';

// -----
// CLEAN UP
// -----

function cleanUp() {
	return deleteAsync('./dist/');
}

// -----
// BUILD CJS
// -----

function buildCjs() {
	return Gulp.src('./src/**/*.mjs')
		.pipe(gulpBabel({ plugins: ['@babel/plugin-transform-modules-commonjs'] }))
		.pipe(gulpRename((path) => path.extname = '.cjs'))
		.pipe(Gulp.dest('./dist/'));
}

// -----
// BUILD MJS
// -----

function buildMjs() {
	return Gulp.src('./src/**/*.mjs')
		.pipe(Gulp.dest('./dist/'));
}

// -----
// BUILD
// -----

export const build = Gulp.series(cleanUp, Gulp.parallel(buildCjs, buildMjs));

// -----
// DEFAULT
// -----

export default build;
