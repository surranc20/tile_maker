import React from 'react'


function Tile(props){
    let isEmpty = true
    const style = {
        outline: "1px solid #3e569e",
        width: props.tileSize[0] * props.scale,
        height: props.tileSize[1] * props.scale
    }
    return(
        <div style={style}>
            {isEmpty
            ? EmptyTile(props.tileSize)
            : null
            }
        </div>
    );
}

function EmptyTile(props){
    return(
        <div>
        </div>
    );
}

export default Tile