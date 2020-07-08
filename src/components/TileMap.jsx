import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Tile from './Tile';

function TileMap({ tileSize }) {
  const [tileMap, updateTileMap] = useState([]);
  useEffect(() => {
    const tile = <Tile tileSize={tileSize} scale={2} />;
    const matrix = Array(13).fill(0).map(() => new Array(13).fill(tile));
    updateTileMap(matrix);
  }, []);

  return (
    <Grid container direction="column">
      { tileMap.map((row) => <TileMapRow row={row} key={uuid()} />) }
    </Grid>
  );
}

function TileMapRow({ row }) {
  return (
    <Grid container>
      { row.map((tile) => <Grid item key={uuid()}>{tile}</Grid>) }
    </Grid>
  );
}

TileMap.propTypes = {
  tileSize: PropTypes.arrayOf(PropTypes.number).isRequired,
};

TileMapRow.propTypes = {
  row: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TileMap;
