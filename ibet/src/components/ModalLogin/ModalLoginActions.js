import {
  TOOGLE,
  TOOGLE_LOGIN,
  SIGNUP_RESPONSE,
  SERVER_ERROR,
  CLEAR_NOTIFICATION,
  SIGNIN_RESPONSE,
} from '../../utils/constants';

import { authSucces } from './sessionActions';

export const toogleModalLogin = () => {
  return {
    type: TOOGLE,
  };
};

export const toogleLogin = () => {
  return {
    type: TOOGLE_LOGIN,
  };
};

export const signUpResponse = data => {
  return {
    type: SIGNUP_RESPONSE,
    payload: data,
  };
};

export const signInResponse = data => {
  return {
    type: SIGNIN_RESPONSE,
    payload: data,
  };
};

export const serverError = () => {
  return {
    type: SERVER_ERROR,
  };
};

export const clearNotification = () => {
  return {
    type: CLEAR_NOTIFICATION,
  };
};

export const asyncSignin = userData => dispatch => {
  fetch('http://localhost:8080/api/auth/signin', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: { 'content-type': 'application/json' },
  })
    .then(response => response.json())
    .then(data => {
      // console.log(`response data`, data);
      if (data.error) {
        dispatch(signInResponse(data));
        dispatch(clearNotification());
        // throw new Error(data.error);
      } else {
        dispatch(signInResponse(data));
        dispatch(clearNotification());
        dispatch(authSucces({ token: data.token, user: data.user }));
        dispatch(toogleModalLogin());
      }
      // console.log(`data.token to localStorage`, data);
    })
    .catch(err => {
      dispatch(serverError(err));
      dispatch(clearNotification());
    });
};

export const asyncSignup = userData => dispatch => {
  return fetch('http://localhost:8080/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: { 'content-type': 'application/json' },
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        // console.log(data);
        dispatch(signUpResponse(data));
        dispatch(clearNotification());
        // throw new Error(data.error);
      } else {
        dispatch(signUpResponse(data));
        dispatch(clearNotification());
        dispatch(asyncSignin(userData));
        // console.log(data);
      }
    })
    .catch(err => {
      dispatch(serverError(err));
      dispatch(clearNotification());
    });
};
