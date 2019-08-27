import { combineReducers } from 'redux';
import sessionReducer from './reducers/session';
import productReducer from './reducers/productReducer';
import datePickerReducer from './reducers/datePickerReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  dailyBlock: productReducer,
  datePicker: datePickerReducer
});

export default rootReducer;

// Store example
const session = {
  nickname: 'name',
  token: '123',
  userData: {
    dailyRate: 0,
    groupBlood: 1,
    height: 0,
    desiredWeight: 0,
    currentWeight: 0,
    age: 0
  }
};

const products = {
  date: 'date',
  items: [
    {
      id: '123',
      title: 'some meal',
      ccal: 4000,
      weight: 960,
      groupBloodNotAllowed: {
        '1': true,
        '2': false,
        '3': true,
        '4': false
      }
    }
  ]
};
