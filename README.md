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
  background-size: image-size('myimage.png');
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

## HiDPI support

Use special functions `hidpi-image-width|height|size` to insert dimesnions divided by 2 if the image filename contains `@2x` in it. For example, considering the `myimage@2x.png` size is 640x480:

```css
div {
  background-size: hidpi-image-size('myimage@2x.png');
  width: hidpi-image-width('myimage@2x.png');
  height: hidpi-image-height('myimage@2x.png');
}
```

will produce:

```css
div {
  background-size: 320px 240px;
  width: 320px;
  height: 240px;
}

## Functions

Insert _actual_ size of the image in px:

* `image-width('path/to/image')` -- inserts the width of the image in px;
* `image-height('path/to/image')` -- inserts the height of the image in px;
* `image-size('path/to/image')` -- inserts the width AND the height of the image separated by white-space;

Insert image dimensions divided by 2 _only_ if filename contains `@2x` in it. Otherwise insert real dimensions:

* `hidpi-image-width('path/to/image@2x')` -- inserts the width of the image divided by 2 for HiDPI images in px;
* `hidpi-image-height('path/to/image@2x')` -- inserts the height of the image divided by 2 for HiDPI images in px;
* `hidpi-image-size('path/to/image@2x')` -- inserts the width AND the height of the image divided by 2 for HiDPI images separated by white-space;

## License

MIT
