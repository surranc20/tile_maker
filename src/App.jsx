import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Grid from '@material-ui/core/Grid';
import SideBar from './components/SideBar';
import TileMapSpot from './components/TileMap';

import './App.css';

function App() {
  const [tileSets, updateTileSets] = useState([]);

  return (
    <div className="App">
      <h1>Pokemon Tile Map Maker</h1>
      <DndProvider backend={HTML5Backend}>
        <Grid container spacing={3} alignItems="center">
          <Grid item sm={4}>
            <SideBar
              tileSets={tileSets}
              updateTileSets={updateTileSets}
            />
          </Grid>
          <Grid item sm={8}>
            <TileMapSpot tilesets={tileSets} />
          </Grid>
        </Grid>
      </DndProvider>
    </div>
  );
}

export default App;
