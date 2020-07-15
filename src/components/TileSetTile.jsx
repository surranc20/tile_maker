import React from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { ItemTypes } from './ItemTypes';

// eslint-disable-next-line object-curly-newline
function TileSetTile({ tileBackground, rowNum, columnNum, tileSize }) {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.DROPTILE, rowNum, columnNum, tileBackground, tileSize,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const xBackgroundOffset = -columnNum * tileSize[0];
  const yBackgroundOffset = -rowNum * tileSize[1];

  const style = {
    width: `${tileSize[0]}px`,
    height: `${tileSize[1]}px`,
    outline: '1px solid #3e569e',
    backgroundPosition: `${xBackgroundOffset}px ${yBackgroundOffset}px`,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
  };

  return (
    <div style={{ ...tileBackground, ...style }} ref={drag} />
  );
}

TileSetTile.propTypes = {
  tileBackground: PropTypes.shape({
    background: PropTypes.string.isRequired,
  }).isRequired,
  rowNum: PropTypes.number.isRequired,
  columnNum: PropTypes.number.isRequired,
  tileSize: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default TileSetTile;
