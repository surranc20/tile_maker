import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyDropzone from './MyDropzone';
import TileSet from './TileSet';
import TileSetTabs from './TilesetTabs';

function SideBar({ tileSets, updateTileSets }) {
  const style = {
    height: '70vmin',
    overflow: 'auto',
  };

  const [activeTileset, setActiveTileset] = useState(0);

  return (
    <div style={style}>
      {tileSets.size === 0
        ? (
          <MyDropzone
            tileSets={tileSets}
            updateTileSets={updateTileSets}
          />
        )
        : (
          <div>
            <TileSetTabs
              tileSets={tileSets}
              activeTileset={activeTileset}
              setActiveTileset={setActiveTileset}
            />
            <TileSet tilesetInfo={[...tileSets.entries()][activeTileset]} />
            <MyDropzone
              tileSets={tileSets}
              updateTileSets={updateTileSets}
              setActiveTileset={setActiveTileset}
            />
          </div>
        )}
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
