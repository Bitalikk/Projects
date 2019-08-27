import React from 'react';
import styles from './Modal.module.css';
import { NavLink } from 'react-router-dom';
import Icon from '../../assets/icons/Icon/Icon';

const Modal = ({ toogleModal }) => {
  return (
    <div className={styles.container}>
      <Icon onClick={toogleModal} className={styles.cross} icon="Close" />
      <div className={styles.linkBox}>
        <NavLink onClick={toogleModal} exact to="/dashboard/diary">
          Дневник
        </NavLink>
        <NavLink onClick={toogleModal} exact to="/dashboard">
          Калькулятор
        </NavLink>
      </div>
    </div>
  );
};

export default Modal;
