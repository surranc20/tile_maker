import uuid from 'react-uuid';
import Tile from './tile';

class TileRow {
  constructor(row) {
    this.row = row;
    this.key = uuid();
  }

  addBlankLeft() {
    this.row.map((tile) => tile.xPos + 1);
    const { yPos, tileSize, scale } = this.row[0];
    this.row.unshift(new Tile(0, yPos, null, tileSize, scale));
  }

  addBlankRight() {
    const {
      xPos, yPos, tileSize, scale,
    } = this.row[this.row.length - 1];
    this.row.push(new Tile(xPos + 1, yPos, null, tileSize, scale));
  }

  dropYCoord(dropDistance) {
    this.row.map((tile) => tile.yPos + dropDistance);
  }

  toJSON() {
    return this.row;
  }
}

export default TileRow;
