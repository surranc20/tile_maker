import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import AutoScale from 'react-auto-scale';
import { ItemTypes } from './ItemTypes';

function EmptyTile() {
  return (
    <div />
  );
}

function FilledTile({ tileInfo, tileSize }) {
  const {
    rowNum, columnNum, tileBackground, dropTileSize,
  } = tileInfo;

  const xBackgroundOffset = -columnNum * dropTileSize[0];
  const yBackgroundOffset = -rowNum * dropTileSize[1];
  const style = {
    backgroundPosition: `${xBackgroundOffset}px ${yBackgroundOffset}px`,
    width: `${tileSize[0]}px`,
    height: `${tileSize[1]}px`,
  };
  return (
    <div style={{ ...tileBackground, ...style }} />
  );
}

function Tile({ tileSize, scale }) {
  const style = {
    outline: '1px solid #3e569e',
    width: tileSize[0] * scale,
    height: tileSize[1] * scale,
    position: 'relative',
  };

  const [tile, updateTile] = useState(null);
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.DROPTILE,
    drop: (props) => {
      updateTile({
        // eslint-disable-next-line react/prop-types
        rowNum: props.rowNum,
        // eslint-disable-next-line react/prop-types
        columnNum: props.columnNum,
        // eslint-disable-next-line react/prop-types
        tileBackground: props.tileBackground,
        dropTileSize: props.tileSize,
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),

    }),
  });

  return (
    <div style={style} ref={drop}>
      {tile === null
        ? EmptyTile()
        : <AutoScale><FilledTile tileInfo={tile} tileSize={tileSize} /></AutoScale>}
      {isOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }}
        />
      )}
    </div>
  );
}

Tile.propTypes = {
  tileSize: PropTypes.arrayOf(PropTypes.number).isRequired,
  scale: PropTypes.number.isRequired,
};

// Note: tileInfo.tileSize is the tileSize of the tileSetTile being dragged into the tile.
// tileSize is the actual size of the tile on the tile map. If these are different an error
// should propbably be thrown.
FilledTile.propTypes = {
  tileSize: PropTypes.arrayOf(PropTypes.number).isRequired,
  tileInfo: PropTypes.shape({
    rowNum: PropTypes.number.isRequired,
    columnNum: PropTypes.number.isRequired,
    tileBackground: PropTypes.string.isRequired,
    dropTileSize: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default Tile;
