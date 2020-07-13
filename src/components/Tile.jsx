import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

function EmptyTile() {
  return (
    <div>Empty</div>
  );
}

function FilledTile({ name }) {
  return (
    <div>{name}</div>
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
      updateTile(props.rowNum);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),

    }),
  });

  return (
    <div style={style} ref={drop}>
      {tile === null
        ? EmptyTile()
        : <FilledTile name={tile} />}
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

export default Tile;
