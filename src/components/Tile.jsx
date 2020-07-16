import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

function EmptyTile() {
  const style = {
    outline: '1px solid #3e569e',
    width: '100%',
    height: '100%',
  };
  return (
    <div style={style} />
  );
}

function FilledTile({ tileBackground, tileSize }) {
  const { background, rowNum, columnNum } = tileBackground;

  const xBackgroundOffset = -columnNum * tileSize[0];
  const yBackgroundOffset = -rowNum * tileSize[1];
  const style = {
    backgroundPosition: `${xBackgroundOffset}px ${yBackgroundOffset}px`,
    width: `${tileSize[0]}px`,
    height: `${tileSize[1]}px`,
  };
  return (
    <div style={{ ...background, ...style }} />
  );
}

// eslint-disable-next-line object-curly-newline
function Tile({ xPos, yPos, tileBackground, tileSize, scale, updateTile }) {
  const style = {
    width: tileSize[0] * scale,
    height: tileSize[1] * scale,
    position: 'relative',
  };

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.DROPTILE,
    drop: (props) => {
      updateTile(xPos, yPos, {
        // eslint-disable-next-line react/prop-types
        rowNum: props.rowNum,
        // eslint-disable-next-line react/prop-types
        columnNum: props.columnNum,
        background: props.tileBackground,
        // eslint-disable-next-line react/prop-types
        tileSetName: props.tileSetName,
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),

    }),
  });

  return (
    <div style={style} ref={drop}>
      {tileBackground === null
        ? EmptyTile()
        : <FilledTile tileBackground={tileBackground} tileSize={tileSize} />}
      {isOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.9,
            backgroundColor: '#ffcb03',
          }}
        />
      )}
    </div>
  );
}

Tile.defaultProps = {
  tileBackground: null,
};

Tile.propTypes = {
  xPos: PropTypes.number.isRequired,
  yPos: PropTypes.number.isRequired,
  tileBackground: PropTypes.shape({
    background: PropTypes.shape({
      background: PropTypes.string.isRequired,
    }),
    rowNum: PropTypes.number.isRequired,
    columnNum: PropTypes.number.isRequired,
  }),
  tileSize: PropTypes.arrayOf(PropTypes.number).isRequired,
  scale: PropTypes.number.isRequired,
  updateTile: PropTypes.func.isRequired,
};

// Note: tileInfo.tileSize is the tileSize of the tileSetTile being dragged into the tile.
// tileSize is the actual size of the tile on the tile map. If these are different an error
// should propbably be thrown.
FilledTile.propTypes = {
  tileSize: PropTypes.arrayOf(PropTypes.number).isRequired,
  tileBackground: PropTypes.shape({
    background: PropTypes.shape({
      background: PropTypes.string.isRequired,
    }),
    rowNum: PropTypes.number.isRequired,
    columnNum: PropTypes.number.isRequired,
  }).isRequired,
};

export default Tile;
