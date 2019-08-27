import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import windowSize from 'react-window-size';
import { fetchLogOut } from '../../utils/requests';
import { closeModalProductsAction, clearSessionAction } from '../../redux/actions/productActions';
import UserBar from '../UserBar/UserBar';
import Modal from './Modal';
import Icon from '../../assets/icons/Icon/Icon';
import logo from './Logo/logo-png.png';
import styles from './Header.module.css';

import PropTypes from 'prop-types';

const activeStyles = {
  color: 'black'
};

class Header extends Component {
  static propTypes = {
    token: PropTypes.string
  };
  static defaultProps = {
    token: ''
  };

  state = {
    openModal: false
  };

  toogleModal = () => {
    this.setState(state => ({ openModal: !state.openModal }));
  };

  logOut = token => {
    const { clearSession } = this.props;
    fetchLogOut(token).then(() => {
      localStorage.removeItem('userToken');
      clearSession();
      this.props.history.push('/');
    });
  };

  render() {
    const { toogleModal, logOut, navigationToogle } = this;
    const { openModal } = this.state;
    const { username, isModalShowed, toogleModalProducts, session, token, location } = this.props;
    return (
      <div className={styles.header}>
        <div className={session.token ? styles.container : styles.loggedContainer}>
          <div className={session.token ? styles.logoNavigationBox : styles.loggedLogoNavigationBox}>
            <Link
              className={styles.logotype}
              to={(!session.token && !session.userData) || !session.userData ? '/dashboard' : '/dashboard/diary'}
            >
              <img className={styles.logoImg} src={logo} alt="LOGO" />
              <span className={styles.logoText}>
                Slim<span className={styles.logoTextSpan}>Mom</span>
              </span>
            </Link>

            {session.token && this.props.windowWidth > 1023 && (
              <div className={styles.navigationBox}>
                <NavLink
                  activeStyle={activeStyles}
                  onClick={navigationToogle}
                  className={styles.navigationLink}
                  exact
                  to="/dashboard/diary"
                >
                  ДНЕВНИК
                </NavLink>
                <NavLink
                  activeStyle={activeStyles}
                  onClick={navigationToogle}
                  className={styles.navigationLink}
                  exact
                  to="/dashboard"
                >
                  КАЛЬКУЛЯТОР
                </NavLink>
              </div>
            )}
          </div>

          {session.token && (
            <div className={styles.usernameBurgerWrapper}>
              {session.token && this.props.windowWidth > 767 && (
                <div className={styles.usernamebox}>
                  <p className={styles.usernameText}> {username}</p>
                  <p>|</p>
                  <p className={styles.slash} onClick={() => logOut(token)} className={styles.logoutText}>
                    Выйти
                  </p>
                </div>
              )}
              {session.token && !openModal && this.props.windowWidth < 1023 && (
                <button className={styles.burgerBtn} onClick={toogleModal}>
                  <Icon className={styles.burger} icon="Menu" />
                </button>
              )}
              {session.token && openModal && this.props.windowWidth < 1023 && (
                <button className={styles.burgerBtn} onClick={toogleModal}>
                  <Icon className={styles.cross} icon="Close" />
                </button>
              )}
            </div>
          )}
          {openModal && this.props.windowWidth < 1023 && <Modal toogleModal={toogleModal} />}
          {location.pathname === '/' && !session.token && <UserBar />}
        </div>
        {session.token && this.props.windowWidth < 767 && (
          <div className={isModalShowed ? styles.greyZone : styles.greyZoneModalClose}>
            {isModalShowed && (
              <button type="button" onClick={toogleModalProducts} className={styles.closeModal}>
                <Icon icon="Arrow_Back" />
              </button>
            )}
            <div className={styles.mobileLogoutBox}>
              <p className={styles.username}>{username}</p>
              <Icon onClick={() => logOut(token)} className={styles.logoutButton} icon="Logout" />
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  session: state.session,
  username: state.session.nickname,
  token: state.session.token,
  isModalShowed: state.dailyBlock.isModalProductShowed
});
const mapDispatchToProps = dispatch => ({
  toogleModalProducts: () => {
    dispatch(closeModalProductsAction());
  },
  clearSession: () => {
    dispatch(clearSessionAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(windowSize(Header));
