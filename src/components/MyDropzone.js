import React, { useCallback } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'


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

    }, [acceptedFileHandler, props.tileSets])

    return (
        <div className="FileUpload">
                <DropzoneArea onDrop={onDrop} filesLimit={1} acceptedFiles={['.png']}
                dropzoneText="Drag tile set here! (Or browse computer for tileset)"></DropzoneArea>
        </div>
    );
}

export default FileUpload