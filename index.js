//
// # Rework Sass Image Functions Plugin
//

/* jslint node: true */
"use strict";

var imagesize = require('imagesize').Parser;
var visit     = require('rework-visit');
var fs        = require('fs');
var path      = require('path');

var VALUES  = ['image-width', 'image-height', 'image-dimensions'];
var RE = new RegExp(/image-(width|height|dimensions)\(("|')(.+)("|')\)/);

module.exports = function (dir) {
  return function (stylesheet) {
    visit(stylesheet, function (declarations, rule) {
      declarations.forEach(function (rule, index, arr) {
        VALUES.forEach(function(value){
          if (rule.value.indexOf(value) !== -1) {
            var dimension = rule.value.replace(RE, "$1");
            var filename = rule.value.replace(RE, "$3");
            var hidpiFactor = filename.match(/@2x/) ? 2 : 1;
            var size = getImageSize(dir, filename);
            if (size) {
              if (dimension === "dimensions") {
                rule.value = size["width"] / hidpiFactor + "px " + size["height"] / hidpiFactor + "px"
              } else {
                rule.value = size[dimension] / hidpiFactor + "px"
              }
            } else {
              throw new Error(
                'Failed to get image size of: '+ path.join(dir, filename)
              );
            }
          }
        });
      });
    });
  };
};

function getImageSize(dir, name) {
  var parser = imagesize();
  var data   = fs.readFileSync(path.join(dir, name));
  var result = false;
  switch (parser.parse(data)) {
    case imagesize.DONE:
      result = parser.getResult();
      break;
  }

  return result;
}
