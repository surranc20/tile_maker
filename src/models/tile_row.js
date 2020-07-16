import uuid from 'react-uuid';

class TileRow {
  constructor(row) {
    this.row = row;
    this.key = uuid();
  }

  toJSON() {
    return this.row;
  }
}

export default TileRow;
