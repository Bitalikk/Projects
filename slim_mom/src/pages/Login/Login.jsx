import React, { Component } from 'react';
import { connect } from 'react-redux';
import { memorizedUserData } from './selectors';
import Header from '../../components/Header/Header';
import style from './Login.module.css';

import { sendRegisterData, sendLoginData } from '../../redux/actions/auth';

class Login extends Component {
  state = {
    login: '',
    password: '',
    error: '',
    errorLog: '',
    errorPass: ''
  };

  handleInputs = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });

    setTimeout(() => {
      const regLatin = new RegExp('^[a-zA-Z0-9]+$');
      const regFirstNum = new RegExp(`^[0-9]`);
      if (regFirstNum.test(this.state.login || this.state.login.length > 0)) {
        this.setState({
          error: 'Логин не может начинаться с цифры'
        });
      }
      else if (!regLatin.test(this.state.login || this.state.login.length > 0)) {
        this.setState({
          error: 'Логин не может содержать кириллицу и спец символы'
        });
      }
      else if ((this.state.login.length > 0) & (this.state.login.length < 5)) {
        this.setState({
          error: 'Логин должен состоять минимум из 5 знаков'
        });
      } else if ((this.state.password.length > 0) & (this.state.password.length < 5)) {
        this.setState({
          error: 'Пароль должен состоять минимум из 5 знаков'
        });
      } else if ((this.state.login.length > 0) & (this.state.login.length > 16)) {
        this.setState({
          error: 'Логин должен состоять максимум из 16 символов'
        })
      }
      else if ((this.state.password.length > 0) & (this.state.password.length > 16)) {
        this.setState({
          error: 'Пароль должен состоять максимум из 16 символов'
        });
      } else {
        this.setState({
          error: ''
        });
      }
      // console.log(this.state);
    }, 10);
  };

  redirectUser = data => {
    localStorage.setItem('userToken', data.token);

    if (!data.userData) {
      this.props.history.push('/dashboard');
    } else {
      this.props.history.push('/dashboard/diary');
    }
  };

  handleErrorLogin = (data, status) => {
    if (status === 200) {
      this.redirectUser(data.user);
    }
    if (status >= 400) {
      let errorResponse = data.err === 'User doesnt exist' && 'Неправильный пароль или логин';
      errorResponse = data.err === 'Password is invalid' && 'Неправильный пароль или логин';
      this.setState({
        error: errorResponse
      });
      console.log('STATE-fetch,', this.state);
    }
  };

  handleErrorRegister = (data, status) => {
    if (status === 200) {
      this.redirectUser(data.user);
    }

    if (status >= 400) {
      let errorResponse = data.message === 'nickname already exist' && 'Логин уже занят';
      this.setState({
        error: errorResponse
      });
      console.log('STATE-fetch,', this.state);
    }
  };

  handleLogin = e => {
    e.preventDefault();
    const { login, password } = this.state;

    if (login.length < 5 || password < 5) {
      return;
    }

    const dataToLogin = {
      nickname: login,
      password: password
    };

    this.props.loginUser(JSON.stringify(dataToLogin)).then(({ data, status }) => this.handleErrorLogin(data, status));
  };

  handleRegister = e => {
    e.preventDefault();

    const { error, login, password } = this.state;

    if (error !== "") {
      return;
    }

    let dataToRegister = {
      nickname: login,
      password: password
    };

    if (!!this.props.userData) {
      dataToRegister = {
        ...dataToRegister,
        userData: this.props.userData
      };
    }

    this.props.registerUser(JSON.stringify(dataToRegister)).then(({ data, status }) => {
      this.handleErrorRegister(data, status);
    });
  };

  render() {
    return (
      <>
        <div className={style.pageWrapper}>
          <Header {...this.props} />
          <div className={style.loginWrapper}>
            <div className={style.entry}>ВХОД / РЕГИСТРАЦИЯ</div>
            <form>
              <div className={style.inputModule}>
                <label htmlFor="login" className={style.invisible}>
                  Login
                </label>
                <input
                  type="text"
                  name="login"
                  id="login"
                  onChange={this.handleInputs}
                  placeholder="Логин *"
                  className={style.input}
                />
                <label htmlFor="password" className={style.invisible}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.handleInputs}
                  placeholder="Пароль *"
                  className={style.input}
                />
              </div>
              <div className={style.error}>
                <p>{this.state.error}</p>
              </div>
              <div className={style.butModule}>
                <button onClick={this.handleLogin} className={style.button}>
                  Вход
                </button>
                <button onClick={this.handleRegister} className={style.button}>
                  Регистрация
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

const mstp = state => ({
  userData: memorizedUserData(state)
});

const mdtp = {
  registerUser: sendRegisterData,
  loginUser: sendLoginData
};

export default connect(
  mstp,
  mdtp
)(Login);
