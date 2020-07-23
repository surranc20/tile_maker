import React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';

import PropTypes from 'prop-types';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function TileSetTabs({ tileSets, activeTileset, setActiveTileset }) {
  const styles = {
    tabs: {
      textTransform: 'none',
      minWidth: 72,
    },
    root: {
      marginBottom: '10px',
    },
  };

  return (
    <AppBar style={styles.root} position="static" color="primary">
      <Tabs
        value={activeTileset}
        onChange={(event, newValue) => { setActiveTileset(newValue); }}
        indicatorColor="primary"
        textColor="secondary"
        variant="fullWidth"
        aria-label="Tile set tabs"
      >
        {[...tileSets.entries()].map((tab, index) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Tab key={JSON.stringify(tab)} style={styles.tabs} label={`Tileset ${index + 1}`} {...a11yProps(index)} />
        ))}
      </Tabs>
    </AppBar>
  );
}

TileSetTabs.propTypes = {
  activeTileset: PropTypes.number.isRequired,
  setActiveTileset: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  tileSets: PropTypes.object.isRequired,
};

export default TileSetTabs;
