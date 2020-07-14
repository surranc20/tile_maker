import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

function EmptyTile() {
  return (
    <div />
  );
}

function FilledTile({ tileInfo }) {
  const {
    rowNum, columnNum, tileBackground, tileSize,
  } = tileInfo;

  const xBackgroundOffset = -columnNum * tileSize[0];
  const yBackgroundOffset = -rowNum * tileSize[1];
  const style = {
    backgroundPosition: `${xBackgroundOffset}px ${yBackgroundOffset}px`,
    width: '100%',
    height: '100%',
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
        tileSize: props.tileSize,
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
        : <FilledTile tileInfo={tile} />}
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

FilledTile.propTypes = {
  tileInfo: PropTypes.shape({
    rowNum: PropTypes.number.isRequired,
    columnNum: PropTypes.number.isRequired,
    tileBackground: PropTypes.string.isRequired,
    tileSize: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default Tile;
