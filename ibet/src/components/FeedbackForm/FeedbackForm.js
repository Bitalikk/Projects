import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types';
import styles from './FeedbackForm.module.css';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

function TextFields({ onChange, onSubmit }) {
  const classes = useStyles();

  return (
    <div className={styles.mainForm}>
      <div className={styles.adressInfo}>
        <h2 className="adressTitle">Nearest Office:</h2>
        <p className="adressText">
          Kyiv <br /> Bankova str. 123 <br /> 5441359{' '}
        </p>
      </div>
      <div className={styles.inputs}>
        <form
          onSubmit={onSubmit}
          className={classes.container}
          autoComplete="off"
        >
          <TextField
            onChange={onChange}
            id="standard-name"
            label="Name"
            margin="dense"
            required
            name="name"
            variant="outlined"
          />
          <TextField
            onChange={onChange}
            id="outlined-email-input"
            label="Email"
            className={classes.textField}
            type="email"
            autoComplete="email"
            margin="dense"
            variant="outlined"
            name="mail"
            required
          />
          <TextField
            onChange={onChange}
            id="outlined-dense"
            label="Country"
            className={classes.textField}
            margin="dense"
            variant="outlined"
            name="country"
          />
          <TextField
            className={styles.label}
            onChange={onChange}
            id="outlined-full-width"
            label="Feedback"
            style={{ margin: 0, marginTop: 40 }}
            placeholder="Your suggestions"
            // helperText="Thank you for your time !"
            fullWidth
            margin="normal"
            variant="outlined"
            name="feedback"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className={styles.button}>
            <Fab
              type="submit"
              variant="extended"
              aria-label="Delete"
              className={styles.btn}
            >
              <NavigationIcon className={styles.btn} />
              MAIL US
            </Fab>
          </div>
        </form>
      </div>
    </div>
  );
}

TextFields.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TextFields;
