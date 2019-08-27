import { requestRegister, requestLogin, requestUserData } from '../../utils/requests';
import { actionTypes } from './constants';
import { createAction } from '../../utils/utils';

const userLogin = createAction(actionTypes.USER_LOGIN);
const userRegister = createAction(actionTypes.USER_REGISTER);
const userData = createAction(actionTypes.USER_DATA);

export const sendRegisterData = data => dispatch =>
  requestRegister(data)
    .then(response => {
      if (response.status === 200) {
        dispatch(userRegister(response.data.user));
        return response;
      }
      if (response.status >= 400) {
        return response;
      }
    })
    .catch(error => console.log(error));

export const sendLoginData = data => dispatch =>
  requestLogin(data)
    .then(response => {
      console.log(response);

      if (response.status === 200) {
        dispatch(userLogin(response.data.user));
        return response;
      }

      if (response.status >= 400) {
        return response;
      }
    })
    .catch(error => console.log(error));

export const getUserData = token => dispatch =>
  requestUserData(token)
    .then(({ data }) => {
      dispatch(userData(data.user));
    })
    .catch(({ error }) => error);
