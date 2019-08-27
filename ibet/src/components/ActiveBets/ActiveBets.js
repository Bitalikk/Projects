import React from 'react';
import { connect } from 'react-redux';
import s from './ActiveBets.module.css';
import CustomTable from '../CustomTable/CustomTable';

const ActiveBets = ({ session }) => {
  return (
    <div className={s.back}>
      <h2>Active bets</h2>
      <CustomTable session={session} active={session.user.bets} disabledFunc />
    </div>
  );
};

export default ActiveBets;
