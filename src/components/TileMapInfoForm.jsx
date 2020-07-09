import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, TextField } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

function Alert(props) {
  /* Alert which displays in a snackbar whenever the user fails to properly fill out the form. */
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TileMapInfoForm({ updateFormInfo }) {
  /* Form which gathers the information about the tile map. */
  const styles = {
    root: {
      backgroundColor: '#f5f5f5',
      borderRadius: '20px',
      padding: '20px',
    },
    h2: {
      color: '#3e569e',
    },
  };

  const [snackbarOpen, updateSnackbarOpen] = useState(false);
  const [snackMessage, updateSnackMessage] = useState('');

  function handleClose(event, reason) {
    /* Function which runs whenever the snackbar is closed. */
    if (reason === 'clickaway') {
      return;
    }
    updateSnackbarOpen(false);
  }

  function handleSubmit(event) {
    /* Runs whenever the user submits the form. */
    event.preventDefault();

    // Get form data
    const {
      rows, cols, width, height, name,
    } = event.target.elements;

    // Parse form info
    const formInfo = {
      rows: parseInt(rows.value, 10),
      columns: parseInt(cols.value, 10),
      width: parseInt(width.value, 10),
      height: parseInt(height.value, 10),
      name: name.value,
    };

    // Check to see if inputs are valid and open snackbar if they are not
    if (Object.values(formInfo).includes(NaN)) {
      updateSnackbarOpen(true);
      updateSnackMessage('Make sure that all entries but map name are numbers!');
    } else if (formInfo.name === '') {
      updateSnackbarOpen(true);
      updateSnackMessage('Please enter a map name!');
    } else {
      // Inputs were valid. Send info to TileMapSpot
      updateFormInfo(formInfo);
    }
  }

  return (
    <div style={styles.root}>
      <h2 style={styles.h2}>Enter Map Info</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} direction="row" justify="center" alignItems="center" style={{ height: '100%' }}>
          <Grid item>
            <TextField
              label="Enter # of rows"
              id="rows"
              variant="outlined"
            />
          </Grid>

          <Grid item>
            <TextField
              label="Enter # of columns"
              id="cols"
              variant="outlined"
            />
          </Grid>

          <Grid item>
            <TextField
              label="Enter tile width dims"
              id="width"
              variant="outlined"
            />
          </Grid>

          <Grid item>
            <TextField
              label="Enter tile height dims"
              id="height"
              variant="outlined"
            />
          </Grid>

          <Grid item>
            <TextField
              label="Enter map name"
              id="name"
              variant="outlined"
            />
          </Grid>

          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ height: '56px' }}
            >
              Create Map
            </Button>
          </Grid>

        </Grid>
      </form>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {snackMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

TileMapInfoForm.propTypes = {
  updateFormInfo: PropTypes.func.isRequired,
};

export default TileMapInfoForm;
