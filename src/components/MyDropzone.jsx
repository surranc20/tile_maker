import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { DropzoneArea } from 'material-ui-dropzone';

function FileUpload({ tileSets, updateTileSets }) {
  const acceptedFileHandler = updateTileSets;
  const onDrop = useCallback((acceptedFiles) => {
    // This code runs whenever a file is accepted by the dropzone.
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        acceptedFileHandler(tileSets.concat([file]));
      };
      reader.readAsArrayBuffer(file);
    });
  }, [acceptedFileHandler, tileSets]);

  return (
    <div className="FileUpload">
      <DropzoneArea
        onDrop={onDrop}
        filesLimit={1}
        acceptedFiles={['.png']}
        dropzoneText="Drag tile set here! (Or browse computer for tileset)"
      />
    </div>
  );
}

FileUpload.propTypes = {
  tileSets: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateTileSets: PropTypes.func.isRequired,
};

export default FileUpload;
