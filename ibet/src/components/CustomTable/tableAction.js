import {
  BET_APLLY,
  BET_FETCH_SUCCESS,
  BET_FETCH_FAILURE,
} from '../../utils/constants';

export const enterGame = id => ({
  type: BET_APLLY,
  payload: id,
});

const fetchSuccess = data => ({
  type: BET_FETCH_SUCCESS,
  payload: data,
});

const fetchFailure = error => ({
  type: BET_FETCH_FAILURE,
  payload: error,
});

export const asyncGetBets = () => dispatch => {
  fetch('http://localhost:8080/api/bets')
    .then(r => r.json())
    .then(data => {
      console.log('data', data);
      dispatch(fetchSuccess(data.bets));
    })
    .catch(err => dispatch(fetchFailure(err)));
};

export const handleOnApply = (beatId, beatData, token) => dispatch => {
  fetch(`http://localhost:8080/api/bets/apply/${beatId}`, {
    method: 'PUT',
    body: JSON.stringify(beatData),
    headers: {
      'content-type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => {
      response.json().then(data => {
        console.log(data);
        dispatch(fetchSuccess(data.bets));
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const handleDelete = (beatId, token) => dispatch => {
  fetch(`http://localhost:8080/api/bets/${beatId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => {
      response.json().then(data => {
        console.log(data);
        dispatch(fetchSuccess(data.bets));
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const asyncCreateBet = (beatData, token) => dispatch => {
  console.log('beatData', beatData);
  console.log('token', token);
  fetch(`http://localhost:8080/api/bets`, {
    method: 'POST',
    body: JSON.stringify(beatData),
    headers: {
      'content-type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => {
      response.json().then(data => {
        console.log(data);
        dispatch(fetchSuccess(data.bets));
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// http://localhost:8080/api/bets/${beatId}
// method DELETE
// Authorization: token
