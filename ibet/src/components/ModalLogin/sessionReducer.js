import { AUTH_SUCCESS, LOG_OUT } from '../../utils/constants';

const initialState = {
  user: {},
  token: '',
  isAuthenticated: false,
};

const sessionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_SUCCESS:
      return { ...state, ...payload, isAuthenticated: true };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default sessionReducer;
