import React from 'react';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from '../ModalLogin.module.css';

const SignUp = ({
  onInputLogin,
  onInputPassword,
  onInputEmail,
  signUp,
  password,
  email,
  lang,
  err,
  login,
  setRandomLogin,
  isLoaderShowed,
}) => {
  return (
    <div
      className={[styles[`form-container`], styles[`sign-up-container`]].join(
        ` `,
      )}
    >
      <form action="#" className={styles[`modal-form`]}>
        <h1 className={styles[`modal-h1`]}>{lang.text.signUpHeader}</h1>
        <div className={styles[`loginInput-wrapper`]}>
          <TextField
            error={!!err.login}
            id="login-input"
            label={lang.text.login}
            value={login}
            onChange={onInputLogin}
            margin="normal"
            variant="outlined"
            helperText={err.login}
          />
          <button
            className={styles.randomUserBtn}
            type="button"
            onClick={setRandomLogin}
          >
            <i className="material-icons">casino</i>
          </button>
        </div>
        <TextField
          error={!!err.email}
          id="email-input"
          label={lang.text.email}
          onChange={onInputEmail}
          margin="normal"
          variant="outlined"
          value={email}
          helperText={err.email}
        />
        <TextField
          error={!!err.password}
          type="password"
          id="password-input"
          label={lang.text.password}
          onChange={onInputPassword}
          margin="normal"
          variant="outlined"
          value={password}
          helperText={err.password}
        />
        <Button color="secondary" id="signUp" onClick={signUp} size="large">
          {lang.text.signUpButton}
        </Button>
      </form>
      {isLoaderShowed && <i className={styles.loader} />}
    </div>
  );
};

export default SignUp;

SignUp.propTypes = {
  onInputLogin: PropTypes.func.isRequired,
  onInputPassword: PropTypes.func.isRequired,
  onInputEmail: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  lang: PropTypes.shape({}).isRequired,
  err: PropTypes.shape({}).isRequired,
  login: PropTypes.string.isRequired,
  setRandomLogin: PropTypes.func.isRequired,
  isLoaderShowed: PropTypes.bool.isRequired,
};
