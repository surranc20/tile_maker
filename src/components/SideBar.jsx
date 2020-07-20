import React from 'react';
import PropTypes from 'prop-types';
import MyDropzone from './MyDropzone';
import TileSet from './TileSet';

function SideBar({ tileSets, updateTileSets }) {
  const style = {
    height: '70vmin',
    overflow: 'auto',
  };

  return (
    <div style={style}>
      {tileSets.size === 0
        ? (
          <MyDropzone
            tileSets={tileSets}
            updateTileSets={updateTileSets}
          />
        )
        : <TileSet tileSets={tileSets} />}
    </div>
  );
}

SideBar.propTypes = {
  // PropTypes does not support map
  // eslint-disable-next-line react/forbid-prop-types
  tileSets: PropTypes.object.isRequired,
  updateTileSets: PropTypes.func.isRequired,
};

export default SideBar;
