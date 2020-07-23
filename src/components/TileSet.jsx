import React, { useState, useEffect } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import TileSetTile from './TileSetTile';

function DisplayTileSet({ tilesetInfo }) {
  const [tileArray, setTileArray] = useState([]);
  const tileSize = [16, 16];
  // Break tilesheet png into tiles and add all these tiles to an array to display.
  useEffect(() => {
    const [tileSetName, img] = tilesetInfo;

    // Get the dimensions of the sheet and then create the array of tiles.
    const rows = parseInt(img.height / tileSize[1], 10);
    const columns = parseInt(img.width / tileSize[0], 10);

    // Create a 2d array with the same shape as our tile sheet.
    const matrix = Array(rows).fill(0).map(() => new Array(columns).fill(0));

    // Use this array to create an array filled with tiles.
    const tileSetMatrix = matrix.map((row, rowIndex) => row.map((column, columnIndex) => (
      <TileSetTile
        tileBackground={{ background: `url(${img.src})` }}
        rowNum={rowIndex}
        columnNum={columnIndex}
        tileSize={tileSize}
        tileSetName={tileSetName}
      />
    )));

    // Flatten array so that it can be mapped in a grid.
    const tileSetArray = tileSetMatrix.flat();
    setTileArray(tileSetArray);
  }, [tilesetInfo]);

  return (
    <div>
      {tileArray === []
        ? <CircularProgress />
        : <TileSet tileArray={tileArray} />}
    </div>
  );
}

function TileSet({ tileArray }) {
  return (
    <div>
      <Grid container>
        {tileArray.map((tile) => (
          <Grid item key={uuid()}>
            {tile}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

DisplayTileSet.propTypes = {
  // PropTypes does not support map
  // eslint-disable-next-line react/forbid-prop-types
  tilesetInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TileSet.propTypes = {
  tileArray: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DisplayTileSet;
