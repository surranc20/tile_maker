/* eslint-disable no-restricted-syntax */
import TileRow from './tile_row';
import Tile from './tile';

class TileMapLoader {
  constructor(file, loadedTilesets) {
    this.file = file;
    this.loadedTileSets = loadedTilesets;
  }

  loadMap(updateFormInfo, updateTileMap, setDropFailed, updateCheckingValidity) {
    const reader = new FileReader();
    reader.addEventListener('load', (loadEvent) => {
      try {
        const json = JSON.parse(loadEvent.target.result);
        if (json.mapArray === undefined) {
          setDropFailed(true);
          return updateCheckingValidity(false);
        }
        if (json.mapInfo === undefined) {
          setDropFailed(true);
          return updateCheckingValidity(false);
        }

        // A for loop just makes so much more sense than a map here...
        // Create the mapArray portion of the map here based on the loaded file
        const mapArray = [];
        for (const [rowNum, tileRow] of json.mapArray.entries()) {
          const row = [];
          for (const [colNum, tile] of tileRow.entries()) {
            const img = this.loadedTileSets.get(tile.tileBackground.tileSetName);
            const background = { background: `url(${img.src})` };
            row.push(new Tile(colNum, rowNum, { ...tile.tileBackground, background },
              [json.mapInfo.width, json.mapInfo.height], 2));
          }
          mapArray.push(new TileRow(row));
        }
        updateTileMap(mapArray);

        // Don't forget to also include the mapInfo (name, col...) from the loaded file.
        updateFormInfo(json.mapInfo);
        return true;
      } catch (error) {
        setDropFailed(true);
        return updateCheckingValidity(false);
      }
    });
    reader.readAsText(this.file);
  }
}

export default TileMapLoader;
