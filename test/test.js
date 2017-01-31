var fs = require('fs');
var path = require('path');
var sass = require('node-sass');
var inlineSVG = require('../');

var render = function(file, done) {
  return sass.render({
    functions: inlineSVG(),
    file: __dirname + '/scss/' + file
  }, done);
}

var equalsFile = function(file, done) {
  render(file, function(error, result) {
    expect(error).toBeNull();
    var cssPath = __dirname + '/css/' + file.replace(/\.scss$/, '.css');
    fs.readFile(cssPath, function(error, expected) {
      expect(error).toBeNull();
      expect(result.css.toString()).toEqual(expected.toString());
      done();
    });
  });
}

var throwsAnError = function(file, done) {
  expect(render(file, function(error, result) {
    done();
  })).toThrow()
}

describe('inline-svg', function() {
  var file = 'inline-svg.scss';
  test(file, function(done) {
    equalsFile(file, done);
  })
});

describe('throws an error when trying to inline an empty file', function() {
  var file = 'empty.scss';
  test(file, function(done) {
    throwsAnError(file, done);
  })
});

describe('throws an error when trying to inline a non-existing file', function() {
  var file = 'non-existent.scss';
  test(file, function(done) {
    throwsAnError(file, done);
  })
})

describe('throws an error when trying to inline a non-SVG file', function() {
  var file = 'non-svg.scss';
  test(file, function(done) {
    throwsAnError(file, done);
  })
})
