import React from 'react';
import PropTypes from 'prop-types';
import { ButtonBase } from '@material-ui/core';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

function EmptyTile({ showCollide, isCollidable }) {
  const style = {
    outline: '1px solid #3e569e',
    width: '100%',
    height: '100%',
  };
  return (
    <div style={style}>

      <ShowCollideTile showCollide={showCollide} isCollidable={isCollidable} />

    </div>
  );
}

function FilledTile({
  tileBackground, tileSize, scale, showCollide, isCollidable,
}) {
  const { background, rowNum, columnNum } = tileBackground;

  const xBackgroundOffset = -columnNum * tileSize[0];
  const yBackgroundOffset = -rowNum * tileSize[1];
  const style = {
    backgroundPosition: `${xBackgroundOffset}px ${yBackgroundOffset}px`,
    width: `${tileSize[0]}px`,
    height: `${tileSize[1]}px`,
    transform: `scale(${scale}, ${scale})`,
    transformOrigin: 'left top',
  };
  return (
    <div style={{ ...background, ...style }}>
      <ShowCollideTile showCollide={showCollide} isCollidable={isCollidable} />
    </div>
  );
}

function ShowCollideTile({ showCollide, isCollidable }) {
  const style = {
    width: '100%',
    height: '100%',
  };

  if (showCollide) {
    if (isCollidable) {
      style.background = 'rgba(255, 0, 0, 0.5)';
    } else {
      style.background = 'rgba(0, 255, 0, 0.5)';
    }
  }

  return (
    <div style={style} />
  );
}

// eslint-disable-next-line object-curly-newline
function Tile(
  {
    xPos, yPos, tileBackground, tileSize, scale, updateTile,
    showCollide, isCollidable, updateTileCollidability,
  },
) {
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

  function setTileCollidability() {
    if (showCollide) {
      updateTileCollidability(xPos, yPos, !isCollidable);
    }
  }

  return (
    <ButtonBase
      style={{ width: tileSize[0] * scale, height: tileSize[1] * scale }}
      onClick={setTileCollidability}
    >
      <div style={style} ref={drop}>
        {tileBackground === null
          ? <EmptyTile showCollide={showCollide} isCollidable={isCollidable} />
          : (
            <FilledTile
              tileBackground={tileBackground}
              tileSize={tileSize}
              scale={scale}
              showCollide={showCollide}
              isCollidable={isCollidable}
            />
          )}

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
    </ButtonBase>
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
  updateTileCollidability: PropTypes.func.isRequired,
  showCollide: PropTypes.bool.isRequired,
  isCollidable: PropTypes.bool.isRequired,
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
  scale: PropTypes.number.isRequired,
  showCollide: PropTypes.bool.isRequired,
  isCollidable: PropTypes.bool.isRequired,
};

EmptyTile.propTypes = {
  showCollide: PropTypes.bool.isRequired,
  isCollidable: PropTypes.bool.isRequired,
};

ShowCollideTile.propTypes = {
  showCollide: PropTypes.bool.isRequired,
  isCollidable: PropTypes.bool.isRequired,
};

export default Tile;
