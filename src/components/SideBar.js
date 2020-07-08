import React from 'react';
import MyDropzone from './MyDropzone'
import ImageSplit from './ImageSplit'

function SideBar(props) {
    return (
        <div className="SideBar">
            {props.tileSets.length === 0
            ? <MyDropzone
                tileSets={props.tileSets}
                updateTileSets={props.updateTileSets}/>
            : <ImageSplit tileSets={props.tileSets}/>}

        </div>
    );
}

export default SideBar;