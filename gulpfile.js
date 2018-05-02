var gulp = require("gulp");
var less = require("gulp-less");
var path = require("path");
var map = require("map-stream");
var path = require("path");
var rename = require("gulp-rename");

gulp.task("default", function() {
  return gulp
    .src("less/*.less")
    .pipe(
      less({
        paths: [path.join(__dirname, "less")]
      })
    )
    .pipe(
      map(function(file, cb) {
        var fileContents = file.contents.toString();
        var fileName = path.basename(file.path).split(".")[0];
        // --- do any string manipulation here ---
        fileContents = `<dom-module id="${fileName}">\r\n<template>\r\n<style>\r\n${fileContents}\r\n</style>\r\n</template>\r\n</dommodule>`;
        // ---------------------------------------
        file.contents = new Buffer(fileContents);
        cb(null, file);
      })
    )
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest("./styles"));
});
