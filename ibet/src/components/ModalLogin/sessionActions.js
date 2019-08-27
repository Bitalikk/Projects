import { AUTH_SUCCESS, LOG_OUT } from '../../utils/constants';

export const authSucces = data => {
  return {
    type: AUTH_SUCCESS,
    payload: data,
  };
};
export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};

export const refreshCurrentUser = () => (dispatch, getState) => {
  const { token } = getState().session;
  // console.log(token);
  if (!token) return;

  fetch('http://localhost:8080/api/auth/current', {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      response.json().then(data => {
        // console.log(`Response from token`, data);
        dispatch(authSucces({ user: data.user }));
      });
    })
    .catch(err => {
      console.log(err);
    });
};
