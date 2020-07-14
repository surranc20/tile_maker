import React, { useState, useEffect } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import TileSetTile from './TileSetTile';

function DisplayTileSet({ tileSets }) {
  const [tileArray, setTileArray] = useState([]);
  const tileSize = [16, 16];

  // Break tilesheet png into tiles and add all these tiles to an array to display.
  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(tileSets[0]);
    reader.onload = () => {
      const { result } = reader;
      const img = new Image(); // Will be used to get the dimensions of the sheet.
      img.src = result;

      // Get the dimensions of the sheet and then create the array of tiles.
      img.onload = () => {
        const rows = parseInt(img.height / tileSize[1], 10);
        const columns = parseInt(img.width / tileSize[0], 10);

        // Create a 2d array with the same shape as our tile sheet.
        const matrix = Array(rows).fill(0).map(() => new Array(columns).fill(0));

        // Use this array to create an array filled with tiles.
        const tileSetMatrix = matrix.map((row, rowIndex) => row.map((column, columnIndex) => (
          <TileSetTile
            tileBackground={{ background: `url(${result})` }}
            rowNum={rowIndex}
            columnNum={columnIndex}
            tileSize={tileSize}
          />
        )));

        // Flatten array so that it can be mapped in a grid.
        const tileSetArray = tileSetMatrix.flat();
        setTileArray(tileSetArray);
      };
    };
  }, [tileSets]);

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
  tileSets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TileSet.propTypes = {
  tileArray: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DisplayTileSet;
