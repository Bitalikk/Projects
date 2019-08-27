import axios from 'axios';
import {} from '../redux/actions/auth';
import * as api from './entyPoints';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

export const setToken = token => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const fetchLogOut = token => {
  return axios
    .post(api.url.logOut(), {}, setToken(token))
    .then(resp => {
      console.log(resp);
      if (resp.data.status !== 'success') {
        throw new Error('albfkjabflasflk');
      }
    })
    .catch(error => console.log(error));
};

export const putNewData = (token, data) => {
  return axios
    .put(api.url.userData(), { ...data }, setToken(token))
    .then(response => {
      if (response.status === 200) {
        return response;
      }
    })
    .catch(err => console.log(err));
};
// Example
export const fetchCompleteTask = (token, task) => {
  return axios.post(api.url.updateTask(), { ...task, isDone: true }, setToken(token)).catch(err => console.log(err));
};

export const deleteProdByDay = (token, id) => {
  return axios
    .delete(api.url.deleteProductsByDay() + id, setToken(token))
    .then(resp => {
      console.log({ resp });
      if (resp.data.status !== 'success') {
        throw new Error('sdasDDDDDDda');
      }
      return resp.data;
    })
    .catch(err => {
      console.log('ANSWER ERROR');
      console.log(err);
      console.log(err.message);
      return err;
    });
};

export const requestRegister = cred =>
  axios
    .post(api.url.registerUser(), cred)
    .then(data => data)
    .catch(({ response }) => response);

export const requestLogin = cred =>
  axios
    .post(api.url.loginUser(), cred)
    .then(data => data)
    .catch(({ response }) => response);

export const requestProductByDate = (date, token) =>
  axios
    .get(api.url.productsByDate(date), setToken(token))
    .then(data => data)
    .catch(({ error }) => error);

export const requestUserData = token =>
  axios
    .get(api.url.userData(), setToken(token))
    .then(data => data)
    .catch(({ error }) => error);

export const fetchAllProducts = (token, input) => {
  return axios
    .get(api.url.products(input), setToken(token))
    .then(resp => {
      const { productsOptions } = resp.data;
      return productsOptions;
    })
    .catch(({ error }) => error);
};

export const fetchProductsByDay = (token, date) => {
  return axios
    .get(`${api.url.userEats()}/${date}`, setToken(token))
    .then(resp => {
      const { products } = resp.data;
      return products;
    })
    .catch(({ error }) => error);
};

export const fetchUserEated = (token, productId, eatedProduct) => {
  return axios
    .post(`${api.url.userEats()}/${productId}`, eatedProduct, setToken(token))
    .then(resp => {
      if (resp.data.status !== 'success') {
        throw new Error(resp.data);
      }
      return resp.data.products;
    })
    .catch(({ error }) => error);
};
