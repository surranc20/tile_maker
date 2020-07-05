import React from 'react';
import MyDropzone from './MyDropzone'

function SideBar(props) {
    return (
        <div>
            <MyDropzone tileSets={props.tileSets} updateTileSets={props.updateTileSets}/>
        </div>
    );
}

export default SideBar;