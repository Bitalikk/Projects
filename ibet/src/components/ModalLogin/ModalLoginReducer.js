import {
  TOOGLE,
  TOOGLE_LOGIN,
  SERVER_ERROR,
  CLEAR_NOTIFICATION,
  SIGNIN_RESPONSE,
  SIGNUP_RESPONSE,
} from '../../utils/constants';

const INITIALSTATE = {
  showModal: false,
  activeSignUp: true, // При открытии модалки показывает логин или регистрацию
  serverResponse: {},
};

const ModalLoginReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case TOOGLE:
      return {
        ...state,
        showModal: !state.showModal,
      };
    case TOOGLE_LOGIN:
      return {
        ...state,
        activeSignUp: !state.activeSignUp,
      };
    case SIGNIN_RESPONSE:
      console.log(`Прилитело`, action.payload);

      if (action.payload.error === `User in not defined`) {
        return {
          ...state,
          serverResponse: { type: `error`, message: `signInInvalidUser` },
        };
      }
      if (action.payload.error === `Password is invalid`) {
        return {
          ...state,
          serverResponse: { type: `error`, message: `signInInvalidPas` },
        };
      }

      if (action.payload.seccess === false) {
        return {
          ...state,
          serverResponse: { type: `error`, message: `signInError` },
        };
      }
      return {
        ...state,
        serverResponse: { type: `success`, message: `signInSuccess` },
      };
    case SIGNUP_RESPONSE:
      if (action.payload.error) {
        if (action.payload.error === `email already exist`) {
          return {
            ...state,
            serverResponse: { type: `error`, message: `signUpErrorEmail` },
          };
        }
        if (action.payload.error === `userName already exist`) {
          return {
            ...state,
            serverResponse: { type: `error`, message: `signUpErrorLogin` },
          };
        }
        return {
          ...state,
          serverResponse: { type: `error`, message: `signUpError` },
        };
      }
      return {
        ...state,
        serverResponse: { type: `success`, message: `signUpSuccess` },
      };
    case SERVER_ERROR:
      return {
        ...state,
        serverResponse: { type: `error`, message: `serverError` },
      };
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        serverResponse: {},
      };
    default:
      return state;
  }
};

export default ModalLoginReducer;
