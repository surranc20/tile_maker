import React from 'react';
import PropTypes from 'prop-types';
import MyDropzone from './MyDropzone';
import ImageSplit from './ImageSplit';

function SideBar({ tileSets, updateTileSets }) {
  return (
    <div className="SideBar">
      {tileSets.length === 0
        ? (
          <MyDropzone
            tileSets={tileSets}
            updateTileSets={updateTileSets}
          />
        )
        : <ImageSplit tileSets={tileSets} />}
    </div>
  );
}

SideBar.propTypes = {
  tileSets: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateTileSets: PropTypes.func.isRequired,
};

export default SideBar;
