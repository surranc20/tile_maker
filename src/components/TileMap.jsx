import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Tile from './Tile';
import TileMapInfoForm from './TileMapInfoForm';

function TileMap({ mapInfo }) {
  const {
    rows, columns, width, height, name,
  } = mapInfo;

  const [tileMap, updateTileMap] = useState([]);
  useEffect(() => {
    const tile = <Tile tileSize={[width, height]} scale={1} />;
    const matrix = Array(rows).fill(0).map(() => new Array(columns).fill(tile));
    updateTileMap(matrix);
  }, [rows, columns, width, height]);

  return (
    <Grid container direction="column">
      {tileMap.map((row) => <TileMapRow row={row} key={uuid()} />)}
    </Grid>
  );
}

function TileMapRow({ row }) {
  return (
    <Grid container>
      {row.map((tile) => <Grid item key={uuid()}>{tile}</Grid>)}
    </Grid>
  );
}

function TileMapSpot() {
  const [formInfo, updateFormInfo] = useState(null);
  return (
    <div>
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
};

export default TileMapSpot;
