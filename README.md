#sass-inline-svg

Inline SVGs in your CSS using Html-encoding. 

Inlining is good because fewer requests, html-encoded is good for SVG because it is smaller than base64 (by about 30% on average).

String replacement is good because you can use 'variables' in your SVG files and replace them on a per-inlined-instance basis. Use case? You need a white, a black, and a blue arrow icon, and can create them on the fly when inling from a single source file. Good because if the arrow changes, you only have to change on file, not three.

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
    
For optimal results and minimal filesize, run your SVGs through [SVGO](https://github.com/svg/svgo) first (Actually, I'm on the fence whether to include SVGO optimization by default when inlining, but I’m not sure because of various settings/complexity). If you have a strong opinion on that, let’s dicuss [here](TODO: link to issue)

## Advanced Usage w/ String replacement

SVG:

    <path fill="fillcolor" […] />
    
In your Sass:

    .myClass {
      background-image: inline-svg('./images/arrow.svg', { fillcolor: '#000000'});
    }
      
This will result in (not html encoded here for readability):

    <path fill="#000000" […] />
    
So to create three instances of the same SVG source file:

    .red-arrow {
      background-image: inline-svg('./images/arrow.svg', { fillcolor: 'red'});
    }
    
    .blue-arrow {
      background-image: inline-svg('./images/arrow.svg', { fillcolor: 'blue'});
    }
    
    .black-arrow {
      background-image: inline-svg('./images/arrow.svg', { fillcolor: 'black'});
    }

## TODO:
* implement string replacement