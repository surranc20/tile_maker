import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
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
    const matrix = Array.from({ length: rows }, (_, rowNum) => Array.from({ length: columns }, (__, colNum) => new TileModel(colNum, rowNum, null, [width, height], 2)));
    updateTileMap(matrix);
    console.log("I ran");
  }, [rows, columns, width, height]);

  function updateTile(xPos, yPos, tileBackground) {
    const tempTileMap = [...tileMap];
    tempTileMap[yPos][xPos].tileBackground = tileBackground;
    updateTileMap(tempTileMap);
  }

  return (
    <Grid container direction="column">
      {tileMap.map((row) => <TileMapRow row={row} key={uuid()} updateTile={updateTile} />)}
    </Grid>
  );
}

function TileMapRow({ row, updateTile }) {
  return (
    <Grid container>
      {row.map((tileInfo) => <Grid item key={uuid()}><Tile xPos={tileInfo.xPos} yPos={tileInfo.yPos} tileBackground={tileInfo.tileBackground} tileSize={tileInfo.tileSize} scale={tileInfo.scale} updateTile={updateTile} /></Grid>)}
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
