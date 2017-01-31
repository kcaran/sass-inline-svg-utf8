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


// render('inline-svg.scss', function(error, result) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(result.css.toString());
//   }
// });


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

var files = fs.readdirSync(path.join(__dirname, 'scss'));

describe('inline-svg', function() {
  files.forEach(function(file) {
    test(file, function(done) {
      equalsFile(file, done);
    })
  })
});


