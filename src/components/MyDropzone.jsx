import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { DropzoneArea } from 'material-ui-dropzone';
import cloneDeep from 'lodash/cloneDeep';

function FileUpload({ tileSets, updateTileSets }) {
  const acceptedFileHandler = updateTileSets;
  const onDrop = useCallback((acceptedFiles) => {
    // This code runs whenever a file is accepted by the dropzone.
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const { result } = reader;
        const img = new Image(); // Will be used to get the dimensions of the sheet.
        img.src = result;
        img.onload = () => {
          const tempTileSets = cloneDeep(tileSets);
          tempTileSets.set(file.name, img);
          acceptedFileHandler(tempTileSets);
        };
      };
    });
  }, [acceptedFileHandler, tileSets]);

  return (
    <div className="FileUpload" style={{ marginTop: '20px' }}>
      <DropzoneArea
        onDrop={onDrop}
        filesLimit={1}
        acceptedFiles={['.png']}
        dropzoneText="Drag tile set here! (Or browse computer for tileset)"
        showPreviewsInDropzone={false}
      />
    </div>
  );
}

FileUpload.propTypes = {
  // PropTypes does not support a map
  // eslint-disable-next-line react/forbid-prop-types
  tileSets: PropTypes.object.isRequired,
  updateTileSets: PropTypes.func.isRequired,
};

export default FileUpload;
