#sass-inline-svg

Inline SVGs in your CSS using Html-encoding.

## Install

    npm install --save-dev node-sass-inline-svg

## Usage

    var sass = require('node-sass');
    var sassInlineSVG = require('node-sass-inline-svg')
    
    sass.render({
      functions: sassInlineSVG(),
      file: file,
      outfile: outfile
    }, function(error, result) {
        /* Your code here */
    });
    
In your Sass:

    .myClass {
      background-image: inline-svg('./images/logo.svg');
    }
    
For optimal results and minimal filesize, run your SVGs through [SVGO](https://github.com/svg/svgo) first.

## TODO:
* tests
* always run through svgo?
* string replacement