import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

import TileModel from '../models/tile';
import TileRowModel from '../models/tile_row';
import Tile from './Tile';
import TileMapInfoForm from './TileMapInfoForm';

function TileMap({ mapInfo }) {
  const {
    rows, columns, width, height, name,
  } = mapInfo;

  const [tileMap, updateTileMap] = useState([]);
  useEffect(() => {
    // The next three lines simply create an array filled with tile rows. These
    // rows each hold their own uinque key as well as the tiles that comprise the row.
    const matrix = Array.from({ length: rows },
      (_, rowNum) => new TileRowModel(Array.from({ length: columns },
        (__, colNum) => new TileModel(colNum, rowNum, null, [width, height], 2))));

    updateTileMap(matrix);
  }, [rows, columns, width, height]);

  function updateTile(xPos, yPos, tileBackground) {
    const tempTileMap = [...tileMap];
    tempTileMap[yPos].row[xPos].tileBackground = tileBackground;
    updateTileMap(tempTileMap);
  }

  async function downloadFile() {
    const filename = `${name}_tiled.json`;
    const jsonStr = JSON.stringify(tileMap);

    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(jsonStr)}`);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  return (
    <Grid container direction="column">
      {tileMap.map((tileRow) => (
        <TileMapRow
          row={tileRow.row}
          key={tileRow.key}
          updateTile={updateTile}
        />
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={downloadFile}
        style={{ height: '56px' }}
      >
        Create Map
      </Button>
    </Grid>
  );
}

function TileMapRow({ row, updateTile }) {
  return (
    <Grid container>
      {row.map((tileInfo) => (
        <Grid item key={tileInfo.key}>
          <Tile
            xPos={tileInfo.xPos}
            yPos={tileInfo.yPos}
            tileBackground={tileInfo.tileBackground}
            tileSize={tileInfo.tileSize}
            scale={tileInfo.scale}
            updateTile={updateTile}
          />
        </Grid>
      ))}
    </Grid>
  );
}

function TileMapSpot() {
  const [formInfo, updateFormInfo] = useState(null);
  const style = {
    height: '70vmin',
    padding: '1px',
    overflow: 'auto',
  };
  return (
    <div style={style}>
      {formInfo === null
        ? <TileMapInfoForm updateFormInfo={updateFormInfo} />
        : <TileMap mapInfo={formInfo} />}
    </div>
  );
}

TileMap.propTypes = {
  mapInfo: PropTypes.shape({
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

TileMapRow.propTypes = {
  row: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateTile: PropTypes.func.isRequired,
};

export default TileMapSpot;
