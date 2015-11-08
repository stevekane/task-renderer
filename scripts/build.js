var browserify = require('browserify')
var babelify = require('babelify')
var fs = require('fs')

browserify('./index.js')
.transform([babelify, {presets: ['es2015']}}])
.bundle()
.pipe(fs.createWriteStream('./public/index.js'))
