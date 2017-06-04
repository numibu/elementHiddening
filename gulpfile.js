var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var typescript = require('typescript');
var ts = require('gulp-typescript');
    var tsProject = ts.createProject('tsconfig.json', {typescript:typescript});

/*var amdOptimizer = require('amd-optimize');
var rjs     = require('gulp-requirejs');
var requirejsOptimizer = require('gulp-requirejs-optimize');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');*/



gulp.task('testTask', function() {
	console.log('testTask. HELLO ');
});

// транспилируем *.ts в ES2015
gulp.task('classesCompile', function(){
    return gulp.src('scripts/ts/classes/*.ts')
        .pipe(tsProject())
        .js
        /*.pipe(babel({
            presets: ['es2015']
        }))*/
        .pipe(gulp.dest('extension/js/classes/'));
});

gulp.task('contentsCompile', function(){
    return gulp.src('scripts/ts/contents.ts')
            .pipe(tsProject())
            .js
            .pipe(gulp.dest('extension/js/'))
});

gulp.task('mainCompile', function(){
    return gulp.src('scripts/ts/main.ts')
            .pipe(tsProject())
            .js
            .pipe(gulp.dest('extension/js/'))
});

gulp.task('popupCompile', function(){
    return gulp.src('scripts/ts/popup.ts')
            .pipe(tsProject())
            .js
            .pipe(gulp.dest('extension/js/'))
});

gulp.task('requireJSOptimizer', function(){
    return gulp.src('extension/js/contents.js')
            .pipe(requirejsOptimizer())
            .pipe(gulp.dest('extension/js/'))
});

gulp.task('allCompile', function(){
    gulp.run('classesCompile', 'contentsCompile', 'mainCompile', 'popupCompile');
});

// Подтягиваем jQuery c ./elementHiddening/node_modules/jquery/dist/core.js
gulp.task('Add_jQuery', function(){
	gulp.src('node_modules/jquery/dist/jquery.min.js')
	.pipe(gulp.dest('extension/js/lib/'));
});
// Подтягиваем react c ./elementHiddening/node_modules/react/dist/react.js
gulp.task('Add_React', function(){
	gulp.src('node_modules/react/dist/react.js')
	.pipe(gulp.dest('extension/js/lib/'));
});
// Подтягиваем react c ./elementHiddening/node_modules/react-dom/dist/react-dom.js
gulp.task('Add_React-dom', function(){
	gulp.src('node_modules/react-dom/dist/react-dom.js')
	.pipe(gulp.dest('extension/js/lib/'));
});


// Линтинг файлов (валидация)
gulp.task('lint', function() {
  gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Конкатенация и минификация файлов
gulp.task('minify', function(){
    gulp.src('./src/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// Действия по умолчанию
gulp.task('start', function(){
  //gulp.run('lint', 'minify');
  gulp.run('testTask', 'translation');
  // Отслеживаем изменения в файлах
  gulp.watch("scripts/ts/*.ts", function(event){
    gulp.run('translation');
  });
});