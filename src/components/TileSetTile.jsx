import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

function TileSetTile({ myStyle, rowNum, columnNum, tileSize}) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.DROPTILE, rowNum, columnNum},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const xBackgroundOffset = -columnNum * tileSize[0];
  const yBackgroundOffset = -rowNum * tileSize[1];
  const style = {
    backgroundPosition: `${xBackgroundOffset}px ${yBackgroundOffset}px`,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
  };
  return (
    <div style={{ ...myStyle, ...style }} ref={drag} />
  );
}

export default TileSetTile;
