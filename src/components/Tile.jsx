import React from 'react';
import PropTypes from 'prop-types';

function EmptyTile() {
  return (
    <div />
  );
}

function Tile({ tileSize, scale }) {
  const isEmpty = true;
  const style = {
    outline: '1px solid #3e569e',
    width: tileSize[0] * scale,
    height: tileSize[1] * scale,
  };
  return (
    <div style={style}>
      {isEmpty
        ? EmptyTile()
        : null}
    </div>
  );
}

Tile.propTypes = {
  tileSize: PropTypes.arrayOf(PropTypes.number).isRequired,
  scale: PropTypes.number.isRequired,
};

export default Tile;
