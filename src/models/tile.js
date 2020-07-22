import uuid from 'react-uuid';

class Tile {
  constructor(x, y, tileBackground, tileSize, scale, collidable = false) {
    this.xPos = x;
    this.yPos = y;
    this.tileBackground = tileBackground;
    this.tileSize = tileSize;
    this.scale = scale;
    this.key = uuid();
    this.collidable = collidable;
  }

  toJSON() {
    let backgroundInfo;
    if (this.tileBackground !== null) {
      backgroundInfo = {
        rowNum: this.tileBackground.rowNum,
        columnNum: this.tileBackground.columnNum,
        tileSetName: this.tileBackground.tileSetName,
      };
    } else {
      backgroundInfo = this.tileBackground;
    }
    return { tileBackground: backgroundInfo, collidable: this.collidable };
  }
}

export default Tile;
