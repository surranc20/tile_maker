/* eslint-disable no-restricted-syntax */
import TileRow from './tile_row';
import Tile from './tile';

class TileMapLoader {
  constructor(file, loadedTilesets) {
    this.file = file;
    this.loadedTileSets = loadedTilesets;
  }

  loadMap(updateFormInfo, updateTileMap) {
    const reader = new FileReader();
    reader.addEventListener('load', (loadEvent) => {
      try {
        const json = JSON.parse(loadEvent.target.result);
        if (json.mapArray === undefined) {
          return false;
        }
        if (json.mapInfo === undefined) {
          return false;
        }
        // Check tileset compatability
        const loadedTilesetNames = this.loadedTileSets.map((tilesetFile) => tilesetFile.name);

        // A for loop just makes so much more sense here...
        const mapArray = [];
        for (const [rowNum, tileRow] of json.mapArray.entries()) {
          const row = [];
          for (const [colNum, tile] of tileRow.entries()) {
            row.push(new Tile(colNum, rowNum, { ...tile.tileBackground }, [json.mapInfo.width, json.mapInfo.height], 2));
          }
          mapArray.push(new TileRow(row));
        }

        console.log(mapArray);
        updateTileMap(mapArray);
        updateFormInfo(json.mapInfo);
      } catch (error) {
        console.log(error);
        return false;
      }
    });
    reader.readAsText(this.file);
  }
}

export default TileMapLoader;
