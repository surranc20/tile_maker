import React from 'react';
import { useDrag } from 'react-dnd';
import poke from '../assets/pokeball.png';
import { ItemTypes } from './ItemTypes';

function DragablePok() {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.DROPTILE },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
      <img src={poke} alt="test" />
    </div>
  );
}

export default DragablePok;
