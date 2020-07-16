import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import TileModel from '../models/tile';
import Tile from './Tile';
import TileMapInfoForm from './TileMapInfoForm';

function TileMap({ mapInfo }) {
  const {
    rows, columns, width, height, name,
  } = mapInfo;

  const [tileMap, updateTileMap] = useState([]);
  useEffect(() => {
    // The next 2 lines simply create a 2d matrix filled with TileModels for each spot in matrix.
    const matrix = Array.from({ length: rows }, (_, rowNum) => Array.from({ length: columns },
      (__, colNum) => new TileModel(colNum, rowNum, null, [width, height], 2)));
    updateTileMap(matrix);
  }, [rows, columns, width, height]);

  function updateTile(xPos, yPos, tileBackground) {
    const tempTileMap = [...tileMap];
    tempTileMap[yPos][xPos].tileBackground = tileBackground;
    updateTileMap(tempTileMap);
  }

  return (
    <Grid container direction="column">
      {tileMap.map((row) => (
        <TileMapRow
          row={row}
          key={JSON.stringify(row)}
          updateTile={updateTile}
        />
      ))}
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
