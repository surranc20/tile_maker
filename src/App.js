import React, {useState} from 'react';
import SideBar from './components/SideBar'
import './App.css';

function App() {
  const [tileSets, updateTileSets] = useState([])

  return (
    <div className="App">
      <SideBar
        tileSets={tileSets}
        updateTileSets={updateTileSets}/>
    </div>
  );
}

export default App;
