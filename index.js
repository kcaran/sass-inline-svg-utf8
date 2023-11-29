var fs = require('fs');
var sass = require('node-sass');
var mime = require('mime');
var replaceall = require('replaceall');

var inlineImage = function(filepath, replace, done) {
  'use strict';
  var mimeType = mime.getType(filepath);
  if (mimeType !== 'image/svg+xml') {
    throw new Error('File ' + filepath + ' is not of type image/svg+xml.');
  } else {
    var data = fs.readFileSync(filepath);
    if (!data || !data.length) {
      throw new Error('File ' + filepath + ' is empty or cannot be read');
    }
    var result = data.toString('utf8');
    if (replace.getLength()) {
      for (var i = 0; i < replace.getLength(); i++) {
        result = replaceall(replace.getKey(i).getValue(), replace.getValue(i).getValue(), result);
      }
    }
    done(result);
  }
};

module.exports = function() {
  'use strict';
  return {
    'inline-svg($filename, $replace: ())': function(filename, replace, done) {
      inlineImage(filename.getValue(), replace, function(dataUrl) {
        var encodedUrl = encodeURIComponent(dataUrl);
        done(new sass.types.String('url(\'data:image/svg+xml;charset=utf-8,' + encodedUrl + '\')'));
      });
    }
  };
};
