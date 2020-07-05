import React, { useCallback } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { useTheme } from '@material-ui/core/styles';


function FileUpload(props) {
    const acceptedFileHandler = props.updateTileSets;
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents

                acceptedFileHandler(props.tileSets.concat([file]))
            }
            reader.readAsArrayBuffer(file)
        })

    }, [acceptedFileHandler])

    return (
        <div className="FileUpload">
            <div className="DropZone">
                <DropzoneArea onDrop={onDrop} filesLimit={1} acceptedFiles={['.png']}
                dropzoneText="Drag tile set here! (Or brose computer for tileset)"></DropzoneArea>
            </div>
        </div>
    );
}

export default FileUpload;