  import {
    createRequire
  } from "module";

  import gulp from 'gulp'
  const gulpLoadPlugins = createRequire(
    import.meta.url)('gulp-load-plugins');
  const $ = gulpLoadPlugins({
    lazy: true
  });
  import gulpImage from 'gulp-image';
  import browserSync from 'browser-sync'
  import dartSass from 'sass';
  import gulpSass from 'gulp-sass';
  const sassCompile = gulpSass(dartSass);
  import del from 'del'
  import autoprefixer from 'autoprefixer'
  import Fiber from 'fibers'

  let devBuild =
    (process.env.NODE_ENV || 'development').trim().toLowerCase() !==
    'production',
    source = 'src/',
    dest = devBuild ? 'app/' : 'dist/',
    lessStyles = {
      in: [
        source + 'css/**/theme-hbftextiles.less',
        // source + 'css/**/lib/*.less'
      ],
      libs: [source + 'css/**/lib/*.less']
    },
    css = {
      in: [
        source + 'css/**/*.+(css|scss|sass)',
        // source + 'css/**/theme-hbftextiles.less',
        // source + 'css/**/lib/*.less'
      ],
      sassOpts: {
        outputStyle: devBuild ? 'expanded' : 'compressed',
        imagePath: '../images',
        precision: 3,
        errLogToConsole: true,
        sourceMap: true
      }
    },
    fonts = {
      in: source + 'fonts/**/*',
      out: dest + 'fonts/'
    },
    html = {
      in: [source + '*.html'],
      watch: [source + '*.html', source + '_partials/**/*.html'],
      out: dest
    },
    images = {
      in: source + 'images/**',
      out: dest + 'images'
    }

  // Clean tasks
  gulp.task('clean', function (cb) {
    del([dest + '*'])
    cb()
  })

  // manage images
  gulp.task('images', () => {
    let imageFilter2 = $.filter(['**/*.+(jpg|png|tiff|webp)'], {
      restore: true
    })
    return (
      gulp
      .src(images.in, {
        allowEmpty: true
      })
      .pipe(
        $.size({
          title: 'images in '
        })
      )
      .pipe($.newer(images.out))
      .pipe($.plumber())
      .pipe(
        gulpImage({
          jpegRecompress: [
            '--strip',
            '--quality',
            'medium',
            '--min',
            50,
            '--max',
            80
          ],
          mozjpeg: ['-quality', 60, '-optimize', '-progressive'],
          // guetzli: ['--quality', 85],
          quiet: true
        })
      )
      // .pipe($.imagemin())
      .pipe(
        $.size({
          title: 'images out '
        })
      )
      .pipe(gulp.dest(images.out))
    )
  })

  // copy fonts
  gulp.task('fonts', () => {
    return gulp
      .src(fonts.in, {
        allowEmpty: true
      })
      .pipe($.newer(dest + 'fonts/'))
      .pipe(gulp.dest(dest + 'fonts/'))
  })

  // build HTML files
  gulp.task('html', function () {
    let page = gulp
      .src(html.in, {
        allowEmpty: true
      })
      // .pipe($.newer(html.out))
      .pipe($.preprocess({
        context: html.context
      }))
    /*.pipe($.replace(/.\jpg|\.png|\.tiff/g, '.webp'))*/
    if (!devBuild) {
      page = page
        .pipe($.size({
          title: 'HTML in'
        }))
        .pipe($.htmlclean())
        .pipe($.size({
          title: 'HTML out'
        }))
    }
    return page.pipe(gulp.dest(html.out))
  })

  gulp.task(
    'less-libs',
    function () {
      return (
        gulp
        .src(lessStyles.libs, {
          allowEmpty: true
        })
        .pipe(
          $.less({
            compress: devBuild ? true : true
          }).on(
            'error',
            console.log.bind(console)
          )
        )
        .pipe($.if(!devBuild, $.cssnano()))
        .pipe($.if(!devBuild, $.stripCssComments({
          preserve: false
        })))
        .pipe($.if(devBuild, $.sourcemaps.write('./maps')))
        .pipe(gulp.dest(dest + 'css'))
        .pipe(browserSync.stream({
          match: '**/*.css'
        }))
      )
    })

  gulp.task(
    'less',
    function () {
      let processors = [
        autoprefixer
      ]
      return (
        gulp
        .src(lessStyles.in, {
          allowEmpty: true
        })
        .pipe(
          $.less({
            compress: devBuild ? true : true
          }).on(
            'error',
            console.log.bind(console)
          )
        )
        // .pipe($.postcss(processors))
        .pipe($.rename({
          suffix: '.min'
        }))
        .pipe($.if(!devBuild, $.cssnano()))
        .pipe($.if(!devBuild, $.stripCssComments({
          preserve: false
        })))
        .pipe($.if(devBuild, $.sourcemaps.write('./maps')))
        .pipe(gulp.dest(dest + 'css'))
        .pipe(browserSync.stream({
          match: '**/*.css'
        }))
      )
    })

  gulp.task(
    'styles',
    gulp.series('fonts', 'less-libs', 'less', function () {
      let processors = [
        autoprefixer
      ]
      let cssFilter = $.filter(['**/*.+(css|scss)'], {
        restore: true
      })
      let lessFilter = $.filter(['**/*.+(less)'], {
        restore: true
      })
      return (
        gulp
        .src(css.in, {
          allowEmpty: true
        })
        .pipe(lessFilter)
        .pipe(
          $.less({
            compress: devBuild ? true : true
          }).on(
            'error',
            console.log.bind(console)
          )
        )
        .pipe($.postcss(processors))
        .pipe($.rename({
          suffix: '.min'
        }))
        .pipe(lessFilter.restore)
        .pipe(cssFilter)
        .pipe(
          $.rename(function (path) {
            path.extname = '.scss'
          })
        )
        .pipe($.if(devBuild, $.sourcemaps.init()))
        .pipe(
          sassCompile({
            outputStyle: devBuild ? 'expanded' : 'compressed',
            fiber: Fiber
          }).on('error', sassCompile.logError)
        )
        .pipe(cssFilter.restore)
        .pipe($.autoprefixer('last 4 version'))
        .pipe($.if(!devBuild, $.cssnano()))
        .pipe($.if(!devBuild, $.stripCssComments({
          preserve: false
        })))
        .pipe($.if(devBuild, $.sourcemaps.write('./maps')))
        .pipe(gulp.dest(dest + 'css'))
        // .pipe(browserSync.reload({stream:true, once: true}));
        .pipe(browserSync.stream({
          match: '**/*.css'
        }))
      )
    })
  )

  gulp.task('js-libs', function () {
    return gulp
      .src([`${source}**/*.js`, '!**/*custom.js'], {
        allowEmpty: true
      })
      .pipe(gulp.dest(`${dest}`))
  })
  gulp.task('js', function () {
    let jsCompile = gulp
      .src(`${source}js/custom.js`, {
        allowEmpty: true
      })
      .pipe(
        $.babel({
          presets: ['@babel/env']
        })
      )
      .pipe($.if(devBuild, $.sourcemaps.init()))

    if (!devBuild) {
      jsCompile = jsCompile
        .pipe($.size({
          title: 'JS assets in'
        }))
        .pipe(
          $.uglify().on('error', function (err) {
            $.gutil.log($.gutil.colors.red('[Error]'), err.toString())
          })
        )
        .pipe($.rename({
          suffix: '.min'
        }))
        .pipe($.size({
          title: 'JS assets out'
        }))
    }
    return jsCompile
      .pipe($.if(devBuild, $.sourcemaps.write('./maps')))
      .pipe(gulp.dest(dest + 'js'))
      .pipe(browserSync.reload({
        stream: true,
        once: true
      }))
  })

  gulp.task('browser-sync', function () {
    browserSync.init(null, {
      server: {
        baseDir: 'app',
        https: true
      },
      open: false,
      notify: true
    })
  })
  gulp.task(
    'watch',
    gulp.parallel('browser-sync', () => {
      gulp
        .watch(['src/css/**/*.(css|scss|sass|less)'])
        .on('change', gulp.series('styles'))
      gulp.watch('src/js/*.js').on('change', gulp.series('js', browserSync.reload))
      gulp.watch([`${source}**/*.js`, '!**/*custom.js']).on('change', gulp.series('js-libs', browserSync.reload))
      gulp.watch(html.watch).on('change', gulp.series('html', browserSync.reload))
    })
  )

  gulp.task('build', gulp.parallel('html', 'images', 'styles', 'js-libs', 'js'))
  gulp.task(
    'default',
    gulp.parallel(
      'html',
      'images',
      'styles',
      'js-libs',
      'js',
      gulp.series('watch')
    )
  )
