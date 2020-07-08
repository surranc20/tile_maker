import React, { useState, useEffect } from 'react'
import Tile from './Tile'
import Grid from '@material-ui/core/Grid'


function TileMap(props) {
    const [tileMap, updateTileMap] = useState([])
    useEffect(() => {
        let rows = []
        for (const _ of Array(13).keys()) {
            let row = []
            for (const _ of Array(13).keys()) {
                row.push(<Tile tileSize={props.tileSize} scale={2} />)
            }
            rows.push(row)
        }
        updateTileMap(rows)
    }, [])

    return (
        <Grid container direction="column">
            {
                tileMap.map((row, index) => {
                    return <TileMapRow row={row} key={index} />
                })
            }
        </Grid>
    );
}


function TileMapRow(props) {
    return (
        <Grid container>
            {
                props.row.map((tile, index) => {
                    return <Grid item key={index}>{tile}</Grid>
                })
            }
        </Grid>
    );
}

export default TileMap;