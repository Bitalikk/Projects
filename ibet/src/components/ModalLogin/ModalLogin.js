import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import { CSSTransition } from 'react-transition-group';
import Confetti from 'react-dom-confetti';
import { SnackbarProvider, withSnackbar } from 'notistack';
import styles from './ModalLogin.module.css';
import transition from './transition.module.css';
import Overlay from './Overlay/Overlay';
import Login from './Login/login';
import SignUp from './SignUp/SignUp';
import Notifications from './Notifications/Notifications';
import randomUserName from '../../utils/ModalLogin/randomLogin';
import {
  toogleModalLogin,
  asyncSignup,
  toogleLogin,
  asyncSignin,
} from './ModalLoginActions';

const INITIALSTATE = {
  login: ``,
  password: ``,
  email: ``,
  errors: {
    isLoginEmpty: true,
    isLoginRight: true,
    isLoginExist: false,
    isLoginLengsOk: true,
    IsLoginFirstDigit: false,
    isLoginInEng: true,
    isLoginLengthToMuch: false,
    isPasswordEmpty: true,
    isPasswordRight: true,
    isPasswordOneWord: true,
    isPasswordLengsOk: true,
    isPasswordinEng: true,
    isPasswordLengthToMuch: false,
    isPasswordContainLogin: false,
    isEmailEmpty: true,
    isEmailValid: true,
    isAllInputFilled: false,
  },
  isLoaderShowed: false,
  isConfetti: false,
};

const language = {
  eng: {
    text: {
      signInHeader: 'Sign in',
      signUpHeader: 'Create Account',
      signInButton: 'Sign in',
      signUpButton: 'Sign up',
      forgot: 'Forgot your password?',
      login: 'Login',
      email: 'Email',
      password: 'Password',
      textHeaderIn: 'Hello, Friend!',
      textContentIn: 'Enter your personal details and start journey with us',
      textHeaderUp: 'Welcome Back!',
      textContentUp:
        'To keep connected with us please login with your personal info',
    },
    errors: {
      password: {
        isPasswordRight: 'Invalid Password',
        isPasswordLengsOk: 'Passwords must be at least 8 characters long',
        isPasswordinEng: `Password can only contain latin characters and digits`,
        isPasswordLengthToMuch: `Password can only contain 16 characters`,
        isPasswordContainLogin: `Password cant contain a login`,
        isPasswordEmpty: `Password is Required`,
      },
      email: {
        isEmailValid: 'Email is not valid',
        isEmailEmpty: `Email is Required`,
      },
      login: {
        isLoginExist: 'This login already exists',
        isLoginLengsOk: 'Login must be at least 4 characters long',
        IsLoginFirstDigit: `Login cant begin from a number`,
        isLoginInEng: `Login can only contain latin letters and digits`,
        isLoginLengthToMuch: `Login can only contain 10 characters`,
        isLoginEmpty: `Login is Required`,
      },
      inputs: {
        isAllInputFilled: 'All fields must be filled',
      },
    },
    nitifications: {
      langSwitch: `Выбран русский язык`,
      forgotPas: `Sorry about this ;(`,
      serverError: `Something went wrong`,
      signInError: `Email or password is invalid`,
      signInSuccess: `Nice to see you here`,
      signInInvalidPas: `Password is invalid`,
      signInInvalidUser: `User is not defind`,
      signUpSuccess: `You successfully signed up`,
      signUpErrorEmail: `Email already exist`,
      signUpErrorLogin: `Login already exist`,
    },
  },
  rus: {
    text: {
      signInHeader: 'Вход',
      signUpHeader: 'Создайте аккаунт',
      signInButton: 'Вход',
      signUpButton: 'Регистрация',
      forgot: 'Забыли пароль?',
      login: 'Логин',
      email: 'Ел. почта',
      password: 'Пароль',
      textHeaderIn: 'Привет, приятель!',
      textContentIn:
        'Введите информацию о вас и начните Ваше путешествие с нами',
      textHeaderUp: 'С возвращением!',
      textContentUp: 'Чтобы оставаться с нами, зайдите в Ваш аккаунт',
    },
    errors: {
      password: {
        isPasswordRight: 'Неверный пароль',
        isPasswordLengsOk: 'Пароль должен быть не короче 8 символов',
        isPasswordinEng: `Пароль может содержать только латинские буквы и цифры`,
        isPasswordLengthToMuch: `Пароль может содержать до 16 символов`,
        isPasswordContainLogin: `Пароль не должен содержать в себе логин`,
        isPasswordEmpty: `Пароль обязательный`,
      },
      email: {
        isEmailValid: 'Это не почта',
        isEmailEmpty: `Email Обязательный`,
      },
      login: {
        isLoginExist: 'Такой логин уже существует ',
        isLoginLengsOk: 'Минимальная длинна логина - 4 символа',
        IsLoginFirstDigit: `Логин не может начинаться с цифры`,
        isLoginInEng: `Логин может состоять только из латинских букв и цифр`,
        isLoginLengthToMuch: `Логин может содержать до 10 символов`,
        isLoginEmpty: `Логин Обязательный`,
      },
      inputs: {
        isAllInputFilled: 'Все поля должны быт заполнены',
      },
    },
    nitifications: {
      langSwitch: `English language selected`,
      forgotPas: `Сожалеем об этом ;(`,
      serverError: `Что то пошло не так`,
      signInError: `Не правильный емейл или пароль`,
      signInSuccess: `Рады видеть вас`,
      signInInvalidPas: `Не Правильный пароль`,
      signInInvalidUser: `Такого пользователя не существует`,
      signUpSuccess: `Вы успешно зарегестрированы`,
      signUpErrorEmail: `Емейл уже существует`,
      signUpErrorLogin: `Логин уже существует`,
    },
  },
};

class LoginModal extends Component {
  state = {
    ...INITIALSTATE,
    passwordLengthMustBe: 8,
    passwordMaxLength: 16,
    loginLengthMustBe: 4,
    loginMaxLength: 10,
    defaultLanguage: `eng`,
    isEng: true,
    err: {},
  };

  componentDidMount = () => {
    // console.log(`ComponentDidMount`);
    window.addEventListener(`click`, this.closeModal);
  };

  componentWillUnmount = () => {
    // console.log(`ComponentWillUnmount`);
    window.removeEventListener(`click`, this.closeModal);
  };

  closeModal = e => {
    // console.log(`Лисенер РАБОТАЕТ;(`);
    const modal = document.getElementById(`wrapper`);
    const { toogleModal } = this.props;
    if (e.target === modal) {
      toogleModal();
    }
  };

  setRandomLogin = () => {
    this.setState({ login: randomUserName() });
    setTimeout(() => {
      this.validateLoginInput();
    }, 30);
  };

  handleClickVariant = (variant, message) => () => {
    // variant could be success, error, warning, info, or default
    this.props.enqueueSnackbar(message, { variant });
  };

  toogleForgetPas = () => {
    this.setState(state => ({
      isShowedForgetPassword: !state.isShowedForgetPassword,
    }));
  };

  validateLoginInput = () => {
    const { login, errors, loginLengthMustBe, loginMaxLength } = this.state;
    const loginLength = login.split(``).length; // Длина логина
    const regLatin = new RegExp('^[a-zA-Z0-9]+$'); // Только анг и цифры
    const regFirstNum = new RegExp(`^[0-9]`); // Число ли первый символ

    // Пасхалочка
    if (login === `Pasha`) {
      this.toogleConfetti();
      this.toogleConfetti();
    }

    // Если пароль пустой то выбиваем ошибку
    if (login === ``) {
      this.toogleIsEverythinkOk(`login`, `isLoginEmpty`);
      if (errors.isLoginEmpty) {
        this.toogleSomeError(`isLoginEmpty`);
      }
      return false;
    }

    // Убираем ошибку если она была показана
    if (login !== ``) {
      this.toogleIsEverythinkOk();
      this.toogleSomeError(`isLoginEmpty`);
    }

    // Проверяем логин на кириллицу
    // Если есть не латинские буквы или цифры то меняет стейт => Показывается <p> с ошибкой
    if (!regLatin.test(login)) {
      // console.log(`Логин содержит кириллицу или спец символы`);
      this.toogleIsEverythinkOk(`login`, `isLoginInEng`);
      if (errors.isLoginInEng) {
        this.toogleSomeError(`isLoginInEng`);
      }
      return false;
    }

    // Если логин только на латинице с цифрами
    // то убираем <p> если она была показа
    if (regLatin.test(login) && !errors.isLoginInEng) {
      // console.log(`Теперь логин не содержит кириллицу`);
      this.toogleIsEverythinkOk();
      this.toogleSomeError(`isLoginInEng`);
    }

    // Проверяем цифра ли первый символ
    // Если цифра то меняет стейт => Показывается <p> с ошибкой
    if (regFirstNum.test(login)) {
      // console.log(`Первый символ число`);
      this.toogleIsEverythinkOk(`login`, `IsLoginFirstDigit`);
      if (!errors.IsLoginFirstDigit) {
        this.toogleSomeError(`IsLoginFirstDigit`);
      }
      return false;
    }

    // Если логин не начинается с цифры
    // то убираем <p> если она была показа
    if (!regFirstNum.test(login) && errors.IsLoginFirstDigit) {
      // console.log(`Теперь логин не начинается с цифры`);
      this.toogleSomeError(`IsLoginFirstDigit`);
      this.toogleIsEverythinkOk();
    }

    // Проверяем длину логина
    // Если меньше чем loginLengthMustBe то меняет стейт => Показывается <p> с ошибкой
    if (loginLength < loginLengthMustBe) {
      // console.log('Логин Короче нужной длины');
      this.toogleIsEverythinkOk(`login`, `isLoginLengsOk`);
      if (errors.isLoginLengsOk) {
        this.toogleSomeError(`isLoginLengsOk`);
      }
      return false;
    }

    // Если логин равен или больше стейта loginLengthMustBe,
    // то убираем <p> если она была показа
    if (loginLength > loginLengthMustBe && !errors.isLoginLengsOk) {
      // console.log('Логин Нормальной длины');
      this.toogleSomeError(`isLoginLengsOk`);
      this.toogleIsEverythinkOk();
    }

    // Проверяем длину логина
    // Если больше чем loginMaxLength то меняет стейт => Показывается <p> с ошибкой
    if (loginLength > loginMaxLength) {
      // console.log('Логин длинее нужной длины');
      this.toogleIsEverythinkOk(`login`, `isLoginLengthToMuch`);
      if (!errors.isLoginLengthToMuch) {
        this.toogleSomeError(`isLoginLengthToMuch`);
      }
      return false;
    }

    // Если логин меньше или равен стейта loginMaxLength,
    // то убираем <p> если она была показа
    if (loginLength <= loginMaxLength && errors.isLoginLengthToMuch) {
      // console.log('Логин Нормальной длины');
      this.toogleSomeError(`isLoginLengthToMuch`);
      this.toogleIsEverythinkOk();
    }

    return true;
  };

  validatePasswordInput = () => {
    const {
      login,
      password,
      errors,
      passwordMaxLength,
      passwordLengthMustBe,
    } = this.state;
    const passLength = password.split(``).length; // Длина пароля
    const regLatin = new RegExp('^[a-zA-Z0-9]+$'); // Только анг и цифры
    const regLogin = new RegExp(login); // найти логин

    // Если пароль пустой то выбиваем ошибку
    if (password === ``) {
      this.toogleIsEverythinkOk(`password`, `isPasswordEmpty`);
      if (errors.isPasswordEmpty) {
        this.toogleSomeError(`isPasswordEmpty`);
      }
      return false;
    }

    // Убираем ошибку если она была показана
    if (password !== ``) {
      this.toogleIsEverythinkOk();
      this.toogleSomeError(`isPasswordEmpty`);
    }

    // Проверяем пароль на кириллицу
    // Если есть не латинские буквы или цифры то меняет стейт => Показывается <p> с ошибкой
    if (!regLatin.test(password)) {
      // console.log(`Пароль содержит кириллицу или спец символы`);
      this.toogleIsEverythinkOk(`password`, `isPasswordinEng`);
      if (errors.isPasswordinEng) {
        this.toogleSomeError(`isPasswordinEng`);
      }
      return false;
    }

    // Если Пароль только на латинице с цифрами
    // то убираем <p> если она была показа
    if (regLatin.test(password) && !errors.isPasswordinEng) {
      // console.log(`Теперь Пароль не содержит кириллицу`);
      this.toogleIsEverythinkOk();
      this.toogleSomeError(`isPasswordinEng`);
    }

    // Проверяем длину Пароля
    // Если меньше чем passwordLengthMustBe то меняет стейт => Показывается <p> с ошибкой
    if (passLength < passwordLengthMustBe) {
      // console.log('Пароль короче нужной длины');
      this.toogleIsEverythinkOk(`password`, `isPasswordLengsOk`);
      if (errors.isPasswordLengsOk) {
        this.toogleSomeError(`isPasswordLengsOk`);
      }
      return false;
    }

    // Если пароль равен или больше стейта passwordLengthMustBe,
    // то убираем <p> если она была показа
    if (passLength >= passwordLengthMustBe && !errors.isPasswordLengsOk) {
      // console.log('Пароль Нормальной длины');
      this.toogleSomeError(`isPasswordLengsOk`);
      this.toogleIsEverythinkOk();
    }

    // Проверяем длину Пароля
    // Если больше чем passwordMaxLength то меняет стейт => Показывается <p> с ошибкой
    if (passLength > passwordMaxLength) {
      // console.log('Пароль длинее нужной длины');
      this.toogleIsEverythinkOk(`password`, `isPasswordLengthToMuch`);
      if (errors.isPasswordLengthToMuch) {
        this.toogleSomeError(`isPasswordLengthToMuch`);
      }
      return false;
    }

    // Если пароль равен или меньше стейта passwordMaxLength,
    // то убираем <p> если она была показа
    if (passLength >= passwordMaxLength && !errors.isPasswordLengthToMuch) {
      // console.log('Пароль Нормальной длины');
      this.toogleSomeError(`isPasswordLengthToMuch`);
      this.toogleIsEverythinkOk();
    }

    // Проверяем содержит ли пароль в себе логин
    // Если больше чем passwordMaxLength то меняет стейт => Показывается <p> с ошибкой
    if (regLogin.test(password) && login !== ``) {
      // console.log('Пароль такой же как и логин');
      this.toogleIsEverythinkOk(`password`, `isPasswordContainLogin`);
      if (errors.isPasswordContainLogin) {
        this.toogleSomeError(`isPasswordContainLogin`);
      }
      return false;
    }

    // Если пароль не содержит логин
    // то убираем <p> если она была показа
    if (!regLogin.test(password) && !errors.isPasswordContainLogin) {
      // console.log('Пароль больше не такой же как и логин');
      this.toogleSomeError(`isPasswordContainLogin`);
      this.toogleIsEverythinkOk();
    }

    return true;
  };

  validateEmailInput = () => {
    const { email, errors } = this.state;

    // Если емейл пустой то выбиваем ошибку
    if (email === ``) {
      this.toogleIsEverythinkOk(`email`, `isEmailEmpty`);
      if (errors.isEmailEmpty) {
        this.toogleSomeError(`isEmailEmpty`);
      }
      return false;
    }

    // Убираем ошибку если она была показана
    if (email !== ``) {
      this.toogleIsEverythinkOk();
      this.toogleSomeError(`isEmailEmpty`);
    }

    // Делаем валидацию Емейл
    // Если не валид то меняет стейт => Показывается <p> с ошибкой
    const validateEmail = m => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(m);
    };

    if (!validateEmail(email)) {
      // console.log(`Это не емейл`);
      this.toogleIsEverythinkOk(`email`, `isEmailValid`);
      if (errors.isEmailValid) {
        this.toogleSomeError(`isEmailValid`);
      }
      return false;
    }

    // Если с емейлом все ок то убираем <p> если она была показана
    if (validateEmail(email) && errors.isEmailValid === false) {
      // console.log('С емейлом теперь все ок');
      this.toogleSomeError(`isEmailValid`);
      this.toogleIsEverythinkOk();
    }

    return true;
  };

  onInputLogin = e => {
    this.setState({ login: e.target.value });
    setTimeout(() => {
      this.validateLoginInput();
    }, 30);
  };

  onInputEmail = e => {
    this.setState({ email: e.target.value });
    setTimeout(() => {
      this.validateEmailInput();
    }, 30);
  };

  onInputPassword = e => {
    this.setState({ password: e.target.value });
    setTimeout(() => {
      this.validatePasswordInput();
    }, 30);
  };

  toogleIsEverythinkOk = (type, key) => {
    this.setState(() => {
      const { defaultLanguage } = this.state;

      if (!key) {
        return {
          err: {},
        };
      }
      return {
        err: {
          [type]: language[defaultLanguage].errors[type][key],
        },
      };
    });
  };

  toogleConfetti = () => {
    this.setState(state => ({
      isConfetti: !state.isConfetti,
    }));
  };

  toogleSomeError = bool => {
    this.setState(state => ({
      errors: {
        ...state.errors,
        [bool]: !state.errors[bool],
      },
    }));
  };

  toogleIsLoaderShowed = () => {
    this.setState(state => ({
      isLoaderShowed: !state.isLoaderShowed,
    }));
  };

  toogleLang = () => {
    const { defaultLanguage, login, password, email } = this.state;
    if (defaultLanguage === `eng`) {
      this.setState(state => ({
        defaultLanguage: `rus`,
        isEng: !state.isEng,
      }));
    }
    if (defaultLanguage === `rus`) {
      this.setState(state => ({
        defaultLanguage: `eng`,
        isEng: !state.isEng,
      }));
    }

    if (login !== ``) {
      setTimeout(() => {
        this.validateLoginInput();
      }, 10);
    }
    if (email !== ``) {
      setTimeout(() => {
        this.validateEmailInput();
      }, 10);
    }
    if (password !== ``) {
      setTimeout(() => {
        this.validatePasswordInput();
      }, 10);
    }
  };

  signIn = () => {
    const { email, password } = this.state;
    const { sendSignIn } = this.props;

    // Проверяем инпуты
    if (!this.validateEmailInput() || !this.validatePasswordInput()) {
      return;
    }
    this.toogleIsLoaderShowed();

    const user = {
      email,
      password,
    };

    // console.log(user);

    setTimeout(() => {
      this.toogleIsLoaderShowed();
      sendSignIn(user);
    }, 1500);
  };

  signUp = () => {
    const { email, password, login } = this.state;

    const { sendSignup } = this.props;

    // Проверяем инпуты
    if (
      !this.validateLoginInput() ||
      !this.validateEmailInput() ||
      !this.validatePasswordInput()
    ) {
      return;
    }

    const newUser = {
      email,
      password,
      userName: login,
    };
    this.toogleIsLoaderShowed();

    setTimeout(() => {
      this.toogleIsLoaderShowed();
      sendSignup(newUser);
    }, 1400);
  };

  render() {
    const {
      errors,
      isLoaderShowed,
      email,
      password,
      err,
      isConfetti,
      defaultLanguage,
      isEng,
      login,
    } = this.state;

    const {
      isModalshow,
      toogleModal,
      toogleSignUp,
      activeSignUp,
      serverResponse,
    } = this.props;

    // Настройки конфити
    const config = {
      angle: '90',
      spread: '176',
      startVelocity: '54',
      elementCount: '200',
      dragFriction: '0.11',
      duration: '7030',
      stagger: '4',
      width: '10px',
      height: '10px',
      colors: ['#000', '#f00'],
    };

    // Классы для модалки
    let containerStyles = [styles.container];

    // Добавляем или убираем класс
    // От этого зависит начальная позиция модалки и сама анимация смены окна
    if (!activeSignUp) {
      containerStyles = [...containerStyles, styles[`right-panel-active`]];
    } else if (activeSignUp) {
      containerStyles = [styles.container];
    }

    return (
      <CSSTransition
        in={isModalshow}
        timeout={400}
        classNames={transition}
        unmountOnExit
      >
        {() => (
          <>
            <div className={styles.wrapper} id="wrapper">
              <div className={containerStyles.join(` `)}>
                {/* Крестик для закрытия модалки */}
                <Fab
                  color="primary"
                  aria-label="Add"
                  className={styles[`modal-close`]}
                  size="small"
                  onClick={toogleModal}
                >
                  X
                </Fab>
                {/* Пасхалка конфети */}
                <Confetti
                  active={isConfetti}
                  config={config}
                  className={styles.confetti}
                />
                {/* Разные уведомления */}
                {serverResponse.type && (
                  <Notifications
                    pop={this.handleClickVariant(
                      serverResponse.type,
                      language[defaultLanguage].nitifications[
                        serverResponse.message
                      ],
                    )}
                  />
                )}
                <Login
                  lang={language[defaultLanguage]}
                  isLoaderShowed={isLoaderShowed}
                  onInputPassword={this.onInputPassword}
                  onInputEmail={this.onInputEmail}
                  signIn={this.signIn}
                  email={email}
                  password={password}
                  err={err}
                  forgetPasFunc={this.handleClickVariant(
                    `warning`,
                    language[defaultLanguage].nitifications.forgotPas,
                  )}
                />
                <SignUp
                  lang={language[defaultLanguage]}
                  errors={errors}
                  onInputLogin={this.onInputLogin}
                  onInputPassword={this.onInputPassword}
                  onInputEmail={this.onInputEmail}
                  signUp={this.signUp}
                  email={email}
                  password={password}
                  err={err}
                  login={login}
                  setRandomLogin={this.setRandomLogin}
                  isLoaderShowed={isLoaderShowed}
                />
                <Overlay
                  lang={language[defaultLanguage]}
                  toogleLogin={toogleSignUp}
                  toogleLang={this.toogleLang}
                  isEng={isEng}
                  langChangeInfo={this.handleClickVariant(
                    'info',
                    language[defaultLanguage].nitifications.langSwitch,
                  )}
                />
              </div>
            </div>
          </>
        )}
      </CSSTransition>
    );
  }
}

const stateToProps = state => ({
  isModalshow: state.modalLogin.showModal,
  activeSignUp: state.modalLogin.activeSignUp,
  serverResponse: state.modalLogin.serverResponse,
});

const dispatchToProp = dispatch => ({
  toogleModal(e) {
    dispatch(toogleModalLogin(e));
  },
  sendSignup(data) {
    dispatch(asyncSignup(data));
  },
  toogleSignUp() {
    dispatch(toogleLogin());
  },
  sendSignIn(data) {
    dispatch(asyncSignin(data));
  },
});

LoginModal.propTypes = {
  isModalshow: PropTypes.bool.isRequired,
  toogleModal: PropTypes.func.isRequired,
  toogleSignUp: PropTypes.func.isRequired,
  sendSignup: PropTypes.func.isRequired,
  activeSignUp: PropTypes.bool.isRequired,
  sendSignIn: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  serverResponse: PropTypes.shape({}).isRequired,
};

const LoginModalSnack = withSnackbar(
  connect(
    stateToProps,
    dispatchToProp,
  )(LoginModal),
);

function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <LoginModalSnack />
    </SnackbarProvider>
  );
}

export default IntegrationNotistack;
