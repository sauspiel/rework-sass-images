//
// # Test
//

var assert      = require('assert');
var sass_images = require('./../index');
var rework      = require('rework');
var fs          = require('fs');

suite('Rework Imagesize', function () {
  test('It works', function () {
    var str = fs.readFileSync(__dirname + '/test.css', 'utf8');
    var exp = fs.readFileSync(__dirname + '/expected.css', 'utf8');
    var css = rework(str)
      .use(sass_images(__dirname))
      .toString() + '\n\n';
    assert.equal(css, exp);
  });
});

