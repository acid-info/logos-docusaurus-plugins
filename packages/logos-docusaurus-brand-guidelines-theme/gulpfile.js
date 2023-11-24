const _ = require('lodash')

const gulp = require('gulp')
const path = require('path')
const merge = require('merge2')
const rimraf = require('rimraf')
const ts = require('gulp-typescript')
const TscWatch = require('tsc-watch/client')
const sourcemaps = require('gulp-sourcemaps')
const syncDirectory = require('sync-directory')
const { replaceTscAliasPaths } = require('tsc-alias')

const project = ts.createProject('./tsconfig.client.json', {
  declaration: true,
  isolatedModules: false,
})

const SOURCE_DIR = project.config.compilerOptions.rootDir ?? 'src'
const OUT_DIR = project.config.compilerOptions.outDir ?? 'lib'

const sourceDir = path.resolve('./', SOURCE_DIR)
const outDir = path.resolve('./', OUT_DIR)

const clean = async (cb) => {
  rimraf(outDir, cb)
}

const build = (cb) => {
  return gulp.series(buildClient, copyFiles, postBuild, buildServer)(cb)
}

const buildClient = () => {
  const compiled = project.src().pipe(sourcemaps.init()).pipe(project())

  return merge(compiled.dts, compiled.js.pipe(sourcemaps.write())).pipe(
    gulp.dest(outDir),
  )
}

const replaceTsAliasPaths = () =>
  replaceTscAliasPaths({
    configFile: './tsconfig.client.json',
  })

const postBuild = (done) =>
  gulp.series((cb) => replaceTsAliasPaths().finally(cb))(done)

const buildServer = () => {
  const project = ts.createProject('./tsconfig.json', {
    isolatedModules: false,
  })

  const compiled = project.src().pipe(project())

  return merge(compiled.dts, compiled.js).pipe(gulp.dest(outDir))
}

const syncDirectories = async (watch = false) => {
  syncDirectory.async(sourceDir, outDir, {
    watch,
    verbose: 1,
    exclude: [/.*\.(ts|tsx)$/],
  })
}

const watch = async () => {
  syncDirectories(true)

  const watch = new TscWatch()

  watch.on('success', async () => {
    await postBuild()
  })

  watch.start('--build')
}

const copyFiles = (cb) => {
  syncDirectories(false).finally(cb)
}

gulp.task('build', build)
gulp.task('watch', watch)
gulp.task('clean', clean)
gulp.task('build-server', buildServer)
gulp.task('build-client', buildClient)
gulp.task('post-build', postBuild)
gulp.task('copy-files', copyFiles)
