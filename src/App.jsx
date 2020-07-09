import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import SideBar from './components/SideBar';
import TileMapSpot from './components/TileMap';
import './App.css';

function App() {
  const [tileSets, updateTileSets] = useState([]);

  return (
    <div className="App">
      <h1>Pokemon Tile Map Maker</h1>
      <Grid container spacing={3} alignItems="center">
        <Grid item sm={4}>
          <SideBar
            tileSets={tileSets}
            updateTileSets={updateTileSets}
          />
        </Grid>
        <Grid item sm={8}>
          <TileMapSpot />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
