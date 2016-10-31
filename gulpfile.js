var gulp = require('gulp');
var babel = require('gulp-babel');

/*var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');*/



gulp.task('testTask', function() {
	console.log('testTask. HELLO ');
})

// транспилируем *.ts в ES2015
gulp.task('translation', function(){
    return gulp.src('scripts/ts/*.ts')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('extension/js/'));
});

// Подтягиваем jQuery c ./elementHiddening/node_modules/jquery/dist/core.js
gulp.task('jquery_add', function(){
	gulp.src('node_modules/jquery/dist/jquery.min.js')
	.pipe(gulp.dest('extension/js/'));
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
gulp.task('default', function(){
  //gulp.run('lint', 'minify');
  gulp.run('testTask', 'translation');
  // Отслеживаем изменения в файлах
  gulp.watch("scripts/ts/*.ts", function(event){
    gulp.run('translation');
  });
});