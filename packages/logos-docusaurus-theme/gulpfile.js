const _ = require('lodash')

const gulp = require('gulp')
const path = require('path')
const merge = require('merge2')
const rimraf = require('rimraf')
const ts = require('gulp-typescript')
const replace = require('gulp-replace')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')(require('sass'))
const { replaceTscAliasPaths } = require('tsc-alias')

const project = ts.createProject('./tsconfig.client.json', {
  declaration: true,
  isolatedModules: false,
})

const SOURCE_DIR = project.config.compilerOptions.rootDir ?? 'src'
const OUT_DIR = project.config.compilerOptions.outDir ?? 'lib'
const CLIENT_DIR = 'client'
const STATIC_DIR = 'static'

const sourceDir = path.resolve('./', SOURCE_DIR)
const outDir = path.resolve('./', OUT_DIR)

const sourceClientDir = path.join(sourceDir, CLIENT_DIR)
const sourceStaticDir = path.join(sourceClientDir, STATIC_DIR)

const outClientDir = path.join(outDir, CLIENT_DIR)
const outStaticDir = path.join(outClientDir, STATIC_DIR)

const cleanup = async (cb) => {
  rimraf(outDir, cb)
}

const build = (cb) => {
  return gulp.series(cleanup, buildClient, clientPostBuild, buildServer)(cb)
}

const buildClient = () => {
  const compiled = project.src().pipe(sourcemaps.init()).pipe(project())

  return merge(compiled.dts, compiled.js.pipe(sourcemaps.write())).pipe(
    gulp.dest(outDir),
  )
}

const clientPostBuild = (done) =>
  gulp.series(
    (cb) =>
      replaceTscAliasPaths({
        configFile: './tsconfig.client.json',
      })
        .then(cb)
        .catch(cb),
    () =>
      gulp
        .src(path.join(outClientDir, '/**/*.js'), { base: outClientDir })
        .pipe(
          replace(/import (.+?) from '([^']+)\.scss'/g, (str) =>
            str.replace('.scss', '.css'),
          ),
        )
        .pipe(gulp.dest(outClientDir)),
    transpileStyles,
    copyStaticFiles,
  )(done)

const buildServer = () => {
  const project = ts.createProject('./tsconfig.json', {
    isolatedModules: false,
  })

  const compiled = project.src().pipe(project())

  return merge(compiled.dts, compiled.js).pipe(gulp.dest(outDir))
}

const transpileSass = () =>
  gulp
    .src(path.join(sourceClientDir, '**/*.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(outClientDir))

const copyCssFiles = () =>
  gulp
    .src(path.join(sourceClientDir, '**/*.{css,scss}'), {
      base: sourceClientDir,
    })
    .pipe(gulp.dest(outClientDir))

const copyStaticFiles = () =>
  gulp
    .src(path.join(sourceStaticDir, '**/*'), { base: sourceStaticDir })
    .pipe(gulp.dest(outStaticDir))

const transpileStyles = (cb) => gulp.series(transpileSass, copyCssFiles)(cb)

const watch = async () => {
  gulp.watch([path.join(sourceDir, '**/*.{ts,tsx,css,scss}')], (cb) => {
    build(cb)
  })
}

gulp.task('build', build)
gulp.task('watch', watch)
gulp.task('cleanup', cleanup)
gulp.task('build-server', buildServer)
gulp.task('build-client', buildClient)
gulp.task('client-post-build', clientPostBuild)
gulp.task('transpile-styles', transpileStyles)
gulp.task('copy-static-files', copyStaticFiles)
