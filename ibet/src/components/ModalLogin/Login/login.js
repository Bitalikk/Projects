import React from 'react';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from '../ModalLogin.module.css';

const Login = ({
  onInputPassword,
  onInputEmail,
  signIn,
  isLoaderShowed,
  email,
  password,
  err,
  lang,
  forgetPasFunc,
}) => {
  return (
    <div
      className={[styles[`form-container`], styles[`sign-in-container`]].join(
        ` `,
      )}
    >
      <form action="#" className={styles[`modal-form`]}>
        <h1 className={styles[`modal-h1`]}>{lang.text.signInHeader}</h1>

        <TextField
          error={!!err.email}
          id="email-input2"
          label={lang.text.email}
          value={email}
          onChange={onInputEmail}
          helperText={err.email}
          margin="normal"
          variant="outlined"
        />

        <TextField
          error={!!err.password}
          id="password-input2"
          label={lang.text.password}
          value={password}
          type="password"
          onChange={onInputPassword}
          helperText={err.password}
          margin="normal"
          variant="outlined"
        />

        <Button
          color="default"
          id="forgot-password"
          onClick={forgetPasFunc}
          size="small"
        >
          {lang.text.forgot}
        </Button>
        <Button color="secondary" id="signIn" onClick={signIn} size="large">
          {lang.text.signInButton}
        </Button>
      </form>
      {isLoaderShowed && <i className={styles.loader} />}
    </div>
  );
};

export default Login;

Login.propTypes = {
  onInputPassword: PropTypes.func.isRequired,
  onInputEmail: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  isLoaderShowed: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  err: PropTypes.shape({}).isRequired,
  lang: PropTypes.shape({}).isRequired,
  forgetPasFunc: PropTypes.func.isRequired,
};
