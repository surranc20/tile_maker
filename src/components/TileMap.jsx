import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import TileModel from '../models/tile';
import TileRowModel from '../models/tile_row';
import Tile from './Tile';
import TileMapInfoForm from './TileMapInfoForm';
import LoadMap from './LoadMap';

function TileMap({ mapInfo, loadedTileMap }) {
  const {
    rows, columns, width, height, name,
  } = mapInfo;

  const [tileMap, updateTileMap] = useState([]);
  const [showCollide, updateShowCollide] = useState(false);

  useEffect(() => {
    // The next three lines simply create an array filled with tile rows. These
    // rows each hold their own uinque key as well as the tiles that comprise the row.
    if (loadedTileMap !== null) {
      updateTileMap(loadedTileMap);
      return;
    }
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

  function updateTileCollidability(xPos, yPos, isCollidable) {
    const tempTileMap = [...tileMap];
    tempTileMap[yPos].row[xPos].collidable = isCollidable;
    updateTileMap(tempTileMap);
  }

  async function downloadFile() {
    const filename = `${name}_tiled.json`;
    const jsonStr = JSON.stringify({ mapArray: tileMap, mapInfo });

    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(jsonStr)}`);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  return (
    <Grid container direction="column" spacing={2} justify="center" alignItems="center">
      <Grid item>
        {tileMap.map((tileRow) => (
          <TileMapRow
            row={tileRow.row}
            key={tileRow.key}
            updateTile={updateTile}
            updateTileCollidability={updateTileCollidability}
            showCollide={showCollide}
          />
        ))}
      </Grid>
      <Grid container item justify="center" alignItems="center">
        <Grid item>
          <Tooltip title="Toggle collide map visibility">
            <IconButton color="primary" aria-label="Toggle Show Collide Map" onClick={() => updateShowCollide(!showCollide)}>
              {showCollide ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={downloadFile}
            style={{ height: '56px' }}
          >
            Create Map
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

function TileMapRow({
  row, updateTile, showCollide, updateTileCollidability,
}) {
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
            updateTileCollidability={updateTileCollidability}
            showCollide={showCollide}
            isCollidable={tileInfo.collidable}
          />
        </Grid>
      ))}
    </Grid>
  );
}

function TileMapSpot({ tilesets }) {
  const [formInfo, updateFormInfo] = useState(null);
  const [loadedTileMap, updateLoadedTileMap] = useState(null);
  const style = {
    minHeight: '70vmin',
    padding: '1px',
    overflow: 'auto',
  };

  if (formInfo === null) {
    style.overflow = 'hidden';
  }
  return (
    <div style={style}>
      {formInfo === null
        ? (
          <Grid container adirection="column" spacing={2} justify="center" alignItems="center">
            <Grid item>
              <TileMapInfoForm updateFormInfo={updateFormInfo} />
            </Grid>
            <Grid item>
              <LoadMap
                tilesets={tilesets}
                updateFormInfo={updateFormInfo}
                updateLoadedTileMap={updateLoadedTileMap}
              />
            </Grid>
          </Grid>
        )
        : <TileMap mapInfo={formInfo} loadedTileMap={loadedTileMap} />}
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
  loadedTileMap: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TileMapRow.propTypes = {
  row: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateTile: PropTypes.func.isRequired,
  showCollide: PropTypes.bool.isRequired,
  updateTileCollidability: PropTypes.func.isRequired,
};

TileMapSpot.propTypes = {
  // PropTypes does not support map
  // eslint-disable-next-line react/forbid-prop-types
  tilesets: PropTypes.object.isRequired,
};

export default TileMapSpot;
