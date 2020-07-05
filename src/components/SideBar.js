import React from 'react';
import MyDropzone from './MyDropzone'
import ImageSplit from './ImageSplit'

function SideBar(props) {
    return (
        <div>
            {props.tileSets.length === 0
            ? <MyDropzone
                tileSets={props.tileSets}
                updateTileSets={props.updateTileSets}/>
            : <ImageSplit/>}

        </div>
    );
}

export default SideBar;