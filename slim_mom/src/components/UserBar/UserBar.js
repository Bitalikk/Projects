import React, { Component } from 'react';
import styles from './UserBar.module.css';
import { NavLink } from 'react-router-dom';

export default class UserBar extends Component {
  render() {
    return (
      <div className={styles.container}>
        <NavLink exact to="/login" className={styles.link}>
          Вход <span className={styles.spanLine}>|</span> Регистрация
        </NavLink>
      </div>
    );
  }
}
