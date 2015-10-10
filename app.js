var chain = {count: 0, pixels: {}};

function setup() {
  var canvas = createCanvas(640, 480);
  canvas.class('main-canvas');

  loadImage("assets/mandala.jpg", function(img) {
    genImage(img);
  });
}

function pixelToHex(pixel) {
  // To array of hex RGB values
  pixel = hex(pixel);

  // Grab last two chars (rest are 0)
  pixel = pixel[0].substr(pixel[0].length - 2) + pixel[1].substr(pixel[1].length - 2) + pixel[2].substr(pixel[2].length - 2);

  // Return as hex literal
  return parseInt(pixel, 16);
  return pixel;
};

function hexToPixel(hex) {
  hex = hex.toString(16);

  var hexArray = [hex.substr(0, 2), hex.substr(2, 2), hex.substr(4, 2)];

  return unhex(hexArray);
}

function genImage(img) {
  // if (img.width > 640 || img.height > 480) {img.resize(640, 480);}
  var hex, rhex, dhex, pixel;
  var x = 0;
  for (var y = 0; y < canvas.height; y++) {
    // for (var x = 0; x < canvas.width; x++) {
      pixel = img.get(x, y);
      hex = pixelToHex(pixel);
      rhex = pixelToHex(img.get(x+1, y));
      dhex = pixelToHex(img.get(x, y+1));
      chain.count++;
      if (chain.pixels[hex] == undefined) {
        chain.pixels[hex] = {};
        chain.pixels[hex].right = {};
        chain.pixels[hex].down = {};

        chain.pixels[hex].count = 1;
        chain.pixels[hex].right[rhex] = 1;
        chain.pixels[hex].down[dhex] = 1;
      } else {
        chain.pixels[hex].count++;

        if (chain.pixels[hex].right[rhex] == undefined) {
          chain.pixels[hex].right[rhex] = 1;
        } else {
          chain.pixels[hex].right[rhex]++;
        }

        if (chain.pixels[hex].down[dhex] == undefined) {
          chain.pixels[hex].down[dhex] = 1;
        } else {
          chain.pixels[hex].down[dhex]++;
        }
      }
    // }
  }
  image(img, 0, 0);
  console.log(chain);
}

function draw() {

}