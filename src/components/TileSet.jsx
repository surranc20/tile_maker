import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { CircularProgress, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import TileSetTile from './TileSetTile';

function DisplayTileSet({ tileSets }) {
  const [imgSrc, setSrc] = useState(null);
  const [rows, setRows] = useState(null);
  const [columns, setColumns] = useState(null);
  const tileSize = [16, 16];
  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(tileSets[0]);
    reader.onload = () => {
      const { result } = reader;
      setSrc(result);
      const img = new Image();
      img.src = result;
      img.onload = () => {
        setRows(parseInt(img.height / tileSize[1], 10));
        setColumns(parseInt(img.width / tileSize[0], 10));
      };
    };
  }, []);



  return (
    <div>
      {columns === null
        ? <CircularProgress />
        : <TileSet tilesImg={imgSrc} rows={rows} columns={columns} tileSize={tileSize} />}
    </div>
  );
}

function TileSet({ tilesImg, rows, columns, tileSize }) {
  const [shapedMatrix, setShapedMatrix] = useState([]);
  useEffect(() => {
    const matrix = Array(rows).fill(0).map(() => new Array(columns).fill(0));
    setShapedMatrix(matrix);
  }, [tilesImg, rows, columns]);

  return (
    <Grid container>

        {shapedMatrix.map((row, rowIndex) => <TileSetRow row={row} rowNum={rowIndex} key={uuid()} tilesImg={tilesImg} tileSize={tileSize}/>)}

    </Grid>
  );
}

function TileSetRow({ row, rowNum, tilesImg, tileSize }) {
  const myStyle = {
    width: `${tileSize[0]}px`,
    height: `${tileSize[1]}px`,
    background: `url(${tilesImg})`,
    outline: '1px solid #3e569e',

  };
  return (
    <div>
      {row.map((tile, columnIndex) => <Grid item> <TileSetTile myStyle={myStyle} rowNum={rowNum} columnNum={columnIndex} tileSize={tileSize} /> </Grid>)}
    </div>
  );
}

// TileSet.propTypes = {
//   tileSet: PropTypes.,
// };

export default DisplayTileSet;


// TODO: clean up to one file