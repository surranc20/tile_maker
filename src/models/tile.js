import uuid from 'react-uuid';

class Tile {
  constructor(x, y, tileBackground, tileSize, scale) {
    this.xPos = x;
    this.yPos = y;
    this.tileBackground = tileBackground;
    this.tileSize = tileSize;
    this.scale = scale;
    this.key = uuid();
  }

  toJSON() {
    return { tileBackground: this.tileBackground, key: this.key };
  }
}

export default Tile;
