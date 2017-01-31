var fs = require('fs');
var path = require('path');
var sass = require('node-sass');
var mime = require('mime');



var inlineImage = function(filepath, done) {
  var mimeType = mime.lookup(filepath);
  if (mimeType !== 'image/svg+xml') {
    throw new Error('File ' + filepath + ' is not of type image/svg+xml.');
  } else {
    var data = fs.readFileSync(filepath); /* TODO error handling of fs.readFileSync? */
    if (!data || !data.length) {
      throw new Error('File ' + filepath + ' is empty or cannot be read')
    }
    done(data.toString('utf8'));
  }
}

module.exports = function() {
  return {
    'inline-svg($filename)': function(filename, done) {
      inlineImage(filename.getValue(), function(dataUrl) {
        var encodedUrl = encodeURIComponent(dataUrl);
        done(new sass.types.String('url(\'data:image/svg+xml;charset=utf-8,' + encodedUrl + '\')'));
      });
    }
  }
}
