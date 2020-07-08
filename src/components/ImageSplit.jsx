import React, {useState} from 'react';
function ImageSplit(props){

        const [tiles, updateTiles] = useState(null)
        let l = this;

        var c = document.getElementById("canvas"),
            w = window.innerWidth,
            h = window.innerHeight;
        c.width = w;
        c.height = h;
        var ctx = c.getContext("2d"),
            input = document.getElementById("input"),
            reader = new FileReader(),
            img = new Image(),
            imgW, //px
            imgH, //px
            imgData,
            tileDim = 50, //tile dimensions px
            tileCountX, //how many tiles we can fit
            tileCountY;

        //read file input
        input.onchange = function () {
            reader.readAsDataURL(input.files[0]);
            reader.onload = function () {
                img.src = reader.result;
                img.onload = function () {
                    //start
                    init();
                    l.state = { tiles: getTiles() };


            }
        }

        function init() {
            imgW = img.width;
            imgH = img.height;
            //check how many full tiles we can fit
            //right and bottom sides of the image will get cropped
            tileCountX = ~~(imgW / tileDim);
            tileCountY = ~~(imgH / tileDim);

            ctx.drawImage(img, 0, 0);
            imgData = ctx.getImageData(0, 0, imgW, imgH).data;
            ctx.clearRect(0, 0, w, h);
        }

        //get imgdata index from img px positions
        function indexX(x) {
            var i = x * 4;
            if (i > imgData.length) console.warn("X out of bounds");
            return i;
        }
        function indexY(y) {
            var i = imgW * 4 * y;
            if (i > imgData.length) console.warn("Y out of bounds");
            return i;
        }
        function getIndex(x, y) {
            var i = indexX(x) + indexY(y);
            if (i > imgData.length) console.warn("XY out of bounds");
            return i;
        }

        //get a tile of size tileDim*tileDim from position xy
        function getTile(x, y) {
            var tile = [];
            //loop over rows
            for (var i = 0; i < tileDim; i++) {
                //slice original image from x to x + tileDim, concat
                tile.push(...imgData.slice(getIndex(x, y + i), getIndex(x + tileDim, y + i)));
            }
            //convert back to typed array and to imgdata object
            tile = new ImageData(new Uint8ClampedArray(tile), tileDim, tileDim);
            //save original position
            tile.x = x;
            tile.y = y;
            return tile;
        }

        //generate all tiles
        function getTiles() {

            var tiles = [];
            for (var yi = 0; yi < tileCountY; yi++) {
                for (var xi = 0; xi < tileCountX; xi++) {
                    tiles.push(getTile(xi * tileDim, yi * tileDim));
                }
            }

            return tiles;
        }

        //and draw with offset
        var offset = 1.1;
        function drawTiles(tiles) {
            tiles.forEach((d, i) => ctx.putImageData(d, d.x * offset, d.y * offset));

            //more interesting effects are easy to do:
            //tiles.forEach((d,i) => ctx.putImageData(d, d.x * i * 0.01, d.y * i * 0.01));

            //for efficiency in animation etc tiles should be converted to image object
        }

    }

    return (<div></div>);

}
export default ImageSplit;