var fs = require('fs');
var path = require('path');
var sass = require('node-sass');
var inlineSVG = require('../');

var renderAsync = function(file, options, done) {
  options = options || {};
  options.images_path = __dirname + '/images';
  options.fonts_path = __dirname + '/fonts';

  return sass.render({
    functions: inlineSVG(),
    file: __dirname + '/scss/' + file
  }, done)
}

var equalsFileAsync = function(file, suite, options, done) {
  renderAsync(file, options, function(err, result) {
    expect(err).toBeNull();
    var cssPath = path.join(cssDir, suite, file.replace(/\.scss$/, '.css'));
    fs.readFile(cssPath, function(err, expected) {
      expect(err).toBeNull();
      expect(result.css.toString()).toEqual(expected.toString());
      done();
    })
  })
}

var sassDir = path.join(__dirname, 'scss');
var cssDir = path.join(__dirname, 'css');
var files = fs.readdirSync(sassDir);


describe('inline-svg', function() {
  files.forEach(function(file) {
    test(file, function(done) {
      equalsFileAsync(file, 'inline-svg', {}, done)
    })
  })
})
