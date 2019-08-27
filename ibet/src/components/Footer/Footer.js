import React from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';

import Visa from '../../icons/visa.png';
import MasterCard from '../../icons/master.png';
import Maestro from '../../icons/maestro.png';
import AmericanExpress from '../../icons/american.png';
import Discover from '../../icons/discover.png';
import PayPal from '../../icons/paypalpayment.png';

import classes from './Footer.module.css';

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerWrapper__top}>
        <div className={classes.footerColumn}>
          <p className={classes.logo} exact to="/">
            iBET 2019
          </p>
          <p className={classes.contacts}>
            <IconButton aria-label="Delete">
              <SvgIcon>
                <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
              </SvgIcon>
            </IconButton>
            <NavLink to="/contactus">ibet@gmail.com</NavLink>
          </p>
          <p className={classes.icons}>
            <IconButton aria-label="Delete">
              <SvgIcon>
                <path d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />
              </SvgIcon>
            </IconButton>
            <IconButton aria-label="Delete">
              <SvgIcon>
                <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
              </SvgIcon>
            </IconButton>
          </p>
        </div>
        <div className={classes.cards}>
          <img src={Visa} alt="visa" width="64" height="41" />
          <img src={MasterCard} alt="mastercard" width="64" height="41" />
          <img src={Maestro} alt="maestro" width="64" height="41" />
          <img
            src={AmericanExpress}
            alt="americanexpress"
            width="64"
            height="41"
          />
          <img src={Discover} alt="discover" width="64" height="41" />
          <img src={PayPal} alt="paypal" width="64" height="41" />
        </div>
      </div>
      <div className={classes.footerWrapper__bottom}>
        <br />
        &copy; 2019 iBET - greatest betting company online
        <br />
        ibet.com is owned and operated by ibet, Maldives.
      </div>
    </footer>
  );
}

Footer.propTypes = {};

export default Footer;
