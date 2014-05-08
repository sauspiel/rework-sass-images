rework-sass-images
==================

Sass/Compass image size functions written in JavaScript as a Rework plugin. Uses [Imagesize](https://npmjs.org/package/imagesize) to read an
image's size and replaces directives in CSS with that size. Inspired by [rework-imagesize](https://github.com/simme/rework-imagesize) and [Compass Image Dimension Helpers](http://compass-style.org/reference/compass/helpers/image-dimensions/).

## Usage

```javascript
var rework = require('rework');
var sass_images = require('rework-sass-images');

var css = rework(str)
  .use(sass_images('path/to/images/folder'))
  .toString();
```

Using the above JavaScript. This:

```css
h1 {
  background: url('myimage.png');
  background-size: image-dimensions('myimage.png');
  width: image-width('myimage.png');
  height: image-height('myimage.png');
  text-indent: 100%;
}
```

Will produce this CSS:

```css
h1 {
  background: url('myimage.png');
  background-size: 518px 202px;
  width: 518px;
  height: 202px;
  text-indent: 100%;
}
```

## Functions

* `image-width('path/to/image')` -- inserts the width of the image in px;
* `image-height('path/to/image')` -- inserts the height of the image in px;
* `image-dimensions('path/to/image')` -- inserts the width AND the height of the image separated by white-space;

## License

MIT
