// 引入 gulp and 组件
var gulp = require('gulp'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
	htmlmin = require('gulp-htmlmin'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
	clean = require('gulp-clean'),
	livereload = require('gulp-livereload'),
	port = process.env.port || 5000;

// HTML处理
gulp.task('html', function() {
	var htmlSrc = './app/*.html',
		htmlDst = './';
	gulp.src(htmlSrc)
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(htmlDst))
		
		.pipe(notify({ message: 'html task complete' }));
});

// 检查脚本
gulp.task('scripts', function() {
    gulp.src('./app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
		//js代码合并
		.pipe(concat('all.js'))
		//给文件添加.min后缀
		.pipe(rename({ suffix: '.min' }))
		//压缩脚本文件
		.pipe(uglify())
		//输出压缩文件到指定目录
		.pipe(gulp.dest('./dist/js'))
		
		//提醒任务完成
		.pipe(notify({ message: 'Scripts task complete' }));
});


// 编译Sass
gulp.task('sass', function() {
    gulp.src('./app/scss/*.scss')
        .pipe(sass())
		//添加前缀
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		//保存未压缩文件到我们指定的目录下面
		.pipe(gulp.dest('./app/stylesheets'))
		//给文件添加.min后缀
		.pipe(rename({ suffix: '.min' }))
		//压缩样式文件
		.pipe(minifycss())
		//输出压缩文件到指定目录
        .pipe(gulp.dest('./dist/css'))
        
		.pipe(notify({ message: 'Styles task complete' }));
});
// 图片压缩
gulp.task('images', function() {
	return gulp.src('images/*')
		.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest('./dist/images'))
		.pipe(notify({ message: 'Images task complete' }));
});

// 视频
gulp.task('video', function() {
	return gulp.src('video/*')
		.pipe(gulp.dest('./dist/video'))
		.pipe(notify({ message: 'Video task complete' }));
});

// 清空图片、样式、js
gulp.task('clean', function() {
	gulp.src(['./dist/css', './dist/js', './dist/images'], {read: false})
		.pipe(clean());
});

// live reload 
gulp.task('connect',function(){
	connect.server({
		// root:'./',
		port: port,
		livereload: true
	})
})



// reload Js 
gulp.task('js',function(){
	gulp.src('./dist/**/*.js')
	.pipe( connect.reload() )
})



gulp.task('watch',function(){
	gulp.watch('./app/scss/*.scss',['sass']);
	gulp.watch('./app/js/*.js',['html']);
	gulp.watch('./app/**/*.js',['scripts']);
	gulp.watch('./images/*',['images']);
	gulp.watch('./app/*.html',['html']);
	gulp.watch('./video/*',['video']);

});

gulp.task('default',['watch']);

gulp.task('serve',['sass','scripts','html','connect','watch']);