import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';

import TileMapLoader from '../models/tile_map_loader';

function LoadMap({ tilesets, updateFormInfo, updateLoadedTileMap }) {
  const [checkingValidity, updateCheckingValidity] = useState(false);
  const [dropFailed, setDropFailed] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    // This code runs whenever a file is accepted by the dropzone.
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        updateCheckingValidity(true);
        const mapLoader = new TileMapLoader(file, tilesets);
        mapLoader.loadMap(updateFormInfo, updateLoadedTileMap,
          setDropFailed, updateCheckingValidity);
      };
      reader.readAsArrayBuffer(file);
    });
  }, [tilesets]);

  const dropText = (dropFailed
    ? 'Failed to upload map! Please make sure all required tilesets are uploaded. (If trouble persists the tile map file is likely corrupted.'
    : 'Drag an in-progress tile map here. Make sure you have already uploaded the corresponding tilesets!');
  return (
    <div className="FileUpload">
      {checkingValidity
        ? (
          <div className="CheckingValidity">
            <h2>Attempting to load tileset!</h2>
            <CircularProgress />
          </div>
        )
        : (
          <DropzoneArea
            onDrop={onDrop}
            filesLimit={1}
            acceptedFiles={['.json']}
            dropzoneText={dropText}
          />
        )}

    </div>
  );
}

LoadMap.propTypes = {
  // PropTypes does not support map
  // eslint-disable-next-line react/forbid-prop-types
  tilesets: PropTypes.object.isRequired,
  updateFormInfo: PropTypes.func.isRequired,
  updateLoadedTileMap: PropTypes.func.isRequired,
};

export default LoadMap;
